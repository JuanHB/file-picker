import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui';
import { useKnowledgeBase } from '@/hooks/api/useKnowledgeBase';
import { useKnowledgeBaseStore } from '@/stores/useKnowledgeBaseStore';
import { ResourceData } from '@/types';
import { Trash2Icon } from 'lucide-react';

type RemoveResourceButtonProps = {
  resource: ResourceData;
};

const RemoveResourceButton = ({ resource }: RemoveResourceButtonProps) => {
  const { deleteResource } = useKnowledgeBase();

  const knowledgeBaseId = useKnowledgeBaseStore(
    (state) => state.currKnowledgeBase?.knowledge_base_id,
  );

  const handleClick = async () => {
    if (!knowledgeBaseId) {
      return;
    }

    await deleteResource({
      knowledgeBaseId,
      resourcePath: resource.inode_path.path,
    });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" onClick={handleClick}>
          <Trash2Icon className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Delete Resource</p>
      </TooltipContent>
    </Tooltip>
  );
};

export { RemoveResourceButton };
