// Slack Webhook 通知工具

interface SlackMessage {
  text: string;
  blocks?: Array<{
    type: string;
    text?: {
      type: string;
      text: string;
    };
    fields?: Array<{
      type: string;
      text: string;
    }>;
  }>;
}

interface FeedbackInfo {
  category?: string;
  message: string;
  email?: string;
  context?: {
    source?: string;
    page?: string;
    userAgent?: string;
    viewport?: string;
    trainingMode?: string;
    score?: number;
    accuracy?: number;
    duration?: number;
    sessionsSaved?: number;
    localRuns?: number;
    selectedOption?: string;
  };
}

export async function sendSlackNotification(message: SlackMessage): Promise<boolean> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('SLACK_WEBHOOK_URL not configured');
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to send Slack notification:', error);
    return false;
  }
}

// 预定义的通知模板
export const slackTemplates = {
  // 用户反馈通知
  feedback: (info: FeedbackInfo) => {
    const contextFields = [
      info.category ? `*Category:*\n${info.category}` : null,
      info.context?.source ? `*Source:*\n${info.context.source}` : null,
      info.context?.page ? `*Page:*\n${info.context.page}` : null,
      info.context?.selectedOption ? `*Option:*\n${info.context.selectedOption}` : null,
      info.context?.trainingMode ? `*Mode:*\n${info.context.trainingMode}` : null,
      typeof info.context?.score === 'number' ? `*Score:*\n${info.context.score}` : null,
      typeof info.context?.accuracy === 'number' ? `*Accuracy:*\n${info.context.accuracy}%` : null,
      typeof info.context?.sessionsSaved === 'number' ? `*Saved runs:*\n${info.context.sessionsSaved}` : null,
      info.context?.viewport ? `*Viewport:*\n${info.context.viewport}` : null,
    ].filter(Boolean) as string[];

    return {
      text: `📝 New feedback: ${info.category || 'uncategorized'} - ${info.message}`,
      blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*📝 New Feedback*',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: info.message,
        },
      },
      ...(contextFields.length > 0 ? [{
        type: 'section' as const,
        fields: contextFields.slice(0, 10).map((text) => ({
          type: 'mrkdwn' as const,
          text,
        })),
      }] : []),
      ...(info.email ? [{
        type: 'section' as const,
        text: {
          type: 'mrkdwn' as const,
          text: `*Email:* ${info.email}`,
        },
      }] : []),
      ...(info.context?.userAgent ? [{
        type: 'section' as const,
        text: {
          type: 'mrkdwn' as const,
          text: `*User agent:*\n${info.context.userAgent}`,
        },
      }] : []),
      ],
    };
  },

  // 里程碑通知
  milestone: (info: { event: string; count: number }) => ({
    text: `🎉 Milestone: ${info.event} - ${info.count}`,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*🎉 Milestone Reached!*\n${info.event}: *${info.count.toLocaleString()}*`,
        },
      },
    ],
  }),
};
