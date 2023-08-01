import { ReactNode } from "react";
import {Link} from "@remix-run/react";

export function NavBarLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link to={href}
      className={`hover:bg-gray-100 transition rounded-md px-4 py-2 ${
        // isActive ? "bg-gray-100" : ""
        ""
      }`}
    >
      {children}
    </Link>
  );
}
