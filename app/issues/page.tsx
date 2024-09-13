import ThemedLink from "@/app/components/Link";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueStatus from "../components/badge/Status";
import IssuesAction from "./new/component/IssuesActions";

export default async function Issues() {
  const issues = await prisma.issue.findMany();
  return (
    <div>
      <IssuesAction />
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
                  <IssueStatus status={issue.status} />
                </div>
              </Table.Cell>

              <Table.Cell className="hidden md:table-cell">
                <IssueStatus status={issue.status} />
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
