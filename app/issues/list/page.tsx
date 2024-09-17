import { BadgeStatus, Link as ThemedLink } from "@/app/components";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssuesActions from "../new/_component/IssuesActions";
import { Issue, Status } from "@prisma/client";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa6";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue };
}
export default async function Issues({ searchParams }: Props) {
  const { status, orderBy: selectedOrderBy } = searchParams;

  const columns: { label: string; value: keyof Issue; class?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Satus", value: "status", class: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", class: "hidden md:table-cell" },
  ];

  const statuses = Object.values(Status);
  const selectedStatus = statuses.includes(status) ? status : undefined;

  const orderBy = columns
    .map((column) => column.value)
    .includes(selectedOrderBy)
    ? { [selectedOrderBy]: "desc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status: selectedStatus },
    orderBy,
  });

  return (
    <div>
      <IssuesActions />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.class}
              >
                <Link
                  href={{ query: { ...searchParams, orderBy: column.value } }}
                >
                  {column.label}
                </Link>
                {column.value === selectedOrderBy && (
                  <FaChevronDown className="inline space-x-1" />
                )}
              </Table.ColumnHeaderCell>
            ))}
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
