'use client';

import { Button } from '@/components/ui';
import { deleteCookie } from 'cookies-next';
import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      onClick={() => {
        deleteCookie('token');
        router.push('/');
      }}
    >
      <LogOutIcon />
      <span>Logout</span>
    </Button>
  );
};

export { LogoutButton };
