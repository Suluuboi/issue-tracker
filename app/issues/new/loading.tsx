import { Box } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingNew() {
  return (
    <Box maxWidth={"max-w-xl"}>
      <Skeleton />
      <Skeleton className="mb-5" height={"20rem"} />
      <Skeleton width={"4rem"} />
    </Box>
  );
}
