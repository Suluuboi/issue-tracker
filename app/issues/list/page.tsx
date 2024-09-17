import { BadgeStatus, Link as ThemedLink } from "@/app/components";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssuesActions from "../new/_component/IssuesActions";
import { Status } from "@prisma/client";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: { status: Status };
}
export default async function Issues({ searchParams }: Props) {
  const { status } = searchParams;

  const statuses = Object.values(Status);
  const selectedStatus = statuses.includes(status) ? status : undefined;

  const issues = await prisma.issue.findMany({
    where: { status: selectedStatus },
    orderBy: { id: "desc" },
  });

  return (
    <div>
      <IssuesActions />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Satus
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <ThemedLink href={`/issues/${issue.id}`}>
                  {issue.title}
                </ThemedLink>
                <div className="block md:hidden">
                  <BadgeStatus status={issue.status} />
                </div>
              </Table.Cell>

              <Table.Cell className="hidden md:table-cell">
                <BadgeStatus status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
