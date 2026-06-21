'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import CrosshairPreview from '@/components/ui/CrosshairPreview';
import CopyButton from '@/components/ui/CopyButton';
import { trackEvent } from '@/lib/analytics';
import {
  CS2Crosshair,
  DEFAULT_CROSSHAIR,
  encodeShareCode,
  decodeShareCode,
  crosshairToConVars,
  crosshairColorHex,
} from '@/lib/crosshair-sharecode';
import { proPlayers, featuredPlayers } from '@/data/pro-players';
import ContentTrainingCTA from '@/components/growth/ContentTrainingCTA';

const PRESET_COLORS: { label: string; value: number; hex: string }[] = [
  { label: 'Green', value: 1, hex: '#00FF00' },
  { label: 'Cyan', value: 4, hex: '#00FFFF' },
  { label: 'Yellow', value: 2, hex: '#FFFF00' },
  { label: 'Red', value: 0, hex: '#FF0000' },
  { label: 'Blue', value: 3, hex: '#0000FF' },
];

const STYLE_OPTIONS: { label: string; value: number }[] = [
  { label: 'Classic Static', value: 4 },
  { label: 'Classic Dynamic', value: 3 },
  { label: 'Classic', value: 2 },
  { label: 'Default', value: 0 },
];

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex.trim());
  if (!m) return { r: 0, g: 255, b: 0 };
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

