import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import ProfileModel from '@/models/Profile';

export async function GET() {
  await dbConnect();
  const profile = await ProfileModel.findOne().lean();
  return NextResponse.json(profile ?? {});
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await req.json();
  await dbConnect();
  const profile = await ProfileModel.findOneAndUpdate({}, data, { new: true, upsert: true });
  return NextResponse.json(profile);
}
