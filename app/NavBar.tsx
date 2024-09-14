"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ImBug } from "react-icons/im";

export default function NavBar() {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 p-5 items-center">
      <Link href={"/"}>
        <ImBug />
      </Link>
      <ul className="flex space-x-3">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            className={classNames({
              "text-zinc-900": href === currentPath,
              "text-zinc-500": href !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
            href={href}
          >
            {label}
          </Link>
        ))}
      </ul>
    </nav>
  );
}
