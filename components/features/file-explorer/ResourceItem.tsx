import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { useKnowledgeBaseStore } from '@/stores';
import { ResourceData } from '@/types/api/resources';
import { FileIcon, FolderIcon, FolderOpenIcon, Trash2Icon } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { RemoveResourceButton } from './RemoveResourceButton';

type ResourceItemProps = {
  resource: ResourceData;
  depth: number;
  isExpanded: boolean;
  isChecked: boolean;
  onResourceClick: (resource: ResourceData) => void;
  onResourceCheckedChange: (resource: ResourceData, checked: boolean) => void;
};

const IconMap: Record<string, React.ReactNode> = {
  directory: <FolderIcon className="w-4 h-4" />,
  directory_open: <FolderOpenIcon className="w-4 h-4" />,
  file: <FileIcon className="w-4 h-4" />,
};

const ResourceItem = ({
  resource,
  depth,
  isExpanded,
  isChecked,
  onResourceClick,
  onResourceCheckedChange,
}: ResourceItemProps) => {
  const name = resource.inode_path.path.split('/').pop();

  const { indexationStatuses } = useKnowledgeBaseStore(
    useShallow((state) => ({
      indexationStatuses: state.indexationStatuses,
    })),
  );

  return (
    <div
      className={`flex items-center rounded-lg hover:bg-muted/50 transition-colors select-none mb-2 pr-2`}
      style={{ paddingLeft: `${12 + depth * 24}px` }}
    >
      <div className="flex gap-3 py-3">
        <Checkbox
          checked={isChecked}
          onCheckedChange={(checked: boolean) =>
            onResourceCheckedChange(resource, checked)
          }
        />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
      </div>
      <div
        className="flex items-center gap-3 w-full cursor-pointer py-3"
        onClick={() => onResourceClick(resource)}
      >
        <div className="w-4 h-4">
          {IconMap[isExpanded ? 'directory_open' : resource.inode_type]}
        </div>

        <span>{name}</span>

        <span className="text-sm text-muted-foreground">
          {resource.inode_type === 'file' &&
            indexationStatuses.get(resource.resource_id)}
        </span>
      </div>
      {indexationStatuses?.has(resource.resource_id) ? (
        <RemoveResourceButton resource={resource} />
      ) : null}
    </div>
  );
};

export { ResourceItem };
