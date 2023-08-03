// export async function getSpotifyUserAchivesQuery(supabase: SupabaseClient): Promise<
//   SpotifySimplifiedPlaylistObject[]
// > {
//   const archives = await getDatabaseUserArchivesQuery(supabase);
//   const playlistIds = archives.map((archive) => archive.playlist_id);
//   const playlists = await Promise.all(
//     playlistIds.map((playlistId) => getSpotifyPlaylistQuery(playlistId))
//   );
//   return playlists;
// }


// console.log("use", user.id);
// const userAuthKey = await supabase.from("decrypted_auth_token").select().eq("user_id", user?.id).single();
// console.log('user auth key', userAuthKey)
// const { decrypted_refresh_token } = userAuthKey.data;

// console.log('token', userAuthKey)
// console.log('QUERy, ', query)
// console.log('token access', userAuthKey)
