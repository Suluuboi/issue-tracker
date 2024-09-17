import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table, Text } from "@radix-ui/themes";
import { BadgeStatus } from "../components";
import Link from "next/link";

interface Props {}

export default async function latestIssues({}: Props) {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Heading mb={"5"}>Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify={"between"}>
                  <Flex direction={"column"} gap={"2"}>
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <Flex>
                      <BadgeStatus status={issue.status} />
                    </Flex>
                  </Flex>
                  <Flex>
                    {issue.assignedToUser && (
                      <Avatar
                        size={"2"}
                        radius={"small"}
                        fallback={"?"}
                        src={issue.assignedToUser.image!}
                      />
                    )}
                  </Flex>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
}
