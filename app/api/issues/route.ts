import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "@/app/validationSchema";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = issueSchema.safeParse(body);
  const { error, data } = validation;

  //bad request
  if (!validation.success)
    return NextResponse.json(error?.format(), { status: 400 });

  const newIssue = await prisma.issue.create({ data: data! });

  return NextResponse.json(newIssue, { status: 201 });
}
