import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'Contact | CS2 Practice',
  description: 'Get in touch with CS2 Practice. Report bugs, suggest features, or ask questions about our free online aim trainer.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold mb-8">Contact</h1>

          <div className="prose prose-invert prose-gray max-w-none space-y-8">

            <section>
              <p className="text-gray-300">
                Got a bug report, feature request, or question? Here&apos;s how to reach me.
              </p>
            </section>

            <section className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-4">Email</h2>
              <p className="text-gray-300">
                For general inquiries, business questions, or anything that doesn&apos;t fit the feedback form:
              </p>
              <p className="mt-3">
                <a
                  href="mailto:contact@cs2practice.com"
                  className="text-blue-400 hover:underline text-lg"
                >
                  contact@cs2practice.com
                </a>
              </p>
              <p className="text-gray-500 text-sm mt-2">
                I check email regularly but may take a day or two to respond.
              </p>
            </section>

            <section className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-4">Quick Feedback</h2>
              <p className="text-gray-300">
                The fastest way to report a bug or suggest a feature is the feedback button
                in the bottom-right corner of any page. It goes straight to my inbox.
              </p>
              <p className="text-gray-300 mt-3">
                No email required, though leaving one helps if I need to follow up.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">What I can help with</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Bug reports &mdash; something broken or not working as expected</li>
                <li>Feature requests &mdash; training modes, tools, or content you&apos;d like to see</li>
                <li>Outdated pro settings &mdash; if a player changed their config and I haven&apos;t updated it</li>
                <li>Missing crosshair codes &mdash; if your favorite pro&apos;s crosshair isn&apos;t listed</li>
                <li>Sensitivity converter issues &mdash; wrong conversion values or missing games</li>
                <li>General questions about the site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Response time</h2>
              <p className="text-gray-300">
                This is a one-person project, so I don&apos;t have a support team.
                I typically respond within 1&ndash;2 business days. Bug reports that affect usability
                get priority.
              </p>
            </section>

          </div>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <Link href="/" className="text-blue-400 hover:underline">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
