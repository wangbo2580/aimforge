import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'Privacy Policy | CS2 Practice',
  description: 'Privacy Policy for CS2 Practice - Free Online FPS Aim Trainer',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

          <div className="prose prose-invert prose-gray max-w-none space-y-6">
            <p className="text-gray-400">Last updated: February 2025</p>

            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-gray-300">
                CS2 Practice (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy. This Privacy Policy explains
                how we collect, use, and protect your information when you use our Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>

              <h3 className="text-lg font-medium mt-4 mb-2">2.1 Local Storage Data</h3>
              <p className="text-gray-300">
                Your training data, settings, and preferences are stored locally in your browser using localStorage.
                This data never leaves your device and is not transmitted to our servers.
              </p>

              <h3 className="text-lg font-medium mt-4 mb-2">2.2 Analytics Data</h3>
              <p className="text-gray-300">
                We use Google Analytics to collect anonymous usage data, including:
              </p>
              <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                <li>Pages visited and time spent</li>
                <li>Device type and browser</li>
                <li>General geographic location (country/city level)</li>
                <li>Referral sources</li>
              </ul>
              <p className="text-gray-300 mt-2">
                This data is anonymized and used solely to improve the Service.
              </p>

              <h3 className="text-lg font-medium mt-4 mb-2">2.3 Feedback Data</h3>
              <p className="text-gray-300">
                If you submit feedback, we may collect the message content and optionally your email address
                if you choose to provide it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
              <p className="text-gray-300">We use the collected information to:</p>
              <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                <li>Provide and maintain the Service</li>
                <li>Understand how users interact with the Service</li>
                <li>Improve and optimize the user experience</li>
                <li>Respond to user feedback and inquiries</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Data Storage and Security</h2>
              <p className="text-gray-300">
                Your training data is stored locally on your device. We do not have access to this data.
                Analytics data is processed by Google Analytics in accordance with their privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Cookies</h2>
              <p className="text-gray-300">
                We use cookies for analytics purposes (Google Analytics). You can disable cookies in your
                browser settings, though this may affect some functionality.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Third-Party Services</h2>
              <p className="text-gray-300">We use the following third-party services:</p>
              <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                <li><strong>Google Analytics</strong> - for usage analytics</li>
                <li><strong>Vercel/Cloudflare</strong> - for hosting</li>
              </ul>
              <p className="text-gray-300 mt-2">
                Each service has its own privacy policy governing the use of your data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Children&apos;s Privacy</h2>
              <p className="text-gray-300">
                The Service is not directed to children under 13. We do not knowingly collect
                personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Your Rights</h2>
              <p className="text-gray-300">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                <li>Clear your local training data at any time via Settings</li>
                <li>Disable analytics tracking via browser settings</li>
                <li>Request deletion of any feedback you&apos;ve submitted</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Changes to This Policy</h2>
              <p className="text-gray-300">
                We may update this Privacy Policy from time to time. We will notify users of significant
                changes by updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Contact Us</h2>
              <p className="text-gray-300">
                If you have questions about this Privacy Policy, please contact us through our feedback form.
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
