// CS2 commands & binds 教程数据
// 注意：每个 command 的完整 SEO 内容写在 src/app/commands/{slug}/page.tsx
// 这里只存元数据：用于 hub 卡片列表 + sitemap + related links

export interface CommandMeta {
  slug: string;
  title: string;
  description: string;
  category: 'bind' | 'console' | 'practice';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  primaryKeyword: string;
  searchVolume: number;
  publishedAt: string;
  updatedAt?: string;
}

export const commands: CommandMeta[] = [
  {
    slug: 'bind-say-message',
    title: 'How to Bind a Chat Message to a Key in CS2',
    description: 'Bind any chat message to any key. Plant calls, smoke reminders, end-of-match GG — one keystroke away. Copy-paste setup with autoexec instructions.',
    category: 'bind',
    difficulty: 'beginner',
    primaryKeyword: 'how to bind a keybind to a message cs2',
    searchVolume: 390,
    publishedAt: '2026-05-15',
  },
  {
    slug: 'jumpthrow-bind',
    title: 'CS2 Jumpthrow Bind: Consistent Smoke and Grenade Throws',
    description: 'The jumpthrow bind every pro uses. Get pixel-consistent grenade lineups in CS2. Single-key version, two-key version, and what to do when it stops working.',
    category: 'bind',
    difficulty: 'beginner',
    primaryKeyword: 'cs2 jumpthrow bind',
    searchVolume: 320,
    publishedAt: '2026-05-15',
  },
  {
    slug: 'plant-bomb-bind',
    title: 'CS2 Plant Bomb Bind and Buy Binds Setup',
    description: 'Bind the bomb plant to a key so you never miss it in clutches. Also: full buy bind generator code for AK, M4, AWP, kevlar, and utility kits.',
    category: 'bind',
    difficulty: 'beginner',
    primaryKeyword: 'plant bomb bind on cs2',
    searchVolume: 2400,
    publishedAt: '2026-05-15',
  },
  {
    slug: 'scroll-wheel-jump-bind',
    title: 'CS2 Scroll Wheel Jump Bind (Bunny Hop Setup)',
    description: 'Bind jump to your mouse scroll wheel for bunny-hop strafe jumps and consistent jumpthrows in CS2. Up, down, or both — works on official matchmaking.',
    category: 'bind',
    difficulty: 'beginner',
    primaryKeyword: 'how to bind jump to scroll wheel cs2',
    searchVolume: 280,
    publishedAt: '2026-05-15',
  },
];

export function getCommandBySlug(slug: string): CommandMeta | undefined {
  return commands.find(c => c.slug === slug);
}

export function getAllCommandSlugs(): string[] {
  return commands.map(c => c.slug);
}

export function getRelatedCommands(slug: string, limit = 3): CommandMeta[] {
  return commands.filter(c => c.slug !== slug).slice(0, limit);
}
