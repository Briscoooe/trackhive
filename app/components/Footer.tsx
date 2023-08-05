import { NativeLinkTag } from "~/components/NativeLinkTag";

export default function Footer() {
  return (
    <footer className="p-4 sm:p-6 w-full flex items-center justify-center border-t-2 border-slate-100">
      <div className={"max-w-2xl w-full text-slate-500 text-sm"}>
        Made by{" "}
        <NativeLinkTag href={"https://twitter.com/brianbriscoe_"}>
          Brian Briscoe
        </NativeLinkTag>
        . Source available on{" "}
        <NativeLinkTag href={"https://github.com/briscoooe/trackhive"}>
          Github
        </NativeLinkTag>
        .
      </div>
    </footer>
  );
}
