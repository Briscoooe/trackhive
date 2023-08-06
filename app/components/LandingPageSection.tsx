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
      <h2 className="mb-4 text-2xl tracking-tight font-bold text-slate-900">
        {title}
      </h2>
      <p className="mb-4 text-md font-normal text-gray-500 lg:text-lg">
        {children}
      </p>
    </>
  );
}
