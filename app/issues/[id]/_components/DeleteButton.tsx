"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { FaDeleteLeft } from "react-icons/fa6";

export default function DeleteButton({ issueId }: { issueId: number }) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">
          <FaDeleteLeft />
          Delete Issue
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <AlertDialog.Title>Delete Issue?</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue. This Action canot be
          undon.
        </AlertDialog.Description>
        <Flex mt={"4"} gap={"4"}>
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              No
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red">Yes</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
