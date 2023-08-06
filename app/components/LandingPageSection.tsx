import type { ReactNode } from "react";

export function LandingPageSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      <p className="text-md mb-4 font-normal text-gray-500 lg:text-lg">
        {children}
      </p>
    </>
  );
}
