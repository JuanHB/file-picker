import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { useExplorererStore } from '@/stores';
import type { ConnectionResponseDTO } from '@/types';
import { ConnectionItem } from './ConnectionItem';

type AppSidebarProps = {
  isLoading: boolean;
  connections?: ConnectionResponseDTO[];
};

const AppSidebar = ({ isLoading, connections }: AppSidebarProps) => {
  const { setConnection } = useExplorererStore();

  const handleConnectionClick = (connection: ConnectionResponseDTO) => {
    setConnection(connection);
  };

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <h2 className="text-lg font-semibold px-2">File Indexer</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Connected Storages</SidebarGroupLabel>
          <SidebarMenu>
            {isLoading ? (
              <Skeleton className="h-[32px] w-full rounded-md p-2" />
            ) : (
              <>
                {connections?.map((connection) => (
                  <ConnectionItem
                    key={connection.connection_id}
                    connection={connection}
                    onClick={handleConnectionClick}
                  />
                ))}
              </>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export { AppSidebar };
