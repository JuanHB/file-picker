'use client';

import { useMutation } from '@tanstack/react-query';

type AuthResponse = {
  access_token: string;
};

export const useAuth = () => {
  return useMutation<AuthResponse, Error, void>({
    mutationKey: ['auth'],
    mutationFn: async () => {
      // The auth endpoint is completed by the `api/auth/route.ts` file.
      // This is a workaround to avoid CORS issues while in development.
      const res = await fetch('/api/auth', {
        method: 'POST',
      });
      return await res.json();
    },
  });
};
