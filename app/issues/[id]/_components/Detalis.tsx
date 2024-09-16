import { BadgeStatus } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

interface Props {
  issue: Issue;
}

export default async function Detalis({ issue }: Props) {
  const { title, description, status, createdAt } = issue;

  return (
    <>
      <Heading>{title}</Heading>
      <Flex gap={"3"} my={"2"} align={"center"}>
        <BadgeStatus status={status} />
        <Text as="p">{createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose mt-4 max-w-full">
        <ReactMarkdown>{description}</ReactMarkdown>
      </Card>
    </>
  );
}
