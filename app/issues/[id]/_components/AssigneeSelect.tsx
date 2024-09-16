import prisma from "@/prisma/client";
import { Select } from "@radix-ui/themes";

export default async function AssigneeSelect() {
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map((user) => (
            <Select.Item key={user.email} value="1">
              {user.name!} ( {user.email} )
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
