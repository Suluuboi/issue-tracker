import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";

export default function LoadingNew() {
  return (
    <Box maxWidth={"max-w-xl"}>
      <Skeleton />
      <Skeleton className="mb-5" height={"20rem"} />
      <Skeleton width={"4rem"} />
    </Box>
  );
}
