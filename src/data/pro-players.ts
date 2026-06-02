// 职业选手设置数据

import { decodeShareCode, describeCrosshair } from '@/lib/crosshair-sharecode';

export interface ProPlayer {
  slug: string;
  name: string;
  realName: string;
  country: string;
  team: string;
  role: string;
  image?: string;

  // 灵敏度设置
  sensitivity: number;
  dpi: number;
  edpi: number; // effective DPI = sensitivity * dpi
  cm360: number; // cm per 360
  zoomSensitivity: number;

  // 准星设置
  crosshairCode: string;
  crosshairDescription?: string;

  // 视频设置
  resolution: string;
  aspectRatio: string;
  scalingMode: string;

  // 视角模型（可选）
  viewmodel?: {
    fov: number;
    offsetX: number;
    offsetY: number;
    offsetZ: number;
    presetPos?: number; // viewmodel_presetpos
  };

  // 启动项（可选）— 公开数据，发布前请核对来源
  launchOptions?: string;

  // 外设
  mouse: string;
  mousepad: string;
  keyboard: string;
  monitor: string;
  headset: string;

  // 每件外设一句话「为什么选它」（可选）— 增强内容深度
  gearNotes?: Partial<Record<'mouse' | 'mousepad' | 'keyboard' | 'monitor' | 'headset', string>>;

  // 社交媒体
  twitter?: string;
  twitch?: string;

  // 数据最后核对月份（可选）— 新鲜度信号，如 '2026-05'
  lastUpdated?: string;

  // 成就（简短）
  achievements: string[];

  // 详细分析（Markdown，可选）— 用于热门选手的深度内容
  analysis?: {
    playstyle: string;       // 打法风格分析
    settingsContext: string; // 为什么用这个配置
    suitableFor: string;     // 适合什么类型的玩家
    careerHighlights?: string; // 生涯关键节点
  };
}

