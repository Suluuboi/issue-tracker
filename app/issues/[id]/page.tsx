import IssueStatus from "@/app/components/badge/Status";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";

import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

export default async function Details({ params }: Props) {
  //if (typeof params.id !== "number") notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  const { title, description, status, createdAt } = issue;
  return (
    <div>
      <Heading>{title}</Heading>
      <Flex gap={"3"} my={"2"} align={"center"}>
        <IssueStatus status={status} />
        <Text as="p">{createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose mt-4">
        <ReactMarkdown>{description}</ReactMarkdown>
      </Card>
    </div>
  );
}
