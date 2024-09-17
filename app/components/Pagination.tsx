"use client";

import { Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { PropsWithChildren } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Button from "./Button";

interface Props extends PropsWithChildren {
  itemCount: number;
  pageSize: number;
}

export default function Pagination({ itemCount, pageSize, children }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParams = searchParams.get("page");

  const currentPage = parseInt(pageParams?.toString() || "1");

  const pageCount = Math.ceil(itemCount / pageSize);

  return (
    <Flex direction={"column"} width={"100%"}>
      <Flex width={"100%"}>{children}</Flex>
      <PageControls />
    </Flex>
  );

  function PageControls() {
    return (
      <Flex justify={"center"} gap={"2"} align={"center"} mt={"3"}>
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
