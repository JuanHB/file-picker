import { create } from 'zustand';
import type { ConnectionResponseDTO } from '@/types';
import { ResourceData } from '@/types/api/resources';
import {
  collectResource,
  findAncestorResourceIds,
  getProcessableResourceIds,
} from './utils';

type ExplorerStore = {
  connection: ConnectionResponseDTO | null;
  resources: ResourceData[];
  expandedDirectories: Map<string, string>; // Map<resourceId, inodePath>
  selectedResources: Map<string, ResourceData>; // Set<resourceId>
  setConnection: (connection: ConnectionResponseDTO) => void;
  setResources: (resources: ResourceData[]) => void;
  toggleExpandedDirectory: (resourceId: string, inodePath: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
  setResourceChildren: (params: {
    resourceId: string;
    children: ResourceData[];
  }) => void;
  setSelectedResourceIds: (params: {
    resource: ResourceData;
    checked: boolean;
  }) => void;
  getProcessableResourceIds: () => string[];
};

const useExplorererStore = create<ExplorerStore>((set, get) => ({
  connection: null,
  resources: [],
  expandedDirectories: new Map(),
  selectedResources: new Map(),
  toggleExpandedDirectory: (resourceId: string, inodePath: string) =>
    set((state) => {
      const newMap = new Map(state.expandedDirectories);
      if (newMap.has(resourceId)) {
        newMap.delete(resourceId);
      } else {
        newMap.set(resourceId, inodePath);
      }
      return { expandedDirectories: newMap };
    }),
  setConnection: (connection) => set({ connection }),
  setResources: (resources) => set({ resources }),
  setResourceChildren: ({ resourceId, children }) =>
    set((state) => {
      // Recursively update the resource with the new children
      const updateResource = (resource: ResourceData): ResourceData => {
        if (resource.resource_id === resourceId) {
          return { ...resource, children };
        }
        if (resource.children) {
          return {
            ...resource,
            children: resource.children.map(updateResource),
          };
        }
        return resource;
      };

      return {
        resources: state.resources.map(updateResource),
      };
    }),
  setSelectedResourceIds: ({ resource, checked }) =>
    set((state) => {
      const resourcesMapToProcess = collectResource(resource);
      const updatedIdsMap = new Map(state.selectedResources);

      if (checked) {
        // Add resource id(s)
        resourcesMapToProcess.forEach((value, key) =>
          updatedIdsMap.set(key, value),
        );
      } else {
        // Remove resource id(s)
        resourcesMapToProcess.forEach((value, key) =>
          updatedIdsMap.delete(key),
        );

        // Additionally remove ancestors so that parent folder is unselected
        const ancestorIds = findAncestorResourceIds(
          resource.resource_id,
          state.resources,
        );
        if (ancestorIds) {
          ancestorIds.forEach((id) => updatedIdsMap.delete(id));
        }
      }

      return {
        selectedResources: updatedIdsMap,
      };
    }),
  getProcessableResourceIds: () => {
    const { selectedResources, resources } = get();

    return getProcessableResourceIds(selectedResources, resources);
  },
  selectAll: () => {
    const { resources } = get();
    const allResourceIds = new Map<string, ResourceData>();

    resources.forEach((resource) => {
      collectResource(resource).forEach((value, key) =>
        allResourceIds.set(key, value),
      );
    });

    set({ selectedResources: allResourceIds });
  },
  deselectAll: () => set({ selectedResources: new Map() }),
}));

export { useExplorererStore };
