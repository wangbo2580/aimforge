import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'FPS Gaming Tools - Sensitivity Converter, Crosshair Codes | CS2 Practice',
  description: 'Free tools for FPS gamers. Sensitivity converter, crosshair code generator, and more utilities for CS2, Valorant, and other FPS games.',
};

const tools = [
  {
    href: '/tools/sensitivity-converter',
    title: 'Sensitivity Converter',
    description: 'Convert sensitivity between CS2, Valorant, Apex, OW2, and more',
    icon: '🔄',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    href: '/crosshairs',
    title: 'Crosshair Codes',
    description: 'Pro player crosshair codes ready to copy and paste',
    icon: '🎯',
    color: 'from-red-500 to-orange-500',
  },
  {
    href: '/pro',
    title: 'Pro Settings Database',
    description: 'Complete settings for professional CS2 players',
    icon: '⚙️',
    color: 'from-purple-500 to-pink-500',
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              FPS Gaming Tools
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Free utilities to help you improve your FPS gaming setup
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-gray-800 rounded-2xl p-6 hover:bg-gray-750 transition-all hover:scale-[1.02] hover:shadow-xl"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-2xl mb-4`}
                >
                  {tool.icon}
                </div>
                <h2 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {tool.title}
                </h2>
                <p className="text-gray-400">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
