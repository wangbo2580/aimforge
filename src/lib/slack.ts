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
  feedback: (info: { message: string; email?: string }) => ({
    text: `📝 New feedback: ${info.message}`,
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
      ...(info.email ? [{
        type: 'section' as const,
        text: {
          type: 'mrkdwn' as const,
          text: `*Email:* ${info.email}`,
        },
      }] : []),
    ],
  }),

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