const presetPlayers = featuredPlayers
  .map((slug) => proPlayers.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

export default function CrosshairGeneratorClient() {
  const [c, setC] = useState<CS2Crosshair>({ ...DEFAULT_CROSSHAIR });
  const [importValue, setImportValue] = useState('');
  const [importError, setImportError] = useState('');

  // 支持 ?code=CSGO-... 预加载（如从选手页"Edit this crosshair"跳转）
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (!code) return;
    try {
      const decoded = decodeShareCode(code);
      if (decoded.valid) {
        const { valid: _valid, ...rest } = decoded;
        void _valid;
        // 一次性从 URL 初始化（window 仅客户端可用，故放 effect 而非 lazy init）
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setC(rest);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const shareCode = useMemo(() => {
    try {
      return encodeShareCode(c);
    } catch {
      return '';
    }
  }, [c]);

  const conVars = useMemo(() => crosshairToConVars(c).join('\n'), [c]);
  const currentHex = crosshairColorHex(c);

  const set = (patch: Partial<CS2Crosshair>) => setC((prev) => ({ ...prev, ...patch }));

  const handleImport = () => {
    const code = importValue.trim();
    if (!code) return;
    try {
      const decoded = decodeShareCode(code);
      if (!decoded.valid) {
        setImportError('Code checksum is invalid — double-check you copied the whole code.');
        return;
      }
      // 去掉 valid 字段
      const { valid: _valid, ...rest } = decoded;
      void _valid;
      setC(rest);
      setImportError('');
      trackEvent('crosshair_import', { source: 'generator' });
    } catch {
      setImportError('That does not look like a valid CSGO- crosshair code.');
    }
  };

  const loadPreset = (slug: string, code: string) => {
    try {
      const decoded = decodeShareCode(code);
      const { valid: _valid, ...rest } = decoded;
      void _valid;
      setC(rest);
      trackEvent('crosshair_preset', { player: slug });
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Hero */}
          <div className="mb-8">
            <nav className="mb-4 text-sm">
              <Link href="/crosshairs" className="text-gray-400 hover:text-white">Crosshairs</Link>
              <span className="text-gray-600 mx-2">/</span>
              <span className="text-white">Generator</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">CS2 Crosshair Generator</h1>
            <p className="text-gray-400 max-w-2xl">
              Build a custom Counter-Strike 2 crosshair with live preview, then copy a share code that imports
              straight into the game — or grab the raw console commands. Start from a pro player&apos;s setup or from scratch.
            </p>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-6 mb-10">
            {/* Preview + output */}
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-xl p-5 flex flex-col items-center">
                <CrosshairPreview crosshair={c} size={220} />
                <p className="text-xs text-gray-500 mt-3">Approximate preview</p>
              </div>

              <div className="bg-gray-800 rounded-xl p-5">
                <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wide mb-2">Share Code</h2>
                <div className="bg-gray-900 rounded-lg p-3 flex items-center justify-between gap-2">
                  <code className="text-green-400 text-xs break-all">{shareCode}</code>
                  <CopyButton text={shareCode} trackingEvent="copy_crosshair" trackingParams={{ source: 'generator' }} />
                </div>
                <p className="text-gray-500 text-xs mt-2">CS2 → Settings → Crosshair → Share or Import → paste.</p>
              </div>

              <div className="bg-gray-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wide">Console Commands</h2>
                  <CopyButton text={conVars} trackingEvent="copy_config" trackingParams={{ source: 'generator' }} />
                </div>
                <pre className="text-green-400 text-[11px] whitespace-pre-wrap break-all font-mono leading-relaxed">{conVars}</pre>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-6">
              {/* Pro presets */}
              <div className="bg-gray-800 rounded-xl p-5">
                <h2 className="text-sm font-bold text-white mb-3">Load a Pro Crosshair</h2>
                <div className="flex flex-wrap gap-2">
                  {presetPlayers.map((p) => (
                    <button
                      key={p.slug}
                      onClick={() => loadPreset(p.slug, p.crosshairCode)}
                      className="px-3 py-1.5 bg-gray-700 hover:bg-blue-600 rounded-lg text-sm transition-colors"
                    >
                      {p.name}
                    </button>
                  ))}
                  <button
                    onClick={() => setC({ ...DEFAULT_CROSSHAIR })}
                    className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Color */}
              <div className="bg-gray-800 rounded-xl p-5">
                <h2 className="text-sm font-bold text-white mb-3">Color</h2>
                <div className="flex flex-wrap items-center gap-2">
                  {PRESET_COLORS.map((pc) => (
                    <button
                      key={pc.value}
                      onClick={() => set({ color: pc.value })}
                      className={`w-9 h-9 rounded-lg border-2 transition-transform hover:scale-105 ${
                        c.color === pc.value ? 'border-white' : 'border-transparent'
                      }`}
                      style={{ background: pc.hex }}
                      title={pc.label}
                      aria-label={pc.label}
                    />
                  ))}
                  <label className="flex items-center gap-2 ml-2 text-sm text-gray-300">
                    Custom
                    <input
                      type="color"
                      value={currentHex}
                      onChange={(e) => {
                        const { r, g, b } = hexToRgb(e.target.value);
                        set({ color: 5, red: r, green: g, blue: b });
                      }}
                      className="w-9 h-9 rounded cursor-pointer bg-transparent"
                    />
                  </label>
                </div>
              </div>

              {/* Sliders */}
              <div className="bg-gray-800 rounded-xl p-5 space-y-5">
                <h2 className="text-sm font-bold text-white">Shape</h2>
                <SliderRow label="Length" value={c.length} min={0} max={10} step={0.1} onChange={(v) => set({ length: v })} />
                <SliderRow label="Thickness" value={c.thickness} min={0} max={6} step={0.1} onChange={(v) => set({ thickness: v })} />
                <SliderRow label="Gap" value={c.gap} min={-5} max={5} step={0.5} onChange={(v) => set({ gap: v })} />
                <div className="flex items-center gap-3">
                  <Toggle label="Outline" checked={c.outlineEnabled} onChange={(v) => set({ outlineEnabled: v })} />
                  {c.outlineEnabled && (
                    <div className="flex-1">
                      <SliderRow label="Outline thickness" value={c.outline} min={0} max={3} step={0.1} onChange={(v) => set({ outline: v })} />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Toggle label="Use alpha" checked={c.alphaEnabled} onChange={(v) => set({ alphaEnabled: v })} />
                  {c.alphaEnabled && (
                    <div className="flex-1">
                      <SliderRow label="Alpha" value={c.alpha} min={0} max={255} step={1} onChange={(v) => set({ alpha: v })} />
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-4">
                  <Toggle label="Center dot" checked={c.centerDotEnabled} onChange={(v) => set({ centerDotEnabled: v })} />
                  <Toggle label="T-style" checked={c.tStyleEnabled} onChange={(v) => set({ tStyleEnabled: v })} />
                </div>
                <div>
                  <label className="text-sm text-gray-400 block mb-1">Style</label>
                  <select
                    value={c.style}
                    onChange={(e) => set({ style: Number(e.target.value) })}
                    className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white w-full"
                  >
                    {STYLE_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Import */}
              <div className="bg-gray-800 rounded-xl p-5">
                <h2 className="text-sm font-bold text-white mb-3">Import a Code</h2>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={importValue}
                    onChange={(e) => setImportValue(e.target.value)}
                    placeholder="CSGO-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx"
                    className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white font-mono"
                  />
                  <button onClick={handleImport} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors">
                    Load
                  </button>
                </div>
                {importError && <p className="text-red-400 text-xs mt-2">{importError}</p>}
              </div>
            </div>
          </div>

          {/* SEO content */}
          <div className="prose-invert max-w-3xl space-y-8 text-gray-300">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">How to use the crosshair generator</h2>
              <ol className="list-decimal list-inside space-y-1 text-gray-300">
                <li>Pick a pro preset or set color, length, thickness and gap until the preview looks right.</li>
                <li>Copy the share code at the top-left.</li>
                <li>In CS2, open Settings → Crosshair → Share or Import → paste the code and apply.</li>
              </ol>
              <p className="mt-3 text-gray-400 text-sm">
                Prefer console? Copy the raw <code>cl_crosshair*</code> commands instead and paste them into the developer console (~).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Frequently asked questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-white">What is a CS2 crosshair code?</h3>
                  <p className="text-sm text-gray-400">A <code>CSGO-</code> share code is a compact encoding of every crosshair setting (style, size, thickness, gap, color, dot and outline). Anyone can paste it into CS2 to instantly load the exact same crosshair.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white">How do I import a crosshair code in CS2?</h3>
                  <p className="text-sm text-gray-400">Open Settings → Crosshair, click Share or Import, paste the code, and press Import. The crosshair applies immediately.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Are the codes generated here valid?</h3>
                  <p className="text-sm text-gray-400">Yes. Codes are built with the same checksummed algorithm CS2 uses, and the generator has been verified to round-trip real pro crosshair codes exactly.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Can I copy a pro player&apos;s crosshair?</h3>
                  <p className="text-sm text-gray-400">Use the &quot;Load a Pro Crosshair&quot; buttons, then tweak and copy. See the full list on the <Link href="/crosshairs" className="text-blue-400 hover:underline">crosshairs page</Link> and <Link href="/pro" className="text-blue-400 hover:underline">pro settings</Link>.</p>
                </div>
              </div>
            </section>
          </div>

          <ContentTrainingCTA
            sourcePage="crosshair_generator"
            title="Test the crosshair you just built"
            description="A preview is not enough. Run a short Gridshot session to check visibility, target coverage, and click accuracy."
            primaryHref="/play/gridshot"
            primaryLabel="Test this crosshair in Gridshot"
          />
        </div>
      </main>
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label className="text-sm text-gray-400">{label}</label>
        <span className="text-sm text-white font-medium tabular-nums">{Number(value.toFixed(2))}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-blue-500"
      />
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="accent-blue-500 w-4 h-4" />
      {label}
    </label>
  );
}
