https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs#create-an-upload-widget

# MVP features

- [x] view all users playlists
- [x] select playlist to archive on schedule
- [x] save scheduling prefs in database
- [x] figure out acces token stuff
- [x] route for showing playlists being archived
- [x] badges underneath search bar for disover weekly
- [x] Figure out how to make everything server rendered
- [x] https://supabase.com/docs/guides/database/column-encryption IMPORTANT
- [x] https://supabase.com/docs/guides/database/vault
- fix styling in full page modal
- [x] delete cookie thing
- [x] make archive full width in mobile
- detail view - show who made?
- [x] remove post arvhive functionalityy from detail view?
- loading states on buttons
- [x] rename - snapshotify?
- skeleton for playlist row
- [x] move to remix.js
- [x] RLS on supabase for auth tokens table (service only)

# TOP PRIORITIEs

- [x] popular (show discover weekly, release radar, liked songs)
- [x] else - search
- [x] offer differnt archive options (e.g. append vs snapshot)
  - [x] append - add new tracks to playlist
  - [x] snapshot - create new playlist with new tracks
- find out best async/scheduled task framework for remix
  - https://quirrel.dev/
  - https://docs.upstash.com/qstash (500 messages per day) (pay as you go ($1 per 100K messages))
  - deno
  - https://developers.cloudflare.com/workers/platform/limits/
  - ideally - handle each archive request one request at time in a big job queue. 10s timeout wont matter
  - use qstash to
  - ~~Vercel~~ times out at 10s
  - ~~https://temporal.io/~~ - not GA
- [x] speed improvements
- [ ] spinners for everything
- [ ] clean up code

# UI bits

- [x] mobile first
- [x] landing page and app in same thing?
- [x] footer for about stuff

# Links

- https://vercel.com/docs/cron-jobs
- https://remix.run/docs/en/main/hooks/use-action-data
- https://reactrouter.com/en/main/hooks/use-fetcher
-

# DESIGN PRINCIPLES

- [x] all spotify interaction is handled server side
- [x] supabase - weird split happening here

# known refactors

- [x] playlistRow
- [x] isPlaylistspotifyOWned - not a clean split client v server. maybe make its own prop
- reduce returned fields by spotify
- store playlist snapshots in DB to avoid making dupe requests to spotify for discover weekly
- dont fetch all songs in playlist at once, use next cursor
