"use client";

import { Box, Container, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ImBug } from "react-icons/im";
import Profile from "./Profile";

export default function NavBar() {
  const currentPath = usePathname();
  //const { data, status, update } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <nav className="border-b mb-5 p-5">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <Link href={"/"}>
              <ImBug />
            </Link>
            <ul className="flex space-x-3">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    className={classNames({
                      "text-zinc-900": href === currentPath,
                      "text-zinc-500": href !== currentPath,
                      "hover:text-zinc-800 transition-colors": true,
                    })}
                    href={href}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>

          <Box>
            <Profile />
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}
