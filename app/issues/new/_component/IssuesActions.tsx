import { Button } from "@/app/components";
import Link from "next/link";
import StatusFilter from "../../_components/StatusFilter";
import { Flex } from "@radix-ui/themes";

export default function IssuesActions() {
  return (
    <Flex className="mb-5" justify={"between"}>
      <Button>
        <Link href={"/issues/new"}>New Issue</Link>
      </Button>
      <StatusFilter />
    </Flex>
  );
}
