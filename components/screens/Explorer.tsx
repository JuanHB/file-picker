'use client';

import { AppSidebar, FileExplorer, Toolbar } from '@/components/features';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useConnections } from '@/hooks';
import { useExplorererStore } from '@/stores';
import { useEffect } from 'react';

const Explorer = () => {
  const { data: connections, isLoading } = useConnections();
  const { setConnection } = useExplorererStore();

  // Sets the first connection as the default connection on mount
  useEffect(() => {
    if (connections && connections.length > 0) {
      setConnection(connections[0]);
    }
  }, [connections, setConnection]);

  return (
    <SidebarProvider>
      <AppSidebar isLoading={isLoading} connections={connections} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-lg font-semibold">Cloud File Explorer</h1>
          </div>
        </header>
        <Toolbar />
        <FileExplorer />
      </SidebarInset>
    </SidebarProvider>
  );
};

export { Explorer };
