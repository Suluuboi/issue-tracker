"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppLinks() {
  const currentPath = usePathname();
  //const { data, status, update } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
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
  );
}
