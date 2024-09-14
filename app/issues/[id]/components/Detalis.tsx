import { BadgeStatus } from "@/app/components";
import { Issue } from "@prisma/client";
import { Flex, Heading, Text, Card } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

interface Props {
  issue: Issue;
}

export default function Detalis({ issue }: Props) {
  const { title, description, status, createdAt } = issue;
  return (
    <>
      <Heading>{title}</Heading>
      <Flex gap={"3"} my={"2"} align={"center"}>
        <BadgeStatus status={status} />
        <Text as="p">{createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose mt-4">
        <ReactMarkdown>{description}</ReactMarkdown>
      </Card>
    </>
  );
}
