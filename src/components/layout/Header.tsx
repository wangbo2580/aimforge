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
    { href: '/stats', labelKey: 'nav_stats' as const },
    { href: '/settings', labelKey: 'nav_settings' as const },
  ];

  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CS</span>
            </div>
            <span className="text-xl font-bold text-white">CS2 Practice</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {t(item.labelKey)}
                </Link>
              );
            })}
            <div className="ml-2">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
