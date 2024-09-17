import { Container, Flex } from "@radix-ui/themes";
import IssueSummary from "./dashboard/IssueSummary";
import LatestIssues from "./dashboard/latestIssues";

import prisma from "@/prisma/client";
import IssueChart from "./dashboard/IssueChart";

export default async function Home() {
  const closedCount = await prisma.issue.count({ where: { status: "CLOSED" } });
  const openCount = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inProgressCount = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  return (
    <Container>
      <div className="row">
        <div>{/* <LatestIssues /> */}</div>
        <div>
          <IssueSummary
            clossed={closedCount}
            open={openCount}
            inProgress={inProgressCount}
          />
        </div>
        <div>
          <IssueChart
            clossed={closedCount}
            inProgress={inProgressCount}
            open={openCount}
          />
        </div>
      </div>
    </Container>
  );
}