// 职业选手数据库
export const proPlayers: ProPlayer[] = [
  {
    slug: 's1mple',
    name: 's1mple',
    realName: 'Oleksandr Kostyliev',
    country: 'UA',
    team: 'BC.Game',
    role: 'AWPer',
    sensitivity: 3.09,
    dpi: 400,
    edpi: 1236,
    cm360: 33.63,
    zoomSensitivity: 1.0,
    crosshairCode: 'CSGO-UseJt-3oTvn-47wPX-hEyER-WZfiK',
    crosshairDescription: 'Cyan classic static crosshair, no dot',
    resolution: '1280x960',
    aspectRatio: '4:3',
    scalingMode: 'Stretched',
    viewmodel: {
      fov: 68,
      offsetX: 2.5,
      offsetY: 0,
      offsetZ: -1.5,
      presetPos: 2,
    },
    mouse: 'Logitech G Pro X Superlight 2',
    mousepad: 'SteelSeries QcK Performance Speed',
    keyboard: 'Logitech G Pro X TKL (GX Brown Tactile)',
    monitor: 'ZOWIE XL2586X+',
    headset: 'SteelSeries Arctis Nova Pro Wireless',
    lastUpdated: '2026-06',
    twitter: 's1mpleO',
    twitch: 's1mple',
    achievements: ['2x Major Champion', '4x HLTV #1', 'CS:GO Greatest of All Time'],
    analysis: {
      playstyle: "s1mple is widely regarded as the greatest CS player of all time, a title earned through a decade at the top of HLTV rankings as an AWPer for Natus Vincere before joining BC.Game. His defining trait is making the AWP work in positions and timings no other pro attempts — rushing with the sniper on T-side, holding off-angles conventional play ignores, then switching to an AK mid-round with no drop in effectiveness. The combination of mechanical ceiling and tactical unpredictability is what separates him from every other star AWPer.",
      settingsContext: "At 3.09 sens on 400 DPI, his eDPI of 1236 sits on the high end of the pro AWPer range, which suits his aggressive, jiggle-heavy style — fast shoulder peeks, quick 180s on retakes, and snap flicks to off-angles all demand more wrist range than a hold-and-wait AWPer needs. He plays 1280x960 stretched, a resolution he has used for years, which widens enemy models on screen. His Logitech G Pro X Superlight 2 is paired with a speed mousepad, consistent with the quick, reactive movement his sens produces.",
      suitableFor: "This eDPI suits aggressive players who frequently jiggle-peek, shoulder-peek for information, or take duels at unexpected angles where a fast wrist flick is required. Methodical players who prefer to set up at a fixed position and wait for the shot will likely find 1236 eDPI hard to keep precise over long holds — the speed that makes s1mple effective in motion works against stillness."
    }
  },
  {
    slug: 'zywoo',
    name: 'ZywOo',
    realName: 'Mathieu Herbaut',
    country: 'FR',
    team: 'Vitality',
    role: 'AWPer',
    sensitivity: 2.0,
    dpi: 400,
    edpi: 800,
    cm360: 51.95,
    zoomSensitivity: 1.0,
    crosshairCode: 'CSGO-FNOLG-fQcPX-V8P7K-VqtAf-ZbJaA',
    crosshairDescription: 'White classic static crosshair, no dot',
    resolution: '1280x960',
    aspectRatio: '4:3',
    scalingMode: 'Stretched',
    viewmodel: {
      fov: 68,
      offsetX: 2.5,
      offsetY: 0,
      offsetZ: -1.5,
      presetPos: 2,
    },
    mouse: 'Pulsar ZywOo The Chosen Gen.2',
    mousepad: 'Pulsar ZywOo The Chosen Mousepad',
    keyboard: 'ASUS ROG Falchion Ace HFX',
    monitor: 'ZOWIE XL2586X+',
    headset: 'SteelSeries Arctis Nova Pro',
    lastUpdated: '2026-06',
    twitter: 'zabornak',
    twitch: 'zywoo',
    achievements: ['Major Champion 2024', '2x HLTV #1', 'IEM Cologne Champion'],
    analysis: {
      playstyle: "ZywOo is the central piece of Team Vitality's offense, functioning as both their primary AWPer and a capable rifler when the round demands it. His AWP style is defined by patience and positional discipline — he will hold an angle through a full default, wait for the exact moment the opponent commits, and convert with a high first-shot accuracy that few AWPers match over a full event. The ability to switch to the AK when the team needs a rifle round means Vitality never has to compensate for a passive AWP buy.",
      settingsContext: "At 2.0 sens on 400 DPI, his eDPI of 800 is the standard pro AWPer benchmark — slow enough that scoped shots stay precise on jittery targets, fast enough for the emergency rifle fight when the AWP gets peeked at close range. He uses the Pulsar ZywOo The Chosen Gen.2, his signature mouse, alongside the ASUS ROG Falchion Ace HFX keyboard, and plays 1280x960 stretched. The 1.0 zoom sensitivity keeps his scoped movement proportional to his hip-fire.",
      suitableFor: "eDPI 800 is the most common pro AWPer setting and a safe starting point for anyone who primarily snipes. Players who want to AWP but also hold their own in rifle rounds will find this range forgiving — it does not sacrifice too much flick speed for close-range engagements. Dedicated riflers who rarely use the AWP will typically want to push slightly higher."
    }
  },
  {
    slug: 'niko',
    name: 'NiKo',
    realName: 'Nikola Kovač',
    country: 'BA',
    team: 'Team Falcons',
    role: 'Rifler',
    sensitivity: 0.9,
    dpi: 800,
    edpi: 720,
    cm360: 57.73,
    zoomSensitivity: 0.9,
    crosshairCode: 'CSGO-s2LGz-Tkrzm-3fxqO-AwOnQ-7WiGH',
    crosshairDescription: 'Cyan-green classic static crosshair, no dot',
    resolution: '1280x960',
    aspectRatio: '4:3',
    scalingMode: 'Stretched',
    viewmodel: {
      fov: 68,
      offsetX: 2,
      offsetY: 0,
      offsetZ: -1.5,
      presetPos: 2,
    },
    mouse: 'Razer DeathAdder V4 Pro',
    mousepad: 'Artisan Ninja FX Zero Soft',
    keyboard: 'Razer Huntsman V3 Pro TKL',
    monitor: 'ZOWIE XL2586X+',
    headset: 'Razer BlackShark V3 Pro',
    lastUpdated: '2026-06',
    twitter: 'G2NiKo',
    twitch: 'nikikooo',
    achievements: ['ESL Pro League Champion', 'IEM Katowice Champion', 'HLTV Top 5'],
    analysis: {
      playstyle: "NiKo is one of the most mechanically precise riflers in CS history and has maintained top-tier performance across multiple rosters, currently playing for Team Falcons. His game is built on crosshair placement and counter-strafe discipline — his first bullet almost always lands because the crosshair was already at head level and his movement had already stopped. He does not rely on spray transfers or aggressive wide swings; he wins the duel at the moment it opens because his pre-aim is correct.",
      settingsContext: "At 0.9 sens on 800 DPI, his eDPI of 720 and 57.73 cm per 360 reflect a slow, arm-dominant aiming style suited to the precision-first rifler archetype. The setup rewards tap-fire accuracy at medium and long range while making wide, rapid rotation flicks harder — a deliberate trade for a player whose strength is winning the duel before it becomes a flick contest. His mouse is the Razer DeathAdder V4 Pro paired with the Razer Huntsman V3 Pro TKL keyboard, and he plays 1280x960 stretched.",
      suitableFor: "This eDPI is well suited to players who prioritize spray control and tap-fire precision over aggressive entry-style speed. The low sensitivity forces arm movement rather than wrist flicks, which tends to improve long-range duel consistency after an adjustment period. Players who entry-frag or rely on fast 180s for lurk-clearing will likely find 720 eDPI too slow to react to flanks."
    }
  },
  {
    slug: 'donk',
    name: 'donk',
    realName: 'Danil Kryshkovets',
    country: 'RU',
    team: 'Team Spirit',
    role: 'Entry Fragger',
    sensitivity: 1.25,
    dpi: 800,
    edpi: 1000,
    cm360: 41.56,
    zoomSensitivity: 1.0,
    crosshairCode: 'CSGO-O36iX-6VGeQ-pnJLm-UWkab-osuWK',
    crosshairDescription: 'Green classic static crosshair, no dot',
    resolution: '1280x960',
    aspectRatio: '4:3',
    scalingMode: 'Stretched',
    viewmodel: {
      fov: 68,
      offsetX: 2.5,
      offsetY: 0,
      offsetZ: -1.5,
      presetPos: 2,
    },
    // donk 不使用任何启动项（CS2 设置已基本菜单化）
    mouse: 'ZOWIE x donk (Unreleased)',
    mousepad: 'SteelSeries QcK+',
    keyboard: 'Logitech G Pro X (GX Blue Clicky)',
    monitor: 'ZOWIE XL2586X+',
    headset: 'HyperX Cloud II',
    gearNotes: {
      mouse: 'His upcoming ZOWIE signature mouse — he has been playing on pre-release versions at LAN events.',
      keyboard: 'Clicky blue mechanical switches: tactile and loud, the opposite of the silent linears most pros pick. Pure personal preference, not a performance edge.',
      monitor: 'A 600Hz panel — about as fast as monitors currently get. At his reaction speed the extra frames over a 240/360Hz screen are a real edge on first-shot duels.',
    },
    twitter: 'donabornak',
    twitch: 'donk',
    lastUpdated: '2026-06',
    achievements: ['HLTV #1 2024', 'PGL Major Copenhagen Champion', 'IEM Cologne Champion'],
    analysis: {
      playstyle: "donk is the rawest aim talent to enter CS in a decade. He was 17 when he became HLTV's #1 player of 2024, which wasn't just the youngest ever — it wasn't particularly close. What makes him special is he does things mechanically that most pros simply can't replicate. One-taps through smokes with the AK, pre-fires through walls based on audio alone, 1v3s on retakes that he shouldn't win. He plays entry for Team Spirit and opens up sites where most entry fraggers can't even get an opening duel.",
      settingsContext: "1.25 sensitivity at 800 DPI gives him an eDPI of 1000. The 800 DPI choice is interesting — most pros use 400 DPI to reduce jitter, but donk runs 800 and counters it with a lower in-game sensitivity. Mathematically it's the same eDPI zone, but the raw input feels subtly different. His crosshair is a tiny green classic-static with no dot and a negative gap, so the four lines almost meet in the center — minimal, doesn't obscure the target. He plays a clicky-switch Logitech G Pro X keyboard, which is a personal-feel choice rather than a competitive edge.",
      suitableFor: "At eDPI 1000 this is moderate-high for a rifler. Good for players who play aggressive roles and need fast 180s. If you're a support player or IGL, you'll want to be slower. Fair warning: this is donk's sensitivity, not his aim — copying the numbers won't give you his raw mechanics."
    }
  },
  {
    slug: 'm0nesy',
    name: 'm0NESY',
    realName: 'Ilya Osipov',
    country: 'RU',
    team: 'Team Falcons',
    role: 'AWPer',
    sensitivity: 2.3,
    dpi: 400,
    edpi: 920,
    cm360: 45.18,
    zoomSensitivity: 1.0,
    crosshairCode: 'CSGO-fdBDn-SmBER-ZeejC-iw5tu-kHk9Q',
    crosshairDescription: 'Cyan classic static crosshair, no dot',
    resolution: '1280x960',
    aspectRatio: '4:3',
    scalingMode: 'Stretched',
    viewmodel: {
      fov: 68,
      offsetX: 2.5,
      offsetY: 0,
      offsetZ: -1.5,
      presetPos: 3,
    },
    mouse: 'Logitech G Pro X2 SUPERSTRIKE',
    mousepad: 'SteelSeries QcK Heavy',
    keyboard: 'Logitech G Pro X TKL RAPID',
    monitor: 'ZOWIE XL2586X+',
    headset: 'Logitech G Pro X',
    lastUpdated: '2026-06',
    twitter: 'm0NESY',
    twitch: 'm0nesy',
    achievements: ['HLTV Top 3', 'BLAST Premier Champion', 'G2 Star Player'],
    analysis: {
      playstyle: "m0nesy is Team Falcons' primary AWPer and one of the youngest players to reach consistent tier-1 performance, having joined G2 at 17 and held a top-five HLTV profile across roster changes. His AWP approach leans aggressive — he pushes with the sniper into positions where most players would hold passively, taking the duel before the opponent is ready rather than waiting for them to commit. The high-variance style means more missed shots than a patient AWPer, but also more rounds opened that a conventional approach would concede.",
      settingsContext: "At 2.3 sens on 400 DPI, his eDPI of 920 and 45.18 cm per 360 place him slightly above the conventional AWPer slow range, reflecting his faster peeking style — he raised his eDPI considerably from the famously slow numbers he ran earlier in his career. He uses the Logitech G Pro X2 SUPERSTRIKE mouse with the Logitech G Pro X TKL RAPID keyboard, and plays 1280x960 stretched. His cyan classic-static crosshair with no dot is minimal by design, forcing precise placement while keeping the target visible.",
      suitableFor: "An eDPI around 920 suits AWPers who want slightly more wrist range than the standard 800 setting without crossing into rifler territory. Players who find themselves too slow to react when aggressively pushing with the AWP may benefit from stepping up toward this range. Dedicated riflers will generally want a higher eDPI still; this zone is optimised for sniper work with occasional rifle use."
    }
  },
  {
    slug: 'device',
    name: 'device',
    realName: 'Nicolai Reedtz',
    country: 'DK',
    team: '100 Thieves',
    role: 'AWPer',
    sensitivity: 1.15,
    dpi: 800,
    edpi: 920,
    cm360: 45.18,
    zoomSensitivity: 1.0,
    crosshairCode: 'CSGO-QVJA3-eFyR4-wjv9e-x3tNO-DqmHB',
    crosshairDescription: 'White classic static crosshair, with dot',
    resolution: '1280x960',
    aspectRatio: '4:3',
    scalingMode: 'Stretched',
    viewmodel: {
      fov: 68,
      offsetX: 2.5,
      offsetY: 0,
      offsetZ: -1.5,
      presetPos: 2,
    },
    mouse: 'Logitech G Pro X2 SUPERSTRIKE',
    mousepad: 'ZOWIE G-TR',
    keyboard: 'Wooting 60HE v2',
    monitor: 'ZOWIE XL2566X+',
    headset: 'Razer BlackShark V3 Pro',
    lastUpdated: '2026-06',
    twitter: 'dev1ce',
    twitch: 'device',
    achievements: ['4x Major Champion', '3x HLTV #1', 'Astralis Era Architect'],
    analysis: {
      playstyle: "device built his reputation as the AWPer at the centre of the Astralis dynasty, winning four Majors with a style that prioritised positional denial over individual highlight plays. He holds angles with the AWP rather than chasing picks, forcing the opposing team to commit resources to dislodge him before he takes a single shot — and then he takes it. Now on 100 Thieves, the same methodical approach defines his game: consistent, low-duel-count rounds that accumulate into a high win rate because the read on when to hold and when to bail is rarely wrong.",
      settingsContext: "At 1.15 sens on 800 DPI, his eDPI of 920 and 45.18 cm per 360 sit at the upper edge of the conventional AWPer range — enough precision for held-angle sniper shots, enough speed to convert rifle rounds when he switches weapons. He uses the Logitech G Pro X2 SUPERSTRIKE mouse and the Wooting 60HE v2 keyboard, whose analog hall-effect switches are favoured for stutter-step strafing precision. His crosshair is a white classic-static with a centre dot, one of the few at the top level who uses a dot as a reference point.",
      suitableFor: "eDPI 920 is a practical range for AWPers who also need to hold their own in rifle engagements — not slow enough to feel helpless in a close-range gunfight, not fast enough to cause jitter on long-held angles. Players who prefer a patient, position-based AWP style will find this forgiving. Those who rely on aggressive flick-peeking should look at the lower end of the AWPer range."
    }
  },
  {
    slug: 'electronic',
    name: 'electronic',
    realName: 'Denis Sharipov',
    country: 'RU',
    team: 'BC.Game',
    role: 'Rifler',
    sensitivity: 2.2,
    dpi: 400,
    edpi: 880,
    cm360: 47.23,
    zoomSensitivity: 1.0,
    crosshairCode: 'CSGO-wAD3c-ykt5L-zvZ98-vBisR-6sWPA',
    crosshairDescription: 'Cyan classic static crosshair, no dot',
    resolution: '1280x1024',
    aspectRatio: '5:4',
    scalingMode: 'Stretched',
    viewmodel: {
      fov: 68,
      offsetX: 2.5,
      offsetY: 0,
      offsetZ: -1.5,
      presetPos: 2,
    },
    mouse: 'Pulsar Xlite V4 Es',
    mousepad: 'SteelSeries QcK Performance Speed',
    keyboard: 'Logitech G Pro X TKL',
    monitor: 'ZOWIE XL2566K',
    headset: 'HyperX Cloud II',
    lastUpdated: '2026-06',
    twitter: 'electroNic',
    twitch: 'electronic',
    achievements: ['2x Major Champion', 'HLTV Top 5', 'NAVI Core Member'],
    analysis: {
      playstyle: "electronic is a support rifler currently on BC.Game, the same organisation as his long-time NAVI teammate s1mple. Through multiple seasons at NAVI he was the consistent secondary fragger — not the player setting up the round or calling the strat, but the one putting up 70–80 damage in the openings and converting the 1v1 retakes the highlight clips never covered. His value is repeatability: the role is unglamorous, the rating never spikes to match the star, and he does it to the same standard every map.",
      settingsContext: "At 2.2 sens on 400 DPI, his eDPI of 880 and 47.23 cm per 360 fall in the moderate rifler range — fast enough for support-role rotation flicks, controlled enough for mid-range tap fire. He uses the Pulsar Xlite V4 Es mouse and the Logitech G Pro X TKL keyboard, and notably plays on a 1280x1024 5:4 stretched resolution rather than the more common 4:3, a slightly different aspect ratio that changes how models appear. His cyan classic-static crosshair with no dot is a standard pro configuration.",
      suitableFor: "eDPI 880 is a reasonable choice for support and secondary rifler roles that require both controlled tap-fire and fast enough reactions for rotation play. Players who hold fixed positions all game will find this slightly fast; players who entry aggressively will find it slightly slow. It sits near the middle of the rifler range and is a practical default while calibrating your preferred speed."
    }
  },
  {
    slug: 'ropz',
    name: 'ropz',
    realName: 'Robin Kool',
    country: 'EE',
    team: 'Vitality',
    role: 'Rifler',
    sensitivity: 1.77,
    dpi: 400,
    edpi: 708,
    cm360: 58.70,
    zoomSensitivity: 1.0,
    crosshairCode: 'CSGO-5UHEt-3RFCY-4Nu8t-4UYGQ-vJN2G',
    crosshairDescription: 'Green classic static crosshair, no dot',
    resolution: '1920x1080',
    aspectRatio: '16:9',
    scalingMode: 'Native',
    viewmodel: {
      fov: 68,
      offsetX: 2.5,
      offsetY: 0,
      offsetZ: -1.5,
      presetPos: 2,
    },
    mouse: 'Razer DeathAdder V3 HyperSpeed',
    mousepad: 'VAXEE PA',
    keyboard: 'ASUS ROG Falchion Ace 75 HE',
    monitor: 'ZOWIE XL2586X+',
    headset: 'SteelSeries Arctis Nova Pro Wireless',
    lastUpdated: '2026-06',
    twitter: 'ropabornak',
    twitch: 'ropz',
    achievements: ['Major Champion', 'HLTV Top 10', 'IEM Cologne Champion'],
    analysis: {
      playstyle: "ropz is one of the cleanest pure lurkers in CS2, operating alone deep in enemy territory and timing flanks that create dilemmas teams struggle to solve. Now on Vitality alongside ZywOo, he plays the secondary rifle role — not the headline fragger, but the player whose off-map presence forces opponents to split rotations at critical moments. His value is positional discipline and the consistent ability to win 1v2 retakes that other players do not attempt.",
      settingsContext: "At 1.77 sens on 400 DPI, his eDPI is 708, sitting slightly above the slow-rifler band and just below the medium zone — a deliberate balance between the careful tap-firing that lurking demands and the reactive speed needed when a rotation runs into him unexpectedly. He plays 1920x1080 native 16:9 on a ZOWIE XL2586X+, an uncommon choice among pros who mostly stick to 4:3 stretched; his mouse is the Razer DeathAdder V3 HyperSpeed on a VAXEE PA pad with an ASUS ROG Falchion Ace 75 HE keyboard.",
      suitableFor: "This setup works well for riflers who flex across positions and need a sensitivity that handles both precise long-range tap-firing and the occasional emergency close-range duel. Players who entry-frag or AWP regularly will find 708 eDPI slightly mismatched for either dedicated role."
    }
  },
  {
    slug: 'twistzz',
    name: 'Twistzz',
    realName: 'Russel Van Dulken',
    country: 'CA',
    team: 'FaZe',
    role: 'Rifler',
    sensitivity: 1.7,
    dpi: 400,
    edpi: 680,
    cm360: 61.12,
    zoomSensitivity: 1.1,
    crosshairCode: 'CSGO-Q3Syz-WOaGL-9WTqW-9N3iJ-e64RG',
    crosshairDescription: 'Green classic static crosshair, no dot',
    resolution: '1280x960',
    aspectRatio: '4:3',
    scalingMode: 'Stretched',
    viewmodel: {
      fov: 68,
      offsetX: 2.5,
      offsetY: 0,
      offsetZ: -1.5,
      presetPos: 2,
    },
    mouse: 'Razer Viper V4 Pro',
    mousepad: 'Artisan Ninja FX Zero Soft',
    keyboard: 'Wooting 60HE v2',
    monitor: 'ZOWIE XL2546K',
    headset: 'SteelSeries Arctis Nova Pro Wireless',
    lastUpdated: '2026-06',
    twitter: 'Twistzz',
    twitch: 'twistzz',
    achievements: ['Major Champion', 'HLTV Top 5', 'Intel Grand Slam'],
    analysis: {
      playstyle: "Twistzz is the reliable second-star rifler FaZe has built around for multiple seasons, including their Major and Intel Grand Slam runs. He does not define himself through a single role — across different maps and rounds he entries, holds passive angles, and lurks depending on the call. What makes him a long-term top-10 fixture is consistency: a 1.15+ rating maintained through roster changes, new opponents, and the transition from CS:GO to CS2.",
      settingsContext: "His sensitivity of 1.7 at 400 DPI produces an eDPI of 680, firmly in the pro rifler comfort zone — slow enough for controlled tap-firing at distance, responsive enough for retake flick situations. He plays 1280x960 4:3 stretched on a ZOWIE XL2546K, uses a Razer Viper V4 Pro on an Artisan Ninja FX Zero Soft pad, and types on a Wooting 60HE v2, whose analog hall-effect switches are increasingly common in the pro scene for precise stutter-step strafing.",
      suitableFor: "A sound starting point for riflers who play standard positions and want a balanced sensitivity without committing to a specialised style. The 680 eDPI range suits players who mix long-range tap-fire with occasional rotation flicks, and is close to what many other top pros settle on."
    }
  },
  {
    slug: 'broky',
    name: 'broky',
    realName: 'Helvijs Saukants',
    country: 'LV',
    team: 'FaZe',
    role: 'AWPer',
    sensitivity: 1.9,
    dpi: 400,
    edpi: 760,
    cm360: 54.69,
    zoomSensitivity: 1.2,
    crosshairCode: 'CSGO-vBPqC-DXDO5-LxjkU-WBSvZ-9mUCP',
    crosshairDescription: 'Green classic static crosshair, no dot',
    resolution: '1280x960',
    aspectRatio: '4:3',
    scalingMode: 'Stretched',
    viewmodel: {
      fov: 68,
      offsetX: 2.5,
      offsetY: 0,
      offsetZ: -1.5,
      presetPos: 2,
    },
    mouse: 'WLMouse Beast X Max',
    mousepad: 'Freefall SV BASE Control+ v3',
    keyboard: 'Wooting 60HE+',
    monitor: 'ZOWIE XL2566K',
    headset: 'SteelSeries Arctis Nova Pro Wireless',
    lastUpdated: '2026-06',
    twitter: 'babornak',
    twitch: 'broky',
    achievements: ['Major Champion', 'Intel Grand Slam', 'IEM Katowice Champion'],
    analysis: {
      playstyle: "broky is FaZe's primary AWPer and has been a consistent part of the lineup through their Major and Intel Grand Slam victories. His style is measured and position-first — he typically takes the second duel of a sequence, reading what his teammates set up before committing to a peek, which makes him reliable in high-stakes rounds where a missed shot costs the map. Not a highlight-reel AWPer, but one of the most dependable in tier-1 for converting the picks his team needs.",
      settingsContext: "At 1.9 sens on 400 DPI his eDPI is 760, a moderate AWPer setting between the precision-focused low end and the more reactive middle — he uses a zoom sensitivity of 1.2, slightly above the pro norm of 1.0, which makes his scoped aim feel a touch faster relative to his hip-fire. His current mouse is the WLMouse Beast X Max on a Freefall SV BASE Control+ v3 pad, with a Wooting 60HE+ keyboard and a ZOWIE XL2566K monitor, all on 1280x960 4:3 stretched.",
      suitableFor: "A reasonable zone for AWPers who prefer reading the round before peeking rather than pushing aggressively with the rifle. The 760 eDPI leaves enough responsiveness for rifle play on eco or save rounds without compromising scoped shot precision."
    }
  },
  {
    slug: 'b1t',
    name: 'b1t',
    realName: 'Valerii Vakhovskyi',
    country: 'UA',
    team: 'NAVI',
    role: 'Rifler',
    sensitivity: 0.825,
    dpi: 800,
    edpi: 660,
    cm360: 62.97,
    zoomSensitivity: 1.0,
    crosshairCode: 'CSGO-tewSz-kjhfa-FbWkE-dvTUr-jcYHK',
    crosshairDescription: 'Green classic static crosshair, no dot',
    resolution: '1280x960',
    aspectRatio: '4:3',
    scalingMode: 'Stretched',
    viewmodel: {
      fov: 68,
      offsetX: 2.5,
      offsetY: 0,
      offsetZ: -1.5,
      presetPos: 1,
    },
    mouse: 'Logitech G Pro X Superlight 2',
    mousepad: 'ZOWIE G-TR',
    keyboard: 'Logitech G Pro X TKL RAPID',
    monitor: 'ZOWIE XL2566K',
    headset: 'Logitech G Pro X 2',
    lastUpdated: '2026-06',
    twitter: 'b1tcs',
    twitch: 'b1t',
    achievements: ['2x Major Champion', 'Intel Grand Slam', 'PGL Major Stockholm MVP'],
    analysis: {
      playstyle: "b1t is a key rifler for NAVI and one of the players the team rebuilt around after s1mple's departure. He made his name at PGL Major Stockholm, where his ability to pre-aim obvious peeks and win opening duels consistently kept NAVI in rounds they should have lost. His strength is straight crosshair placement — he arrives at an angle with his cursor already where the enemy will peek, which turns 50/50 duels into reliable kills.",
      settingsContext: "Running 0.825 sensitivity at 800 DPI gives b1t an eDPI of 660, a moderately slow setting that supports disciplined pre-aimed duels rather than reactive flicking. He uses a Logitech G Pro X Superlight 2 on a ZOWIE G-TR pad with a Logitech G Pro X TKL RAPID keyboard, monitors on a ZOWIE XL2566K, and plays 1280x960 4:3 stretched — standard NAVI team configuration across most of the roster.",
      suitableFor: "This eDPI suits riflers who win fights through crosshair placement rather than reaction-time flicking, and is stable enough for players who hold tight angles on both sides of the map. Players who need fast 180s for aggressive entry rushing will find 660 eDPI on the slower side for that role."
    }
  },
  {
    slug: 'jl',
    name: 'jL',
    realName: 'Justinas Lekavicius',
    country: 'LT',
    team: 'NAVI',
    role: 'Rifler',
    sensitivity: 1.0,
    dpi: 800,
    edpi: 800,
    cm360: 51.95,
    zoomSensitivity: 1.0,
    crosshairCode: 'CSGO-XBJXx-FbQRU-5tCvV-j83HR-4JDhP',
    crosshairDescription: 'Green classic static crosshair, with dot',
    resolution: '1280x1024',
    aspectRatio: '5:4',
    scalingMode: 'Stretched',
    viewmodel: {
      fov: 68,
      offsetX: 2.5,
      offsetY: 2,
      offsetZ: -1.5,
      presetPos: 1,
    },
    mouse: 'Razer DeathAdder V4 Pro',
    mousepad: 'Razer Gigantus V2 Pro',
    keyboard: 'Razer Huntsman V3 Pro TKL',
    monitor: 'ZOWIE XL2586X+',
    headset: 'Logitech G Pro X 2',
    lastUpdated: '2026-06',
    twitter: 'jabornak',
    twitch: 'jlcs',
    achievements: ['Rising Star', 'NAVI Entry Fragger', 'ESL Pro League Finalist'],
    analysis: {
      playstyle: "jL is a Lithuanian rifler in the NAVI organisation who built his reputation as an entry fragger — taking map control in the first ten seconds of a round and converting the information into site openings, including a loan spell at MOUZ during 2026. His game is not built on headline statistics; it is built on the map control that makes a team's default rounds function, a contribution that rarely shows up cleanly on the scoreboard.",
      settingsContext: "At 1.0 sensitivity and 800 DPI his eDPI is 800, a balanced setting that handles both close-range reaction duels and mid-range tap-firing without leaning hard toward either extreme. He plays 1280x1024 5:4 stretched on a ZOWIE XL2586X+, uses a Razer DeathAdder V4 Pro on a Razer Gigantus V2 Pro pad, and types on a Razer Huntsman V3 Pro TKL — a full Razer peripheral setup that is less common at the top level than Logitech or ZOWIE configurations.",
      suitableFor: "The 800 eDPI range is one of the most commonly recommended starting points for CS2 riflers and works across entry, support, and secondary fragger roles without requiring a style-specific adjustment period."
    }
  },
  {
    slug: 'im',
    name: 'iM',
    realName: 'Ivan Mihai',
    country: 'RO',
    team: 'NAVI',
    role: 'Rifler',
    sensitivity: 1.2,
    dpi: 800,
    edpi: 960,
    cm360: 43.30,
    zoomSensitivity: 0.98,
    crosshairCode: 'CSGO-bSSiX-DDtBE-QuJpp-cS3iX-VjaAB',
    crosshairDescription: 'White classic static crosshair, no dot',
    resolution: '1280x960',
    aspectRatio: '4:3',
    scalingMode: 'Stretched',
    viewmodel: {
      fov: 60,
      offsetX: 0,
      offsetY: 0,
      offsetZ: -2,
      presetPos: 0,
    },
    mouse: 'Logitech G Pro X2 SUPERSTRIKE',
    mousepad: 'ZOWIE G-TR',
    keyboard: 'Logitech G Pro X TKL RAPID',
    monitor: 'ZOWIE XL2586X+',
    headset: 'Logitech G Pro X 2',
    lastUpdated: '2026-06',
    twitter: 'imcs',
    twitch: 'imcs',
    achievements: ['PGL Major Copenhagen Champion', 'AWPer of NAVI', 'ENCE Star'],
    analysis: {
      playstyle: "iM is NAVI's Romanian rifler, brought in to fill a demanding secondary fragger role on one of CS2's highest-profile rosters. His game centres on structured aggression — taking controlled fights in positions his team has set up rather than gambling on solo plays — which fits a lineup that relies on system-based play across the full map. He brings disciplined rifle work that supports star-driven teams without stepping on the calling structure.",
      settingsContext: "At 1.2 sensitivity and 800 DPI his eDPI is 960, a moderately high setting for a rifler that reflects the reactive demands of an active secondary fragger role. He plays 1280x960 4:3 stretched on a ZOWIE XL2586X+, uses a Logitech G Pro X2 SUPERSTRIKE on a ZOWIE G-TR pad, with a Logitech G Pro X TKL RAPID keyboard and Logitech G Pro X 2 headset — an all-Logitech setup consistent with the NAVI team standard.",
      suitableFor: "The 960 eDPI suits riflers who play aggressive secondary roles and need the sensitivity to react quickly in chaotic mid-round situations; players focused on long-range precision tap-firing will likely want to sit lower."
    }
  },
  {
    slug: 'hunter',
    name: 'huNter-',
    realName: 'Nemanja Kovač',
    country: 'BA',
    team: 'G2',
    role: 'Rifler',
    sensitivity: 1.25,
    dpi: 800,
    edpi: 1000,
    cm360: 41.56,
    zoomSensitivity: 1.0,
    crosshairCode: 'CSGO-u6M9e-LTkyH-t8PKF-aauKV-y9XXC',
    crosshairDescription: 'Cyan classic static crosshair, no dot',
    resolution: '1350x1080',
    aspectRatio: '5:4',
    scalingMode: 'Stretched',
    viewmodel: {
      fov: 68,
      offsetX: 2.5,
      offsetY: 0,
      offsetZ: -1.5,
      presetPos: 2,
    },
    mouse: 'Logitech G Pro X2 SUPERSTRIKE',
    mousepad: 'ZOWIE G-SR III',
    keyboard: 'Wooting 80HE',
    monitor: 'ZOWIE XL2566K',
    headset: 'Logitech G Pro X 2',
    lastUpdated: '2026-06',
    twitter: 'G2hunter',
    twitch: 'hunter',
    achievements: ['IEM Katowice Champion', 'G2 Core Member', 'HLTV Top 20'],
    analysis: {
      playstyle: "huNter- is the second pillar of G2's rifle line alongside his cousin NiKo, and the role suits him precisely because he does not need the spotlight. He plays a precision-first game — head-level crosshair placement, controlled tap fire at long range, disciplined counter-strafes. G2's ability to win map-control rounds on the T side depends heavily on him winning the duels that set up NiKo's execution reads.",
      settingsContext: "1.25 sensitivity at 800 DPI gives an eDPI of 1000, which is moderate-high for a precision rifler and lets him handle rotation flicks without sacrificing tap-fire accuracy. He runs 1350x1080 on a 5:4 stretched ratio — slightly less aggressive than classic 4:3 stretch but still widening enemy models compared to native. His Logitech G Pro X2 SUPERSTRIKE and Wooting 80HE are both current-generation pro gear.",
      suitableFor: "A good fit for structured riflers who take set-position duels rather than swinging wide angles constantly. At eDPI 1000 you have enough speed for mid-range flicks, but if you entry-frag into tight corners you'll want a faster setup."
    }
  },
  {
    slug: 'ax1le',
    name: 'Ax1Le',
    realName: 'Sergey Rykhtorov',
    country: 'RU',
    team: 'TDK',
    role: 'Rifler',
    sensitivity: 1.5,
    dpi: 800,
    edpi: 1200,
    cm360: 34.64,
    zoomSensitivity: 1.0,
    crosshairCode: 'CSGO-UASeu-2Ty73-D9BaC-EeQs8-stbxJ',
    crosshairDescription: 'Cyan classic static crosshair, no dot',
    resolution: '1280x960',
    aspectRatio: '4:3',
    scalingMode: 'Black Bars',
    viewmodel: {
      fov: 68,
      offsetX: 2.5,
      offsetY: 0,
      offsetZ: -1.5,
      presetPos: 2,
    },
    mouse: 'Logitech G Pro X Superlight 2',
    mousepad: 'Artisan Ninja FX Zero',
    keyboard: 'Wooting Two HE',
    monitor: 'ZOWIE XL2566K',
    headset: 'HyperX Cloud II',
    lastUpdated: '2026-06',
    twitter: 'Ax1Lecs',
    twitch: 'ax1le',
    achievements: ['Vitality Core', 'Cloud9 Star', 'HLTV Top 10'],
    analysis: {
      playstyle: "Ax1Le is the long-range rifle anchor on TDK, a role he has held across multiple roster configurations since his Cloud9 breakout. He takes deliberate duels from distance — two-burst or tap fire, rarely rushing into close range. On TDK he is the player the team positions to clean up post-plant or hold a deep angle that keeps the CT rotation honest for 30 seconds at a time.",
      settingsContext: "1.5 sensitivity at 800 DPI puts his eDPI at 1200, on the higher end but matched to his aggressive positioning — when you get caught at close range with a slow-sens setup you're dead, so the extra speed is practical insurance. He runs 1280x960 with black bars rather than stretched, the minority choice that gives a narrower but undistorted view. His Logitech G Pro X Superlight 2 and Wooting Two HE are standard tier-1 LAN gear.",
      suitableFor: "Suited for structured riflers who play from pre-set positions at distance and trust their team to keep close-range situations manageable. The eDPI 1200 makes it more versatile than a true slow-sens setup, but entry-fraggers who swing open ground constantly should look at something more specialised."
    }
  },
  {
    slug: 'sh1ro',
    name: 'sh1ro',
    realName: 'Dmitry Sokolov',
    country: 'RU',
    team: 'Team Spirit',
    role: 'AWPer',
    sensitivity: 1.04,
    dpi: 800,
    edpi: 832,
    cm360: 49.96,
    zoomSensitivity: 1.0,
    crosshairCode: 'CSGO-bk5KR-52jw7-tKRaw-7kzdw-hOxoO',
    crosshairDescription: 'Green classic static crosshair, no dot',
    resolution: '1280x960',
    aspectRatio: '4:3',
    scalingMode: 'Stretched',
    viewmodel: {
      fov: 68,
      offsetX: 2.5,
      offsetY: 0,
      offsetZ: -1.5,
      presetPos: 2,
    },
    mouse: 'Logitech G Pro X2 SUPERSTRIKE',
    mousepad: 'SteelSeries QcK Heavy',
    keyboard: 'Logitech G Pro X TKL RAPID',
    monitor: 'ZOWIE XL2586X+',
    headset: 'HyperX Cloud II',
    lastUpdated: '2026-06',
    twitter: 'sh1rocsgo',
    twitch: 'sh1ro',
    achievements: ['PGL Major Copenhagen Champion', 'Team Spirit Star AWPer', 'HLTV Top 10'],
    analysis: {
      playstyle: "sh1ro is the methodical AWPer holding Team Spirit together while donk takes the entry headlines. His game is built on pre-aiming the obvious peek, converting the first shot, and repositioning before the counter-flash arrives. During Spirit's Major run he was consistently putting up two-pick rounds that opened sites cleanly — not viral, just reliable in the way winning AWPers have to be.",
      settingsContext: "1.04 sensitivity at 800 DPI gives an eDPI of 832, just above the standard AWPer slow band, giving him slightly more wrist range than the textbook 800 without losing scoped precision. He plays 1280x960 4:3 stretched, the most common pro AWPer resolution, on a 600Hz ZOWIE XL2586X+. The Logitech G Pro X2 SUPERSTRIKE is his current main, consistent with the Logitech-heavy preference across the Spirit roster.",
      suitableFor: "A reasonable middle point for AWPers who want a touch more reactive range than 800 eDPI provides without giving up precision at distance. If your scoped shots feel jittery at 800, try nudging toward 832; if your rifling suffers because you feel too slow, move back up."
    }
  },
  {
    slug: 'rain',
    name: 'rain',
    realName: 'Håvard Nygaard',
    country: 'NO',
    team: '100 Thieves',
    role: 'Rifler',
    sensitivity: 0.9,
    dpi: 800,
    edpi: 720,
    cm360: 57.73,
    zoomSensitivity: 1.0,
    crosshairCode: 'CSGO-se6vw-7D8FH-Eu5Po-BbXdw-CnpJN',
    crosshairDescription: 'Green classic static crosshair, no dot',
    resolution: '1280x960',
    aspectRatio: '4:3',
    scalingMode: 'Stretched',
    viewmodel: {
      fov: 60,
      offsetX: 1.5,
      offsetY: -2,
      offsetZ: -2,
      presetPos: 0,
    },
    mouse: 'Razer Viper V4 Pro',
    mousepad: 'Pulsar eS Saturn Pro',
    keyboard: 'Wooting 80HE',
    monitor: 'ZOWIE XL2566K',
    headset: 'Razer BlackShark V3 Pro',
    lastUpdated: '2026-06',
    twitter: 'FaZe_rain',
    twitch: 'rain',
    achievements: ['Major Champion', 'PGL Antwerp MVP', 'Intel Grand Slam'],
    analysis: {
      playstyle: "rain moved from FaZe to 100 Thieves after the FaZe roster reset, bringing the same entry-rifler role he has held through every lineup since the olofmeister era. His value is consistency — he does not carry scoreboards, he opens sites on the T side and anchors CT setups without costing the team rifles. A decade at top-tier CS doing exactly that is a harder achievement than it sounds.",
      settingsContext: "0.9 sensitivity at 800 DPI gives an eDPI of 720, a comfortable mid-zone for entry riflers who need both fast 180s and decent precision at distance. He plays 1280x960 4:3 stretched and runs the Razer Viper V4 Pro, a current flagship wireless mouse that competes squarely with the Logitech standard. The Wooting 80HE and Pulsar eS Saturn Pro mousepad round out a setup that has changed gradually but stayed in the same performance tier for years.",
      suitableFor: "A good starting point for entry riflers who feel their current setup is either too slow for swings or too fast for mid-range tap fire. eDPI 720 sits in the forgiving middle — fast enough for rotation flicks, controlled enough for structured rifle duels."
    }
  },
  {
    slug: 'frozen',
    name: 'frozen',
    realName: 'David Čerňanský',
    country: 'SK',
    team: 'FaZe',
    role: 'Rifler',
    sensitivity: 2.0,
    dpi: 400,
    edpi: 800,
    cm360: 51.95,
    zoomSensitivity: 0.8,
    crosshairCode: 'CSGO-fhT35-p4je7-fDqhM-U4xpR-TDhnL',
    crosshairDescription: 'Cyan classic static crosshair, no dot',
    resolution: '1280x960',
    aspectRatio: '4:3',
    scalingMode: 'Stretched',
    viewmodel: {
      fov: 68,
      offsetX: 2.5,
      offsetY: 0,
      offsetZ: -1.5,
      presetPos: 2,
    },
    mouse: 'Razer DeathAdder V4 Pro',
    mousepad: 'Odin Gaming Andromeda Pro',
    keyboard: 'Wooting 80HE',
    monitor: 'ZOWIE XL2566K',
    headset: 'HyperX Cloud Alpha Wireless',
    lastUpdated: '2026-06',
    twitter: 'frozencsgo',
    twitch: 'frozen',
    achievements: ['Major Champion', 'FaZe Core Member', 'Intel Grand Slam'],
    analysis: {
      playstyle: "frozen is the off-angle rifler who made FaZe's default rounds dangerous across two Intel Grand Slam and Major trophy runs. He specialises in pre-aiming positions the enemy does not expect to be cleared — not the entry guy charging first, but the second player whose kill prevents the retake. Combined with ropz's lurks and rain's entry work, he was the piece that made FaZe's rifle depth hard to trade through.",
      settingsContext: "2.0 sensitivity at 400 DPI gives an eDPI of 800 — the textbook rifler middle, with about 52cm to complete a 360. His zoom sensitivity of 0.8 is the notable outlier: most riflers use 1.0 because they rarely scope, but frozen drops to 0.8 so his occasional AWP eco rounds stay precise rather than floaty. He plays 1280x960 4:3 stretched on the ZOWIE XL2566K and uses the Razer DeathAdder V4 Pro, one of the most capable large-hand wireless mice at the pro level.",
      suitableFor: "eDPI 800 is the safest default for any rifler uncertain where to start — it covers both tap-fire duels at distance and close-range flicks without specialising in either. The 0.8 zoom sensitivity is worth copying if you occasionally grab an AWP on eco rounds and want consistent scoped feel."
    }
  },
  {
    slug: 'stavn',
    name: 'stavn',
    realName: 'Martin Lund',
    country: 'DK',
    team: 'Ninjas in Pyjamas',
    role: 'AWPer',
    sensitivity: 2.5,
    dpi: 400,
    edpi: 1000,
    cm360: 41.56,
    zoomSensitivity: 1.0,
    crosshairCode: 'CSGO-ZRvam-DXhLD-XN2xf-pA5Dm-df5BO',
    crosshairDescription: 'Cyan classic static crosshair, no dot',
    resolution: '800x600',
    aspectRatio: '4:3',
    scalingMode: 'Black Bars',
    viewmodel: {
      fov: 60,
      offsetX: 1,
      offsetY: 1,
      offsetZ: -1,
      presetPos: 1,
    },
    mouse: 'ZOWIE EC2-CW',
    mousepad: 'SteelSeries QcK Large',
    keyboard: 'Wooting 80HE',
    monitor: 'ZOWIE XL2566X+',
    headset: 'Logitech G Pro X 2',
    lastUpdated: '2026-06',
    twitter: 'stavnCS',
    twitch: 'stavn',
    achievements: ['HLTV Top 10', 'Astralis Star Rifler', 'Heroic Era Core'],
    analysis: {
      playstyle: "stavn transitioned from aggressive rifler at Heroic to primary AWPer at Ninjas in Pyjamas, a role shift that reflects where NiP needed firepower rather than a stylistic reinvention. He brings the same high-tempo reads to the AWP — early picks, off-positions, willingness to take the duel before teammates are fully set. At NiP he is the main sniper the team builds T-side structure around.",
      settingsContext: "2.5 sensitivity at 400 DPI gives an eDPI of 1000, unusually high for an AWPer and reflecting his aggressive peeking style — passive slow-sens AWPers can afford 600-800 eDPI, but stavn needs the extra range for the early-round duels he takes. He runs 800x600 with black bars, the smallest resolution still used at the top level, which maximises enemy model size at the cost of significant FOV loss. The ZOWIE EC2-CW wireless mouse is a long-standing personal preference.",
      suitableFor: "Built for AWPers who play peek-heavy, early-timing styles rather than passive angle-denial. eDPI 1000 gives reactive flicking that a slow AWP setup cannot match, but it comes at a cost to scoped precision at extreme range. If you hold angles and wait for enemies to walk into your crosshair, the more conventional 700-850 AWPer range will serve you better."
    }
  },
  {
    slug: 'magisk',
    name: 'Magisk',
    realName: 'Emil Reif',
    country: 'DK',
    team: 'Free Agent',
    role: 'Rifler',
    sensitivity: 1.0,
    dpi: 800,
    edpi: 800,
    cm360: 51.95,
    zoomSensitivity: 1.18,
    crosshairCode: 'CSGO-hT7XN-3zhiM-fV7P2-PXxA3-CnpJN',
    crosshairDescription: 'Red classic static crosshair, no dot',
    resolution: '1280x960',
    aspectRatio: '4:3',
    scalingMode: 'Stretched',
    viewmodel: {
      fov: 68,
      offsetX: 2,
      offsetY: 0,
      offsetZ: -1.5,
      presetPos: 1,
    },
    mouse: 'Logitech G Pro X Superlight 2',
    mousepad: 'Artisan Type-99',
    keyboard: 'Logitech G Pro X TKL RAPID',
    monitor: 'ZOWIE XL2566K',
    headset: 'HyperX Cloud II',
    lastUpdated: '2026-06',
    twitter: 'MagiskCS',
    twitch: 'magisk',
    achievements: ['4x Major Champion', 'Astralis Dynasty Core', 'HLTV Top 10'],
    analysis: {
      playstyle: "Magisk built his name as the reliable secondary rifler on the Astralis lineup that won four Majors between 2018 and 2022. He operated in the support slot — executing the site after the AWPer's pick opened it, holding the bomb on CT, converting the rounds the star set up. Now a free agent, he remains one of the most decorated players in CS history, with a reputation for consistency few riflers match across a full dynasty run.",
      settingsContext: "Magisk runs 1.0 sensitivity at 800 DPI for an eDPI of 800 — the textbook pro rifler middle. At about 52cm per 360, the setup rewards careful crosshair placement over reactive flicking, which suits a secondary rifler who rarely needs fast 180s. His Logitech G Pro X Superlight 2 on an Artisan Type-99 mousepad is a clean high-tier setup with no experimental choices, and he plays 1280x960 stretched.",
      suitableFor: "A safe baseline for riflers who play methodical support roles and want to build precise habits. If you are learning crosshair placement and spray control, 800 eDPI on 1280x960 stretched is one of the most copied configurations at the top level. It will feel slow to players coming from higher eDPI, but the ceiling on accuracy is noticeably higher after a month of adjustment."
    }
  },
  {
    slug: 'elige',
    name: 'EliGE',
    realName: 'Jonathan Jablonowski',
    country: 'US',
    team: 'Team Liquid',
    role: 'Rifler',
    sensitivity: 0.74,
    dpi: 1600,
    edpi: 1184,
    cm360: 35.11,
    zoomSensitivity: 0.8,
    crosshairCode: 'CSGO-q6eSu-fcLmP-fMcMX-Z323D-XyqRP',
    crosshairDescription: 'White classic static crosshair, with dot',
    resolution: '1680x1050',
    aspectRatio: '16:10',
    scalingMode: 'Stretched',
    viewmodel: {
      fov: 68,
      offsetX: 1,
      offsetY: 2,
      offsetZ: -1,
      presetPos: 0,
    },
    mouse: 'Logitech G Pro X2 SUPERSTRIKE',
    mousepad: 'Artisan Hayate Otsu Soft',
    keyboard: 'Wooting 80HE',
    monitor: 'ZOWIE XL2586X+',
    headset: 'HyperX Cloud II Wireless',
    lastUpdated: '2026-06',
    twitter: 'EliGE',
    twitch: 'elige',
    achievements: ['Greatest NA CS Player', 'Intel Grand Slam', 'HLTV Top 5'],
    analysis: {
      playstyle: "EliGE is widely regarded as the greatest North American CS player of all time. His 2019 Intel Grand Slam run with Team Liquid was the closest NA came to sustained tier-1 dominance, and he put up top-5 HLTV numbers for most of that year. He plays a high-volume flex role — entry on some rounds, lurk on others, anchor when the team needs it — and has done it at Liquid through more roster changes than any other player on the current lineup.",
      settingsContext: "EliGE runs an unusual 0.74 sensitivity at 1600 DPI, arriving at an eDPI of 1184 — fast enough for aggressive swing duels at about 35cm per 360. The 1600 DPI choice traces back to his Quake background, where higher raw DPI was common for fast flick inputs. The 1680x1050 stretched resolution is one of the rarer setups at the pro level, a holdover from the 16:10 display era he has maintained. His Logitech G Pro X2 SUPERSTRIKE and Wooting 80HE are current flagship gear.",
      suitableFor: "This setup suits flex riflers who rotate between aggressive and passive roles within the same match. The higher eDPI rewards players who need fast swings and quick 180s but still want enough control for mid-range tap fire. Players coming from a slower precision setup will find the first two weeks disorienting; it is not a fit for dedicated AWPers or tap-fire-focused riflers."
    }
  },
  {
    slug: 'w0nderful',
    name: 'w0nderful',
    realName: 'Ihor Zhdanov',
    country: 'UA',
    team: 'NAVI',
    role: 'AWPer',
    sensitivity: 1.27,
    dpi: 800,
    edpi: 1016,
    cm360: 40.91,
    zoomSensitivity: 1.0,
    crosshairCode: 'CSGO-zVW3L-i3uwx-TvBqz-qch8e-SLLTK',
    crosshairDescription: 'Cyan-green classic static crosshair, no dot',
    resolution: '1280x960',
    aspectRatio: '4:3',
    scalingMode: 'Stretched',
    viewmodel: {
      fov: 68,
      offsetX: 2.5,
      offsetY: 0,
      offsetZ: -1.5,
      presetPos: 2,
    },
    mouse: 'Logitech G Pro X2 SUPERSTRIKE',
    mousepad: 'ZOWIE G-SR III',
    keyboard: 'Logitech G Pro X TKL RAPID',
    monitor: 'ZOWIE XL2566K',
    headset: 'Logitech G Pro X 2',
    lastUpdated: '2026-06',
    twitter: 'w0nderfulcs',
    twitch: 'w0nderful',
    achievements: ['NAVI AWPer', 'Rising Star', 'Ukrainian CS Talent'],
    analysis: {
      playstyle: "w0nderful is NAVI's primary AWPer, stepping into the position after s1mple transitioned away from the team. He plays a more measured, position-first AWP style than s1mple did — fewer aggressive pre-aimed off-angle peeks, more structured holds that let his teammates read his position reliably. He has grown steadily into a more decisive role within the team's round structure.",
      settingsContext: "w0nderful plays at 1.27 sensitivity and 800 DPI, producing an eDPI of 1016 and a 360-degree distance of about 41cm. That places him noticeably above the standard AWPer slow band, reflecting a willingness to take reactive duels rather than purely holding set angles. He plays 1280x960 stretched, uses a Logitech G Pro X2 SUPERSTRIKE on a ZOWIE G-SR III pad, and rounds out his setup with the Logitech G Pro X TKL RAPID keyboard.",
      suitableFor: "A reasonable reference for AWPers who want more reactive speed than the typical 800 eDPI baseline without reaching the aggressive high end. If your scoped shots are already consistent and you feel slow on emergency rifle duels, stepping toward the 1000-1050 eDPI range is a logical experiment. Players still developing scoped precision should start slower and work upward."
    }
  },
  {
    slug: 'dupreeh',
    name: 'dupreeh',
    realName: 'Peter Rasmussen',
    country: 'DK',
    team: 'Retired',
    role: 'Entry Fragger',
    sensitivity: 1.77,
    dpi: 400,
    edpi: 708,
    cm360: 58.70,
    zoomSensitivity: 1.0,
    crosshairCode: 'CSGO-6tdBs-jpO7k-cFYff-pkfk5-jJCEB',
    crosshairDescription: 'Green classic static crosshair, no dot',
    resolution: '1280x800',
    aspectRatio: '16:10',
    scalingMode: 'Stretched',
    viewmodel: {
      fov: 68,
      offsetX: 2.5,
      offsetY: 0,
      offsetZ: -1.5,
      presetPos: 2,
    },
    mouse: 'Razer Viper V3 Pro',
    mousepad: 'VAXEE PD150',
    keyboard: 'Razer Huntsman V3 Pro Mini',
    monitor: 'ZOWIE XL2566K',
    headset: 'AceZone A-Spire Wireless',
    lastUpdated: '2026-06',
    twitter: 'duabornak',
    twitch: 'dupreeh',
    achievements: ['5x Major Champion (Record)', 'Astralis Dynasty Core', 'CS Legend'],
    analysis: {
      playstyle: "dupreeh retired holding the all-time record of five Major Championships, all earned as the entry fragger on the Astralis lineup that defined the late CS:GO era. He was the player who took the first peek into the smoke every round — dying more often than anyone else on the team, but landing the opening pick that let Astralis convert site executes at a rate no other team could match. His role was unglamorous and his stats rarely reflected his contribution, but the dynasty did not happen without him making that first contact.",
      settingsContext: "dupreeh played at 1.77 sensitivity and 400 DPI, an eDPI of 708 with about 59cm per 360. That put him slightly above the slow rifler band — controlled enough for the first tap on entry, fast enough to react to the rotation that arrived seconds later. He ran a 16:10 1280x800 stretched resolution through much of his career, an unusual choice among primarily 4:3 pros. His final active gear included the Razer Viper V3 Pro on a VAXEE PD150 mousepad.",
      suitableFor: "Players who entry-frag but want more tap-fire control than a 900-1000 eDPI setup provides will find 708 a useful reference. It is faster than pure precision riflers run, but controlled enough that the opening duel does not rely entirely on reaction speed. Too slow for players who entry with wide angle swings and rely on quick 180s."
    }
  },
  {
    slug: 'perfecto',
    name: 'Perfecto',
    realName: 'Ilya Zalutskiy',
    country: 'RU',
    team: 'Virtus.pro',
    role: 'Support',
    sensitivity: 1.2,
    dpi: 800,
    edpi: 960,
    cm360: 43.30,
    zoomSensitivity: 1.0,
    crosshairCode: 'CSGO-APGOV-8w8G4-GYxw4-XkKkb-zOSFE',
    crosshairDescription: 'Yellow-green classic static crosshair, no dot',
    resolution: '1280x960',
    aspectRatio: '4:3',
    scalingMode: 'Stretched',
    viewmodel: {
      fov: 68,
      offsetX: 2.5,
      offsetY: 0,
      offsetZ: -1.5,
      presetPos: 2,
    },
    mouse: 'Waizowl OGM Cloud 8K',
    mousepad: 'Perfecto Gear Ramen Defuse',
    keyboard: 'Wooting 80HE',
    monitor: 'ZOWIE XL2586X',
    headset: 'HyperX Cloud II',
    lastUpdated: '2026-06',
    twitter: 'Perfecto_CS',
    twitch: 'perfecto',
    achievements: ['2x Major Champion', 'NAVI Core Member', 'Support Specialist'],
    analysis: {
      playstyle: "Perfecto won two Majors as NAVI's support player, most notably as part of the roster that took the PGL Major Stockholm title in 2021. The support role rarely generates highlight clips — it means throwing the utility, anchoring the bomb site, holding the angles nobody else wants. He then moved to Virtus.pro, where he continues in the same role: the player teammates trust to be in position and not die to a bad peek while the stars take their duels.",
      settingsContext: "Perfecto uses 1.2 sensitivity at 800 DPI for an eDPI of 960, covering a 360-degree turn in about 43cm. That speed suits a support player who needs to rotate fast on CT or swing quickly on a trade call, without sacrificing the control needed for post-plant anchor holds. His current setup pairs the Waizowl OGM Cloud 8K mouse with a custom Perfecto Gear Ramen Defuse mousepad and a Wooting 80HE keyboard, on a ZOWIE XL2586X running 1280x960 stretched.",
      suitableFor: "This eDPI zone works well for support and anchor players who need a mix of rotation speed and positional discipline. If your role is holding angles after the entry, trading kills, or managing the bomb site on CT, 960 eDPI keeps you fast enough for the reactive moments without going so high that your pre-aim loses consistency. Too fast for primary AWPers; right for dedicated support riflers."
    }
  },
  {
    slug: 'karrigan',
    name: 'karrigan',
    realName: 'Finn Andersen',
    country: 'DK',
    team: 'Team Falcons',
    role: 'IGL',
    sensitivity: 0.9,
    dpi: 800,
    edpi: 720,
    cm360: 57.73,
    zoomSensitivity: 1.0,
    crosshairCode: 'CSGO-7E6uR-d4dOe-LZE8J-OZ8kM-4JDhP',
    crosshairDescription: 'Cyan classic static crosshair, no dot',
    resolution: '1280x960',
    aspectRatio: '4:3',
    scalingMode: 'Stretched',
    viewmodel: {
      fov: 68,
      offsetX: 2.5,
      offsetY: 0,
      offsetZ: -1.5,
      presetPos: 2,
    },
    mouse: 'HITSCAN Hyperlight',
    mousepad: 'Artisan Key-83 Soft',
    keyboard: 'Wooting 80HE',
    monitor: 'ZOWIE XL2566K',
    headset: 'SteelSeries Arctis Nova Pro Wireless',
    lastUpdated: '2026-06',
    twitter: 'karriganCS',
    twitch: 'karrigan',
    achievements: ['2x Major Champion', 'Legendary IGL', 'FaZe Era Architect'],
    analysis: {
      playstyle: "karrigan is the most respected active IGL in CS2, having won two Majors including PGL Major Antwerp 2022 with FaZe and now leading Team Falcons. His value is not in raw fragging — it is in round-reading and mid-round adjustments that let rosters of star players function as a cohesive unit. Across three different top-tier organisations spanning over a decade, he has consistently built winning structures around whatever talent he was given.",
      settingsContext: "karrigan plays at 0.9 sensitivity and 800 DPI, yielding an eDPI of 720 and about 58cm per 360. That slow setup fits the IGL role: he needs precise crosshair placement for the support angles he holds while calling the round, not the entry duels that demand speed. He uses a HITSCAN Hyperlight mouse on an Artisan Key-83 Soft pad with a Wooting 80HE keyboard, running 1280x960 stretched on a ZOWIE XL2566K.",
      suitableFor: "A practical reference for IGLs and support players who hold long angles and call simultaneously. The slower eDPI reduces the cognitive load during fights — you have to move the mouse more deliberately, which discourages the impulsive wide swings that get IGLs killed on key rounds. Entry fraggers and aggressive riflers will find it too restrictive."
    }
  },
  {
    slug: 'aleksib',
    name: 'aleksib',
    realName: 'Aleksi Virolainen',
    country: 'FI',
    team: 'NAVI',
    role: 'IGL',
    sensitivity: 1.06,
    dpi: 800,
    edpi: 848,
    cm360: 49.01,
    zoomSensitivity: 1.0,
    crosshairCode: 'CSGO-JEZQz-do64M-3tQec-mTteY-oM88F',
    crosshairDescription: 'Green classic static crosshair, no dot',
    resolution: '1440x1080',
    aspectRatio: '4:3',
    scalingMode: 'Stretched',
    viewmodel: {
      fov: 68,
      offsetX: 2.5,
      offsetY: 0,
      offsetZ: -1.5,
      presetPos: 2,
    },
    mouse: 'Logitech G Pro X Superlight',
    mousepad: 'ZOWIE G-TR',
    keyboard: 'Logitech G Pro X TKL RAPID',
    monitor: 'ZOWIE XL2566K',
    headset: 'Logitech G Pro X 2',
    lastUpdated: '2026-06',
    twitter: 'aleksibCS',
    twitch: 'aleksib',
    achievements: ['PGL Major Copenhagen Champion', 'IGL of the Year 2024', 'NAVI IGL'],
    analysis: {
      playstyle: "aleksib is one of the most structured IGLs active in tier-1 CS, known for mid-round adaptations rather than scripted executes. He won HLTV IGL of the Year 2024 while calling for NAVI through a roster reset, shaping a team that had lost its identity around s1mple into a competitive unit with a coherent system. His individual fragging is secondary to his read — he plays support angles that keep him alive long enough to finish a call, not positions that generate highlights.",
      settingsContext: "1.06 sensitivity at 800 DPI puts his eDPI at 848, a modest middle ground that suits an IGL role requiring precise hold angles rather than fast aggressive pivots. About 49cm per 360 is slow enough for deliberate tap-fire but responsive enough for the occasional rotation duel an IGL cannot avoid. He runs the Logitech G Pro X Superlight on a ZOWIE G-TR pad with a Logitech G Pro X TKL RAPID keyboard. The 1440x1080 stretched resolution is a slightly wider 4:3 variant that widens character models beyond the standard 1280x960.",
      suitableFor: "Best fit for methodical players who hold set positions and want a balanced eDPI that does not punish slower crosshair placement. If you play support or IGL roles and find higher sensitivities pull your aim off on longer-range tap fights, 848 is a reasonable middle point to trial."
    }
  },
  {
    slug: 'fallen',
    name: 'FalleN',
    realName: 'Gabriel Toledo',
    country: 'BR',
    team: 'FURIA',
    role: 'AWPer',
    sensitivity: 1.95,
    dpi: 400,
    edpi: 780,
    cm360: 53.29,
    zoomSensitivity: 1.0,
    crosshairCode: 'CSGO-ssxCh-Y9LFi-B9amu-NWkZo-ObaAB',
    crosshairDescription: 'Yellow classic static crosshair, with outline',
    resolution: '1280x960',
    aspectRatio: '4:3',
    scalingMode: 'Stretched',
    viewmodel: {
      fov: 60,
      offsetX: 1,
      offsetY: 1,
      offsetZ: -1,
      presetPos: 1,
    },
    mouse: 'Fallen Gear Lobo Wireless',
    mousepad: 'Fallen Gear Mystic',
    keyboard: 'Logitech G Pro X TKL RAPID',
    monitor: 'ZOWIE XL2546K',
    headset: 'Fallen Gear Morcego Pro Wireless',
    lastUpdated: '2026-06',
    twitter: 'FalleNCS',
    twitch: 'gabornak',
    achievements: ['2x Major Champion', 'Brazilian CS Legend', 'Godfather of BR CS'],
    analysis: {
      playstyle: "FalleN is the player who built Brazilian CS into a tier-1 scene, winning two Majors in 2016 and 2017 as both captain and AWPer — a dual role almost no other player has sustained at that level. Now on FURIA, he operates as the team's AWPer in a later career chapter that does not match his 2017 peak but still draws on a decade of reading rounds from the IGL chair. His AWP style is measured and positional, built around patience — he waits for the right read before committing to the duel.",
      settingsContext: "1.95 sensitivity at 400 DPI gives an eDPI of 780, sitting in the middle of the standard AWPer band and allowing for both precise scoped shots and faster rifle rotations when needed. About 53cm per 360 reflects a setup balanced between dedicated AWP precision and the flex demands of a player who has always carried dual IGL and AWP responsibilities. He plays exclusively on his own-brand peripherals — Fallen Gear Lobo Wireless mouse, Fallen Gear Mystic mousepad, and Fallen Gear Morcego Pro Wireless headset — paired with a Logitech G Pro X TKL RAPID keyboard and ZOWIE XL2546K monitor.",
      suitableFor: "A practical reference for players who flex between AWP and rifle in the same round and need a sensitivity that handles both without switching. If you dedicate-AWP and rarely rifle, a slower eDPI in the 600–700 range will be more precise; if you flex roles frequently, 880 is a comfortable compromise."
    }
  },
  {
    slug: 'brollan',
    name: 'Brollan',
    realName: 'Ludvig Brolin',
    country: 'SE',
    team: 'MOUZ',
    role: 'Rifler',
    sensitivity: 1.15,
    dpi: 800,
    edpi: 920,
    cm360: 45.18,
    zoomSensitivity: 1.0,
    crosshairCode: 'CSGO-WudSh-UtCKr-pAsp4-BJxKV-7T8SA',
    crosshairDescription: 'Magenta classic static crosshair, no dot',
    resolution: '1280x960',
    aspectRatio: '4:3',
    scalingMode: 'Stretched',
    viewmodel: {
      fov: 68,
      offsetX: 2.5,
      offsetY: 0,
      offsetZ: -1.5,
      presetPos: 2,
    },
    mouse: 'ZOWIE EC2-CW',
    mousepad: 'Razer Strider',
    keyboard: 'Razer Huntsman V3 Pro TKL',
    monitor: 'ZOWIE XL2586X+',
    headset: 'Razer BlackShark V3 Pro',
    lastUpdated: '2026-06',
    twitter: 'BrollanCS',
    twitch: 'brollan',
    achievements: ['Fnatic Star', 'HLTV Top 10', 'Swedish CS Prodigy'],
    analysis: {
      playstyle: "Brollan is the Swedish rifler MOUZ built their roster around after his years as the central talent on Fnatic. He turned pro at 17 and immediately reached top-20 HLTV level, staying there through multiple lineup changes — a sign of individual quality rather than team circumstance. On MOUZ he plays an entry-flex role, taking aggressive first peeks in some rounds and lurk-support lines in others, which demands the mechanical range to win duels from multiple positions rather than mastering one.",
      settingsContext: "1.15 sensitivity at 800 DPI gives an eDPI of 920, on the faster side for a rifler at roughly 45cm per 360, which fits the entry-flex role that needs quick pivots after aggressive opens. He uses the ZOWIE EC2-CW wireless mouse — a long-standing pro-favourite shape — on a Razer Strider pad, with a Razer Huntsman V3 Pro TKL keyboard and Razer BlackShark V3 Pro headset forming a consistent all-Razer peripheral stack. The 1280x960 4:3 stretched resolution is standard across the MOUZ lineup.",
      suitableFor: "Good fit for riflers who play multiple roles across maps and want a sensitivity quick enough for entry situations without becoming erratic on longer-range tap fights. Players who exclusively hold passive anchor positions will find 920 eDPI slightly faster than ideal for that playstyle."
    }
  },
  {
    slug: 'cadian',
    name: 'cadiaN',
    realName: 'Casper Møller',
    country: 'DK',
    team: 'OG',
    role: 'IGL',
    sensitivity: 2.3,
    dpi: 400,
    edpi: 920,
    cm360: 45.18,
    zoomSensitivity: 1.0,
    crosshairCode: 'CSGO-EzKRF-GfWP6-awkVK-4xCn6-ikCxH',
    crosshairDescription: 'Cyan-green classic static crosshair, no dot',
    resolution: '1280x960',
    aspectRatio: '4:3',
    scalingMode: 'Stretched',
    viewmodel: {
      fov: 68,
      offsetX: 2.5,
      offsetY: 0,
      offsetZ: -1.5,
      presetPos: 2,
    },
    mouse: 'Logitech G Pro X Superlight 2',
    mousepad: 'SteelSeries QcK Heavy',
    keyboard: 'Wooting 60HE+',
    monitor: 'ZOWIE XL2566X+',
    headset: 'Logitech G Pro X 2',
    lastUpdated: '2026-06',
    twitter: 'caabornak',
    twitch: 'cadian',
    achievements: ['IEM Rio Champion', 'Heroic Era Captain', 'Popular Streamer'],
    analysis: {
      playstyle: "cadiaN leads OG as a hybrid IGL-AWPer, one of the few players sustaining both roles simultaneously at tier-1 level. He built his reputation as the calling architect behind Heroic's competitive run, including their IEM Rio win, before moving to OG. His calling style leans on structured defaults that free up mental bandwidth for AWP picks — he rarely improvises mid-round the way a pure IGL might, which is what lets him also hold the AWP full-time without one role collapsing the other.",
      settingsContext: "2.3 sensitivity at 400 DPI puts his eDPI at 920, about 45cm per 360, faster than a dedicated AWPer typically runs and reflecting the rifle rotation demands the IGL role adds. He uses the Logitech G Pro X Superlight 2 on a SteelSeries QcK Heavy pad, with a Wooting 60HE+ keyboard — the analog-actuation Wooting is increasingly common among IGLs who value finer counter-strafe control for the support angles the role requires. Resolution is 1280x960 4:3 stretched.",
      suitableFor: "Most relevant for players who IGL and AWP simultaneously and need enough sensitivity speed to handle rifle rotations without sacrificing scoped accuracy. Pure AWPers with no IGL or rifle responsibility will benefit from dropping lower; dedicated riflers who don't AWP can go either direction depending on their aggression level."
    }
  },
  {
    slug: 'headtr1ck',
    name: 'headtr1ck',
    realName: 'Daniil Valitov',
    country: 'RU',
    team: 'Inner Circle',
    role: 'AWPer',
    sensitivity: 2.3,
    dpi: 400,
    edpi: 920,
    cm360: 45.18,
    zoomSensitivity: 1.0,
    crosshairCode: 'CSGO-Pi38p-VchwN-i5AUq-65PXS-JK5mA',
    crosshairDescription: 'Green classic static crosshair, no dot',
    resolution: '1280x960',
    aspectRatio: '4:3',
    scalingMode: 'Stretched',
    viewmodel: {
      fov: 68,
      offsetX: 2.5,
      offsetY: 0,
      offsetZ: -1.5,
      presetPos: 2,
    },
    mouse: 'Logitech G Pro X Superlight',
    mousepad: 'SteelSeries QcK Heavy',
    keyboard: 'Wooting 80HE',
    monitor: 'ZOWIE XL2546K',
    headset: 'HyperX Cloud II',
    lastUpdated: '2026-06',
    twitter: 'headtr1ckcs',
    twitch: 'headtr1ck',
    achievements: ['PGL Major Copenhagen Champion', 'Spirit Rising Star', 'Entry Fragger'],
    analysis: {
      playstyle: "headtr1ck is the AWPer for Inner Circle, having previously won PGL Major Copenhagen with Team Spirit where he shared the roster with donk and sh1ro. At Spirit he primarily handled entry and support duties alongside his sniping, taking the picks that opened sites before donk closed out the round. On Inner Circle he operates as the primary AWPer, which puts more of the sniping responsibility directly on him.",
      settingsContext: "2.3 sensitivity at 400 DPI gives an eDPI of 920 — about 45cm per 360 — on the faster side for an AWPer and reflecting a player comfortable taking aggressive AWP duels rather than purely holding static angles. He uses the Logitech G Pro X Superlight on a SteelSeries QcK Heavy pad, with a Wooting 80HE keyboard and HyperX Cloud II headset. Resolution is 1280x960 4:3 stretched.",
      suitableFor: "A useful reference for AWPers who play aggressively and take duels before the team is fully set — 920 eDPI gives enough pivot speed for those situations while keeping scoped shots workable. Players who AWP passively from static positions will generally find this faster than necessary and may benefit from settling 100–150 eDPI lower."
    }
  },
];

