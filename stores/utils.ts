import type { ResourceData } from '@/types/api/resources';

// Collects resource and all of its children
const collectResource = (res: ResourceData): Map<string, ResourceData> => {
  const descendantMap = new Map<string, ResourceData>();
  descendantMap.set(res.resource_id, res);

  if (res.children?.length) {
    res.children.forEach((child) => {
      const childMap = collectResource(child);
      childMap.forEach((value, key) => {
        descendantMap.set(key, value);
      });
    });
  }

  return descendantMap;
};

// Finds all ancestor directory ids of a target resource id
const findAncestorResourceIds = (
  targetId: string,
  nodes: ResourceData[],
): string[] | null => {
  for (const node of nodes) {
    if (node.resource_id === targetId) {
      return [];
    }
    if (node.children?.length) {
      const result = findAncestorResourceIds(targetId, node.children);
      if (result !== null) {
        return [node.resource_id, ...result];
      }
    }
  }
  return null;
};

// Returns a de-duplicated list of selected resource ids:
//  – If a folder is selected, none of its descendants (folder or file) will appear.
//  – Files are included only when none of their ancestor folders are selected.
const getProcessableResourceIds = (
  selectedIds: Map<string, ResourceData>,
  resources: ResourceData[],
): string[] => {
  const idsArray = Array.from(selectedIds.keys());

  return idsArray.filter((id) => {
    const ancestors = findAncestorResourceIds(id, resources);
    // If not found in tree, keep it just in case.
    if (ancestors === null) return true;

    // ancestors array does not include the id itself.
    return ancestors.every((ancestorId) => !selectedIds.has(ancestorId));
  });
};

export { collectResource, findAncestorResourceIds, getProcessableResourceIds };
