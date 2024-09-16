import {
  Popover,
  Avatar as AvatarRadix,
  Flex,
  Text,
  Button,
} from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { ReactNode } from "react";
import { authOptions } from "../api/auth/authOptions";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <>
      {user ? (
        <UserDisplay user={user} />
      ) : (
        <Link href={"/api/auth/signin"}>Login</Link>
      )}
    </>
  );

  function UserDisplay({ user }: { user: TempUser }) {
    if (user.image) return <Avatar avatar={user.image} />;
    if (user.email) return <TextAvatar text={user.email} />;
    if (user.name) return <TextAvatar text={user.name} />;
    return <div>Welcome</div>;
  }

  function Avatar({ avatar }: { avatar: string }) {
    return (
      <PopoverDropdown>
        <Button variant="ghost">
          <AvatarRadix
            src={avatar}
            fallback={"H"}
            radius="full"
            className="cursor-pointer"
          />
        </Button>
      </PopoverDropdown>
    );
  }

  function TextAvatar({ text }: { text: string }) {
    return (
      <PopoverDropdown>
        <Flex>
          <Text>{text}</Text>
        </Flex>
      </PopoverDropdown>
    );
  }

  function PopoverDropdown({ children }: { children: ReactNode }) {
    return (
      <Popover.Root>
        <Popover.Trigger>{children}</Popover.Trigger>
        <Popover.Content>
          <Flex className="mb-5">
            <Text className="font-bold text-center">Hellow, {user?.name}</Text>
          </Flex>

          <ul>
            <li>
              <Link
                className="flex justify-center items-center"
                href={"/api/auth/signout"}
              >
                Sign Out
              </Link>
            </li>
          </ul>
        </Popover.Content>
      </Popover.Root>
    );
  }
}

interface TempUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}
