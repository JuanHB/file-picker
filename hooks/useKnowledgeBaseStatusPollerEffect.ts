'use client';

import { useKnowledgeBaseStore } from '@/stores/useKnowledgeBaseStore';
import { useShallow } from 'zustand/react/shallow';
import { useEffect, useRef } from 'react';
import { useKnowledgeBase } from './api/useKnowledgeBase';

const POLL_INTERVAL = 1000;

const useKnowledgeBaseStatusPollerEffect = () => {
  const queueRef = useRef<Map<string, string>>(new Map([['root', '/']]));

  const { getKnowledgeBaseChildren } = useKnowledgeBase();

  const { currKnowledgeBase, setIndexationStatuses } = useKnowledgeBaseStore(
    useShallow((state) => ({
      currKnowledgeBase: state.currKnowledgeBase,
      setIndexationStatuses: state.setIndexationStatuses,
    })),
  );

  // Keep track of the active knowledge base id so we can ignore stale requests
  const activeKbIdRef = useRef<string | null>(null);

  // Whenever currKnowledgeBase changes, reset the queue and update ref
  useEffect(() => {
    activeKbIdRef.current = currKnowledgeBase?.knowledge_base_id ?? null;

    // Reset polling queue when switching to a new KB
    queueRef.current = new Map([['root', '/']]);
  }, [currKnowledgeBase?.knowledge_base_id]);

  useEffect(() => {
    const kbId = currKnowledgeBase?.knowledge_base_id;
    if (!kbId) return;

    const interval = setInterval(async () => {
      const snapshot = Array.from(queueRef.current); // [dirId, path] pairs
      const nextQueue = new Map<string, string>();

      for (const [dirId, path] of snapshot) {
        const { data: children } = await getKnowledgeBaseChildren(kbId, path);

        let stillPending = false;

        // Track if there are any unindexed files in the current directory
        children.forEach((child) => {
          if (child.inode_type === 'file') {
            if (child.status !== 'indexed') {
              stillPending = true;
            }
          } else {
            // Add sub-directory if any
            nextQueue.set(
              `${child.resource_id}_${child.inode_path.path}`,
              child.inode_path.path,
            );
          }
        });

        if (stillPending || dirId === 'root') {
          nextQueue.set(dirId, path);
        }

        setIndexationStatuses(children); // update store once per dir
      }

      queueRef.current = nextQueue;
    }, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [
    currKnowledgeBase?.knowledge_base_id,
    getKnowledgeBaseChildren,
    setIndexationStatuses,
  ]);
};

export { useKnowledgeBaseStatusPollerEffect };
