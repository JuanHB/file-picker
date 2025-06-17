import { useQuery } from '@tanstack/react-query';
import { fetcher } from './fetcher';
import type { ResourcesChildrenResponseDTO } from '@/types/api/resources';

const useResourcesChildren = (connectionId?: string) => {
  return useQuery<ResourcesChildrenResponseDTO, Error>({
    queryKey: ['resources-children', connectionId],
    queryFn: async () =>
      await fetcher(`/connections/${connectionId}/resources/children`),
    enabled: !!connectionId,
  });
};

export { useResourcesChildren };
