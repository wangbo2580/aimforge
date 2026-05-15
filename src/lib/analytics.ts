// 统一的 GA4 事件追踪 helper
// 用法: trackEvent('copy_crosshair', { player: 's1mple' })
//
// 所有 conversion 事件应通过这个函数走，便于后续添加额外的统计/打点平台。

type GtagFn = (
  command: 'event' | 'config' | 'js' | 'set',
  eventName: string,
  params?: Record<string, unknown>
) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}

export type TrackEventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(eventName: string, params: TrackEventParams = {}): void {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;

  try {
    window.gtag('event', eventName, params);
  } catch (err) {
    // GA 失败不能影响主逻辑
    console.warn('[analytics] gtag event failed:', err);
  }
}
