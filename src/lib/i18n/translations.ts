// 多语言翻译文件

export type Locale = 'en' | 'zh';

export const translations = {
  en: {
    // Common
    app_name: 'AimForge',
    app_description: 'Free online aim trainer for CS2, Valorant and other FPS games. Practice gridshot, tracking and flicking with your exact in-game sensitivity.',

    // Navigation
    nav_home: 'Home',
    nav_play: 'Play',
    nav_stats: 'Stats',
    nav_settings: 'Settings',

    // Home
    home_title: 'AimForge',
    home_subtitle: 'Free online FPS aim trainer. Supports CS2, Valorant sensitivity sync with Gridshot, Tracking, and Flicking training modes.',
    home_start: 'Start Training',
    home_training_modes: 'Training Modes',
    home_why_choose: 'Why Choose AimForge',

    // Training Modes
    mode_gridshot: 'Gridshot',
    mode_gridshot_desc: 'Click static targets quickly to improve reaction time and click accuracy',
    mode_tracking: 'Tracking',
    mode_tracking_desc: 'Track moving targets to improve mouse control and smoothness',
    mode_flicking: 'Flicking',
    mode_flicking_desc: 'Quick flick training to improve flick accuracy and speed',

    // Features
    feature_free: 'Completely Free',
    feature_free_desc: 'No payment, no subscription, all features forever free',
    feature_sensitivity: 'Sensitivity Sync',
    feature_sensitivity_desc: 'Supports CS2, Valorant sensitivity settings, training transfers directly',
    feature_no_download: 'No Download',
    feature_no_download_desc: 'Runs in browser, works instantly on all modern browsers',
    feature_local: 'Local Storage',
    feature_local_desc: 'Training records saved locally, no account required',

    // Game
    game_click_to_start: 'Click to start training',
    game_esc_pause: 'ESC - Pause/Exit',
    game_space_continue: 'Space - Continue',
    game_paused: 'Paused',
    game_click_continue: 'Click or press Space to continue',
    game_score: 'Score',
    game_accuracy: 'Accuracy',
    game_time: 'Time',

    // Results
    result_complete: 'Training Complete',
    result_grade: 'Grade',
    result_score: 'Score',
    result_accuracy: 'Accuracy',
    result_avg_reaction: 'Avg Reaction Time',
    result_best_reaction: 'Best Reaction Time',
    result_hits: 'Hits/Total',
    result_duration: 'Duration',
    result_back: 'Back',
    result_restart: 'Try Again',

    // Settings
    settings_title: 'Settings',
    settings_sensitivity: 'Sensitivity Settings',
    settings_game: 'Game',
    settings_game_sens: 'In-game Sensitivity',
    settings_dpi: 'Mouse DPI',
    settings_presets: 'Pro Player Presets',
    settings_custom: 'Custom',
    settings_cm360: 'cm/360',
    settings_sound: 'Sound Effects',
    settings_sound_desc: 'Enable or disable game sounds',
    settings_crosshair_color: 'Crosshair Color',
    settings_crosshair_color_desc: 'Customize crosshair display color',
    settings_crosshair_size: 'Crosshair Size',
    settings_crosshair_size_desc: 'Adjust crosshair display size',
    settings_data: 'Data Management',
    settings_clear: 'Clear Training Records',
    settings_clear_desc: 'Delete all locally saved training data',
    settings_clear_btn: 'Clear Data',
    settings_clear_confirm: 'Are you sure you want to clear all training records? This cannot be undone.',
    settings_about: 'About',
    settings_version: 'Version',
    settings_local_note: 'All data is stored locally in your browser and will not be uploaded to any server.',

    // Training Config
    config_title: 'Training Config',
    config_duration: 'Duration',
    config_target_size: 'Target Size',
    config_target_count: 'Target Count',
    config_move_pattern: 'Movement Pattern',
    config_speed: 'Speed',
    config_distance: 'Target Distance',
    size_small: 'Small',
    size_medium: 'Medium',
    size_large: 'Large',
    speed_slow: 'Slow',
    speed_medium: 'Medium',
    speed_fast: 'Fast',
    distance_close: 'Close',
    distance_medium: 'Medium',
    distance_far: 'Far',
    pattern_strafe: 'Strafe',
    pattern_linear: 'Linear',
    pattern_curve: 'Curve',
    pattern_random: 'Random',

    // Stats
    stats_title: 'Training Stats',
    stats_total_sessions: 'Total Sessions',
    stats_total_score: 'Total Score',
    stats_avg_accuracy: 'Avg Accuracy',
    stats_avg_reaction: 'Avg Reaction',
    stats_no_data: 'No training records yet',
    stats_no_data_hint: 'Complete a training session to see data here',
    stats_best_score: 'Best Score',
    stats_recent: 'Recent Training Records',

    // Play page
    play_title: 'Select Training Mode',
    play_subtitle: 'Choose a training mode to start improving your aim. Each mode targets different skills.',
    play_start: 'Start Training',
    play_tips: 'Training Tips',
    tip_1: 'Make sure mouse sensitivity matches your in-game settings',
    tip_2: 'Train for 15-30 seconds for best results, avoid fatigue',
    tip_3: 'Maintain correct posture and wrist position',
    tip_4: 'Take regular breaks, 5 minutes every 30 minutes',

    // Footer
    footer_tagline: 'Built for gamers, by gamers',
  },

  zh: {
    // Common
    app_name: 'AimForge',
    app_description: '免费的在线瞄准训练器，支持 CS2、Valorant 等 FPS 游戏。使用与游戏内完全一致的灵敏度练习 Gridshot、Tracking 和 Flicking。',

    // Navigation
    nav_home: '首页',
    nav_play: '训练',
    nav_stats: '统计',
    nav_settings: '设置',

    // Home
    home_title: 'AimForge',
    home_subtitle: '免费的在线 FPS 瞄准训练器。支持 CS2、Valorant 灵敏度同步，提供 Gridshot、Tracking、Flicking 三种训练模式。',
    home_start: '开始训练',
    home_training_modes: '训练模式',
    home_why_choose: '为什么选择 AimForge',

    // Training Modes
    mode_gridshot: 'Gridshot',
    mode_gridshot_desc: '快速点击静态目标，提升反应速度和点击精度',
    mode_tracking: 'Tracking',
    mode_tracking_desc: '追踪移动目标，提升鼠标控制和平滑度',
    mode_flicking: 'Flicking',
    mode_flicking_desc: '快速甩枪训练，提升甩枪精度和速度',

    // Features
    feature_free: '完全免费',
    feature_free_desc: '无需付费，无需订阅，所有功能永久免费',
    feature_sensitivity: '灵敏度同步',
    feature_sensitivity_desc: '支持 CS2、Valorant 灵敏度设置，训练效果直接迁移',
    feature_no_download: '无需下载',
    feature_no_download_desc: '浏览器内运行，打开即用，支持所有现代浏览器',
    feature_local: '本地存储',
    feature_local_desc: '训练记录保存在本地，无需注册账号',

    // Game
    game_click_to_start: '点击屏幕开始训练',
    game_esc_pause: 'ESC - 暂停/退出',
    game_space_continue: '空格 - 继续',
    game_paused: '暂停',
    game_click_continue: '点击屏幕或按空格继续',
    game_score: '分数',
    game_accuracy: '准确率',
    game_time: '时间',

    // Results
    result_complete: '训练完成',
    result_grade: '评级',
    result_score: '得分',
    result_accuracy: '准确率',
    result_avg_reaction: '平均反应时间',
    result_best_reaction: '最佳反应时间',
    result_hits: '命中/总目标',
    result_duration: '训练时长',
    result_back: '返回',
    result_restart: '再来一次',

    // Settings
    settings_title: '设置',
    settings_sensitivity: '敏感度设置',
    settings_game: '游戏',
    settings_game_sens: '游戏内灵敏度',
    settings_dpi: '鼠标 DPI',
    settings_presets: '职业选手预设',
    settings_custom: '自定义',
    settings_cm360: 'cm/360',
    settings_sound: '声音效果',
    settings_sound_desc: '开启或关闭游戏音效',
    settings_crosshair_color: '准星颜色',
    settings_crosshair_color_desc: '自定义准星显示颜色',
    settings_crosshair_size: '准星大小',
    settings_crosshair_size_desc: '调整准星显示大小',
    settings_data: '数据管理',
    settings_clear: '清除训练记录',
    settings_clear_desc: '删除所有本地保存的训练数据',
    settings_clear_btn: '清除数据',
    settings_clear_confirm: '确定要清除所有训练记录吗？此操作不可恢复。',
    settings_about: '关于',
    settings_version: '版本',
    settings_local_note: '所有数据仅保存在本地浏览器中，不会上传到服务器。',

    // Training Config
    config_title: '训练配置',
    config_duration: '训练时长',
    config_target_size: '目标大小',
    config_target_count: '同时目标数',
    config_move_pattern: '移动模式',
    config_speed: '移动速度',
    config_distance: '目标距离',
    size_small: '小',
    size_medium: '中',
    size_large: '大',
    speed_slow: '慢',
    speed_medium: '中',
    speed_fast: '快',
    distance_close: '近',
    distance_medium: '中',
    distance_far: '远',
    pattern_strafe: '左右闪避',
    pattern_linear: '直线',
    pattern_curve: '曲线',
    pattern_random: '随机',

    // Stats
    stats_title: '训练统计',
    stats_total_sessions: '总训练次数',
    stats_total_score: '总得分',
    stats_avg_accuracy: '平均准确率',
    stats_avg_reaction: '平均反应时间',
    stats_no_data: '还没有训练记录',
    stats_no_data_hint: '完成一次训练后数据会显示在这里',
    stats_best_score: '最高分',
    stats_recent: '最近训练记录',

    // Play page
    play_title: '选择训练模式',
    play_subtitle: '选择一个训练模式开始提升你的瞄准能力。每种模式针对不同的技能进行训练。',
    play_start: '开始训练',
    play_tips: '训练小贴士',
    tip_1: '训练前确保鼠标灵敏度设置与游戏内一致',
    tip_2: '每次训练15-30秒效果最佳，避免疲劳',
    tip_3: '保持正确的坐姿和手腕位置',
    tip_4: '定期休息，每30分钟休息5分钟',

    // Footer
    footer_tagline: 'Built for gamers, by gamers',
  },
};

export type TranslationKey = keyof typeof translations.en;
