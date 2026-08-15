import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import SkillModel from '@/models/Skill';

export async function GET() {
  await dbConnect();
  const skills = await SkillModel.find().sort({ order: 1 }).lean();
  return NextResponse.json(skills);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await req.json();
  await dbConnect();
  const skill = await SkillModel.create(data);
  return NextResponse.json(skill, { status: 201 });
}
