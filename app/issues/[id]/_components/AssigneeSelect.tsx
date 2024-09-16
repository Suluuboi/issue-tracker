"use client";

import { JsonView } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import useIssues from "../../useIssues";

export default async function AssigneeSelect({ issue }: { issue: Issue }) {
  //const users = await prisma.user.findMany({ orderBy: { name: "asc" } });
  const { assignedToUserId, id } = issue;
  const { data: users, error, isLoading } = useUsers();

  const { updateIssue } = useIssues();

  if (isLoading) return <Skeleton height={"2rem"} />;

  if (error) return <div>Error</div>;

  if (!Array.isArray(users)) return <JsonView json={users} />;

  return (
    <Select.Root
      defaultValue={assignedToUserId || "null"}
      onValueChange={(userId) => {
        updateIssue({
          id: id.toString(),
          data: { assignedToUserId: userId === "null" ? null : userId },
        });
      }}
    >
      <Select.Trigger placeholder="Assign" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value={"null"}>Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.email} value={user.id}>
              {user.name!} ( {user.email} )
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

function useUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const users = await axios.get("/api/users");
      return users.data;
    },
    staleTime: 60 * 1000,
    retry: 3,
  });
}
