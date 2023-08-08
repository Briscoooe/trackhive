import { NativeLinkTag } from "~/components/NativeLinkTag";

export default function Footer() {
  return (
    <footer className="flex w-full items-center justify-center border-t-2 border-slate-100 p-4 sm:p-6">
      <div
        className={
          "w-full max-w-2xl text-center text-sm text-slate-500 sm:text-left"
        }
      >
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
