import prisma from "@/prisma/client";
import delay from "delay";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function Details({ params }: Props) {
  if (typeof params.id !== "number") notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  delay(2000);
  if (!issue) notFound();

  const { title, description, status, createdAt } = issue;
  return (
    <div>
      <p>{title}</p>
      <p>{status}</p>
      <p>{description}</p>
      <p>{createdAt.toDateString()}</p>
    </div>
  );
}
