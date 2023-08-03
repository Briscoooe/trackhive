"use client";
const widths = ["w-20", "w-40", "w-52", "w-60", "w-64"];
export default function TrackRowSkeleton() {
  const getRandomWidth = () => {
    return widths[Math.floor(Math.random() * widths.length)];
  };
  return (
    <div className={"flex flex-row items-center space-x-1 animate-in"}>
      <div className={"animate-pulse h-4 w-4 bg-gray-200 rounded-md"}></div>
      <div className={"animate-pulse h-10 w-10 bg-gray-200 rounded-md"}></div>
      <div className={"flex flex-col space-y-1"}>
        <div
          className={`animate-pulse h-4 ${getRandomWidth()} bg-gray-200 rounded-md`}
        >
          {" "}
        </div>
        <div
          className={`animate-pulse h-4 ${getRandomWidth()} bg-gray-200 rounded-md`}
        >
          {" "}
        </div>
      </div>
    </div>
  );
}
