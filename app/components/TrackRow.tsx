import type { SpotifyTrackObject } from "app/types/spotify";

export default function TrackRow({
  index,
  track,
}: {
  index: number;
  track: SpotifyTrackObject;
}) {
  const imgUrl = track.album.images.length ? track.album.images[0].url : "";
  return (
    <div
      key={track.id}
      className={
        "flex flex-row items-center justify-between overflow-x-hidden truncate animate-in"
      }
    >
      <div className={"flex flex-row items-center space-x-3"}>
        <span className={"w-auto text-right text-sm text-slate-500"}>
          {index + 1}
        </span>
        <img src={imgUrl} alt={track.name} width={40} height={40} />
        <div className={"flex flex-col"}>
          <span className={"text-md truncate leading-6 text-slate-800"}>
            {track.name}
          </span>
          <div className={"flex flex-row items-center space-x-1"}>
            <span className={"text-md text-slate-500"}>
              {track.artists.map((artist, index) => (
                <span key={artist.id}>
                  {artist.name}
                  {index < track.artists.length - 1 && ", "}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
