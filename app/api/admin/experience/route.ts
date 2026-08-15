import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import ExperienceModel from '@/models/Experience';

export async function GET() {
  await dbConnect();
  const experiences = await ExperienceModel.find().sort({ startDate: -1 }).lean();
  return NextResponse.json(experiences);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await req.json();
  await dbConnect();
  const exp = await ExperienceModel.create(data);
  return NextResponse.json(exp, { status: 201 });
}
