import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import ExperienceModel from '@/models/Experience';

interface Params { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const data = await req.json();
  await dbConnect();
  const exp = await ExperienceModel.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(exp);
}

export async function DELETE(_: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  await dbConnect();
  await ExperienceModel.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
