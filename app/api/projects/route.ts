import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import ProjectModel from '@/models/Project';

export async function GET() {
  await dbConnect();
  const projects = await ProjectModel.find().sort({ order: 1, createdAt: -1 }).lean();
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await req.json();
  await dbConnect();
  const project = await ProjectModel.create(data);
  return NextResponse.json(project, { status: 201 });
}
