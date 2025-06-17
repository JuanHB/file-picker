'use client';

import { useKnowledgeBaseStatusPollerEffect } from '@/hooks';

const KnowledgeBasePollingProviders = () => {
  // Registers the polling mechanism for the knowledge indexation status
  useKnowledgeBaseStatusPollerEffect();
  
  return null;
};

export { KnowledgeBasePollingProviders };