// 按人气/成就排序的选手列表
export const featuredPlayers = ['donk', 's1mple', 'zywoo', 'niko', 'm0nesy'];

// 获取选手
export function getPlayerBySlug(slug: string): ProPlayer | undefined {
  return proPlayers.find(p => p.slug === slug);
}

// 获取所有选手 slugs
export function getAllPlayerSlugs(): string[] {
  return proPlayers.map(p => p.slug);
}

// 选手准星的人类可读描述 —— 由分享码解码派生（颜色/dot/风格自动校准），失败回退到存储值
export function getPlayerCrosshairDescription(player: ProPlayer): string {
  try {
    const d = decodeShareCode(player.crosshairCode);
    if (d.valid) return describeCrosshair(d);
  } catch {
    /* 回退 */
  }
  return player.crosshairDescription ?? `${player.name}'s CS2 crosshair`;
}

// 生成可直接粘贴的 autoexec.cfg —— 全部由已验证字段派生，保证准确
// 服务 "{player} config" / "{player} cfg" 这类搜索意图
export function getPlayerConfig(player: ProPlayer): string {
  const lines: string[] = [
    `// ${player.name}'s CS2 settings — paste into your autoexec.cfg`,
    `// (config/cfg/autoexec — same thing: a file CS2 runs on launch)`,
    `// DPI is set in your mouse software / Windows, not here: ${player.dpi} DPI`,
    ``,
    `sensitivity "${player.sensitivity}"`,
    `zoom_sensitivity_ratio_mouse "${player.zoomSensitivity}"`,
    `m_rawinput "1"`,
  ];
  if (player.viewmodel) {
    lines.push(``);
    if (player.viewmodel.presetPos !== undefined) {
      lines.push(`viewmodel_presetpos "${player.viewmodel.presetPos}"`);
    }
    lines.push(
      `viewmodel_fov "${player.viewmodel.fov}"`,
      `viewmodel_offset_x "${player.viewmodel.offsetX}"`,
      `viewmodel_offset_y "${player.viewmodel.offsetY}"`,
      `viewmodel_offset_z "${player.viewmodel.offsetZ}"`,
    );
  }
  lines.push(
    ``,
    `// Crosshair can't be set by a cvar — import the share code on the page above:`,
    `// ${player.crosshairCode}`,
    `host_writeconfig`,
  );
  return lines.join('\n');
}

