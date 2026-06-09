'use client';

import { useEffect, useRef, useState } from 'react';

type AdsterraAdSlotProps = {
  className?: string;
  format?: 'native' | 'banner';
};

const nativeSrc = process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_SRC;
const nativeContainerId = process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_CONTAINER_ID;
const desktopBannerSrc = process.env.NEXT_PUBLIC_ADSTERRA_DESKTOP_BANNER_SRC
  || process.env.NEXT_PUBLIC_ADSTERRA_BANNER_SRC;
const desktopBannerKey = process.env.NEXT_PUBLIC_ADSTERRA_DESKTOP_BANNER_KEY
  || process.env.NEXT_PUBLIC_ADSTERRA_BANNER_KEY;
const mobileBannerSrc = process.env.NEXT_PUBLIC_ADSTERRA_MOBILE_BANNER_SRC;
const mobileBannerKey = process.env.NEXT_PUBLIC_ADSTERRA_MOBILE_BANNER_KEY;

function normalizeScriptSrc(src: string) {
  return src.startsWith('//') ? `https:${src}` : src;
}

function getBannerConfig(isMobile: boolean) {
  if (isMobile && mobileBannerSrc && mobileBannerKey) {
    return {
      src: mobileBannerSrc,
      key: mobileBannerKey,
      width: 320,
      height: 50,
    };
  }

  if (desktopBannerSrc && desktopBannerKey) {
    return {
      src: desktopBannerSrc,
      key: desktopBannerKey,
      width: 728,
      height: 90,
    };
  }

  return null;
}

function hasConfig(format: 'native' | 'banner') {
  if (format === 'native') {
    return Boolean(nativeSrc && nativeContainerId);
  }

  return Boolean((desktopBannerSrc && desktopBannerKey) || (mobileBannerSrc && mobileBannerKey));
}

export default function AdsterraAdSlot({
  className = '',
  format = 'banner',
}: AdsterraAdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 640px)');
    const updateViewport = () => {
      setIsMobile(media.matches);
      setIsMounted(true);
    };

    updateViewport();
    media.addEventListener('change', updateViewport);

    return () => {
      media.removeEventListener('change', updateViewport);
    };
  }, []);

  useEffect(() => {
    const root = containerRef.current;
    if (!root || !isMounted || !hasConfig(format)) {
      return;
    }

    root.innerHTML = '';

    if (format === 'native' && nativeSrc && nativeContainerId) {
      const nativeContainer = document.createElement('div');
      nativeContainer.id = nativeContainerId;
      root.appendChild(nativeContainer);

      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = normalizeScriptSrc(nativeSrc);
      root.appendChild(script);

      return;
    }

    const banner = getBannerConfig(isMobile);
    if (format === 'banner' && banner) {
      const optionsScript = document.createElement('script');
      optionsScript.type = 'text/javascript';
      optionsScript.text = `window.atOptions = ${JSON.stringify({
        key: banner.key,
        format: 'iframe',
        height: banner.height,
        width: banner.width,
        params: {},
      })};`;
      root.appendChild(optionsScript);

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = normalizeScriptSrc(banner.src);
      root.appendChild(script);
    }
  }, [format, isMobile, isMounted]);

  if (!hasConfig(format)) {
    return null;
  }

  const minHeight = format === 'banner' && isMounted && isMobile && mobileBannerKey ? 50 : 90;

  return (
    <aside
      className={`mx-auto my-10 w-full max-w-5xl rounded-xl border border-gray-800 bg-gray-900/40 px-4 py-3 ${className}`}
      aria-label="Advertisement"
    >
      <div className="mb-2 text-center text-[11px] uppercase tracking-wide text-gray-600">
        Advertisement
      </div>
      <div
        className="flex items-center justify-center overflow-hidden"
        ref={containerRef}
        style={{ minHeight }}
      />
    </aside>
  );
}
