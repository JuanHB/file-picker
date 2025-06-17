import { getCookie } from 'cookies-next';
import { toast } from 'sonner';

// Simple typed wrapper around fetch that prefixes
// Stack-AI API base URL and adds auth token if available
const fetcher = async (endpoint: string, init?: RequestInit) => {
  try {
    const token = getCookie('token');
    const headers = {
      ...init?.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
      'Content-Type': 'application/json',
    };

    const res = await fetch(`https://api.stack-ai.com${endpoint}`, {
      ...init,
      headers,
    });

    const body = await res.json();

    if (!res.ok) {
      const description = body.detail?.[0]?.msg;

      toast.error('Something went wrong with the request. Please try again.', {
        ...(description && { description }),
      });

      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    return body;
  } catch (error) {
    throw error;
  }
};

export { fetcher };
