export function NativeLinkTag({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a className={"font-medium underline"} href={href}>
      {children}
    </a>
  );
}
