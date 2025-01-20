import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/backend/database';

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const username = params.username;
    const userId = await getCurrentUser(username);

    if (userId) {
      return NextResponse.json({
        id: userId,
        username: username
      });
    }

    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 