// Theme provider was causing a hydration error with NextJS 15.*
// The proposed solution was to use a dynamic import.
// https://github.com/shadcn-ui/ui/issues/5552#issuecomment-2435053678
'use client';

import { type ThemeProviderProps } from 'next-themes';
import dynamic from 'next/dynamic';

const NextThemesProvider = dynamic(
  () => import('next-themes').then((e) => e.ThemeProvider),
  {
    ssr: false,
  },
);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}


