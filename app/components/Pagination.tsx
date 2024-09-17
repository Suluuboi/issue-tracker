"use client";

import { Flex, Text } from "@radix-ui/themes";
import Button from "./Button";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
}

export default function Pagination({ itemCount, pageSize }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParams = searchParams.get("page");

  const currentPage = parseInt(pageParams?.toString() || "1");

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
        <Button disabled={currentPage === 1} onClick={() => changePage(1)}>
          <FaAngleDoubleLeft />
        </Button>
        <Button
          variant="soft"
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          <FaAngleLeft />
        </Button>

        <Text size={"2"}>
          Page {currentPage} of {pageCount}
        </Text>
        <Button
          variant="soft"
          disabled={currentPage === pageCount}
          onClick={() => changePage(currentPage + 1)}
        >
          <FaAngleRight />
        </Button>
        <Button
          disabled={currentPage === pageCount}
          onClick={() => changePage(pageCount)}
        >
          <FaAngleDoubleRight />
        </Button>
      </Flex>
    );
  }

  function changePage(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  }
}
