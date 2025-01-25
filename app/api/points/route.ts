import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const POINTS_FILE = path.join(process.cwd(), 'data', 'points.json');

// Ensure data directory exists
async function ensureDataDir() {
  const dir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

// Read points data
async function readPointsData() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(POINTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

// Write points data
async function writePointsData(data: any) {
  await ensureDataDir();
  await fs.writeFile(POINTS_FILE, JSON.stringify(data, null, 2));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const data = await readPointsData();
  return NextResponse.json({ points: data[userId] || 0 });
}

export async function POST(request: Request) {
  const { userId, action, amount } = await request.json();

  if (!userId || !action || amount === undefined) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const data = await readPointsData();
  data[userId] = data[userId] || 0;

  switch (action) {
    case 'initialize':
      if (data[userId] === undefined) {
        data[userId] = 10;
      }
      break;
    case 'add':
      data[userId] += amount;
      break;
    case 'subtract':
      data[userId] = Math.max(0, data[userId] - amount);
      break;
    case 'set':
      data[userId] = Math.max(0, amount);
      break;
    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }

  await writePointsData(data);
  return NextResponse.json({ points: data[userId] });
} 