import { BadgeStatus, Link as ThemedLink } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

interface Props {
  issues: Issue[];
  searchParams: IssueQuery;
  selectedOrderBy: keyof Issue;
}

export default function IssueTable({
  issues,
  searchParams,
  selectedOrderBy,
}: Props) {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell key={column.value} className={column.class}>
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
  );
}

const columns: HeadingLink[] = [
  { label: "Issue", value: "title" },
  { label: "Satus", value: "status", class: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", class: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);

export interface HeadingLink {
  label: string;
  value: keyof Issue;
  class?: string;
}

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}
