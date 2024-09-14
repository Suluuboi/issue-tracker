import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";

import { EditButton, Details, DeleteButton } from "./_components";

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
    <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
      <Box className="md:col-span-4">
        <Details issue={issue} />
      </Box>

      <Box>
        <Flex direction={"column"} gap={"3"}>
          <EditButton issueId={issue.id} />
          <DeleteButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
}
