type CreateKnowledgeBaseRequestDTO = {
  connection_id: string;
  connection_source_ids: string[];
};

type KnowledgeBaseResponseDTO = {
  knowledge_base_id: string;
  created_at: string;
  name: string;
  connection_source_ids: string[];
};

type KnowledgeBaseChildrenDTO = {
  resource_id: string;
  inode_type: 'directory' | 'file';
  status: 'pending' | 'indexed' | 'error';
  inode_path: {
    path: string;
  };
};

type KnowledgeBaseChildrenResponseDTO = {
  data: KnowledgeBaseChildrenDTO[];
};

export type {
  CreateKnowledgeBaseRequestDTO,
  KnowledgeBaseResponseDTO,
  KnowledgeBaseChildrenDTO,
  KnowledgeBaseChildrenResponseDTO,
};
