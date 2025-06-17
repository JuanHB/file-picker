import { useKnowledgeBase } from '@/hooks/api/useKnowledgeBase';
import { Button } from '@/components/ui/button';
import { useExplorererStore } from '@/stores/useExplorerStore';
import { HardDriveUploadIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';
import { useKnowledgeBaseStore } from '@/stores/useKnowledgeBaseStore';

const CreateKnowledgeBaseButton = () => {
  const { isIndexingEnabled, selectedResources, deselectAll } = useExplorererStore(
    useShallow((state) => ({
      isIndexingEnabled: state.selectedResources.size > 0,
      selectedResources: state.selectedResources,
      deselectAll: state.deselectAll,
    })),
  );

  const { setCurrKnowledgeBase, setOptimisticIndexationStatuses } =
    useKnowledgeBaseStore(
      useShallow((state) => ({
        setCurrKnowledgeBase: state.setCurrKnowledgeBase,
        setOptimisticIndexationStatuses: state.setOptimisticIndexationStatuses,
      })),
    );

  const { createKnowledgeBase, triggerKnowledgeBaseSync } = useKnowledgeBase();

  const handleClick = async () => {
    try {
      toast.info('Creating knowledge base...');

      // Optimistically set the indexation statuses for the selected resources, but only for the files.
      const optimisticIndexationStatuses = new Map<string, string>();
      
      for (const [resourceId, resource] of selectedResources.entries()) {
        if (resource.inode_type === 'file') {
          optimisticIndexationStatuses.set(resourceId, 'pending');
        }
      }

      setOptimisticIndexationStatuses(optimisticIndexationStatuses);

      // Create the knowledge base using the API
      const knowledgeBase = await createKnowledgeBase();

      deselectAll();

      toast.success('Knowledge Base created, requesting indexing...');

      await triggerKnowledgeBaseSync(knowledgeBase.knowledge_base_id);

      toast.success('Indexed successfully requested...');

      setCurrKnowledgeBase(knowledgeBase);

      deselectAll();
    } catch (error) {
      toast.error('Failed to create knowledge base, please try again.');

      // Remove the optimistic indexation statuses if the creation fails
      setOptimisticIndexationStatuses(new Map());

      console.error(error);
    }
  };

  return (
    <Button disabled={!isIndexingEnabled} onClick={handleClick}>
      <HardDriveUploadIcon className="w-4 h-4" />
      <span>Create Knowledge Base</span>
    </Button>
  );
};

export { CreateKnowledgeBaseButton };
