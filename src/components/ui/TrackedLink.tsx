'use client';

import Link from 'next/link';
import { ComponentProps, MouseEvent } from 'react';
import { trackEvent, TrackEventParams } from '@/lib/analytics';

interface TrackedLinkProps extends ComponentProps<typeof Link> {
  eventName: string;
  eventParams?: TrackEventParams;
}

export default function TrackedLink({
  eventName,
  eventParams,
  onClick,
  ...props
}: TrackedLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(eventName, eventParams);
    onClick?.(event);
  };

  return <Link {...props} onClick={handleClick} />;
}
