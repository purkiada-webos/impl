import { NextResponse } from 'next/server';
import { checkPassword, addUser, checkIfExists, getCurrentUser } from '@/app/backend/database';

export async function POST(request: Request) {
  try {
    if (!request.body) {
      return NextResponse.json(
        { error: 'Missing request body' },
        { status: 400 }
      );
    }

    const body = await request.json();

    if (!body.username || !body.password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const { username, password } = body;
    
    try {
      const exists = await checkIfExists(username);
      
      if (!exists) {
        const userId = await addUser(username, password);
        if (userId) {
          return NextResponse.json({ 
            success: true,
            message: 'User created successfully',
            userId: userId
          });
        }
      }

      const isValid = await checkPassword(username, password);
      
      if (isValid) {
        const userId = await getCurrentUser(username);
        return NextResponse.json({ 
          success: true,
          message: 'Login successful',
          userId: userId
        });
      }

      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Database error occurred' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 