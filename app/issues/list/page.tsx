import { Pagination } from "@/app/components";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import IssueTable, { columnNames, IssueQuery } from "../_components/IssueTable";
import IssuesActions from "../new/_component/IssuesActions";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: IssueQuery;
}
export default async function Issues({ searchParams }: Props) {
  const {
    status: selectedStatus,
    orderBy: selectedOrderBy,
    page: pageNumber,
  } = searchParams;

  const statuses = Object.values(Status);
  const status = statuses.includes(selectedStatus) ? selectedStatus : undefined;

  const orderBy = columnNames.includes(selectedOrderBy)
    ? { [selectedOrderBy]: "desc" }
    : undefined;

  const where = { status };

  const page = parseInt(pageNumber) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where, //: { status },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Pagination itemCount={issueCount} pageSize={pageSize}>
      <Flex direction={"column"} width={"100%"} gap={"3"}>
        <IssuesActions />

        <IssueTable
          issues={issues}
          searchParams={searchParams}
          selectedOrderBy={selectedOrderBy}
        />
      </Flex>
    </Pagination>
  );
}
