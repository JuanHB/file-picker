'use client';

import { Button } from '@/components/ui';
import { useAuth } from '@/hooks/api';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';

const AuthButton = () => {
  const { mutateAsync } = useAuth();

  const router = useRouter();

  const handleAuthClick = async () => {
    const data = await mutateAsync();

    if (data?.access_token) {
      // Set the auth token in the cookie
      setCookie('token', data.access_token);

      router.push('/home');
    }
  };

  return (
    <div
      className={
        'flex flex-wrap items-center gap-2 md:flex-row justify-center h-screen'
      }
    >
      <Button onClick={handleAuthClick}>Authenticate</Button>
    </div>
  );
};

export { AuthButton };
