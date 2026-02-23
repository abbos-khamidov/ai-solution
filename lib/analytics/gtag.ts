type EventParams = Record<string, unknown>;

type GtagFn = (command: 'event', eventName: string, params?: EventParams) => void;

function getGtag(): GtagFn | null {
  if (typeof window === 'undefined') return null;
  const maybeGtag = (window as Window & { gtag?: GtagFn }).gtag;
  return typeof maybeGtag === 'function' ? maybeGtag : null;
}

export function track(eventName: string, params?: EventParams) {
  const gtag = getGtag();
  if (!gtag) return;
  gtag('event', eventName, params);
}
