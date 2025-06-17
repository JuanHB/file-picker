type ResourceDTO = {
  inode_path: { path: string };
  inode_type: 'directory' | 'file';
  resource_id: string;
  knowledge_base_id: string;
};

type ResourcesChildrenResponseDTO = {
  data: ResourceDTO[];
  current_cursor: string;
  next_cursor: string;
};

type ResourceData = ResourceDTO & {
  children?: ResourceData[];
};

export type { ResourceData, ResourceDTO, ResourcesChildrenResponseDTO };
