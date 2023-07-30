import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";
import { SpotifySimplifiedPlaylistObject } from "@/app/types/spotify";
import { SPOTIFY_OWNER_URI } from "@/app/lib/spotify-client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const deleteCookie = (name: string) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

