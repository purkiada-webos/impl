import { NextResponse } from 'next/server';
import { pool } from '@/app/backend/database';

export async function POST(request: Request) {
  const { userId, taskType } = await request.json();

  if (!userId || !taskType) {
    return NextResponse.json({ 
      success: false,
      message: 'Missing required fields',
      isFirstTime: false 
    }, { status: 400 });
  }

  try {
    // Check if task already exists
    const [existing] = await pool.query(
      'SELECT * FROM tasks WHERE user_id = ? AND task_type = ?',
      [userId, taskType]
    );

    if ((existing as any[]).length > 0) {
      return NextResponse.json({
        success: true,
        message: 'Task already completed',
        isFirstTime: false
      });
    }

    // Insert new task
    await pool.query(
      'INSERT INTO tasks (user_id, task_type, completed_at) VALUES (?, ?, NOW())',
      [userId, taskType]
    );

    return NextResponse.json({
      success: true,
      message: 'Task completed successfully',
      isFirstTime: true
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({
      success: false,
      message: 'Database error occurred',
      isFirstTime: false
    }, { status: 500 });
  }
} 