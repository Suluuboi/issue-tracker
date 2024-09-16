"use client";

import { JsonView } from "@/app/components";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

export default async function AssigneeSelect() {
  //const users = await prisma.user.findMany({ orderBy: { name: "asc" } });

  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const users = await axios.get("/api/users");
      return users.data;
    },
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) return <Skeleton height={"2rem"} />;

  if (error) return <div>Error</div>;

  if (!Array.isArray(users)) return <JsonView json={users} />;

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map((user) => (
            <Select.Item key={user.email} value="1">
              {user.name!} ( {user.email} )
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
