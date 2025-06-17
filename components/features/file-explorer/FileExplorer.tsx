'use client';

import { useResourcesChildren } from '@/hooks/api';
import { useExplorererStore } from '@/stores';
import { ResourceItem } from './ResourceItem';
import { useEffect } from 'react';
import type { ResourceData, ResourceDTO } from '@/types/api/resources';
import { useFetchResourceChildren } from '@/hooks/api';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useShallow } from 'zustand/react/shallow';

const FileExplorer = () => {
  const {
    connection,
    resources,
    expandedDirectories,
    selectedResources,
    setSelectedResourceIds,
    setResources,
    toggleExpandedDirectory,
  } = useExplorererStore(
    useShallow((state) => ({
      connection: state.connection,
      resources: state.resources,
      expandedDirectories: state.expandedDirectories,
      selectedResources: state.selectedResources,
      setResources: state.setResources,
      setSelectedResourceIds: state.setSelectedResourceIds,
      toggleExpandedDirectory: state.toggleExpandedDirectory,
    })),
  );

  const fetchChildren = useFetchResourceChildren();

  // Initial fetch for top-level resources (children of root)
  const { data: initialResourcesResponse, isLoading } = useResourcesChildren(
    connection?.connection_id,
  );

  // Populate store with root resources once on mount / connection change
  useEffect(() => {
    if (initialResourcesResponse) {
      setResources(
        initialResourcesResponse.data.map((resource: ResourceDTO) => ({
          ...resource,
          children: [],
        })),
      );
    }
  }, [initialResourcesResponse, setResources]);

  const handleResourceClick = async (resource: ResourceData) => {
    const { resource_id, inode_type, inode_path } = resource;

    // Only directories have children to fetch
    if (inode_type !== 'directory') return;

    // Toggle open / close UI state first
    toggleExpandedDirectory(resource_id, `/${inode_path.path}`);

    // Already have children? skip network round-trip
    if (resource.children?.length) return;

    // Fetch children and update store
    fetchChildren(resource_id);
  };

  const handleCheckedChange = (resource: ResourceData, checked: boolean) => {
    setSelectedResourceIds({ resource, checked });
  };

  const renderResourceItem = (resource: ResourceData, depth: number) => {
    const isExpanded = expandedDirectories.has(resource.resource_id);
    const isChecked = selectedResources.has(resource.resource_id);

    return (
      <React.Fragment key={resource.resource_id}>
        <ResourceItem
          depth={depth}
          resource={resource}
          isExpanded={isExpanded}
          isChecked={isChecked}
          onResourceClick={handleResourceClick}
          onResourceCheckedChange={handleCheckedChange}
        />
        {/* Render children if directory is expanded */}
        {resource.inode_type === 'directory' && isExpanded && (
          <div>
            {resource.children?.length ? (
              resource.children.map((child: ResourceData) =>
                renderResourceItem(child, depth + 1),
              )
            ) : (
              <div
                className="flex flex-col"
                style={{ paddingLeft: `${12 + depth * 24}px` }}
              >
                <Skeleton className={`h-[48px] w-full rounded-md`} />
              </div>
            )}
          </div>
        )}
      </React.Fragment>
    );
  };

  return !connection || isLoading ? (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Skeleton className="h-[48px] w-full rounded-md" />
      <Skeleton className="h-[48px] w-full rounded-md" />
      <Skeleton className="h-[48px] w-full rounded-md" />
      <Skeleton className="h-[48px] w-full rounded-md" />
      <Skeleton className="h-[48px] w-full rounded-md" />
    </div>
  ) : (
    <div>{resources?.map((resource) => renderResourceItem(resource, 0))}</div>
  );
};

export { FileExplorer };
