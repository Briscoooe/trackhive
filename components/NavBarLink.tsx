"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function NavBarLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      className={`hover:bg-gray-100 transition rounded-md px-4 py-2 ${
        isActive ? "bg-gray-100" : ""
      }`}
      href={href}
    >
      {children}
    </Link>
  );
}
