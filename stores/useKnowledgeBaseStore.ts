import {
  KnowledgeBaseResponseDTO,
  KnowledgeBaseChildrenDTO,
  ResourceData,
} from '@/types';
import { create } from 'zustand';

type KnowledgeBaseStore = {
  currKnowledgeBase: KnowledgeBaseResponseDTO | null;
  indexationStatuses: Map<string, string>; // Map<resourceId, indexationStatus>
  clonedSelectedResources: Map<string, ResourceData>; // Map<resourceId, resource>
  setClonedSelectedResources: (resources: Map<string, ResourceData>) => void;
  setCurrKnowledgeBase: (knowledgeBase: KnowledgeBaseResponseDTO) => void;
  setOptimisticIndexationStatuses: (
    indexationStatuses: Map<string, string>,
  ) => void;
  setIndexationStatuses: (
    knowledgeBaseChildren: KnowledgeBaseChildrenDTO[],
  ) => void;
};

const useKnowledgeBaseStore = create<KnowledgeBaseStore>((set) => ({
  currKnowledgeBase: null,
  indexationStatuses: new Map(),
  clonedSelectedResources: new Map(),
  setClonedSelectedResources: (
    clonedSelectedResources: Map<string, ResourceData>,
  ) => set({ clonedSelectedResources }),
  setCurrKnowledgeBase: (currKnowledgeBase: KnowledgeBaseResponseDTO) =>
    set({ currKnowledgeBase }),
  setOptimisticIndexationStatuses: (indexationStatuses: Map<string, string>) =>
    set({ indexationStatuses }),
  setIndexationStatuses: (knowledgeBaseChildren: KnowledgeBaseChildrenDTO[]) =>
    set((state) => {
      const newMap = new Map(state.indexationStatuses);

      for (const child of knowledgeBaseChildren) {
        if (child.inode_type === 'file') {
          newMap.set(child.resource_id, child.status);
        }
      }

      return { indexationStatuses: newMap };
    }),
}));

export { useKnowledgeBaseStore };
