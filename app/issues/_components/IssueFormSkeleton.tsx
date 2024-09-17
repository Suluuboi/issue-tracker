import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";

export default function IssueFormSkeleton() {
  return (
    <Box maxWidth={"max-w-l"}>
      <Skeleton height={"2rem"} />
      <Skeleton height={"2rem"} width={"8rem"} />
      <Skeleton className="mb-5" height={"20rem"} />
      <Skeleton height={"2rem"} width={"8rem"} />
    </Box>
  );
}
