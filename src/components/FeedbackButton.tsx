'use client';

import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { trackEvent } from '@/lib/analytics';
import {
  buildFeedbackContext,
  FeedbackCategory,
  submitFeedback,
} from '@/lib/feedback';

export default function FeedbackButton() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<FeedbackCategory>('missing_feature');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const categories: { value: FeedbackCategory; label: string }[] = [
    { value: 'bug', label: t('feedback_category_bug') },
    { value: 'aim_feels_off', label: t('feedback_category_aim') },
    { value: 'lag_or_controls', label: t('feedback_category_lag') },
    { value: 'missing_feature', label: t('feedback_category_feature') },
    { value: 'stats_confusing', label: t('feedback_category_stats') },
    { value: 'data_issue', label: t('feedback_category_data') },
    { value: 'other', label: t('feedback_category_other') },
  ];

  const openFeedback = () => {
    setIsOpen(true);
    setStatus('idle');
    trackEvent('feedback_open', {
      source: 'floating_button',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus('sending');

    try {
      const success = await submitFeedback({
        category,
        message,
        email: email || undefined,
        context: buildFeedbackContext('floating_button', {
          selectedOption: category,
        }),
      });

      if (success) {
        setStatus('success');
        setMessage('');
        setEmail('');
        setCategory('missing_feature');
        setTimeout(() => {
          setIsOpen(false);
          setStatus('idle');
        }, 2000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={openFeedback}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg transition-all hover:scale-105"
        aria-label={t('feedback_button')}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span className="hidden sm:inline font-medium">{t('feedback_button')}</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{t('feedback_title')}</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">{t('feedback_category')}</label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setCategory(item.value)}
                      className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                        category === item.value
                          ? 'border-blue-500 bg-blue-600/20 text-white'
                          : 'border-gray-700 bg-gray-900 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">{t('feedback_message')} *</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('feedback_placeholder')}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">{t('feedback_email')}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('feedback_email_placeholder')}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || !message.trim()}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  status === 'success'
                    ? 'bg-green-600 text-white'
                    : status === 'error'
                    ? 'bg-red-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                {status === 'sending' && t('feedback_sending')}
                {status === 'success' && t('feedback_success')}
                {status === 'error' && t('feedback_error')}
                {status === 'idle' && t('feedback_submit')}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
