import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from './fetcher';
import { useExplorererStore } from '@/stores';
import { useShallow } from 'zustand/react/shallow';
import {
  KnowledgeBaseChildrenResponseDTO,
  KnowledgeBaseResponseDTO,
} from '@/types';

const useKnowledgeBase = () => {
  const queryClient = useQueryClient();

  const { getProcessableResourceIds, connectionId, orgId } = useExplorererStore(
    useShallow((state) => ({
      getProcessableResourceIds: state.getProcessableResourceIds,
      connectionId: state.connection?.connection_id,
      orgId: state.connection?.org_id,
    })),
  );

  const { mutateAsync: createKnowledgeBase, data: knowledgeBase } = useMutation<
    KnowledgeBaseResponseDTO,
    Error
  >({
    mutationFn: async () =>
      await fetcher('/knowledge_bases', {
        method: 'POST',
        body: JSON.stringify({
          connection_id: connectionId,
          connection_source_ids: getProcessableResourceIds(),
          name: 'Test Knowledge Base',
          description: 'This is a test knowledge base',
          indexing_params: {
            ocr: false,
            unstructured: true,
            embedding_params: {
              embedding_model: 'text-embedding-ada-002',
              api_key: null,
            },
            chunker_params: {
              chunk_size: 1500,
              chunk_overlap: 500,
              chunker: 'sentence',
            },
          },
          org_level_role: null,
          cron_job_id: null,
        }),
      }),
  });

  const triggerKnowledgeBaseSync = async (knowledgeBaseId: string) =>
    await queryClient.fetchQuery<KnowledgeBaseResponseDTO, Error>({
      queryKey: ['knowledge-base', connectionId, knowledgeBaseId],
      queryFn: async () =>
        await fetcher(
          `/knowledge_bases/sync/trigger/${knowledgeBaseId}/${orgId}`,
        ),
    });

  const getKnowledgeBaseChildren = async (
    knowledgeBaseId: string,
    resourcePath: string = '/',
  ) => {
    const queryParams = new URLSearchParams({ resource_path: resourcePath });

    return await queryClient.fetchQuery<
      KnowledgeBaseChildrenResponseDTO,
      Error
    >({
      queryKey: [
        'knowledge-base-children',
        connectionId,
        knowledgeBaseId,
        resourcePath,
      ],
      queryFn: () =>
        fetcher(
          `/knowledge_bases/${knowledgeBaseId}/resources/children?${queryParams.toString()}`,
        ),
    });
  };

  const { mutateAsync: deleteResource } = useMutation<
    KnowledgeBaseResponseDTO,
    Error,
    { knowledgeBaseId: string; resourcePath: string }
  >({
    mutationFn: async ({ knowledgeBaseId, resourcePath }) => {
      const queryParams = new URLSearchParams({ resource_path: resourcePath });

      return await fetcher(
        `/knowledge_bases/${knowledgeBaseId}/resources?${queryParams.toString()}`,
        {
          method: 'DELETE',
        },
      );
    },
  });

  return {
    knowledgeBase,
    deleteResource,
    createKnowledgeBase,
    getKnowledgeBaseChildren,
    triggerKnowledgeBaseSync,
  };
};

export { useKnowledgeBase };
