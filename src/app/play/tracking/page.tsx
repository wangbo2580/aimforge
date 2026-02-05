'use client';

// Tracking 训练页面 (F002)

import { useState } from 'react';
import Link from 'next/link';
import GameCanvas from '@/components/game/GameCanvas';
import TrainingConfig from '@/components/training/TrainingConfig';
import SensitivityConfig from '@/components/game/SensitivityConfig';

export default function TrackingPage() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gray-950">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <Link
            href="/play"
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← 返回
          </Link>
          <h1 className="text-xl font-bold">
            <span className="text-blue-500">👁️</span> Tracking
          </h1>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            showSettings
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {showSettings ? '隐藏设置' : '显示设置'}
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Game Area */}
        <div className="flex-1 relative">
          <GameCanvas trainingType="tracking" />
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="w-80 bg-gray-900 border-l border-gray-800 overflow-y-auto p-4 space-y-4">
            <TrainingConfig trainingType="tracking" />
            <SensitivityConfig />
          </div>
        )}
      </div>
    </div>
  );
}
