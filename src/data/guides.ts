// 训练指南文章数据

export interface Guide {
  slug: string;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  category: 'beginner' | 'intermediate' | 'advanced' | 'tips';
  readTime: number; // minutes
  publishedAt: string;
  updatedAt?: string;
  author: string;
  content: string; // Markdown content (English)
  contentZh: string; // Markdown content (Chinese)
}

export const guides: Guide[] = [
  {
    slug: 'improve-aim-cs2',
    title: 'How to Improve Your Aim in CS2: Complete Guide',
    titleZh: '如何提升 CS2 瞄准能力：完整指南',
    description: 'Learn the fundamentals of aiming in Counter-Strike 2. From crosshair placement to flicking techniques, this guide covers everything you need.',
    descriptionZh: '学习 CS2 瞄准的基础知识。从准星摆放到甩枪技巧，本指南涵盖了你需要的一切。',
    category: 'beginner',
    readTime: 8,
    publishedAt: '2024-12-15',
    author: 'CS2 Practice Team',
    content: `
## Introduction

Good aim is the foundation of success in CS2. While game sense and positioning are important, being able to consistently hit your shots separates good players from great ones.

This guide will cover the essential techniques and practice routines to help you improve your aim in Counter-Strike 2.

## 1. Crosshair Placement

**Crosshair placement is the single most important aiming fundamental.** It's about keeping your crosshair at head level and pre-aiming common angles where enemies appear.

### Key Principles:

- Always keep your crosshair at head level
- Pre-aim common angles and corners
- Minimize the distance you need to move your crosshair
- Think about where enemies will peek from

### How to Practice:

1. Play deathmatch focusing only on crosshair placement
2. Walk through maps slowly, checking if your crosshair is at head height
3. Watch pro player demos and observe their crosshair positioning

## 2. Sensitivity Settings

Your sensitivity affects how your aim feels and your consistency. Most professional players use relatively low sensitivity.

### Recommended Ranges:

- **eDPI 400-1200**: Most pro players fall in this range
- **cm/360 of 25-50cm**: Common among professionals

### Finding Your Perfect Sensitivity:

1. Start with a medium sensitivity (eDPI ~800)
2. Can you do a 180° turn comfortably with one swipe?
3. Can you make small adjustments without overshooting?
4. Stick with your choice for at least 2 weeks

## 3. Aim Training Routines

Consistent practice is key to improvement. Here's a structured routine:

### Daily Routine (30 minutes):

1. **Warm-up (5 min)**: Gridshot training at comfortable pace
2. **Precision (10 min)**: Smaller targets, focus on accuracy
3. **Tracking (10 min)**: Follow moving targets smoothly
4. **Flicking (5 min)**: Quick flicks between targets

### Weekly Goals:

- 3-4 aim training sessions
- 2-3 deathmatch sessions
- Review your accuracy statistics

## 4. Mouse Grip and Posture

Physical factors affect your aim more than you might think.

### Common Grip Styles:

- **Palm grip**: Full hand contact, good for arm aimers
- **Claw grip**: Arched fingers, quick micro-adjustments
- **Fingertip grip**: Only fingertips touch, maximum agility

### Posture Tips:

- Sit with your back straight
- Keep your arm at a 90-degree angle
- Position monitor at eye level
- Ensure adequate desk space for mouse movement

## 5. The Mental Game

Aim isn't purely mechanical—your mental state matters.

### Stay Calm:

- Take deep breaths before important duels
- Don't panic spray when you miss
- Reset your composure after deaths

### Avoid Tilting:

- Focus on your process, not results
- Take breaks when frustrated
- Remember that everyone has bad games

## Conclusion

Improving your aim takes time and consistent practice. Focus on one aspect at a time, track your progress, and be patient with yourself.

Start with our [aim training modes](/play) to practice these techniques in a controlled environment.

### Key Takeaways:

1. Master crosshair placement first
2. Find a sensitivity and stick with it
3. Practice consistently, 30 minutes daily
4. Focus on proper grip and posture
5. Stay mentally composed

Good luck, and see you in the server!
`,
    contentZh: `
## 前言

良好的瞄准能力是 CS2 成功的基础。虽然游戏意识和走位很重要，但能够稳定命中目标才是区分优秀玩家和顶尖玩家的关键。

本指南将介绍帮助你在 CS2 中提升瞄准能力的核心技巧和练习方法。

## 1. 准星摆放

**准星摆放是最重要的瞄准基础。** 它要求你始终将准星保持在头部高度，并预瞄敌人可能出现的常见位置。

### 核心原则：

- 始终将准星保持在头部高度
- 预瞄常见的角落和拐角
- 最小化准星移动的距离
- 提前思考敌人会从哪里出现

### 如何练习：

1. 在死斗模式中专注练习准星摆放
2. 在地图中慢慢走动，检查准星是否在头部高度
3. 观看职业选手的 Demo，学习他们的准星摆放

## 2. 灵敏度设置

你的灵敏度会影响瞄准手感和稳定性。大多数职业选手使用相对较低的灵敏度。

### 推荐范围：

- **eDPI 400-1200**：大多数职业选手在这个范围内
- **cm/360 25-50cm**：职业选手常用的范围

### 找到你的最佳灵敏度：

1. 从中等灵敏度开始（eDPI ~800）
2. 能否舒适地一次划动完成 180° 转身？
3. 能否进行微调而不过头？
4. 选定后至少坚持使用 2 周

## 3. 瞄准训练计划

持续练习是提升的关键。以下是结构化的训练计划：

### 每日训练（30分钟）：

1. **热身（5分钟）**：舒适节奏的 Gridshot 训练
2. **精准度（10分钟）**：小目标，专注准确率
3. **追踪（10分钟）**：平滑跟踪移动目标
4. **甩枪（5分钟）**：快速甩枪练习

### 每周目标：

- 3-4 次瞄准训练
- 2-3 次死斗练习
- 回顾你的准确率统计

## 4. 握鼠方式和坐姿

身体因素对瞄准的影响比你想象的更大。

### 常见握鼠方式：

- **趴握**：整个手掌接触鼠标，适合手臂瞄准
- **抓握**：手指弯曲，适合快速微调
- **指握**：只有指尖接触，最大灵活性

### 坐姿建议：

- 背部挺直
- 手臂保持 90 度角
- 显示器与眼睛平齐
- 确保有足够的鼠标移动空间

## 5. 心理因素

瞄准不仅仅是机械操作——心态也很重要。

### 保持冷静：

- 重要对枪前深呼吸
- 打空时不要慌乱扫射
- 死亡后重置心态

### 避免上头：

- 专注于过程，而不是结果
- 感到沮丧时休息一下
- 记住每个人都会有状态差的时候

## 结论

提升瞄准能力需要时间和持续练习。一次专注一个方面，追踪你的进步，对自己有耐心。

从我们的[瞄准训练模式](/play)开始，在可控环境中练习这些技巧。

### 关键要点：

1. 首先掌握准星摆放
2. 找到一个灵敏度并坚持使用
3. 每天坚持练习30分钟
4. 注意正确的握鼠方式和坐姿
5. 保持心态稳定

祝你好运，服务器见！
`,
  },
  {
    slug: 'gridshot-guide',
    title: 'Gridshot Training: Tips and Techniques for High Scores',
    titleZh: 'Gridshot 训练：高分技巧与方法',
    description: 'Master the Gridshot aim training mode. Learn techniques to improve your reaction time and click accuracy.',
    descriptionZh: '掌握 Gridshot 瞄准训练模式。学习提升反应速度和点击准确率的技巧。',
    category: 'intermediate',
    readTime: 6,
    publishedAt: '2024-12-20',
    author: 'CS2 Practice Team',
    content: `
## What is Gridshot?

Gridshot is one of the most popular aim training exercises. Multiple targets appear on screen, and you must click them as quickly and accurately as possible.

It trains:
- **Reaction time**
- **Target acquisition speed**
- **Click accuracy**
- **Mouse control**

## Optimal Technique

### 1. Stay Centered

Keep your crosshair near the center of the screen. This minimizes the maximum distance to any target.

**Wrong**: Moving your crosshair to the edges
**Right**: Return to center after each click

### 2. Smooth Mouse Movement

Don't jerk your mouse. Smooth, controlled movements are faster than erratic ones.

- Use your arm for large movements
- Use your wrist for fine adjustments
- Maintain consistent acceleration

### 3. Click Timing

Click when your crosshair reaches the target, not after. Anticipate the target location.

**Pro tip**: Practice clicking the instant your crosshair enters the target, not after you "confirm" it's there.

## Common Mistakes

### 1. Tunnel Vision

Focusing too hard on one area of the screen. Keep your peripheral vision active.

### 2. Over-flicking

Moving past targets and having to correct. This wastes precious time.

### 3. Rushing

Going too fast and missing targets. Accuracy should be prioritized over speed.

## Training Progression

### Week 1-2: Focus on Accuracy

- Target 90%+ accuracy
- Don't worry about score
- Build muscle memory

### Week 3-4: Increase Speed

- Gradually push your pace
- Maintain 85%+ accuracy
- Notice your score improving

### Week 5+: Optimize

- Find your optimal speed/accuracy balance
- Experiment with sensitivity adjustments
- Compete against your personal bests

## Settings Recommendations

### Target Size

- **Large**: For warming up
- **Medium**: Standard practice
- **Small**: Precision training

### Session Length

- 30-60 second sessions
- Take 30 second breaks between
- Total 10-15 minutes of Gridshot per day

## Tracking Progress

Record your scores and accuracy over time. Look for:

- Improvement trends
- Consistency
- Peak performance times (morning vs. evening)

Use our [stats page](/stats) to track your training history automatically.

## Conclusion

Gridshot is excellent for building raw mechanical skill, but remember—it's just one piece of the puzzle. Combine it with tracking training, in-game practice, and proper crosshair placement drills for complete aim development.

[Start practicing Gridshot now →](/play/gridshot)
`,
    contentZh: `
## 什么是 Gridshot？

Gridshot 是最受欢迎的瞄准训练之一。屏幕上会出现多个目标，你需要尽可能快速、准确地点击它们。

它训练：
- **反应速度**
- **目标捕获速度**
- **点击准确率**
- **鼠标控制**

## 最佳技巧

### 1. 保持居中

将准星保持在屏幕中心附近。这样可以最小化到任何目标的最大距离。

**错误**：把准星移到边缘
**正确**：每次点击后回到中心

### 2. 平滑的鼠标移动

不要猛拉鼠标。平滑、可控的移动比急促的移动更快。

- 大幅移动时使用手臂
- 微调时使用手腕
- 保持一致的加速度

### 3. 点击时机

准星到达目标时就点击，不要等待。预判目标位置。

**专业提示**：练习在准星进入目标的瞬间点击，而不是等"确认"目标存在后再点击。

## 常见错误

### 1. 隧道视野

过于专注屏幕某个区域。保持余光的活跃。

### 2. 过度甩枪

移动超过目标后需要修正。这会浪费宝贵的时间。

### 3. 太急躁

速度太快导致打空。准确率应该优先于速度。

## 训练进度

### 第 1-2 周：专注准确率

- 目标 90%+ 准确率
- 不用担心分数
- 建立肌肉记忆

### 第 3-4 周：提升速度

- 逐渐加快节奏
- 保持 85%+ 准确率
- 观察分数的提升

### 第 5 周+：优化

- 找到速度/准确率的最佳平衡
- 尝试调整灵敏度
- 与自己的最佳成绩比赛

## 设置建议

### 目标大小

- **大**：热身用
- **中**：标准练习
- **小**：精准度训练

### 训练时长

- 每次 30-60 秒
- 中间休息 30 秒
- 每天总计 10-15 分钟 Gridshot

## 追踪进度

记录你的分数和准确率。关注：

- 进步趋势
- 稳定性
- 最佳表现时间（早上 vs 晚上）

使用我们的[统计页面](/stats)自动追踪你的训练历史。

## 结论

Gridshot 非常适合建立基础机械技能，但记住——它只是拼图的一部分。结合追踪训练、游戏内练习和准星摆放训练，全面发展你的瞄准能力。

[立即开始 Gridshot 练习 →](/play/gridshot)
`,
  },
  {
    slug: 'tracking-aim-guide',
    title: 'Tracking Aim: How to Smoothly Follow Moving Targets',
    titleZh: '追踪瞄准：如何平滑跟踪移动目标',
    description: 'Improve your tracking aim for CS2 and other FPS games. Learn techniques to keep your crosshair on moving targets.',
    descriptionZh: '提升你在 CS2 和其他 FPS 游戏中的追踪瞄准能力。学习将准星保持在移动目标上的技巧。',
    category: 'intermediate',
    readTime: 7,
    publishedAt: '2024-12-22',
    author: 'CS2 Practice Team',
    content: `
## Why Tracking Matters in CS2

While CS2 emphasizes flicking and crosshair placement, tracking is essential for:

- Spraying down moving targets
- Following enemies strafing during duels
- Holding angles on fast-moving opponents
- Spray transfers between multiple enemies

## The Basics of Tracking

### What is Tracking?

Tracking is keeping your crosshair continuously on a moving target. Unlike flicking (one quick movement), tracking requires smooth, sustained mouse control.

### Two Types of Tracking:

1. **Reactive Tracking**: Following unpredictable movement
2. **Predictive Tracking**: Anticipating where the target will go

## Technique Fundamentals

### 1. Match Target Speed

Your crosshair should move at the same speed as the target. Don't lag behind or overshoot ahead.

**Practice drill**: Watch the target for 1-2 seconds before engaging. Get a feel for its movement pattern.

### 2. Smooth Acceleration

Avoid jerky movements. Use gradual acceleration and deceleration to match target velocity changes.

### 3. Use Your Arm

For larger tracking movements, use your entire arm. Reserve wrist movements for small adjustments.

### 4. Stay Relaxed

Tension in your arm and wrist makes smooth tracking difficult. Keep a relaxed grip on your mouse.

## Common Tracking Patterns

### Linear Tracking

Target moves in a straight line. Simplest form of tracking.

**How to practice**: Start with slow linear targets, gradually increase speed.

### Strafing (A-D) Tracking

Target changes direction unpredictably. Most relevant to CS2.

**How to practice**: Use the Strafe pattern in tracking training.

### Curved Tracking

Target moves in arcs or circles. Less common in CS2 but good for overall control.

## Training Routine

### Warm-up (3 min)

- Slow linear tracking
- Focus on smoothness, not speed

### Main Practice (10 min)

- Strafe pattern tracking
- Vary target size and speed

### Challenge (5 min)

- Fast targets
- Small targets
- Push your limits

## Sensitivity Considerations

Tracking is generally easier with lower sensitivity because:

- More mouse movement = more control
- Easier to make micro-adjustments
- Better smoothness

However, too low sensitivity makes direction changes difficult. Find your balance.

## Applying Tracking to CS2

### During Sprays

When spraying a moving target:
1. Start your crosshair slightly ahead of the target
2. Track while controlling recoil
3. If they stop, adjust immediately

### Holding Angles

When an enemy peeks, your tracking starts immediately:
1. React to movement
2. Track while firing
3. Continue tracking even if they counterstrafe

## Progress Metrics

Track your training accuracy over time. Aim for:

- **Beginner**: 50-60% tracking accuracy
- **Intermediate**: 60-75% tracking accuracy
- **Advanced**: 75%+ tracking accuracy

## Conclusion

Tracking complements your flicking ability. Even in CS2 where flicking is emphasized, smooth tracking wins spray fights and makes you a more complete player.

[Practice tracking now →](/play/tracking)
`,
    contentZh: `
## 为什么追踪在 CS2 中很重要

虽然 CS2 强调甩枪和准星摆放，但追踪瞄准对以下场景至关重要：

- 扫射移动的目标
- 跟踪对枪时左右移动的敌人
- 架枪时应对快速移动的对手
- 多目标之间的转枪

## 追踪瞄准基础

### 什么是追踪？

追踪是将准星持续保持在移动目标上。与甩枪（一次快速移动）不同，追踪需要平滑、持续的鼠标控制。

### 两种追踪类型：

1. **反应式追踪**：跟踪不可预测的移动
2. **预判式追踪**：预测目标的移动方向

## 技术基础

### 1. 匹配目标速度

你的准星应该以与目标相同的速度移动。不要落后或超前。

**练习方法**：开火前观察目标 1-2 秒，感受其移动规律。

### 2. 平滑加速

避免急促的动作。使用渐进的加速和减速来匹配目标速度变化。

### 3. 使用手臂

对于大幅度追踪，使用整个手臂。将手腕动作保留给小幅调整。

### 4. 保持放松

手臂和手腕的紧张会使平滑追踪变得困难。保持放松的握鼠姿势。

## 常见追踪模式

### 直线追踪

目标沿直线移动。最简单的追踪形式。

**如何练习**：从慢速直线目标开始，逐渐提高速度。

### 左右闪避追踪

目标不可预测地改变方向。与 CS2 最相关。

**如何练习**：在追踪训练中使用左右闪避模式。

### 曲线追踪

目标沿弧线或圆圈移动。在 CS2 中较少见，但对整体控制有益。

## 训练计划

### 热身（3分钟）

- 慢速直线追踪
- 专注于平滑度，而非速度

### 主要练习（10分钟）

- 左右闪避追踪
- 变换目标大小和速度

### 挑战（5分钟）

- 快速目标
- 小目标
- 挑战极限

## 灵敏度考量

追踪通常在较低灵敏度下更容易，因为：

- 更多鼠标移动 = 更多控制
- 更容易进行微调
- 更好的平滑度

但是，灵敏度太低会使方向改变变得困难。找到你的平衡点。

## 在 CS2 中应用追踪

### 扫射时

扫射移动目标时：
1. 将准星放在目标稍前方
2. 追踪的同时控制后坐力
3. 如果目标停止，立即调整

### 架枪时

当敌人出现时，立即开始追踪：
1. 对移动做出反应
2. 边开火边追踪
3. 即使对方急停也继续追踪

## 进度指标

追踪你的训练准确率。目标：

- **初学者**：50-60% 追踪准确率
- **进阶者**：60-75% 追踪准确率
- **高手**：75%+ 追踪准确率

## 结论

追踪能力是甩枪能力的补充。即使在强调甩枪的 CS2 中，平滑的追踪也能赢得扫射战，让你成为更全面的玩家。

[立即练习追踪 →](/play/tracking)
`,
  },
  {
    slug: 'sensitivity-guide',
    title: 'Finding Your Perfect Sensitivity in CS2',
    titleZh: '找到你在 CS2 中的最佳灵敏度',
    description: 'How to choose the right mouse sensitivity for CS2. Understand eDPI, cm/360, and find settings that work for you.',
    descriptionZh: '如何为 CS2 选择合适的鼠标灵敏度。理解 eDPI、cm/360，找到适合你的设置。',
    category: 'beginner',
    readTime: 5,
    publishedAt: '2024-12-18',
    author: 'CS2 Practice Team',
    content: `
## Understanding Sensitivity in CS2

Your sensitivity setting determines how fast your crosshair moves when you move your mouse. Getting this right is crucial for consistent aim.

## Key Terms

### DPI (Dots Per Inch)

Your mouse's hardware sensitivity. Common values: 400, 800, 1600.

### In-game Sensitivity

The multiplier in CS2's settings. Default is around 2.0.

### eDPI (Effective DPI)

DPI × In-game Sensitivity = eDPI

This is your "true" sensitivity. Players with 400 DPI / 2.0 sens and 800 DPI / 1.0 sens have the same eDPI (800).

### cm/360

The physical distance to move your mouse for a full 360° turn. Lower sensitivity = higher cm/360.

## What Do Pros Use?

Most professional CS2 players use:

- **eDPI range**: 400-1200
- **cm/360 range**: 25-60 cm
- **Average eDPI**: ~850

You can see exact pro settings in our [pro player database](/pro).

## How to Find Your Sensitivity

### Step 1: Start with a Base

- If new to FPS: Start with eDPI 800
- If coming from another game: [Convert your sensitivity](/tools/sensitivity-converter)

### Step 2: The Tracking Test

1. Pick a spot on the wall
2. Strafe left-right while keeping crosshair on that spot
3. Too hard? Lower sensitivity
4. Too easy/sluggish? Raise sensitivity

### Step 3: The Flick Test

1. Look at one spot
2. Quickly turn to look behind you (180°)
3. Can you do it in one comfortable motion?
4. No? Your sensitivity might be too low

### Step 4: Commit

Once you find something comfortable:

1. **Stick with it for 2+ weeks**
2. Don't change based on one bad game
3. Minor adjustments are okay, major changes reset your muscle memory

## High vs Low Sensitivity

### Low Sensitivity (eDPI 400-700)

**Pros:**
- More precise aim
- Easier micro-adjustments
- More consistent

**Cons:**
- Harder to turn quickly
- Requires more desk space
- More arm fatigue

**Best for**: AWPing, patient playstyles

### High Sensitivity (eDPI 900-1200)

**Pros:**
- Quick turns
- Less arm movement
- Better for entry fragging

**Cons:**
- Harder to be precise
- Easier to overshoot

**Best for**: Entry fraggers, aggressive play

## Common Mistakes

### 1. Changing Too Often

Give each sensitivity at least 1-2 weeks before judging.

### 2. Copying Pros Exactly

Their sensitivity works for them, not necessarily for you. Use pro settings as a starting point.

### 3. Ignoring Mouse Pad

A larger mousepad lets you use lower sensitivity more comfortably.

## DPI Myth-Busting

### "400 DPI is best"

Not really. 400 DPI and 800 DPI are both fine. Higher DPI can actually be smoother on modern sensors.

### "Higher DPI = more input lag"

False on modern mice. Use whatever DPI is comfortable for your desktop.

## Conclusion

The "best" sensitivity is one that:

1. You can aim precisely with
2. You can turn quickly enough with
3. You've practiced consistently with

Use our [sensitivity converter](/tools/sensitivity-converter) to match your settings across games, and our [aim trainer](/play) to practice.
`,
    contentZh: `
## 理解 CS2 中的灵敏度

灵敏度设置决定了移动鼠标时准星移动的速度。正确设置灵敏度对稳定的瞄准至关重要。

## 关键术语

### DPI（每英寸点数）

鼠标的硬件灵敏度。常见值：400、800、1600。

### 游戏内灵敏度

CS2 设置中的倍数。默认约为 2.0。

### eDPI（有效 DPI）

DPI × 游戏内灵敏度 = eDPI

这是你的"真实"灵敏度。400 DPI / 2.0 灵敏度的玩家和 800 DPI / 1.0 灵敏度的玩家有相同的 eDPI（800）。

### cm/360

完成一个完整 360° 转身需要移动鼠标的物理距离。灵敏度越低 = cm/360 越高。

## 职业选手用什么？

大多数 CS2 职业选手使用：

- **eDPI 范围**：400-1200
- **cm/360 范围**：25-60 cm
- **平均 eDPI**：约 850

你可以在我们的[职业选手数据库](/pro)中查看确切的设置。

## 如何找到你的灵敏度

### 第 1 步：确定基础值

- 如果是 FPS 新手：从 eDPI 800 开始
- 如果来自其他游戏：[转换你的灵敏度](/tools/sensitivity-converter)

### 第 2 步：追踪测试

1. 在墙上选一个点
2. 左右移动的同时保持准星在那个点上
3. 太难？降低灵敏度
4. 太简单/迟钝？提高灵敏度

### 第 3 步：甩枪测试

1. 看着一个点
2. 快速转身看身后（180°）
3. 能否一次舒适地完成？
4. 不能？你的灵敏度可能太低

### 第 4 步：坚持

一旦找到舒适的设置：

1. **坚持使用至少 2 周**
2. 不要因为一场差的比赛就改变
3. 小幅调整可以，大幅改变会重置肌肉记忆

## 高灵敏度 vs 低灵敏度

### 低灵敏度（eDPI 400-700）

**优点：**
- 更精准的瞄准
- 更容易微调
- 更稳定

**缺点：**
- 转身较慢
- 需要更大的桌面空间
- 手臂更容易疲劳

**适合**：AWP 狙击、稳健打法

### 高灵敏度（eDPI 900-1200）

**优点：**
- 快速转身
- 手臂移动更少
- 更适合突破手

**缺点：**
- 更难精准
- 更容易过头

**适合**：突破手、激进打法

## 常见错误

### 1. 改动太频繁

每个灵敏度至少使用 1-2 周再评判。

### 2. 完全复制职业选手

他们的灵敏度适合他们，不一定适合你。把职业选手的设置作为起点。

### 3. 忽视鼠标垫

更大的鼠标垫让你能更舒适地使用低灵敏度。

## DPI 误区澄清

### "400 DPI 最好"

不一定。400 DPI 和 800 DPI 都可以。在现代传感器上，更高的 DPI 实际上可能更平滑。

### "更高的 DPI = 更多输入延迟"

在现代鼠标上是错误的。使用你在桌面上感觉舒适的 DPI 即可。

## 结论

"最好"的灵敏度是：

1. 你能精准瞄准的
2. 你能快速转身的
3. 你持续练习过的

使用我们的[灵敏度转换器](/tools/sensitivity-converter)在不同游戏间同步设置，使用我们的[瞄准训练器](/play)进行练习。
`,
  },
  {
    slug: 'warm-up-routine',
    title: '15-Minute Aim Warm-up Routine Before Playing CS2',
    titleZh: '打 CS2 前的 15 分钟瞄准热身计划',
    description: 'A quick but effective warm-up routine to prepare your aim before competitive CS2 matches.',
    descriptionZh: '在打 CS2 天梯之前，用这个快速有效的热身计划准备你的瞄准状态。',
    category: 'tips',
    readTime: 4,
    publishedAt: '2024-12-25',
    author: 'CS2 Practice Team',
    content: `
## Why Warm Up?

Jumping straight into competitive matches cold leads to:

- Slower reaction times
- Inconsistent aim
- Poor decision making
- Frustration from underperforming

A good warm-up gets your muscles ready and puts you in the right mindset.

## The 15-Minute Routine

### Minutes 1-3: Gridshot (Easy)

**Settings**: Large targets, comfortable pace

**Purpose**: Wake up your hand-eye coordination

**Focus on**:
- Smooth mouse movements
- Clean clicks
- Don't rush

### Minutes 4-6: Gridshot (Medium)

**Settings**: Medium targets, push your speed

**Purpose**: Increase reaction speed

**Focus on**:
- Faster target acquisition
- Maintain 80%+ accuracy
- Find your rhythm

### Minutes 7-9: Tracking

**Settings**: Medium speed, strafe pattern

**Purpose**: Warm up sustained aim

**Focus on**:
- Smooth, continuous tracking
- Match target velocity
- Stay relaxed

### Minutes 10-12: Flicking

**Settings**: Medium distance, medium size

**Purpose**: Prepare your flicking muscles

**Focus on**:
- Quick, precise flicks
- Return to center
- Consistent speed

### Minutes 13-15: Mixed/Free Play

**Purpose**: Put it all together

**Options**:
- Gridshot at high intensity
- Mix of all modes
- Whatever feels weakest

## Quick 5-Minute Version

When you're short on time:

1. **2 min**: Fast Gridshot
2. **2 min**: Tracking
3. **1 min**: Flicking

Better than nothing!

## Tips for Effective Warm-up

### 1. Consistency Matters

Warm up the same way before each session. Build a routine your body recognizes.

### 2. Don't Overdo It

15 minutes is enough. More warm-up can fatigue you before the actual game.

### 3. Match Your Game Settings

Use the same sensitivity and crosshair you'll use in CS2.

### 4. Stay Relaxed

Warm-up isn't practice. Don't stress about scores. The goal is to prepare, not improve.

### 5. Physical Warm-up

Consider:
- Wrist stretches
- Hand exercises
- Shoulder rolls

## Post-Warm-up Checklist

Before queueing:

- [ ] Hands feel responsive
- [ ] Aim feels on point
- [ ] Mentally focused
- [ ] Hydrated
- [ ] Comfortable setup

## When to Skip Warm-up

If you've been aim training already that day, a quick 2-3 minute check is enough.

If you're just playing casual games, warm-up is optional but still recommended.

## Conclusion

15 minutes of focused warm-up will improve your first few rounds significantly. Those early rounds often determine the match's momentum.

Build this routine into your pre-game ritual, and watch your performance become more consistent.

[Start your warm-up now →](/play)
`,
    contentZh: `
## 为什么要热身？

直接冷启动进入天梯会导致：

- 反应变慢
- 瞄准不稳定
- 决策失误
- 因表现不佳而沮丧

良好的热身让你的肌肉准备就绪，进入正确的状态。

## 15 分钟热身计划

### 第 1-3 分钟：Gridshot（简单）

**设置**：大目标，舒适的节奏

**目的**：唤醒手眼协调

**专注于**：
- 平滑的鼠标移动
- 干净的点击
- 不要急躁

### 第 4-6 分钟：Gridshot（中等）

**设置**：中等目标，加快速度

**目的**：提升反应速度

**专注于**：
- 更快的目标捕获
- 保持 80%+ 准确率
- 找到节奏

### 第 7-9 分钟：追踪

**设置**：中等速度，左右闪避模式

**目的**：热身持续瞄准

**专注于**：
- 平滑、连续的追踪
- 匹配目标速度
- 保持放松

### 第 10-12 分钟：甩枪

**设置**：中等距离，中等大小

**目的**：准备你的甩枪肌肉

**专注于**：
- 快速、精准的甩枪
- 回到中心
- 速度一致

### 第 13-15 分钟：混合/自由练习

**目的**：融合所有技能

**选择**：
- 高强度 Gridshot
- 混合所有模式
- 练习你最弱的环节

## 快速 5 分钟版本

时间紧张时：

1. **2 分钟**：快速 Gridshot
2. **2 分钟**：追踪
3. **1 分钟**：甩枪

总比不热身好！

## 有效热身的技巧

### 1. 保持一致

每次都用相同的方式热身。建立身体能识别的惯例。

### 2. 不要过度

15 分钟就够了。热身太久会在正式比赛前就疲劳。

### 3. 使用相同的游戏设置

使用你在 CS2 中用的相同灵敏度和准星。

### 4. 保持放松

热身不是练习。不要为分数紧张。目标是准备，不是提升。

### 5. 身体热身

考虑：
- 手腕拉伸
- 手部活动
- 肩部转动

## 热身后检查清单

开始匹配前：

- [ ] 手感灵活
- [ ] 瞄准状态好
- [ ] 精神集中
- [ ] 已补充水分
- [ ] 设置舒适

## 什么时候可以跳过热身

如果当天已经进行过瞄准训练，快速 2-3 分钟的检查就够了。

如果只是玩休闲模式，热身是可选的，但仍建议进行。

## 结论

15 分钟专注的热身会显著提升你前几回合的表现。这些早期回合往往决定了比赛的走势。

把这个计划融入你的赛前仪式，你的表现会变得更加稳定。

[现在开始热身 →](/play)
`,
  },
  {
    slug: 'best-cs2-settings-fps',
    title: 'Best CS2 Settings for FPS and Performance in 2026',
    titleZh: 'CS2 性能优化设置指南 2026',
    description: 'The settings that actually matter for higher FPS and smoother gameplay in CS2. Based on what pros use and what testing shows works.',
    descriptionZh: '真正影响 CS2 帧率和流畅度的设置。基于职业选手配置和实测结果。',
    category: 'beginner',
    readTime: 7,
    publishedAt: '2026-04-14',
    author: 'CS2 Practice Team',
    content: `
## Why settings matter in CS2

CS2 runs on Source 2, which is a big change from CS:GO. Some old optimization tricks don't apply anymore. Other settings matter more than they used to.

This guide covers the settings that actually move the needle — in the order they actually matter. I'll skip the placebo stuff.

## The settings that actually matter

### 1. Resolution and aspect ratio

This is the single biggest FPS lever you have.

**1920x1080 native** is what most modern monitors use, and it looks great. But it's more demanding than older resolutions. Dropping to lower resolutions has a clear FPS impact.

**Pro standard: 1280x960 stretched (4:3)**

Most pros run 1280x960 stretched to 16:9. Why? Two reasons:
- Lower resolution = more FPS
- Stretched makes player models look wider on screen (easier to hit)

The tradeoff: your field of view gets compressed. Things look closer than they are. You get used to it in about a week.

**1440x1080 stretched** is a middle ground — slightly sharper than 1280x960, still stretched for the wider models.

### 2. FPS cap

Set \`fps_max 0\` in console to remove the cap. Or set it to double your monitor refresh rate if you want to save GPU (e.g., 480 for a 240Hz monitor).

CS2 has some weird frame pacing issues below 200 FPS. If your PC can maintain 300+ FPS consistently, the game feels much smoother.

### 3. V-Sync and G-Sync

**V-Sync: Off. Always.** V-Sync adds input latency. In a game where milliseconds matter, this is a hard no.

**G-Sync/FreeSync: On if you have it.** Unlike V-Sync, adaptive sync technologies don't add input lag. They prevent screen tearing. Turn it on in NVIDIA Control Panel or AMD Software.

One caveat: cap your FPS to about 3 below your monitor's max refresh rate when using G-Sync. For a 240Hz monitor, \`fps_max 237\`. This keeps you in the G-Sync range.

### 4. Graphics quality settings

In the Video settings menu:

| Setting | Recommendation |
|:--|:--|
| Global Shadow Quality | Low or Medium |
| Dynamic Shadows | All |
| Model/Texture Detail | Medium or High |
| Texture Filtering Mode | Anisotropic 4x |
| Shader Detail | Low or Medium |
| Particle Detail | Low |
| Ambient Occlusion | Disabled |
| HDR | Quality |
| FidelityFX Super Resolution | Highest Quality or Disabled |
| Nvidia Reflex Low Latency | Enabled + Boost |

**Nvidia Reflex** is the single most important anti-latency setting. If you have an Nvidia GPU, turn it on.

**Shadows** are worth keeping on Medium at minimum because they tell you where opponents are hiding. Low shadows can miss important detail.

### 5. Raw input

\`m_rawinput 1\` should be on. It bypasses Windows mouse acceleration and gives you a direct mouse signal. CS2 has this on by default but it's worth checking.

### 6. Mouse sensitivity

Sensitivity doesn't affect FPS but it's the single biggest aim variable. See our [sensitivity guide](/guides/sensitivity-guide) for details.

## Settings that don't matter as much as people think

### Multicore rendering

In CS:GO this was a big toggle. In CS2 it's baked in. Don't waste time looking for it.

### Launch options

Most launch options from CS:GO don't work in CS2. Valve specifically removed a lot of them. The ones still useful:

- \`-novid\` — skip intro video
- \`-high\` — run in high priority (marginal effect)
- \`+fps_max 0\` — remove FPS cap on startup

That's about it. Don't copy-paste 20 launch options from a YouTube video, most will do nothing.

### \`mat_queue_mode\` and other cvars

Source 2 handles threading automatically. The old Source 1 cvars either don't exist or don't affect performance.

## What to do if your FPS is bad

Rough FPS targets by hardware tier:

- **Entry-level (GTX 1650, RX 570)**: 144+ FPS at 1080p low should be achievable
- **Mid-range (RTX 3060, RX 6600)**: 240+ FPS at 1080p medium
- **High-end (RTX 4070+, RX 7800 XT+)**: 400+ FPS at 1440p medium

If you're way below these, try in order:

1. Lower resolution (try 1280x960 stretched)
2. Turn off Ambient Occlusion
3. Shadow Quality to Low
4. Update GPU drivers (Nvidia Studio for stability, Game Ready for bleeding edge)
5. Close Chrome. Seriously. Chrome eats VRAM.
6. Check if Windows is in Power Saver mode

## Wrapping up

Settings matter less than most people think for improving. 144 FPS is playable, 240 is smooth, anything higher is diminishing returns unless you're a top-tier player.

Set your resolution, turn on Nvidia Reflex, turn off V-Sync, and go train. Your sensitivity matters more than your settings.

[Try our sensitivity converter →](/tools/sensitivity-converter)
`,
    contentZh: `
## 为什么设置很重要

CS2 基于 Source 2 引擎，和 CS:GO 差异很大。一些老的优化技巧不再适用，另一些设置反而变得更重要。

本文只讲真正有影响的设置，按优先级排序。

## 最重要的设置

### 1. 分辨率和宽高比

这是对 FPS 影响最大的设置。

**1920x1080 原生**清晰度最好但性能开销大。降低分辨率能明显提升帧率。

**职业选手标准: 1280x960 拉伸 (4:3)**

大多数职业选手用这个分辨率，原因有两个：
- 低分辨率 = 高 FPS
- 拉伸后人物模型看起来更宽，更容易打中

代价：视野范围压缩。需要一周左右适应。

### 2. FPS 上限

控制台输入 \`fps_max 0\` 解锁帧率限制。或设为显示器刷新率的 2 倍（如 240Hz 显示器设 480）。

CS2 在 200 FPS 以下会有帧时间不稳定的问题。如果你的电脑能稳定跑 300+ FPS，游戏体验会明显更顺。

### 3. V-Sync 和 G-Sync

**V-Sync: 关闭。**V-Sync 会增加输入延迟，在这种毫秒决定胜负的游戏里绝对不开。

**G-Sync/FreeSync: 有就开。**自适应同步技术不会增加输入延迟，但能消除画面撕裂。在 NVIDIA 控制面板或 AMD 软件里打开。

### 4. 画质设置

| 设置 | 推荐 |
|:--|:--|
| 全局阴影质量 | 低 或 中 |
| 动态阴影 | 全部 |
| 模型/纹理细节 | 中 或 高 |
| 纹理过滤 | 各向异性 4x |
| 着色器细节 | 低 或 中 |
| 粒子细节 | 低 |
| 环境光遮蔽 | 关闭 |
| Nvidia Reflex 低延迟 | 开启 + 增强 |

**Nvidia Reflex** 是最重要的反延迟设置。N 卡用户必开。

**阴影**至少保持"中"，因为阴影能暴露躲藏的敌人。

### 5. 原始输入

\`m_rawinput 1\` 应该开启。绕过 Windows 鼠标加速，直接读取鼠标信号。CS2 默认开启，但最好确认一下。

## 被高估的设置

### 启动项

CS2 移除了很多 CS:GO 的启动项。还能用的：

- \`-novid\` — 跳过开场动画
- \`-high\` — 高优先级运行
- \`+fps_max 0\` — 启动时解除帧率限制

就这些。别照抄 YouTube 视频里那些一大堆启动项，大部分都不起作用了。

### \`mat_queue_mode\` 等控制台变量

Source 2 自动处理多线程。老的 Source 1 cvar 要么不存在，要么没效果。

## 如果帧率不够

不同硬件档次的参考目标：

- **入门级 (GTX 1650, RX 570)**: 1080p 低画质应该能稳 144+ FPS
- **中端 (RTX 3060, RX 6600)**: 1080p 中画质 240+ FPS
- **高端 (RTX 4070+)**: 1440p 中画质 400+ FPS

低于这些目标，依次尝试：

1. 降低分辨率（试 1280x960 拉伸）
2. 关闭环境光遮蔽
3. 阴影质量调到低
4. 更新显卡驱动
5. 关掉 Chrome（是的真的，Chrome 吃显存）
6. 确认 Windows 不在节能模式

## 总结

对提升水平来说，设置的作用比大多数人想的小。144 FPS 可玩，240 FPS 流畅，再高就是边际效用递减了（除非你是顶尖选手）。

设好分辨率、开 Nvidia Reflex、关 V-Sync，然后去练瞄准。灵敏度比画质设置重要得多。

[用灵敏度转换器 →](/tools/sensitivity-converter)
`,
  },
  {
    slug: 'cs2-crosshair-guide',
    title: 'How to Choose Your CS2 Crosshair: A Practical Guide',
    titleZh: '如何选择 CS2 准星：实用指南',
    description: 'Stop copying random pro crosshairs. Here is how to actually pick one that fits how you play, with the important crosshair settings explained.',
    descriptionZh: '别再随便复制职业选手的准星。这篇讲如何根据你的打法选准星，以及每个参数的作用。',
    category: 'beginner',
    readTime: 8,
    publishedAt: '2026-04-14',
    author: 'CS2 Practice Team',
    content: `
## The wrong way to pick a crosshair

Most players pick a crosshair by copying a pro they like. This works sometimes, but often it doesn't — what works for s1mple on 1280x960 stretched might look weird to you at 1920x1080 native.

A better approach: understand what each crosshair setting does, then build one that fits your eyes and your playstyle.

## The settings that matter

CS2 has a dozen crosshair settings. These are the ones that actually change how it feels.

### Size (\`cl_crosshairsize\`)

How long the crosshair lines extend from the center.

- **Small (2-3)**: Minimal visual obstruction. Good for precise aim on headshots.
- **Medium (4-5)**: Balanced. Most pros use something in this range.
- **Large (6-8)**: Easier to spot in peripheral vision. Worse for small targets.

If you're consistently missing close-range shots because your crosshair is too thick — go smaller. If you lose track of your crosshair in chaotic moments — go larger.

### Thickness (\`cl_crosshairthickness\`)

How wide each line is.

- **Thin (0.5-1)**: Clean, precise. Can be hard to see on busy backgrounds.
- **Medium (1-1.5)**: Most common in pro play.
- **Thick (2+)**: Very visible, but obscures part of your target at longer ranges.

A thick crosshair at 1.0 sensitivity on Mirage A site can literally cover a head at 30+ meters. Keep it thin if you play long-range.

### Gap (\`cl_crosshairgap\`)

Space between the center and the start of each line.

- **Negative (-3 to -1)**: Lines overlap at the center. Creates a "plus" look.
- **Zero**: Lines meet at the center.
- **Small positive (1-3)**: Small open center, common setup.
- **Large positive (4+)**: Wide open center, good if you don't want lines blocking your aim point.

If you use a center dot, a larger gap looks cleaner because the lines don't crowd the dot.

### Dot (\`cl_crosshairdot\`)

Set to 1 to add a center dot, 0 to remove it.

Some players find a dot distracting. Others find it essential for precise aim at long range. Try both for a week each and see.

### Color (\`cl_crosshaircolor\`)

1-4 are preset colors, 5 is custom RGB.

**Green** is most popular — good visibility on most maps. Cyan is a close second. Yellow is great on dark maps (Ancient, Nuke) but can disappear against sand. Red looks aggressive but blends into blood and the HUD.

For custom color, use \`cl_crosshaircolor 5\` then set \`cl_crosshaircolor_r\`, \`_g\`, \`_b\`.

### Outline (\`cl_crosshair_drawoutline\`)

Set to 1 to add a black outline around your crosshair.

**This is the most underrated setting.** An outlined crosshair is visible on every background — white walls on Mirage, sand on Dust 2, snow on Nuke exterior. No outline, and your white or yellow crosshair vanishes on bright surfaces.

Outline thickness is \`cl_crosshair_outlinethickness\`, keep it at 1.

### Static or Dynamic (\`cl_crosshairstyle\`)

- **Style 2, 3**: Dynamic. Crosshair expands when you move, shoot, or crouch.
- **Style 4**: Static. Crosshair never moves. **This is what 99% of competitive players use.**
- **Style 5**: Hybrid (static while moving, dynamic while firing).

Dynamic crosshairs give visual feedback about inaccuracy, but most players find them distracting. Go static unless you have a specific reason.

## Building a crosshair from scratch

Here's a decision tree:

**Step 1 — Style**: Static (\`cl_crosshairstyle 4\`). Unless you're a beginner who benefits from spray feedback.

**Step 2 — Size**: Start at 3. Adjust later if needed.

**Step 3 — Thickness**: 1. Works for most players.

**Step 4 — Gap**: -2. Tight cross. Adjust if you want more visible gap.

**Step 5 — Dot**: Your preference. Start without.

**Step 6 — Color**: Green (\`cl_crosshaircolor 1\`). Change only if you see visibility issues.

**Step 7 — Outline**: On (\`cl_crosshair_drawoutline 1\`). Thickness 1.

This gives you a small, clean green crosshair with outline. It's the most common pro setup and it's a safe baseline.

## Importing in CS2

If you like a pro crosshair and want to try it:

1. Copy the code (format: \`CSGO-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX\`)
2. In CS2: Settings → Game → Crosshair → Share or Import
3. Paste, click Import

Or via console: \`cl_crosshair_sharecode "CODE"\`

## When to change your crosshair

**Don't change it because you had a bad game.** Your crosshair is not why you missed that shot.

**Do change it if**:
- You genuinely can't see it on a specific map
- You've been using it for weeks and still miss shots at a specific range
- You switched monitors/resolution and it looks wrong now

Most important: once you find a crosshair that works, stop tweaking it. Muscle memory builds over weeks. Every time you change size by 1 pixel, you reset that.

[Browse 100+ crosshair codes →](/crosshairs)
`,
    contentZh: `
## 选准星的错误方式

大多数玩家随便复制一个职业选手的准星就用。有时候能用，但经常不行——s1mple 在 1280x960 拉伸下用的准星，你在 1920x1080 原生下可能看起来完全不对。

更好的方式：理解每个参数的作用，然后组合出适合你的配置。

## 关键参数

CS2 有十几个准星参数，下面这些真正影响手感：

### 大小 (\`cl_crosshairsize\`)

准星线条从中心向外延伸的长度。

- **小 (2-3)**: 视觉干扰最小，适合精确瞄头
- **中 (4-5)**: 平衡，大部分职业选手用这个范围
- **大 (6-8)**: 余光容易看到，但会挡小目标

近距离老打不中又觉得准星太粗 → 调小。混战时经常看不到准星 → 调大。

### 粗细 (\`cl_crosshairthickness\`)

每条线的宽度。

- **细 (0.5-1)**: 干净精确，在复杂背景上可能看不清
- **中 (1-1.5)**: 职业赛最常见
- **粗 (2+)**: 非常显眼，但远距离会挡住目标

远距离打法多的话保持细一些。

### 间隙 (\`cl_crosshairgap\`)

中心和线条起始点之间的距离。

- **负值 (-3 到 -1)**: 线条在中心重叠，形成十字
- **零**: 线条正好在中心相接
- **小正值 (1-3)**: 小开口，常见
- **大正值 (4+)**: 大开口，不让线条遮挡瞄准点

### 中心点 (\`cl_crosshairdot\`)

设为 1 加中心点，0 去掉。

有人觉得中心点碍事，有人觉得远距离狙击必备。自己两种都试一周。

### 颜色 (\`cl_crosshaircolor\`)

1-4 是预设颜色，5 是自定义 RGB。

**绿色**最常用——大部分地图上都清晰。青色紧随其后。黄色在暗色地图（Ancient, Nuke）上很好，但沙地上看不见。红色看起来霸气但会和血迹、HUD 混一起。

### 描边 (\`cl_crosshair_drawoutline\`)

设为 1 给准星加黑色描边。

**这是最被低估的设置。**带描边的准星在任何背景上都看得清——Mirage 的白墙、Dust 2 的沙地、Nuke 外面的雪地。不加描边的白色/黄色准星在亮面上会直接消失。

### 静态 or 动态 (\`cl_crosshairstyle\`)

- **Style 2, 3**: 动态，移动/射击/蹲下时扩散
- **Style 4**: 静态，永远不动。**99% 的竞技玩家用这个**
- **Style 5**: 混合（移动时静态，射击时动态）

## 从零组合一个准星

决策流程：

**第 1 步 — 类型**: 静态 (\`cl_crosshairstyle 4\`)
**第 2 步 — 大小**: 从 3 开始
**第 3 步 — 粗细**: 1
**第 4 步 — 间隙**: -2（紧凑十字）
**第 5 步 — 中心点**: 看个人喜好，建议先不开
**第 6 步 — 颜色**: 绿色 (\`cl_crosshaircolor 1\`)
**第 7 步 — 描边**: 开 (\`cl_crosshair_drawoutline 1\`)，厚度 1

这是最常见的职业选手配置，安全基线。

## 在 CS2 中导入准星码

如果看中某个职业选手的准星：

1. 复制代码 (格式: \`CSGO-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX\`)
2. 进 CS2: 设置 → 游戏 → 准星 → 分享或导入
3. 粘贴，点击"导入"

控制台命令: \`cl_crosshair_sharecode "代码"\`

## 什么时候该换准星

**打得不好不是换准星的理由。**你打不中不是准星的问题。

**这些情况可以换**：
- 某张地图上真的看不清
- 用了几周还是在特定距离老失手
- 换了显示器或分辨率后看起来不对

最重要：找到顺手的准星后就别再动了。肌肉记忆是按周建立的，每次调 1 像素都会重置。

[浏览 100+ 准星代码 →](/crosshairs)
`,
  },
  {
    slug: 'cs2-spray-control',
    title: 'CS2 Spray Control Guide: AK-47, M4, and the Patterns That Actually Matter',
    titleZh: 'CS2 压枪指南：AK-47、M4 和真正重要的弹道',
    description: 'Every CS2 weapon has a specific recoil pattern. Learn the AK-47 and M4 patterns, how to practice them, and when to stop firing and tap.',
    descriptionZh: '每把 CS2 武器有固定弹道。学习 AK-47 和 M4 的压枪方法、练习流程，以及什么时候该点射。',
    category: 'intermediate',
    readTime: 9,
    publishedAt: '2026-04-14',
    author: 'CS2 Practice Team',
    content: `
## Why spray control matters

Most CS2 kills happen within the first 3-4 bullets. Pure aim is what wins close fights. But if you can't control your spray past that, you lose every multi-kill situation. You also lose fights where your first shot misses and you need to correct.

Spray control is memorizing the recoil pattern of each gun and counter-moving your mouse to cancel it. It sounds mechanical, and it is — but with practice it becomes muscle memory.

## The AK-47 pattern

The AK is the most important gun to learn. Every T-side round starts with the AK, and one-tapping with it is the defining skill of a CS player.

The recoil pattern has three phases:

**Bullets 1-3**: Goes almost straight up. Pull DOWN to counter. This is the easiest part.

**Bullets 4-10**: Curves to the LEFT while still rising. Pull DOWN-RIGHT as the spray continues up and left.

**Bullets 11-30**: Bounces LEFT-RIGHT-LEFT unpredictably while leveling off. This is the hardest part and most players stop spraying here.

### The key insight

**You don't need to master all 30 bullets.** The AK kills in 1 headshot or 2 body shots at any range. If your first 3 bullets are controlled, you've already won the duel most of the time.

Master bullets 1-7 perfectly before worrying about bullets 8-30.

### How to practice

1. Go to an empty server: \`map de_dust2 casual\` (or use the workshop map "Recoil Master")
2. Find a wall and stand 4 meters away
3. Aim at a specific spot on the wall (like a piece of graffiti)
4. Fire full spray, watch where bullets land
5. Now fire again, but compensate — pull your mouse in the OPPOSITE direction of the bullet trail
6. Your goal: all 30 bullets hit the same spot on the wall

Do this for 15 minutes before each CS2 session for 2 weeks. Your AK spray will be noticeably better.

## The M4A4 and M4A1-S patterns

The M4 is gentler than the AK but less forgiving on one-taps (lower damage per bullet).

**M4A4**: Similar to AK but with less pronounced left curve. Easier to control past bullet 10.

**M4A1-S**: Significantly less recoil than M4A4. Only 20 bullets per mag though, so you run out faster. Many CT players prefer it for the ease of control and the silencer.

### Key differences from AK

- Smaller first-shot climb (pull down less at the start)
- Tighter overall pattern (less correction needed)
- Lower first-shot damage (need 2 bullets for a headshot at 95+ HP with helmet)

Because of the lower damage, CT players typically tap or burst more with the M4 and save spraying for close range.

## When NOT to spray

This is as important as knowing the pattern. Spraying is the wrong choice when:

### Long range (20+ meters)

The AK's recoil gets unpredictable past bullet 10, and at long range even small errors miss. **Tap or burst instead.**

- **Tap**: One shot, reset accuracy, one shot. Wait ~0.4 seconds between taps.
- **Burst**: 2-3 bullets, reset, 2-3 more.

### Multiple enemies in different positions

If you need to hit 3 enemies at different heights and angles, spraying at the first one will throw your aim off when you swing to the second. Tap-reset-tap is more reliable for multi-frag scenarios.

### Moving while shooting

Moving completely destroys your accuracy. Even if you're "counter-strafing", a long spray while walking will miss. Stop first, then spray.

## Common spray mistakes

### 1. Compensating too hard

Many players pull down so aggressively on bullets 1-3 that their aim drops below the head. The AK climb is real but it's not massive in the first 3 bullets.

### 2. Not resetting

After a spray, your crosshair is 2-3 player heights below your original aim (because you pulled down). Next spray should start from a NEW aim point, not the same one.

### 3. Spraying when tapping would work

If you need to kill one enemy at range with a full HP advantage, don't spray. Tap them. Spraying is for 2+ enemies or close-range panic.

## Practice routine

15 minutes, 3 times per week:

1. **5 min**: AK spray on a wall, focus on bullets 1-7
2. **5 min**: AK one-taps at bot heads (Retakes mode or \`bot_place\`)
3. **5 min**: M4A4 or M4A1-S spray and bursts

That's it. Don't grind for hours. Short focused sessions beat long unfocused ones.

[Practice your aim with our trainer →](/play)
`,
    contentZh: `
## 压枪为什么重要

大多数 CS2 击杀在前 3-4 发子弹内完成。纯瞄准决定近战胜负。但如果你第 4 发之后压不住，就会在多杀场景里全部输掉。第一枪没中需要补枪的时候也会输。

压枪就是记住每把枪的弹道，用鼠标反向抵消后坐力。听起来很机械，确实是，但练熟后就变成肌肉记忆。

## AK-47 弹道

AK 是最重要的枪。T 方每局都开 AK，用它一枪爆头是 CS 玩家的核心技能。

弹道分三个阶段：

**1-3 发**: 几乎垂直上升，向下拉枪抵消。最简单的部分。

**4-10 发**: 边上升边向左偏，向右下拉枪。

**11-30 发**: 左右摇摆，不规则。大多数玩家在这里停止扫射。

### 关键认知

**不需要掌握全部 30 发。**AK 爆头一枪死，身体两枪死。前 3 发控住，大部分对枪已经赢了。

先练好前 7 发再考虑后面的。

### 练习方法

1. 进空服: \`map de_dust2 casual\` （或用创意工坊的 "Recoil Master" 地图）
2. 找一面墙，站 4 米远
3. 瞄墙上某个具体点（比如一块涂鸦）
4. 扫一整梭，观察落点
5. 再扫一次，反向补偿——往弹道的反方向拉鼠标
6. 目标: 30 发全部打在同一个点

每次开始 CS2 前练 15 分钟，坚持两周，AK 压枪会明显进步。

## M4A4 和 M4A1-S 弹道

M4 比 AK 温顺但单发伤害低（一枪爆头困难）。

**M4A4**: 类似 AK 但向左偏移小。10 发以后更容易控制。
**M4A1-S**: 后坐力明显小于 M4A4。但只有 20 发/弹夹，扫得快就没了。很多 CT 玩家偏爱它的稳定性和消音器。

### 和 AK 的关键区别

- 第一发上抬小（开始不用往下拉那么多）
- 整体弹道更紧（修正量更小）
- 首发伤害低（满血带头盔需要 2 枪爆头）

因为单发伤害低，CT 玩家通常点射或爆发射击，近距离才扫射。

## 什么时候**不要**扫射

知道什么时候不扫和知道弹道一样重要。

### 远距离（20 米以上）

AK 10 发以后弹道不可预测，远距离小误差就打不中。**改用点射或爆发射击。**

- **点射**: 一枪，等精度恢复，再一枪。间隔约 0.4 秒。
- **爆发**: 2-3 枪，等，再 2-3 枪。

### 多个不同位置的敌人

要打 3 个不同高度和角度的敌人，扫第一个会让瞄准偏移，打第二个更难。点射-重置-点射更稳。

### 边移动边开枪

移动会完全破坏精度。即使"反向压步"，边走边扫也会失手。先停住，再开枪。

## 常见错误

### 1. 补偿过度

很多人前 3 发压得太狠，结果瞄准点掉到身体以下。AK 上抬是真的，但前 3 发没那么夸张。

### 2. 不重置瞄准点

扫完一梭后，准星已经在原瞄准点下方 2-3 个人头距离（因为一直在往下拉）。下一梭应该从**新的瞄准点**开始，不是原来那个。

### 3. 该点射的时候扫射

满血优势下远距离打一个敌人，不要扫。点他。扫射是为了 2+ 敌人或近距离救命。

## 练习计划

每周 3 次，每次 15 分钟：

1. **5 分钟**: 对墙练 AK 弹道，专注前 7 发
2. **5 分钟**: AK 爆头 bot（Retakes 模式或 \`bot_place\`）
3. **5 分钟**: M4A4 或 M4A1-S 扫射和爆发

就这些。别一练几小时。短而专注比长而散漫效果好。

[用我们的训练器练瞄准 →](/play)
`,
  },
  {
    slug: 'cs2-valorant-sensitivity-convert',
    title: 'CS2 vs Valorant Sensitivity: Why Direct Conversion Is Wrong',
    titleZh: 'CS2 和 Valorant 灵敏度：为什么直接换算是错的',
    description: 'If you switch between CS2 and Valorant, copying your sensitivity directly does not work. Here is how conversion actually works and what to expect.',
    descriptionZh: '在 CS2 和 Valorant 之间切换，直接复制数字不对。这篇讲转换的原理和过渡期注意事项。',
    category: 'beginner',
    readTime: 6,
    publishedAt: '2026-04-14',
    author: 'CS2 Practice Team',
    content: `
## Why "same sens" doesn't mean same feel

If you use 2.0 sensitivity in CS2 and switch to Valorant with 2.0 sensitivity, your aim will be all over the place.

Here's why: CS2 and Valorant use completely different internal units. The number "2.0" in each game represents a different scaling factor. The actual mouse movement required for the same in-game rotation is different.

The correct way to carry your aim between games is to match your **cm/360°** — the physical distance your mouse travels to complete a full 360 degree turn in-game.

## The math (simplified)

In CS2:
- 1.0 sensitivity at 400 DPI ≈ 53 cm/360°

In Valorant:
- To get the same 53 cm/360°, you need Valorant sensitivity of about **0.318**

That's why if you copy 1.0 sens directly, Valorant feels three times faster. The two games scale their sensitivity numbers very differently.

## The conversion formula

Here are the multipliers between CS2 and Valorant:

- **CS2 → Valorant**: CS2 sens × 0.318 = Valorant sens
- **Valorant → CS2**: Valorant sens × 3.18 = CS2 sens

Examples:
- CS2 1.5 → Valorant 0.477
- CS2 2.0 → Valorant 0.636
- Valorant 0.3 → CS2 0.943
- Valorant 0.5 → CS2 1.590

Don't try to do this by hand. Use our [sensitivity converter](/tools/sensitivity-converter) — it handles DPI differences and other games (Apex, Overwatch, etc.) too.

## DPI matters too

Sensitivity and DPI multiply together. If you change DPI, you need to change sensitivity to keep the same cm/360°.

- CS2 2.0 sens @ 400 DPI = 26.5 cm/360°
- CS2 2.0 sens @ 800 DPI = 13.25 cm/360° (twice as fast!)

When converting between games, **match both the game AND the DPI**. Most pros stay at the same DPI across all games (typically 400 or 800) and adjust in-game sens per game.

## Why pros use different sens in each game

Even after converting correctly, many pros run slightly different cm/360 between CS2 and Valorant. Why?

**Valorant tagging is different.** When you're shot in Valorant, your movement slows dramatically. This means you're often shooting at slower-moving targets than in CS2. A slightly faster sensitivity works for Valorant's shorter TTK and tagging behavior.

**CS2 headshot model is bigger.** CS2 has a forgiving headshot hitbox. Valorant's is tighter. Some players go slightly slower in Valorant for more precision.

That said, a direct cm/360° conversion will get you 90% there. Don't overthink this.

## The transition period

Even with a perfect conversion, you'll feel off for about a week. This isn't a math problem — it's muscle memory.

Your brain learned specific movement patterns for one game. When you load up the other game, even if the cm/360° matches, the way shots register and the way movement feels is different.

**Give yourself 5-7 days of daily play before deciding the conversion is wrong.** Most people who say "the converter is inaccurate" just haven't adapted yet.

## Common mistakes

### Converting without matching DPI

Converting CS2 2.0 @ 400 DPI to Valorant but keeping your 800 DPI setting. You'll get a number that's wrong.

Fix: set both games to the same DPI first, then convert.

### Copying pro sens without converting

If your favorite Valorant pro uses 0.3 and you want to try their feel in CS2, you can't just use 0.3. Convert it (0.3 × 3.18 = 0.95).

### Constantly tweaking

Every time you change sens by 0.01, you reset your muscle memory timer. Pick a number, commit for a week, then evaluate.

## Recommended setup for multi-game players

If you play both CS2 and Valorant regularly:

1. Pick your DPI (400 or 800 are pro standards)
2. Find your ideal cm/360° in your main game
3. Use our converter to get the matching sens in your second game
4. Play both games at that matched sensitivity for a week
5. Fine-tune only after a week of play in each

This way your muscle memory carries between games. You'll have one "feel" that works in both.

[Use the sensitivity converter →](/tools/sensitivity-converter)
`,
    contentZh: `
## 为什么"同样的灵敏度"不是同样的手感

CS2 用 2.0 灵敏度，直接在 Valorant 里也设 2.0，你的瞄准会完全乱。

原因：CS2 和 Valorant 用完全不同的内部单位。"2.0"这个数字在两个游戏里代表的缩放系数不一样。相同的游戏内转向角度，需要的物理鼠标移动距离不同。

正确的跨游戏保持手感的方式是匹配 **cm/360°**——鼠标在桌面上移动多远才能让游戏内画面转 360 度。

## 数学原理（简化版）

CS2:
- 1.0 灵敏度 @ 400 DPI ≈ 53 cm/360°

Valorant:
- 要达到同样的 53 cm/360°，Valorant 里要设 **0.318**

所以直接复制 1.0 的话，Valorant 感觉快 3 倍。两个游戏的灵敏度数字缩放完全不同。

## 换算公式

CS2 和 Valorant 之间的换算系数：

- **CS2 → Valorant**: CS2 灵敏度 × 0.318 = Valorant 灵敏度
- **Valorant → CS2**: Valorant 灵敏度 × 3.18 = CS2 灵敏度

例子：
- CS2 1.5 → Valorant 0.477
- CS2 2.0 → Valorant 0.636
- Valorant 0.3 → CS2 0.943
- Valorant 0.5 → CS2 1.590

别手算。用我们的[灵敏度转换器](/tools/sensitivity-converter)，它会处理 DPI 差异和其他游戏（Apex、Overwatch 等）。

## DPI 也重要

灵敏度和 DPI 是相乘的关系。换 DPI 就必须换灵敏度才能保持同样的 cm/360°。

- CS2 2.0 灵敏度 @ 400 DPI = 26.5 cm/360°
- CS2 2.0 灵敏度 @ 800 DPI = 13.25 cm/360°（快两倍！）

跨游戏换算时，**同时匹配游戏和 DPI**。大多数职业选手所有游戏统一 DPI（通常 400 或 800），只调游戏内灵敏度。

## 为什么职业选手不同游戏用不同灵敏度

即使精确换算后，很多职业选手 CS2 和 Valorant 的 cm/360° 仍然略有不同。为什么？

**Valorant 的击中减速不一样。**在 Valorant 里被打中会大幅减速，意味着你经常在打移动更慢的目标。略快的灵敏度适合 Valorant 的短 TTK 和减速机制。

**CS2 爆头框更大。**CS2 爆头判定相对宽松，Valorant 更严格。有些玩家 Valorant 里用更慢的灵敏度追求精度。

不过直接按 cm/360° 换算已经能到 90% 的水平。别想太多。

## 过渡期

即使换算完全精确，你也会不适应约一周。这不是数学问题，是肌肉记忆。

你的大脑学的是某个游戏的特定移动模式。切到另一个游戏，即使 cm/360° 匹配，命中反馈和移动手感都不一样。

**给自己 5-7 天每天玩的时间再下结论。**大多数说"转换器不准"的人其实只是还没适应。

## 常见错误

### 换算时 DPI 没匹配

把 CS2 2.0 @ 400 DPI 换算到 Valorant，但自己 DPI 还是 800。结果肯定错。

修正：先让两个游戏 DPI 相同，再换算。

### 直接复制职业选手的数字

你喜欢的 Valorant 职业选手用 0.3，想在 CS2 里试试他的手感，不能直接用 0.3。要换算（0.3 × 3.18 = 0.95）。

### 反复微调

每次调 0.01 都在重置肌肉记忆计时。选一个数字，承诺用一周再评估。

## 多游戏玩家推荐流程

如果你常玩 CS2 和 Valorant：

1. 选定 DPI（400 或 800 是职业标准）
2. 在主力游戏里找到顺手的 cm/360°
3. 用转换器算出另一个游戏对应的灵敏度
4. 两个游戏都用这个匹配的灵敏度玩一周
5. 一周后再微调

这样肌肉记忆能跨游戏延续。一套手感适用两个游戏。

[使用灵敏度转换器 →](/tools/sensitivity-converter)
`,
  },
  {
    slug: 'best-mouse-for-cs2',
    title: 'Best Mouse for CS2 in 2026: What Pros Actually Use',
    titleZh: '2026 年 CS2 最佳鼠标：职业选手真实使用情况',
    description: 'The mice that dominate pro CS2. What to look for, which to avoid, and why weight matters less than you think.',
    descriptionZh: 'CS2 职业赛场主流鼠标。选购关键点、避坑指南，以及为什么重量没你想的那么重要。',
    category: 'beginner',
    readTime: 8,
    publishedAt: '2026-04-14',
    author: 'CS2 Practice Team',
    content: `
## The short answer

**Logitech G Pro X Superlight 2** or **Razer DeathAdder V3 Pro**. One of these two is a safe pick for almost anyone. Pros are roughly split between them.

Every other recommendation is noise. You don't need to read more if you just want a mouse that works.

## The longer answer

CS2 pros cluster around a small handful of mice. Tracking pro usage across the last few tournaments, it breaks down roughly like this:

- **Logitech G Pro X Superlight (original + v2)**: ~45% of pros
- **Razer Viper / DeathAdder V3 Pro**: ~25%
- **ZOWIE EC / S-series**: ~15%
- **Pulsar, Finalmouse, Lamzu, other lightweight boutique**: ~15%

The distribution is stable over years. Logitech's G Pro has been dominant since 2018.

## What actually matters in a mouse

Most "gaming mouse" marketing is nonsense. Here's what genuinely affects your aim:

### 1. Shape

This matters more than anything else. A mouse that fits your grip feels natural; one that doesn't fights you constantly.

**Three main grip styles**:
- **Palm grip**: Your whole hand rests on the mouse. Needs a larger, curvier mouse.
- **Claw grip**: Fingers arched, palm contact minimal. Works with most shapes but ergonomic curves help.
- **Fingertip grip**: Only fingertips touch. Needs a small, light mouse.

**Shapes that work well for most people**:
- **Logitech G Pro X Superlight**: Ambidextrous, medium size, safe pick for most grips
- **Razer DeathAdder V3 Pro**: Ergonomic (right-hand only), larger, perfect for palm grip
- **ZOWIE EC2-CW**: Classic ergonomic, smaller than DeathAdder, good for claw grip

### 2. Weight

Weight matters but less than you think. Below 80g is "lightweight" in modern mice, and below 60g is "superlight".

**The Superlight (60g)** feels very different from a 100g mouse — easier to make micro-adjustments, less fatiguing in long sessions. But pros have played at Major finals level with 95g+ mice (ZOWIE EC2-C is 73g). It's not a deal breaker.

Don't chase grams below 60g. The difference between 60g and 50g is noticeable on a scale, not in-game.

### 3. Sensor

Every modern gaming mouse ($50+) has a flawless sensor. PixArt PAW3950, PAW3395, Razer Focus Pro — they're all indistinguishable in real use. Sensor marketing (8k, 16k, 32k DPI) is meaningless since no one uses above 3200 DPI.

**Don't pay extra for sensor specs.**

### 4. Click feel

This matters for rapid tapping and spraying. Look for:
- Clean, crisp actuation (not mushy)
- Light but not accidental (so you don't misfire)
- No double-click issues over time (Logitech had this problem for years)

Optical switches (Razer, some Zowie) last longer than mechanical. Logitech uses mechanical but has mostly solved the double-click problem in recent models.

### 5. Wireless vs Wired

Modern wireless gaming mice (Logitech Lightspeed, Razer HyperSpeed, Zowie EC-CW) have no meaningful latency difference from wired. Use wireless unless you're on a tight budget.

Wired used to be the pro standard. Now ~70% of pros use wireless. The quality of life is real.

## Specific recommendations by grip

### Palm grip (large hand)

**First pick: Razer DeathAdder V3 Pro** ($150)
- Ergonomic, fills your palm
- 63g, very light for its size
- Best wireless battery life

**Alternative: Logitech G Pro X Superlight 2** ($160)
- Slightly smaller, ambidextrous
- 60g
- Most popular pro mouse

### Claw grip (medium hand)

**First pick: Logitech G Pro X Superlight 2** ($160)
- Perfect medium size
- Works with multiple grip styles
- Used by more pros than any other mouse

**Alternative: Pulsar X2 V2** ($95)
- Slightly cheaper, similar feel
- Used by several tier-1 pros including sh1ro

### Fingertip grip (small hand)

**First pick: Logitech G Pro X Superlight 2**
- Yes, the same mouse. It works for fingertip too.

**Alternative: ZOWIE S2-C** ($80)
- Smaller, flatter shape
- Used by older-school pros

## Mice to avoid

### Anything over $200

There's no mouse worth $200+. The G Pro X Superlight 2 is $160 and beats everything. Razer Viper Ultimate and others in the $200 range offer nothing extra for aim.

### "MMO" mice with 12 buttons

You don't need a thumb grid for CS2. Extra buttons add weight and can cause accidental presses.

### RGB-heavy mice

RGB adds weight and drains battery. Every mouse I recommend has minimal or no RGB.

### Finalmouse Starlight

Hot take but: Finalmouse has had build quality issues. Some pros swear by them, more have had breakage within 6 months. Not worth the price.

## Setting up your mouse

Once you buy the mouse:

1. **DPI**: Set to 400 or 800 in driver software. Pros are split roughly 50/50.
2. **Polling rate**: 1000Hz (4000Hz and 8000Hz are marketing — real difference is under 0.1ms at CS2 framerates).
3. **In-Windows sensitivity**: 6/11 (default). Never use enhanced pointer precision.
4. **In-game sensitivity**: See our [sensitivity guide](/guides/sensitivity-guide).

## When to upgrade

If your current mouse is under 4 years old and works fine, don't upgrade. The difference between a 2022 G Pro X Superlight and a 2025 G Pro X Superlight 2 is marginal.

Upgrade if:
- Your mouse has double-click issues
- It's too heavy (>100g) and causing fatigue
- The shape genuinely doesn't fit your hand
- Your current mouse is wired and you want wireless

**Don't upgrade because someone on Twitter said a new mouse is better.** Your current mouse isn't why you're missing shots.

[Check what mouse your favorite pro uses →](/pro)
`,
    contentZh: `
## 简短回答

**Logitech G Pro X Superlight 2** 或 **Razer DeathAdder V3 Pro**。二选一基本适合所有人。职业选手大致对半分。

其他推荐都是噪音。如果你只想要一把能用的鼠标，不用继续看了。

## 详细版

CS2 职业选手集中用几款鼠标。近期比赛统计大致这样：

- **Logitech G Pro X Superlight (原版 + v2)**: ~45%
- **Razer Viper / DeathAdder V3 Pro**: ~25%
- **ZOWIE EC / S 系列**: ~15%
- **Pulsar, Finalmouse, Lamzu 等轻量小众品牌**: ~15%

这个比例几年都很稳定。Logitech G Pro 从 2018 年就是主流。

## 真正重要的参数

大部分"游戏鼠标"营销都是瞎扯。真正影响瞄准的：

### 1. 形状

这个比什么都重要。合适的鼠标感觉自然，不合适的一直在和你作对。

**三种握姿**:
- **趴握 (palm)**: 整个手掌贴在鼠标上，需要大而圆润的鼠标
- **抓握 (claw)**: 手指弓起，掌根很少接触，大多数形状都行
- **指握 (fingertip)**: 只用指尖，需要小而轻的鼠标

**通用形状**:
- **G Pro X Superlight**: 左右对称，中等大小，适合多数握姿
- **DeathAdder V3 Pro**: 人体工学（仅右手），较大，适合趴握
- **ZOWIE EC2-CW**: 经典人体工学，比 DeathAdder 小，适合抓握

### 2. 重量

重要但没那么重要。现代鼠标 80g 以下是"轻量"，60g 以下是"超轻"。

**Superlight (60g)** 和 100g 鼠标手感差很多——微调更轻松，长时间不累。但职业选手用 95g+ 鼠标打过 Major 决赛（ZOWIE EC2-C 73g）。不是致命问题。

60g 以下不用追求。60g 和 50g 在秤上看得出，游戏里感受不出来。

### 3. 传感器

任何现代游戏鼠标（$50+）都是满分传感器。PAW3950、PAW3395、Razer Focus Pro 实际使用没区别。传感器参数（8k、16k、32k DPI）没意义，没人用 3200 以上 DPI。

**不要为传感器参数多花钱。**

### 4. 按键手感

对连点和扫射重要。关注：
- 干脆清晰（不软绵绵）
- 轻但不会误触
- 不会出双击问题（Logitech 早期型号有这问题）

光轴（Razer、部分 Zowie）比机械寿命长。Logitech 用机械但新款基本解决了双击问题。

### 5. 无线 vs 有线

现代无线游戏鼠标（Logitech Lightspeed、Razer HyperSpeed、Zowie EC-CW）和有线延迟没有实际差异。预算够就选无线。

以前职业赛场都有线，现在约 70% 用无线。便利性是真实的。

## 按握姿推荐

### 趴握（大手）

**首选: Razer DeathAdder V3 Pro** ($150)
- 人体工学，填满手掌
- 63g，这个体积下很轻
- 无线续航最好

**备选: Logitech G Pro X Superlight 2** ($160)
- 略小，对称
- 60g
- 职业选手最多人用

### 抓握（中等手）

**首选: Logitech G Pro X Superlight 2** ($160)
- 完美的中等大小
- 多种握姿通用
- 职业赛场最流行

**备选: Pulsar X2 V2** ($95)
- 便宜一些，手感类似
- 包括 sh1ro 在内多位顶级职业选手使用

### 指握（小手）

**首选: Logitech G Pro X Superlight 2**
- 是的，还是这款。指握也适合。

**备选: ZOWIE S2-C** ($80)
- 更小、更扁
- 老派职业选手常用

## 避坑

### 超过 $200 的

没有任何鼠标值 $200+。G Pro X Superlight 2 $160 已经打败一切。$200+ 鼠标对瞄准没额外帮助。

### 12 键 MMO 鼠标

CS2 不需要拇指键盘。多余按键增加重量和误触风险。

### 满身 RGB 的

RGB 增加重量、耗电。我推荐的所有鼠标 RGB 都很少或没有。

### Finalmouse Starlight

争议观点但：Finalmouse 品控问题多。一些职业选手用着没事，更多人 6 个月内出现故障。不值这个价。

## 买到后的设置

1. **DPI**: 驱动设 400 或 800。职业选手各占一半。
2. **回报率**: 1000Hz（4000Hz 和 8000Hz 是营销——CS2 帧率下实际差异小于 0.1ms）
3. **Windows 灵敏度**: 6/11（默认）。永远别开"指针精度"
4. **游戏内灵敏度**: 看[灵敏度指南](/guides/sensitivity-guide)

## 什么时候该换

现鼠标用了不到 4 年、还能用就别换。2022 款 G Pro X Superlight 和 2025 款 v2 的差异很小。

这些情况可以换：
- 出现双击问题
- 太重（>100g）用着累
- 形状确实不合手
- 当前是有线想换无线

**别因为 Twitter 上有人说新鼠标更好就换。**你打不中不是鼠标的问题。

[查看你喜欢的职业选手用什么鼠标 →](/pro)
`,
  },
  {
    slug: 'lowest-cs2-premier-rating',
    title: 'The Lowest CS2 Premier Rating: What 1,000 Really Means',
    titleZh: 'CS2 Premier 最低分:1,000 到底意味着什么',
    description: 'The lowest possible CS2 Premier rating is 1,000 — and you literally cannot go below it. Here is what the floor looks like and how to climb out.',
    descriptionZh: 'CS2 Premier 最低分是 1,000,你扣不到比这更低。本文讲底层段位长什么样,以及怎么从这里爬上去。',
    category: 'tips',
    readTime: 6,
    publishedAt: '2026-05-20',
    author: 'CS2 Practice Team',
    content: `
## The Short Answer

**The lowest CS2 Premier rating is 1,000.** It's a hard floor — you cannot drop below it. If you lose ten in a row at 1,050, you will land at 1,000 and stay there. Lose ten more, still 1,000. The number on your medallion will never read three digits or zero.

This is Valve's design, not a bug. The Premier system was built to keep brand-new and tilted-into-the-ground accounts in the same visible pool, so matchmaking still has something to work with at the bottom.

## Why You Can't Go Below 1,000

Valve has never published the math behind Premier rating, but two things are clear from public matches and community testing:

1. **Losses don't subtract once you hit 1,000.** Players have logged dozens of consecutive losses at 1,000 — the medallion stays gray, the number stays the same.
2. **Wins still add normally.** A single win from 1,000 will push you back up by the usual 50-200 points depending on opponent strength and your performance.

The effective behavior: rating works like a ratchet at the bottom. You can only go up from there.

## What 1,000 Premier Actually Looks Like

At 1,000 you're sitting in the **Gray tier** (1,000 – 4,999). From [our rank distribution data](/guides/cs2-rank-distribution), Gray covers roughly the bottom 7% of the active Premier population — that's still hundreds of thousands of accounts. Most are either fresh accounts, returning CS:GO players who haven't placed yet, or accounts that ran into a losing streak after a season reset.

The lobbies at 1,000 are messy. Expect crosshair-placement issues, mid-air sprays, and teammates buying eco AWPs. That's not an insult — it's just the skill floor. The good news: any disciplined fundamental will stand out.

## Climbing From 1,000 to 5,000

Reaching Light Blue (5,000) from the floor is the fastest stretch in the entire Premier ladder. The matchmaker is hunting for your real skill level and will push you up quickly if you outperform the lobby.

A realistic plan:

1. **Warm up for 15 minutes before queueing.** Use [Gridshot](/play/gridshot) or [tracking](/play/tracking) — pick one and stick with it for two weeks.
2. **Lock in your sensitivity once.** Use the [sensitivity converter](/tools/sensitivity-converter) if you're coming from another game, then don't touch it for a month.
3. **Bind a jumpthrow.** [Our jumpthrow guide](/commands/jumpthrow-bind) takes five minutes — instantly unlocks every smoke lineup tutorial on YouTube.
4. **Pick three smokes per side per map.** Don't try to learn every utility. Three default smokes you can do in your sleep is enough.
5. **Watch one demo per session.** Five minutes of your own demo at the end of each session, focused on positioning, not on aim.

Most players who follow this routine clear 5,000 within 50-70 games.

## Common Questions

**Can I get banned down to 1,000?**
No — bans remove your rating entirely (you stop showing on the leaderboard). A 1,000 rating means you played down, not that you were punished.

**Does inactivity drop me to 1,000?**
No, but seasonal resets shift everyone toward the middle. After a reset, lower-rated players sometimes start near 1,000 if their previous performance was below the new starting band.

**Will I get matched with smurfs at 1,000?**
Sometimes yes, especially in the first few games of a season. The system needs data points before it places you accurately. After about ten games it usually corrects.

**Should I make a new account?**
No. Climbing from 1,000 on your main is faster than placing a new account, because Premier weights placement matches heavily on KDA and round impact — not just on wins.

## Related Reading

If you're climbing from the floor, the next two pages you'll find useful:

- [How many wins to rank up in CS2](/guides/how-many-wins-to-rank-up-cs2) — what each win is actually worth
- [CS2 rank distribution](/guides/cs2-rank-distribution) — where you stand relative to everyone else
`,
    contentZh: `
## 简短答案

**CS2 Premier 模式最低分是 1,000。** 这是硬底线,扣不到更低。在 1,050 连输 10 场会落到 1,000 并停在那。再连输 10 场,还是 1,000。奖章上永远不会出现三位数或零。

这是 Valve 的有意设计——把新号和"被摆烂"的账号留在同一可见池里,让匹配系统在底部仍有数据可用。

## 为什么扣不到 1,000 以下

Valve 没公开 Premier 算法,但社区实测出两条结论:

1. **到 1,000 后败场不再扣分。** 玩家实测连输几十场,奖章保持灰色,数字纹丝不动。
2. **赢一场照常加分。** 从 1,000 赢一场会按正常 50-200 分回升,取决于对手强度和你的表现。

实际行为:rating 在底部像个棘轮——只能往上,不能往下。

## 1,000 分实际是什么样

1,000 分位于 **Gray 段**(1,000 – 4,999)。根据[我们的分布数据](/guides/cs2-rank-distribution),Gray 段约占活跃 Premier 玩家底部 7%——仍然是几十万人。大部分是新号、回坑没定级的 CS:GO 老玩家,或者赛季重置后遇到连败的账号。

1,000 段的房间比较混乱:预瞄差、空中扫射、队友买经济局 AWP。这不是讽刺,只是技能底线。好消息是:任何有纪律的基本功都会脱颖而出。

## 从 1,000 爬到 5,000

到 Light Blue(5,000)是整个 Premier 阶梯上最快的一段。匹配系统在搜寻你的真实水平,只要你压房间一档,就会被快速推上去。

实操方案:

1. **排位前热身 15 分钟。** [Gridshot](/play/gridshot) 或 [tracking](/play/tracking) 选一个,坚持两周。
2. **灵敏度定一次就别动。** 从别的游戏过来用[灵敏度换算工具](/tools/sensitivity-converter),定完一个月内不要改。
3. **绑个跳投。** [跳投绑定指南](/commands/jumpthrow-bind) 五分钟搞定,YouTube 上所有 smoke 教程立刻能用。
4. **每张图每边记 3 个 smoke。** 别想学全部投掷物——能闭眼丢的 3 个 default smoke 足够。
5. **每局后看一段自己的 demo。** 五分钟看自己的录像,看走位不看枪法。

按这个 routine 走的玩家多数 50-70 局内能突破 5,000。

## 常见问题

**会不会被封号降到 1,000?**
不会——封号是直接移除评分(不显示在排行榜上),不是降分。1,000 分意味着你打到这里,不是被惩罚。

**不玩会掉到 1,000 吗?**
不会,但赛季重置会让所有人往中段挤。重置后,原本评分较低的玩家可能会从接近 1,000 的位置开始。

**1,000 段会遇到小号吗?**
有时会,尤其是赛季前几局。系统需要数据点才能准确定位。约 10 局后通常能校正。

**要不要开新号?**
不要。在主号从 1,000 爬上去比开新号定级快——Premier 定级很看 KDA 和回合影响力,不是单纯看胜负。

## 相关阅读

如果你正从底部往上爬,这两篇值得接着看:

- [CS2 升一段要赢几场](/guides/how-many-wins-to-rank-up-cs2) — 每场胜负实际值多少分
- [CS2 段位分布](/guides/cs2-rank-distribution) — 你在玩家群体里排哪
`,
  },
  {
    slug: 'cs2-failed-to-connect-ranked-fix',
    title: 'CS2 Failed to Connect (Ranked): The Six-Step Fix',
    titleZh: 'CS2 排位 "Failed to Connect" 六步修复',
    description: 'Six fixes for CS2 Ranked "Failed to Connect," ordered by speed. Start at the top, stop the moment one works. Plus what to do about cooldowns.',
    descriptionZh: 'CS2 排位 "Failed to Connect" 六步修复,按速度排序。从第一步开始,连上就停。附 Ranked Cooldown 处理方法。',
    category: 'tips',
    readTime: 7,
    publishedAt: '2026-05-20',
    author: 'CS2 Practice Team',
    content: `
## What This Error Means

"Failed to connect" in CS2 Ranked usually points to one of three things: Valve's matchmaking servers are down, your connection to the relay closest to you broke, or your local network blocked the handshake. The error message is the same for all three — which is why most guides spray a dozen unrelated steps at you.

This page is ordered by **how fast each step is and how often it actually works**. Start at the top. Stop the moment one of them connects you.

## Step 1: 30-second check — is it Valve's fault?

Before you touch your settings, open:

- [Steam Status (Valve)](https://store.steampowered.com/stats/)
- [csstats.gg](https://csstats.gg/) — community-run, shows matchmaking outages in near-real-time

If matchmaking is red on either page, **stop here**. Nothing you do locally will help. Your queue will work again once Valve fixes their side, usually within 30-90 minutes.

## Step 2: 60-second fix — flush your DNS

This solves about a third of "Failed to connect" errors that aren't Valve's fault. Open PowerShell or Command Prompt and run \`ipconfig /flushdns\`, then \`ipconfig /release\`, then \`ipconfig /renew\`.

Close and reopen CS2. If you were stuck on "Searching for match" for more than two minutes, this often clears it.

## Step 3: 2-minute fix — restart the Steam connection

1. Right-click Steam in your tray → **Go Online** / **Go Offline** (toggle once)
2. If that doesn't work: Steam → **Settings → Downloads → Clear Download Cache**
3. Steam will restart. Try the queue again.

Clearing the cache forces Steam to renegotiate its session with Valve's CDN. It does not delete game files.

## Step 4: 5-minute fix — verify game files

Steam Library → right-click **Counter-Strike 2** → **Properties → Installed Files → Verify integrity of game files**.

About 50-200 MB will be re-downloaded if anything is wrong. This is the single most common reason a working install suddenly stops connecting to Ranked: a network interruption left two .vpk files mid-download but Steam marked them complete.

## Step 5: 10-minute fix — bypass Wi-Fi quirks

If you're on Wi-Fi, switch to Ethernet for five minutes and try again. CS2 Ranked has stricter latency thresholds than casual modes. If Ethernet works, your Wi-Fi adapter is dropping packets — the issue isn't CS2.

If Ethernet isn't possible:

- Move closer to the router
- Disconnect other devices streaming on the network
- Disable VPN if you have one running in the background

## Step 6: Last resort — firewall and reinstall

If steps 1-5 all failed:

1. **Windows Defender → Allowed apps** — make sure cs2.exe is whitelisted for both Private and Public networks
2. **Reinstall** — uninstall from Steam, manually delete the Counter-Strike Global Offensive folder under Steam/steamapps/common if it survives, then reinstall

A reinstall is rare to need, but it's the only fix when the problem is corrupted client config.

## About Ranked Cooldowns

This is the question most players actually want answered.

**Will failing to connect give me a cooldown?**
Generally no — the cooldown system penalizes mid-match disconnects and abandons, not failed pre-match connections. But if your client times out repeatedly during the same match's loading screen, Valve's system can flag the session as an abandon.

**Playing it safe:** if you've failed to connect more than twice on the same Ranked queue, quit the queue, restart CS2, then re-queue from scratch. Don't keep retrying the same broken handshake.

If you do get a cooldown after a true connection failure, it usually auto-clears in 30 minutes. Contact Steam Support only if it persists into a second cooldown.

## When to Stop Trying

If steps 1-6 don't fix it within 30 minutes, the problem is almost certainly on your ISP's routing to a Valve relay. Take a break, come back in 4-6 hours. ISP routing issues are common but transient — most resolve themselves overnight.

Meanwhile, [warm up offline with our aim trainers](/play) so the session isn't wasted. If you're not sure where to start, [Gridshot](/play/gridshot) and [Reflex](/play/reflex) cover the two skills that decay fastest when you stop playing Ranked.

## Related Reading

- [How many wins to rank up in CS2](/guides/how-many-wins-to-rank-up-cs2) — how lost queue time costs you rating
- [Useful console commands](/commands) — bind set you'd want before your next Ranked queue
`,
    contentZh: `
## 这个错误什么意思

CS2 Ranked 的 "Failed to connect" 通常是三种情况之一:Valve 匹配服务器挂了、你到最近的中继节点连接断了、本地网络拦了握手。报错信息是一样的——这就是为什么大多数文章会一次给你十几个不相关的步骤。

本文按**速度和有效率**排序。从第一步开始做,连上了就停。

## Step 1:30 秒检查——是不是 Valve 的锅

改设置之前先看:

- [Steam Status(Valve 官方)](https://store.steampowered.com/stats/)
- [csstats.gg](https://csstats.gg/) — 社区站,近实时显示匹配宕机

如果任一页面 matchmaking 显示红色,**到这停**。本地做什么都没用。等 Valve 修,通常 30-90 分钟。

## Step 2:60 秒——刷新 DNS

这能解决约三分之一不是 Valve 锅的连接错误。打开 PowerShell 或命令提示符,依次执行 \`ipconfig /flushdns\`、\`ipconfig /release\`、\`ipconfig /renew\`。

然后关闭重启 CS2。卡在 "Searching for match" 超过 2 分钟的,通常这一步能解。

## Step 3:2 分钟——重启 Steam 连接

1. 任务栏 Steam 右键 → **联机** / **脱机**(来回切一次)
2. 不行的话:Steam → **设置 → 下载 → 清除下载缓存**
3. Steam 会重启,再排一次。

清缓存会强制 Steam 重新和 Valve CDN 协商会话,不会删游戏文件。

## Step 4:5 分钟——校验游戏文件

Steam 库 → 右键 **Counter-Strike 2** → **属性 → 已安装文件 → 验证文件完整性**。

如有问题会重下 50-200 MB。这是好端端的安装突然连不上 Ranked 最常见的原因:网络中断让两个 .vpk 文件下载到一半被 Steam 标记为完成。

## Step 5:10 分钟——绕开 Wi-Fi 问题

用 Wi-Fi 的,切到有线 5 分钟再试。CS2 Ranked 对延迟比休闲模式更严。有线能连说明 Wi-Fi 网卡丢包,不是 CS2 的问题。

不能用有线:

- 靠近路由器
- 断开网络上正在视频流的其他设备
- 关掉后台运行的 VPN

## Step 6:终极手段——防火墙和重装

1-5 全没用:

1. **Windows Defender → 允许的应用** — 确认 cs2.exe 在私有和公用网络都白名单
2. **重装** — 从 Steam 卸载,手动删 Steam/steamapps/common 下的 Counter-Strike Global Offensive 文件夹,然后重装

重装很少需要,但客户端 config 损坏时只有这条路。

## 关于 Ranked Cooldown

玩家最想知道的问题。

**连不上会不会被罚冷却?**
一般不会——cooldown 系统罚的是中途掉线和秃匹配,不是匹配前连接失败。但如果你在同一局加载画面连续超时多次,Valve 系统可能把会话标为秃匹配。

**保险做法:** 同一局 Ranked 排位连接失败超过 2 次,退出队列,重启 CS2,重新排队。别一直重试同一个坏握手。

如果真的因为连接失败拿到 cooldown,通常 30 分钟自动解。只有持续到第二次 cooldown 才需要联系 Steam Support。

## 什么时候该放弃

1-6 步 30 分钟内都没修好,问题几乎肯定在 ISP 到 Valve 中继的路由。休息一下,4-6 小时后再试。ISP 路由问题常见但是临时的——多数过夜自愈。

期间[用我们的训练器线下练枪](/play),别浪费时间。不知道从哪练起,[Gridshot](/play/gridshot) 和 [Reflex](/play/reflex) 是停 Ranked 后掉得最快的两项技能。

## 相关阅读

- [CS2 升一段要赢几场](/guides/how-many-wins-to-rank-up-cs2) — 排队失败的时间是怎么变成 rating 损失的
- [常用 console 命令](/commands) — 下次 Ranked 排位前值得绑的 bind 集合
`,
  },
  {
    slug: 'cs2-rank-distribution',
    title: 'CS2 Rank Distribution 2026: Where You Stand by Rating',
    titleZh: 'CS2 段位分布 2026:按分数看你排在哪',
    description: 'Premier rating percentiles for Season 4 2026, with tier breakdowns and how to read your position relative to the active player base.',
    descriptionZh: 'S4 2026 赛季 Premier 分段百分位、各 tier 占比,以及怎么读懂自己在活跃玩家里的位置。',
    category: 'tips',
    readTime: 8,
    publishedAt: '2026-05-20',
    author: 'CS2 Practice Team',
    content: `
## The Quick View

CS2 Premier ratings range from 1,000 to roughly 35,000, with most players clustered around the middle. Based on community data aggregated from public profiles in early 2026:

- **Gray** (1,000 – 4,999) — about 7% of active players
- **Light Blue** (5,000 – 9,999) — about 32%
- **Blue** (10,000 – 14,999) — about 33%
- **Purple** (15,000 – 19,999) — about 18%
- **Pink** (20,000 – 24,999) — about 7%
- **Red** (25,000 – 29,999) — about 2%
- **Gold** (30,000+) — about 0.1%

The median Premier rating in Season 4 (started January 20, 2026) sits near **11,000** — solidly inside Blue.

## How to Read Your Percentile

A common question: "Where am I in the player base if my rating is X?" Rough conversion:

- **3,000** → bottom 4%
- **5,000** → bottom 10%
- **8,000** → bottom 25%
- **11,000** → ~50% (median)
- **14,000** → top 35%
- **17,000** → top 18%
- **20,000** → top 8%
- **23,000** → top 4%
- **25,000+** → top 2%

These are approximations. Valve does not publish the actual curve, and the curve shifts as the season ages.

## Why the Curve Is Skewed

You'll notice the distribution isn't a clean bell. Two reasons:

1. **The 1,000 floor.** Players who would mathematically be at 800 or 600 all pile up at 1,000, fattening the Gray tier. [Our floor analysis](/guides/lowest-cs2-premier-rating) covers why.
2. **Selection bias.** Players with fewer than ~30 Premier matches a season are often filtered out of public rating charts. That removes a lot of casual accounts from the visible "active" population, shifting the visible median up.

So if you see "average rating is 11,000" but you remember Season 1 averages of 8,000 — both are real. Season 1 included more casuals; Season 4 stats filter to regulars.

## Premier vs. Competitive vs. CS:GO Ranks

Premier is the modern flagship mode and is what most "rank" discussion refers to. But CS2 still ships two other ladders:

- **Competitive (per-map)** — Old CS:GO 18-rank system. Each map has its own rank from Silver I to Global Elite. Slower seasonal swings.
- **CS:GO legacy ranks** — Frozen for accounts that didn't migrate. No new placements.

Skill correlations from community data:

- Premier 5,000 ≈ Competitive Silver Elite to Gold Nova I
- Premier 10,000 ≈ Master Guardian II to DMG
- Premier 15,000 ≈ DMG to Legendary Eagle Master
- Premier 20,000+ ≈ Supreme to Global Elite

These are loose because Premier weights teamplay and round impact differently than per-map Competitive.

## What Changes Between Seasons

Each new season:

1. Everyone's rating is **recalculated down** based on prior season performance — typically lopped to roughly 75% of your previous final rating.
2. The visible distribution shifts down for the first 2-3 weeks before pulling back toward the long-term curve.
3. Players queueing in the first week tend to face higher variance because the system is recollecting data.

If your goal is to **see your true skill**, wait three weeks into a season before checking your rating, not the day after a reset.

## How Elite Players Actually Play

Players who hold 20,000+ across seasons share a few common traits:

- Sub-1.0 deaths per round average (positioning beats aim)
- 80%+ utility usage (every grenade gets thrown, never carried into the next round)
- 70%+ open-pick success rate when initiating contact
- Sub-25 ms ping to their primary relay (matters more than people think)

You don't reach Gold tier by aim alone — but elite aim is table stakes. [Browse pro players by role](/pro) to see how the top tier organizes their utility and positioning.

## Setting a Realistic Goal

The biggest mistake new Premier players make is targeting "Supreme" or "Global" without knowing those are essentially top 2%. A more useful framing:

- New player → first goal is **5,000** (clears the bottom Gray pit; usually achievable in 30-50 games)
- Coming from CS:GO Nova/MG → first goal is **10,000** (median)
- Coming from DMG/LE → first goal is **15,000+** (top third)
- Coming from Supreme/Global → goal is **20,000+** and consistency through season resets

Pair the goal with [our climb plan from the floor](/guides/lowest-cs2-premier-rating) if you're starting from Gray, and [the wins-per-rank math](/guides/how-many-wins-to-rank-up-cs2) to estimate how many sessions it'll take.

## Related Reading

- [The lowest CS2 Premier rating](/guides/lowest-cs2-premier-rating) — what 1,000 means
- [How many wins to rank up in CS2](/guides/how-many-wins-to-rank-up-cs2) — wins per tier
`,
    contentZh: `
## 一图速览

CS2 Premier rating 范围 1,000 到约 35,000,多数玩家聚集在中段。基于 2026 年初公开账号数据:

- **Gray**(1,000 – 4,999) — 约 7% 活跃玩家
- **Light Blue**(5,000 – 9,999) — 约 32%
- **Blue**(10,000 – 14,999) — 约 33%
- **Purple**(15,000 – 19,999) — 约 18%
- **Pink**(20,000 – 24,999) — 约 7%
- **Red**(25,000 – 29,999) — 约 2%
- **Gold**(30,000+) — 约 0.1%

S4 赛季(2026 年 1 月 20 日开赛)的 Premier 中位数约 **11,000**——稳在 Blue 段。

## 你的百分位怎么读

常见问题:"我 X 分在玩家群体里排哪?" 粗略对照:

- **3,000** → 后 4%
- **5,000** → 后 10%
- **8,000** → 后 25%
- **11,000** → ~50%(中位)
- **14,000** → 前 35%
- **17,000** → 前 18%
- **20,000** → 前 8%
- **23,000** → 前 4%
- **25,000+** → 前 2%

这是近似值,Valve 没公开真实曲线,曲线也随赛季时间推移而变化。

## 为什么曲线偏斜

分布不是漂亮的钟形,原因有二:

1. **1,000 硬底。** 数学上本应是 800 或 600 的账号全堆在 1,000,把 Gray 段撑胖。详见[底层段位分析](/guides/lowest-cs2-premier-rating)。
2. **抽样偏差。** 一季打不到约 30 场 Premier 的账号常被剔出公开 rating 图表。这把大量休闲账号从可见"活跃"池里去掉,让可见中位数往上漂。

所以你看到"平均 11,000"但记得 S1 平均 8,000——两个都是真的。S1 包含更多休闲玩家,S4 数据只筛常打的。

## Premier vs Competitive vs CS:GO 段位

Premier 是现代主力模式,多数"段位"讨论指的是它。但 CS2 还保留另两套:

- **Competitive(单图)** — 老 CS:GO 18 段。每张图独立段位,从 Silver I 到 Global Elite。赛季波动慢。
- **CS:GO 遗产段位** — 没迁移到 CS2 的账号冻结状态,不再新定级。

社区数据估算的水平对照:

- Premier 5,000 ≈ Competitive Silver Elite 到 Gold Nova I
- Premier 10,000 ≈ Master Guardian II 到 DMG
- Premier 15,000 ≈ DMG 到 Legendary Eagle Master
- Premier 20,000+ ≈ Supreme 到 Global Elite

只能算粗略——Premier 对团队配合和回合影响力的权重和单图 Competitive 不同。

## 赛季之间会变什么

每个新赛季:

1. 所有人的 rating **重新计算降级**,通常砍到上赛季最终分的约 75%
2. 头 2-3 周可见分布往下漂,之后逐渐拉回长期曲线
3. 第一周排位的玩家方差更大,系统还在重新收集数据

想看自己真实水平,赛季开始 3 周后再看,不要重置当天就检查。

## 顶尖玩家实际怎么打

跨赛季稳定在 20,000+ 的玩家有几个共同特征:

- 每回合死亡率小于 1.0(位置 > 枪法)
- 道具利用率 80%+(每个手雷都丢出去,绝不带进下一回合)
- 70%+ 开火主动权成功率
- 到主要中继 ping 小于 25ms(这个比想象中重要)

光靠枪法到不了 Gold——但顶尖枪法是入场券。[按位置看 pro 列表](/pro) 看顶级玩家怎么组织道具和位置。

## 设个实际目标

新 Premier 玩家最常犯的错是直接定 "Supreme" 或 "Global" 目标,却不知道这是前 2%。更实用的框架:

- 新玩家 → 第一目标 **5,000**(跳出 Gray 底坑,30-50 局可达)
- CS:GO Nova/MG 过来 → 第一目标 **10,000**(中位)
- DMG/LE 过来 → **15,000+**(前三分之一)
- Supreme/Global 过来 → **20,000+**,并在赛季重置间保持稳定

如果从 Gray 起步,配合[从底层往上爬的计划](/guides/lowest-cs2-premier-rating)看,加上[每段需要的胜场数](/guides/how-many-wins-to-rank-up-cs2)估算要打多少局。

## 相关阅读

- [CS2 Premier 最低分](/guides/lowest-cs2-premier-rating) — 1,000 意味着什么
- [CS2 升一段要赢几场](/guides/how-many-wins-to-rank-up-cs2) — 每段所需胜场
`,
  },
  {
    slug: 'how-many-wins-to-rank-up-cs2',
    title: 'How Many Wins to Rank Up in CS2 (2026)',
    titleZh: 'CS2 升一段要赢几场(2026)',
    description: 'No fixed number, but here are the realistic ranges: 5-10 wins per 1,000 rating in Premier, 25-50 wins per color tier, and 2 wins for initial Competitive placement.',
    descriptionZh: '没有固定数字,但实际范围是:Premier 每涨 1,000 分需 5-10 胜,跨一个颜色段需 25-50 胜,Competitive 单图定级 2 胜。',
    category: 'tips',
    readTime: 7,
    publishedAt: '2026-05-20',
    author: 'CS2 Practice Team',
    content: `
## The Short Answer

There is no fixed number. CS2 uses point-based rating changes, not "X wins to advance." But here's what we know in practical terms:

- **Premier — cross a 5,000-point color tier** (e.g. Light Blue → Blue): 25-50 wins
- **Premier — gain 1,000 rating within a tier**: 5-10 wins
- **Competitive — earn initial rank for a new map**: 2 wins
- **Competitive — promote one rank within a map**: 5-15 wins

If you came here looking for a guarantee like "win 4 in a row," that doesn't exist in CS2 — your individual stats matter as much as wins. The numbers above are the median for an average performer.

## How Premier Actually Rates Wins

Each Premier match adjusts your rating by **+50 to +250** for a win and **-50 to -200** for a loss. The size of the swing depends on:

1. **Opponent average rating relative to yours.** Beating a team rated 1,500 above you can be worth +250. Beating a team 1,500 below you can be as little as +25.
2. **Round differential.** A 13-4 stomp gains more than a 13-11 grind.
3. **Personal stats.** K/D, ADR, clutches, MVPs, and entry kills all feed into a "personal performance" multiplier. A 25-bomb on a losing team can still net you slight gains.
4. **Win streaks.** Small bonus for 3+ wins in a row.

This is why two players who both played 10 matches and went 6-4 can land 1,200 rating apart at the end.

## Premier: Climbing 1,000 Rating

A practical rough target for moving up within a color tier:

- **+1,000 rating** typically takes 5-10 wins if your win rate is above 55%
- At a 50/50 win rate you'll trend sideways — rating drifts ±200 around your mean
- Below 45% win rate you'll drop, full stop

Climbing one full tier (5,000 points, e.g. Light Blue → Blue) usually takes **25-50 wins** for an active player on a 55%+ win rate. If you're queueing solo, expect the higher end of that range — duo and trio queues with friends tend to win more consistently.

## Competitive: The 2-Win Placement

Competitive (per-map ranking) is the simpler ladder:

- **First 2 wins on a new map** → you receive an initial rank
- After that, each win can promote you by one rank if you outperform expectations
- A loss can demote you, but only after a streak of poor performance — single losses with strong stats usually hold rank

Most players reach their settling rank within 15-20 matches on a single map. After that, climbing slows down considerably.

## What Affects How Fast You Gain

Sorted by impact:

1. **Opponent strength.** Smurfs in your lobby boost your gains massively if you win.
2. **Personal round impact.** Entry frags, clutches, and assists all count. Watching demos teaches you which actions the system rewards.
3. **Streaks.** 3+ wins in a row triggers a multiplier. 3+ losses in a row triggers nothing — losses don't compound, but they don't decay either.
4. **Deficit recovery.** Winning from an 0-7 deficit at half-time is rated higher than winning 13-3.
5. **Premade size.** Solo queue has higher variance but the same average gain per win.

## When You Lose: How Much It Costs

A loss costs about 70-90% of what an equivalent win would have given. So a clean 60% win rate is net-positive: a six-win, four-loss stretch typically nets +400 to +700 rating.

Critical: **two consecutive losses don't compound** — they're each penalized once. Tilt-queuing makes the math worse only because you start playing badly, not because the system stacks penalties.

## How to Grind Wins Efficiently

If your goal is to rank up fast:

1. **Warm up for 15 minutes before queueing.** [Pick one aim trainer](/play) and don't skip this.
2. **Queue at the same time every day.** Stable matchmaking pools form at peak hours in your region.
3. **Solo queue or duo queue.** Five-stacks face inflated opponents — net rating gain is lower.
4. **Watch one pro POV per week.** Pick a player with similar strengths. [Browse pros by role](/pro).
5. **Track your own stats.** Pay attention to ADR (aim for 80+) and rounds with multikills, not raw K/D.

## Stopping Rules

If you go 0-5 in a sitting, stop. Tilt costs more than the rating itself — bad form bleeds into the next day's matches. Your matchmaking memory only resets fully after sleep.

[Use the time off to train](/play) instead of queueing through it.

## Related Reading

- [CS2 rank distribution](/guides/cs2-rank-distribution) — what tier you'd be in after these wins
- [The lowest CS2 Premier rating](/guides/lowest-cs2-premier-rating) — the floor you'll never drop below
- [CS2 failed-to-connect fix](/guides/cs2-failed-to-connect-ranked-fix) — don't lose wins to a bad handshake
`,
    contentZh: `
## 简短答案

没有固定数字。CS2 用积分制 rating 计算,不是"赢 X 场升一段"。但实际数字大致是:

- **Premier — 跨过 5,000 分一个颜色段**(例如 Light Blue → Blue):25-50 胜
- **Premier — 段内涨 1,000 分**:5-10 胜
- **Competitive — 新地图初始定级**:2 胜
- **Competitive — 单图升一段**:5-15 胜

想找"连赢 4 场必升"那种保证——CS2 没有,你的个人表现和胜负权重相当。上面是中等表现玩家的中位数。

## Premier 怎么给分

每场 Premier 比赛调整 **+50 到 +250** 分胜场,**-50 到 -200** 分败场。波动大小取决于:

1. **对手平均分相对于你**。打赢比你高 1,500 分的队伍可以拿 +250。打赢比你低 1,500 分的队伍可能只有 +25。
2. **回合差**。13-4 大胜比 13-11 拉锯加分更多。
3. **个人数据**。K/D、ADR、残局、MVP、首杀都进入"个人表现倍率"。输的局里打出 25 杀也能小幅加分。
4. **连胜**。3+ 连胜有小奖励。

所以两个都打 10 场都拿到 6-4 的玩家,最后分数可以差 1,200。

## Premier:涨 1,000 分

段内上升的实际目标:

- **+1,000 分**通常需要 5-10 胜,前提胜率 55%+
- 50/50 胜率横盘——分数在均值上下 200 漂移
- 胜率低于 45% 必跌,没有例外

跨一整个段(5,000 分,比如 Light Blue → Blue)通常需要 **25-50 胜**,前提是活跃玩家且胜率 55%+。单排预期偏上限——跟朋友双排三排胜场更稳。

## Competitive:2 胜定级

Competitive(单图段位)阶梯更简单:

- **新地图前 2 胜** → 拿到初始段位
- 之后每胜可能升一段,前提是超出预期表现
- 一场败不会马上掉段,要连续表现差才掉——单场输但数据好通常保段

多数玩家单图 15-20 场后稳定在自己的真实段位。之后升段会显著放慢。

## 影响升段速度的因素

按影响力排:

1. **对手强度**。房间里有小号你赢了能拿巨多分。
2. **个人回合影响力**。首杀、残局、助攻都算。看 demo 能学到系统奖励什么动作。
3. **连胜**。3+ 连胜触发倍率。3+ 连败不会叠加惩罚——但也不会衰减。
4. **逆风翻盘**。从半场 0-7 翻盘比 13-3 大胜分数更高。
5. **车队规模**。单排方差更大但每胜平均加分相同。

## 输了扣多少

一场败扣分约为同等胜场加分的 70-90%。所以 60% 胜率净赚:6 胜 4 负的一段通常净 +400 到 +700 分。

关键:**连败不叠加扣分**——各扣各的。摆烂排位真正的代价是你开始打得更差,不是系统加码罚分。

## 怎么高效刷胜

想快速升段:

1. **排位前热身 15 分钟。** [挑一个枪法训练器](/play),别跳过。
2. **每天同一时间排位。** 你所在区域高峰时段匹配池更稳。
3. **单排或双排。** 五排匹配会被拉高对手——净涨分反而少。
4. **每周看一段 pro POV。** 挑特点跟你相近的选手。[按位置看 pro 列表](/pro)。
5. **追踪自己数据。** 关注 ADR(目标 80+)和多杀回合,不是单纯 K/D。

## 停止规则

如果一坐 0-5,停。摆烂的代价比输那点分高得多——状态差会渗到第二天。匹配记忆只有睡一觉才完全重置。

[用休息时间练枪](/play),别硬肝。

## 相关阅读

- [CS2 段位分布](/guides/cs2-rank-distribution) — 这些胜场打完你在哪一段
- [CS2 Premier 最低分](/guides/lowest-cs2-premier-rating) — 你永远不会跌破的底线
- [CS2 连接失败修复](/guides/cs2-failed-to-connect-ranked-fix) — 别让坏握手吃掉你的胜场
`,
  },
];

// 获取所有 slug
export function getAllGuideSlugs(): string[] {
  return guides.map(g => g.slug);
}

// 获取指南
export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find(g => g.slug === slug);
}

// 按分类获取
export function getGuidesByCategory(category: Guide['category']): Guide[] {
  return guides.filter(g => g.category === category);
}
