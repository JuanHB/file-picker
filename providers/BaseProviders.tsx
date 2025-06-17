'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { CookiesNextProvider } from 'cookies-next';
import { ThemeProvider } from './ThemeProvider';

const BaseProviders = ({
  children,
  ...props
}: React.ComponentProps<typeof ThemeProvider>) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <CookiesNextProvider pollingOptions={{ enabled: true, intervalMs: 100 }}>
        <ThemeProvider
          enableSystem
          attribute={'class'}
          defaultTheme={'dark'}
          {...props}
        >
          {children}
        </ThemeProvider>
      </CookiesNextProvider>
    </QueryClientProvider>
  );
};

export { BaseProviders };
