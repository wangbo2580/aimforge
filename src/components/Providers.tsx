'use client';

// 客户端 Provider 包装器

import { ReactNode } from 'react';
import { I18nProvider } from '@/lib/i18n';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      {children}
    </I18nProvider>
  );
}
