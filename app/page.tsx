import UserArchivedPlaylists from "@/components/UserArchivedPlaylists";

export const dynamic = "force-dynamic";

export default async function Index() {
  return (
    <div className="w-full flex flex-col items-center">
      <UserArchivedPlaylists />
    </div>
  );
}
