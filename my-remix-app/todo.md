https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs#create-an-upload-widget

# MVP features

- [x] view all users playlists
- [x] select playlist to archive on schedule
- save scheduling prefs in database
- [x] figure out acces token stuff
- [x] route for showing playlists being archived
- footer for about stuff
- [x] badges underneath search bar for disover weekly
- [x] Figure out how to make everything server rendered
- offer differnt archive options (e.g. append vs snapshot)
  - [ ] append - add new tracks to playlist
  - [ ] snapshot - create new playlist with new tracks
- [x] https://supabase.com/docs/guides/database/column-encryption IMPORTANT
- [x] https://supabase.com/docs/guides/database/vault
- fix styling in full page modal
- show information on archived playlists in tab
  - archived since
  - archived versions
  - archive mode
- [x]delete cookie thing
- rename - snapshotify?
- skeleton for playlist row
- find out best async/scheduled task framework for nextjs
  - https://quirrel.dev/
  - https://docs.upstash.com/qstash
  - deno
  - https://developers.cloudflare.com/workers/platform/limits/
- [x] move to remix.js


# UI bits

- mobile first
- dark mode first
- landing page and app in same thing?

# Links

- https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists
- https://developer.spotify.com/documentation/web-api/reference/create-playlist
- https://developer.spotify.com/documentation/web-api/reference/add-tracks-to-playlist
- https://supabase.com/docs/guides/api/rest/generating-types
- https://vercel.com/docs/cron-jobs
- https://blog.logrocket.com/remix-supabase-real-time-chat-app/

# DESIGN PRINCIPLES

- [x]all spotify interaction is handled server side
- [x]supabase - weird split happening here

# known refactors

- [x] playlistRow
- [x] isPlaylistspotifyOWned - not a clean split client v server. maybe make its own prop
- reduce returned fields by spotify
- store playlist snapshots in DB to avoid making dupe requests to spotify for discover weekly
- dont fetch all songs in playlist at once, use next cursor
