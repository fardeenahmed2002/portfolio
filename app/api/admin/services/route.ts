import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import ServiceModel from '@/models/Service';

export async function GET() {
  await dbConnect();
  const items = await ServiceModel.find().sort({ order: 1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await req.json();
  await dbConnect();
  const item = await ServiceModel.create(data);
  return NextResponse.json(item, { status: 201 });
}