// 生成 FAQ —— 全部由已验证字段派生，直答 "what mouse/crosshair/dpi/resolution does {player} use" 这类长尾
export function getPlayerFaqs(player: ProPlayer): { q: string; a: string }[] {
  const faqs: { q: string; a: string }[] = [
    {
      q: `What sensitivity does ${player.name} use in CS2?`,
      a: `${player.name} uses ${player.sensitivity} sensitivity at ${player.dpi} DPI, which is an eDPI of ${player.edpi} (about ${player.cm360.toFixed(1)} cm per 360° turn).`,
    },
    {
      q: `What crosshair code does ${player.name} use?`,
      a: `${player.name}'s CS2 crosshair code is ${player.crosshairCode} — ${getPlayerCrosshairDescription(player).toLowerCase()}. Copy it and import it under Settings → Crosshair → Import.`,
    },
    {
      q: `What mouse does ${player.name} use?`,
      a: `${player.name} plays with a ${player.mouse}.${player.gearNotes?.mouse ? ` ${player.gearNotes.mouse}` : ''}`,
    },
    {
      q: `What keyboard does ${player.name} use?`,
      a: `${player.name} uses a ${player.keyboard}.${player.gearNotes?.keyboard ? ` ${player.gearNotes.keyboard}` : ''}`,
    },
    {
      q: `What resolution does ${player.name} play CS2 on?`,
      a: `${player.name} plays on ${player.resolution} (${player.aspectRatio}, ${player.scalingMode.toLowerCase()}).`,
    },
  ];
  if (player.launchOptions) {
    faqs.push({
      q: `What launch options does ${player.name} use?`,
      a: `${player.name}'s CS2 launch options are: ${player.launchOptions}`,
    });
  }
  return faqs;
}

// 国家代码转国旗
export function countryToFlag(countryCode: string): string {
  const flags: Record<string, string> = {
    'UA': '🇺🇦',
    'FR': '🇫🇷',
    'BA': '🇧🇦',
    'RU': '🇷🇺',
    'RO': '🇷🇴',
    'DK': '🇩🇰',
    'EE': '🇪🇪',
    'CA': '🇨🇦',
    'LV': '🇱🇻',
    'LT': '🇱🇹',
    'FI': '🇫🇮',
    'NO': '🇳🇴',
    'SK': '🇸🇰',
    'US': '🇺🇸',
    'BR': '🇧🇷',
    'SE': '🇸🇪',
  };
  return flags[countryCode] || '🏳️';
}
