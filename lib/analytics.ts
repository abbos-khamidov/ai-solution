/**
 * Simple analytics tracker for key user interactions
 * Can be extended to use Google Analytics, Plausible, or other providers
 */

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

/**
 * Track an event. Currently logs to console in development.
 * In production, this can send to your analytics provider.
 */
export function trackEvent({ category, action, label, value }: AnalyticsEvent): void {
  // Development logging
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', { category, action, label, value });
  }

  // Google Analytics (gtag.js) - if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  // Plausible Analytics - if available
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(action, {
      props: { category, label, value },
    });
  }
}

// Convenience functions for common events
export const analytics = {
  ctaClick: (label: string) => {
    trackEvent({
      category: 'CTA',
      action: 'click',
      label,
    });
  },

  formSubmit: (formName: string) => {
    trackEvent({
      category: 'Form',
      action: 'submit',
      label: formName,
    });
  },

  formSuccess: (formName: string) => {
    trackEvent({
      category: 'Form',
      action: 'success',
      label: formName,
    });
  },

  formError: (formName: string, error?: string) => {
    trackEvent({
      category: 'Form',
      action: 'error',
      label: `${formName}${error ? `: ${error}` : ''}`,
    });
  },

  linkClick: (label: string) => {
    trackEvent({
      category: 'Link',
      action: 'click',
      label,
    });
  },
};
