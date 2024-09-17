import { Container, Flex, Grid } from "@radix-ui/themes";
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
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
      <Flex direction={"column"} gap={"5"}>
        <IssueSummary
          clossed={closedCount}
          open={openCount}
          inProgress={inProgressCount}
        />
        <LatestIssues />
      </Flex>

      <IssueChart
        clossed={closedCount}
        inProgress={inProgressCount}
        open={openCount}
      />
    </Grid>
  );
}
