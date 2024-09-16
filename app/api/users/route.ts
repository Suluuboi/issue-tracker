import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/authOptions";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  //unautherised
  if (!session) return NextResponse.json({}, { status: 401 });

  req;

  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });

  return NextResponse.json(users);
}
