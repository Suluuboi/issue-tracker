import { Flex, Text } from "@radix-ui/themes";
import Button from "./Button";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

export default function Pagination({
  currentPage,
  itemCount,
  pageSize,
}: Props) {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;
  return (
    <Flex align={"center"} justify={"center"}>
      <PageControls />
    </Flex>
  );

  function PageControls() {
    return (
      <Flex justify={"center"} gap={"2"} align={"center"}>
        <Button disabled={currentPage === 1}>
          <FaAngleDoubleLeft />
        </Button>
        <Button variant="soft" disabled={currentPage === 1}>
          <FaAngleLeft />
        </Button>

        <Text size={"2"}>
          Page {currentPage} of {pageCount}
        </Text>
        <Button variant="soft" disabled={currentPage === pageCount}>
          <FaAngleRight />
        </Button>
        <Button disabled={currentPage === pageCount}>
          <FaAngleDoubleRight />
        </Button>
      </Flex>
    );
  }
}
