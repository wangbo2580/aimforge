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
