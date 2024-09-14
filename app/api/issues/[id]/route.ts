import { issueSchema } from "@/app/lib";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const validation = issueSchema.safeParse(body);

  const { success, data, error } = validation;
  const { id } = params;

  if (!success)
    return NextResponse.json({ error: error.format() }, { status: 400 });

  const issueToUpdate = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issueToUpdate)
    return NextResponse.json({ error: "Invalid Issue." }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issueToUpdate.id },
    data,
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const issueToDelete = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issueToDelete)
    return NextResponse.json({ error: "Invalid Issue." }, { status: 404 });

  const deletedIssue = await prisma.issue.delete({
    where: { id: issueToDelete.id },
  });

  return NextResponse.json(deletedIssue);
}
