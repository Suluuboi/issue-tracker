import Link from "next/link";
import { ImBug } from "react-icons/im";

export default function NavBar() {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
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
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
            href={href}
          >
            {label}
          </Link>
        ))}
      </ul>
    </nav>
  );
}
