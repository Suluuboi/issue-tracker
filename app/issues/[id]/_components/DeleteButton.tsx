"use client";

import { Button } from "@/app/components";
import { AlertDialog, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";

export default function DeleteButton({ issueId }: { issueId: number }) {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" loading={isDeleting}>
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
              <Button onClick={onDelete} color="red">
                Yes
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <ErrorAlert />
    </>
  );

  function ErrorAlert() {
    return (
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            The Isue could not be deleted/
          </AlertDialog.Description>
          <Button color="gray" variant="soft" onClick={() => setError(false)}>
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    );
  }

  async function onDelete() {
    setDeleting(true);
    try {
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setError(true);
      setDeleting(false);
    }
  }
}
