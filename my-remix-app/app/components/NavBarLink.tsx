import {ReactNode} from "react";
import {NavLink} from "@remix-run/react";

export function NavBarLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <NavLink
      to={href}
      className={({ isActive, isPending }) =>
        `hover:bg-gray-100 transition rounded-md px-4 py-2 ${
          isPending ? "" : isActive ? "bg-gray-100" : ""
        }`
      }
    >
      {children}
    </NavLink>
  );
}
