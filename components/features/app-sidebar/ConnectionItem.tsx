import { SidebarMenuButton } from '@/components/ui/sidebar';

import { SidebarMenuItem } from '@/components/ui/sidebar';
import type { ConnectionResponseDTO } from '@/types';
import { DatabaseIcon } from 'lucide-react';

type SidebarConnectionProps = {
  connection: ConnectionResponseDTO;
  onClick: (connection: ConnectionResponseDTO) => void;
};

const ConnectionItem = ({ connection, onClick }: SidebarConnectionProps) => {
  return (
    <SidebarMenuItem key={connection.connection_id}>
      <SidebarMenuButton
        asChild
        className="cursor-pointer"
        onClick={() => onClick(connection)}
      >
        <div>
          <DatabaseIcon />
          {connection.name}
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export { ConnectionItem };
