import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";

import { EditButton, Details } from "./_components";

interface Props {
  params: { id: string };
}

export default async function DetailsPage({ params }: Props) {
  //if (typeof params.id !== "number") notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
      <Box>
        <Details issue={issue} />
      </Box>

      <Box>
        <EditButton issueId={issue.id} />
      </Box>
    </Grid>
  );
}
