import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = schema.safeParse(body);
  const { error, data } = validation;

  //bad request
  if (!validation.success)
    return NextResponse.json(error?.errors, { status: 400 });

  const newIssue = await prisma.issue.create({ data: data! });

  return NextResponse.json(newIssue, { status: 201 });
}
