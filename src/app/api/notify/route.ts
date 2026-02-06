import { NextRequest, NextResponse } from 'next/server';
import { sendSlackNotification, slackTemplates } from '@/lib/slack';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    let message;

    switch (type) {
      case 'feedback':
        message = slackTemplates.feedback(data);
        break;
      case 'milestone':
        message = slackTemplates.milestone(data);
        break;
      default:
        return NextResponse.json({ error: 'Invalid notification type' }, { status: 400 });
    }

    const success = await sendSlackNotification(message);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
    }
  } catch (error) {
    console.error('Notification API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
