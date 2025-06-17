import { Button } from '@/components/ui/button';
import { SquareCheckBigIcon, XIcon } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { useExplorererStore } from '@/stores';

const ToggleSelectionButton = () => {
  const { hasSelected, selectAll, deselectAll } = useExplorererStore(
    useShallow((state) => ({
      hasSelected: !!state.selectedResources.size,
      selectAll: state.selectAll,
      deselectAll: state.deselectAll,
    })),
  );

  return (
    <Button onClick={hasSelected ? deselectAll : selectAll} variant="secondary">
      {hasSelected ? <XIcon /> : <SquareCheckBigIcon />}
      <span>{hasSelected ? 'Deselect All' : 'Select All'}</span>
    </Button>
  );
};

export { ToggleSelectionButton };
