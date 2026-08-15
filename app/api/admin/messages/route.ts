import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import MessageModel from '@/models/Message';

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await dbConnect();
  const messages = await MessageModel.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(messages);
}
