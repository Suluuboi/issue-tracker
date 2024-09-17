import { BadgeStatus, Link as ThemedLink } from "@/app/components";
import prisma from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import IssuesActions from "../new/_component/IssuesActions";
import { Issue, Status } from "@prisma/client";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa6";
import Pagination from "@/app/components/Pagination";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}
export default async function Issues({ searchParams }: Props) {
  const {
    status: selectedStatus,
    orderBy: selectedOrderBy,
    page: pageNumber,
  } = searchParams;

  const columns: { label: string; value: keyof Issue; class?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Satus", value: "status", class: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", class: "hidden md:table-cell" },
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(selectedStatus) ? selectedStatus : undefined;

  const orderBy = columns
    .map((column) => column.value)
    .includes(selectedOrderBy)
    ? { [selectedOrderBy]: "desc" }
    : undefined;

  const where = { status };

  const page = parseInt(pageNumber) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Pagination itemCount={issueCount} pageSize={pageSize}>
      <Flex direction={"column"} width={"100%"}>
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
      </Flex>
    </Pagination>
  );
}
