'use client';

import { useEffect } from 'react';
import { useKnowledgeBase } from './api/useKnowledgeBase';
import { useKnowledgeBaseStore } from '@/stores';
import { useShallow } from 'zustand/react/shallow';

const useKnowledgeBaseCreationEffect = () => {
  const { knowledgeBase, triggerKnowledgeBaseSync } = useKnowledgeBase();

  const { setCurrKnowledgeBase } = useKnowledgeBaseStore(
    useShallow((state) => ({
      
      setCurrKnowledgeBase: state.setCurrKnowledgeBase,
      setOptimisticIndexationStatuses: state.setOptimisticIndexationStatuses,
    })),
  );

  useEffect(() => {
    console.log('knowledgeBase use effect is called');

    if (knowledgeBase) {
      triggerKnowledgeBaseSync(knowledgeBase.knowledge_base_id);

      setCurrKnowledgeBase(knowledgeBase);
    }
  }, [knowledgeBase, triggerKnowledgeBaseSync, setCurrKnowledgeBase]);
};

export { useKnowledgeBaseCreationEffect };
