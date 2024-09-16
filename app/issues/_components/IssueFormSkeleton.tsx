import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";

export default function IssueFormSkeleton() {
  return (
    <Box maxWidth={"max-w-xl"}>
      <Skeleton height={"2rem"} />
      <Skeleton className="mb-5" height={"20rem"} />
      <Skeleton width={"4rem"} height={"2rem"} />
    </Box>
  );
}
