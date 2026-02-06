import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'Terms of Service | CS2 Practice',
  description: 'Terms of Service for CS2 Practice - Free Online FPS Aim Trainer',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

          <div className="prose prose-invert prose-gray max-w-none space-y-6">
            <p className="text-gray-400">Last updated: February 2025</p>

            <section>
              <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-300">
                By accessing and using CS2 Practice (&quot;the Service&quot;), you agree to be bound by these Terms of Service.
                If you do not agree to these terms, please do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
              <p className="text-gray-300">
                CS2 Practice is a free online aim training tool designed for FPS gamers.
                The Service provides aim training exercises, sensitivity conversion tools, and related resources.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Use of Service</h2>
              <p className="text-gray-300">You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
              <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                <li>Use the Service in any way that violates applicable laws</li>
                <li>Attempt to interfere with the proper functioning of the Service</li>
                <li>Use automated systems to access the Service without permission</li>
                <li>Reverse engineer or attempt to extract source code from the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Intellectual Property</h2>
              <p className="text-gray-300">
                The Service and its original content, features, and functionality are owned by CS2 Practice
                and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Disclaimer</h2>
              <p className="text-gray-300">
                The Service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee that the Service
                will be uninterrupted, secure, or error-free. Your use of the Service is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Limitation of Liability</h2>
              <p className="text-gray-300">
                CS2 Practice shall not be liable for any indirect, incidental, special, consequential, or punitive damages
                resulting from your use of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Third-Party Links</h2>
              <p className="text-gray-300">
                The Service may contain links to third-party websites. We are not responsible for the content
                or practices of any linked websites.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Changes to Terms</h2>
              <p className="text-gray-300">
                We reserve the right to modify these Terms at any time. Continued use of the Service after
                changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Contact</h2>
              <p className="text-gray-300">
                If you have any questions about these Terms, please contact us through our feedback form.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <Link href="/" className="text-blue-400 hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
