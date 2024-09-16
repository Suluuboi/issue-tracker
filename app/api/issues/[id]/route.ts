import { patchIssueSchema } from "@/app/_lib/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/authOptions";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // const session = await getServerSession(authOptions);

  // //unautherised
  // if (!session) return NextResponse.json({}, { status: 401 });

  const body = await req.json();

  const validation = patchIssueSchema.safeParse(body);

  const { success, data, error } = validation;
  const { id } = params;

  if (!success)
    return NextResponse.json({ error: error.format() }, { status: 400 });

  //chech if we updating assigned user
  const { assignedToUserId } = data;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });

    if (!user)
      return NextResponse.json("Invalid user.", {
        status: 400,
      });
  }

  const issueToUpdate = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issueToUpdate)
    return NextResponse.json({ error: "Invalid Issue." }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issueToUpdate.id },
    data,
    // data: {
    //   title,
    //   description,
    //   assignedToUserId,
    // },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  //unautherised
  if (!session) return NextResponse.json({}, { status: 401 });

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
