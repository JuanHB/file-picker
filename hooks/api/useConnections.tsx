import { useQuery } from '@tanstack/react-query';
import { fetcher } from './fetcher';
import type { ConnectionResponseDTO } from '@/types';

const useConnections = () => {
  return useQuery<ConnectionResponseDTO[], Error>({
    queryKey: ['connection'],
    queryFn: async () => await fetcher('/connections'),
  });
};

export { useConnections };
