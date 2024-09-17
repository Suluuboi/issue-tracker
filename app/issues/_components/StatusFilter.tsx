"use client";

import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

type StatusFilterProps = {
  value?: Status;
  onChange?: (value: Status | "null") => void;
};

export default function StatusFilter({ onChange, value }: StatusFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams(); // Get query params from the URL
  // Extract status from query parameters
  const queryStatus = searchParams.get("status") as Status | undefined;
  const queryOrderBy = searchParams.get("orderBy") as keyof Issue | undefined;

  return (
    <Select.Root
      value={value}
      defaultValue={setDefault()}
      onValueChange={(status: Status | "null") => {
        selected(status);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || "null"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );

  function selected(status: Status | "null") {
    const url = getUrl();
    const canRedirect = url?.includes("/issues/list");

    if (canRedirect) {
      const params = new URLSearchParams();
      if (status)
        status === "null"
          ? params.delete("status")
          : params.append("status", status);

      if (queryOrderBy) params.append("orderBy", queryOrderBy);

      //const query = status !== "null" ? "?status=" + status : "";
      const query = params.size ? `?${params.toString()}` : "";
      router.push("/issues/list" + query);

      return;
    }

    onChange ? onChange(status) : null;
  }

  function setDefault() {
    if (queryStatus) {
      const statuses = Object.values(Status);

      const selectedStatus = statuses.includes(queryStatus)
        ? queryStatus
        : undefined;

      return selectedStatus;
    }

    return undefined;
  }

  function getUrl() {
    if (typeof window !== "undefined") {
      return window.location.href; // Get the full URL
    }

    return null;
  }
}
