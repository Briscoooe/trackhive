"use client";
const widths = ["w-20", "w-40", "w-52", "w-60", "w-64"];
export default function TrackRowSkeleton() {
  const getRandomWidth = () => {
    return widths[Math.floor(Math.random() * widths.length)];
  };
  return (
    <div className={"flex flex-row items-center space-x-1 animate-in"}>
      <div className={"h-4 w-4 animate-pulse rounded-md bg-slate-200"}></div>
      <div className={"h-10 w-10 animate-pulse rounded-md bg-slate-200"}></div>
      <div className={"flex flex-col space-y-1"}>
        <div
          className={`h-4 animate-pulse ${getRandomWidth()} rounded-md bg-slate-200`}
        >
          {" "}
        </div>
        <div
          className={`h-4 animate-pulse ${getRandomWidth()} rounded-md bg-slate-200`}
        >
          {" "}
        </div>
      </div>
    </div>
  );
}
