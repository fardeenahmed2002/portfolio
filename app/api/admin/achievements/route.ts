import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import AchievementModel from '@/models/Achievement';

export async function GET() {
  await dbConnect();
  const items = await AchievementModel.find().sort({ date: -1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await req.json();
  await dbConnect();
  const item = await AchievementModel.create(data);
  return NextResponse.json(item, { status: 201 });
}
