import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import ProjectModel from '@/models/Project';

interface Params { params: Promise<{ id: string }> }

export async function GET(_: NextRequest, { params }: Params) {
  const { id } = await params;
  await dbConnect();
  const project = await ProjectModel.findById(id).lean();
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const data = await req.json();
  await dbConnect();
  const project = await ProjectModel.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(project);
}

export async function DELETE(_: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  await dbConnect();
  await ProjectModel.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
