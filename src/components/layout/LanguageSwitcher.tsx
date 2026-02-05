'use client';

// 语言切换组件

import { useLocale } from '@/lib/i18n';
import { Locale } from '@/lib/i18n/translations';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'zh' : 'en');
  };

  return (
    <button
      onClick={toggleLocale}
      className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
      title={locale === 'en' ? '切换到中文' : 'Switch to English'}
    >
      {locale === 'en' ? '中文' : 'EN'}
    </button>
  );
}

export function LanguageSelector() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex gap-1">
      {(['en', 'zh'] as Locale[]).map((lang) => (
        <button
          key={lang}
          onClick={() => setLocale(lang)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            locale === lang
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {lang === 'en' ? 'English' : '中文'}
        </button>
      ))}
    </div>
  );
}
