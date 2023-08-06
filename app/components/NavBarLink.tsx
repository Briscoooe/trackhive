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
      prefetch={"render"}
      to={href}
      className={({ isActive, isPending }) =>
        `rounded-md px-4 py-2 transition hover:bg-slate-100 ${
          isActive ? "bg-slate-100 font-semibold" : ""
        }`
      }
    >
      {children}
    </NavLink>
  );
}
