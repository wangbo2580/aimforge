import AdsterraAdSlot from '@/components/ads/AdsterraAdSlot';

export default function CommandsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="px-4 pb-12">
        <AdsterraAdSlot />
      </div>
    </>
  );
}
