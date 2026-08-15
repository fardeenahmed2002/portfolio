import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import ServiceModel from '@/models/Service';

interface Params { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const data = await req.json();
  await dbConnect();
  const item = await ServiceModel.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(item);
}

export async function DELETE(_: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  await dbConnect();
  await ServiceModel.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
