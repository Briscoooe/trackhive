import type { ReactNode } from "react";
import { NavLink } from "@remix-run/react";

export function NavBarLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <NavLink
      prefetch={'render'}
      to={href}
      className={({ isActive, isPending }) =>
        `hover:bg-slate-100 transition rounded-md px-4 py-2 ${
          isActive ? "bg-slate-100 font-semibold" : ""
        }`
      }
    >
      {children}
    </NavLink>
  );
}
