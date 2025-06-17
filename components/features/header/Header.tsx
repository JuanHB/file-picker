'use client';

// import { ThemeToggler } from '@/components/ui';
import { useReactiveGetCookie } from 'cookies-next';
import { LogoutButton } from './LogoutButton';

const Header = () => {
  const getCookie = useReactiveGetCookie();

  const token = getCookie('token');

  return (
    <div className={'flex justify-end gap-2'}>
      {/* <ThemeToggler /> */}
      {token ? <LogoutButton /> : null}
    </div>
  );
};

export { Header };
