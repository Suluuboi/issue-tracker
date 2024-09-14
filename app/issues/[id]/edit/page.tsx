import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueForm from "../../_component/IssueForm";

interface Props {
  params: { id: string };
}

export default async function EditIssue({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
}
