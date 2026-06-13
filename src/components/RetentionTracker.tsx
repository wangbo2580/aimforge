'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

const FIRST_VISIT_KEY = 'cs2practice:firstVisitDate';
const LAST_VISIT_KEY = 'cs2practice:lastVisitDate';
const RETURN_NEXT_DAY_KEY = 'cs2practice:returnNextDayTracked';
const RETURN_7_DAY_KEY = 'cs2practice:return7DayTracked';
const SESSION_TRACKED_KEY = 'cs2practice:visitTracked';

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(start: string, end: string) {
  const startDate = new Date(`${start}T00:00:00Z`).getTime();
  const endDate = new Date(`${end}T00:00:00Z`).getTime();
  return Math.floor((endDate - startDate) / 86400000);
}

export default function RetentionTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(SESSION_TRACKED_KEY) === '1') return;

    const today = todayKey();
    const firstVisit = localStorage.getItem(FIRST_VISIT_KEY);
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);

    if (!firstVisit) {
      localStorage.setItem(FIRST_VISIT_KEY, today);
      localStorage.setItem(LAST_VISIT_KEY, today);
      sessionStorage.setItem(SESSION_TRACKED_KEY, '1');
      trackEvent('visit_user_state', {
        visitor_state: 'first_visit',
        days_since_first_visit: 0,
      });
      return;
    }

    const daysSinceFirstVisit = daysBetween(firstVisit, today);
    const isNewDayVisit = lastVisit !== today;

    trackEvent('visit_user_state', {
      visitor_state: isNewDayVisit ? 'returning_new_day' : 'returning_same_day',
      days_since_first_visit: daysSinceFirstVisit,
    });

    if (isNewDayVisit && daysSinceFirstVisit >= 1 && localStorage.getItem(RETURN_NEXT_DAY_KEY) !== '1') {
      trackEvent('return_next_day', {
        days_since_first_visit: daysSinceFirstVisit,
      });
      localStorage.setItem(RETURN_NEXT_DAY_KEY, '1');
    }

    if (isNewDayVisit && daysSinceFirstVisit >= 7 && localStorage.getItem(RETURN_7_DAY_KEY) !== '1') {
      trackEvent('return_7_day', {
        days_since_first_visit: daysSinceFirstVisit,
      });
      localStorage.setItem(RETURN_7_DAY_KEY, '1');
    }

    localStorage.setItem(LAST_VISIT_KEY, today);
    sessionStorage.setItem(SESSION_TRACKED_KEY, '1');
  }, []);

  return null;
}
