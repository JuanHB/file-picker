import { CreateKnowledgeBaseButton } from './CreateKnowlegeBaseButton';
import { ToggleSelectionButton } from './ToggleSelectionButton';

const Toolbar = () => {
  return (
    <div className="h-16 border-y bg-background mb-4">
      <div className="flex h-full items-center justify-between px-4">
        <ToggleSelectionButton />
        <CreateKnowledgeBaseButton />
      </div>
    </div>
  );
};

export { Toolbar };
