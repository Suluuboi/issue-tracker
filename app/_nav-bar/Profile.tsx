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
      <HoverDropdown>
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
            <img src={avatar} />
          </div>
        </div>
      </HoverDropdown>
    );
  }

  function TextAvatar({ text }: { text: string }) {
    return (
      <HoverDropdown>
        <div>{text}</div>
      </HoverDropdown>
    );
  }

  function HoverDropdown({ children }: { children: ReactNode }) {
    return (
      <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button">
          {children}
        </div>
        <div
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <div className="mb-5">
            <div className="font-bold text-center">Hellow, {user?.name}</div>
          </div>

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
        </div>
      </div>
    );
  }
}

interface TempUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}
