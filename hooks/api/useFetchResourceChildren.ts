import { fetcher } from '@/hooks/api/fetcher';
import { useExplorererStore } from '@/stores';
import { ResourcesChildrenResponseDTO } from '@/types/api/resources';
import { useQueryClient } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';

const useFetchResourceChildren = () => {
  const { connectionId, setResourceChildren } = useExplorererStore(
    useShallow((state) => ({
      connectionId: state.connection?.connection_id,
      setResourceChildren: state.setResourceChildren,
    })),
  );

  const queryClient = useQueryClient();

  const fetchChildren = async (resourceId: string) => {
    const response = await queryClient.fetchQuery<
      ResourcesChildrenResponseDTO,
      Error
    >({
      queryKey: ['resources-children', connectionId, resourceId],
      queryFn: async () =>
        await fetcher(
          `/connections/${connectionId}/resources/children?resource_id=${resourceId}`,
        ),
    });

    // Map children so they also carry empty children arrays (so UI can nest further)
    const childrenWithPlaceholder = response.data.map((child) => ({
      ...child,
      children: [],
    }));

    // Update the store with the new children data
    setResourceChildren({
      resourceId,
      children: childrenWithPlaceholder,
    });
  };

  return fetchChildren;
};

export { useFetchResourceChildren };
