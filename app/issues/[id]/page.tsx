import { BadgeStatus } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaPencil } from "react-icons/fa6";

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
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
      <Box>
        <Heading>{title}</Heading>
        <Flex gap={"3"} my={"2"} align={"center"}>
          <BadgeStatus status={status} />
          <Text as="p">{createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose mt-4">
          <ReactMarkdown>{description}</ReactMarkdown>
        </Card>
      </Box>

      <Box>
        <Button>
          <FaPencil />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
}
