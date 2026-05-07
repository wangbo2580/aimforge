// Metadata is defined in page.tsx so that page-level SEO stays consistent.
// Layout only wraps children — keep it lean to avoid Next.js merging stale fields.

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
