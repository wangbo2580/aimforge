'use client';

import TrackedLink from '@/components/ui/TrackedLink';

interface ContentTrainingCTAProps {
  sourcePage: string;
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
}

export default function ContentTrainingCTA({
  sourcePage,
  title,
  description,
  primaryHref = '/play/quick-warmup',
  primaryLabel = 'Start the 90-second warm-up',
}: ContentTrainingCTAProps) {
  return (
    <section className="mt-12 rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-7 text-center">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <p className="mx-auto mt-2 max-w-2xl text-gray-300">{description}</p>
      <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
        <TrackedLink
          href={primaryHref}
          eventName="content_to_training_click"
          eventParams={{ source_page: sourcePage, destination: primaryHref }}
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-500"
        >
          {primaryLabel}
        </TrackedLink>
        <TrackedLink
          href="/play"
          eventName="content_to_training_click"
          eventParams={{ source_page: sourcePage, destination: '/play' }}
          className="rounded-lg bg-gray-800 px-5 py-3 font-semibold text-white transition-colors hover:bg-gray-700"
        >
          Choose a training mode
        </TrackedLink>
      </div>
    </section>
  );
}
