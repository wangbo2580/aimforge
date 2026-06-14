'use client';

// 页面头部导航

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/lib/i18n';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const navItems = [
    { href: '/', labelKey: 'nav_home' as const },
    { href: '/play', labelKey: 'nav_play' as const },
    { href: '/pro', labelKey: 'nav_pro' as const },
    { href: '/commands', labelKey: 'nav_commands' as const },
    { href: '/stats', labelKey: 'nav_stats' as const },
    { href: '/settings', labelKey: 'nav_settings' as const },
  ];

  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-3 py-3 md:h-16 md:flex-row md:items-center md:justify-between md:py-0">
          {/* Logo */}
          <div className="flex items-center justify-between gap-3">
            <Link href="/" className="flex min-w-0 items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600">
                <span className="text-sm font-bold text-white">CS</span>
              </div>
              <span className="truncate text-xl font-bold text-white">CS2 Practice</span>
            </Link>
            <div className="md:hidden">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Navigation */}
          <nav className="-mx-1 flex items-center gap-1 overflow-x-auto pb-1 md:mx-0 md:overflow-visible md:pb-0">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors md:px-4 ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {t(item.labelKey)}
                </Link>
              );
            })}
            <div className="ml-2 hidden md:block">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
