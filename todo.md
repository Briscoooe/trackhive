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
- [x] find out best async/scheduled task framework for remix
  - https://quirrel.dev/
  - https://docs.upstash.com/qstash (500 messages per day) (pay as you go ($1 per 100K messages))
  - deno
  - https://developers.cloudflare.com/workers/platform/limits/
  - ideally - handle each archive request one request at time in a big job queue. 10s timeout wont matter
  - use qstash to
  - ~~Vercel~~ times out at 10s
  - ~~https://temporal.io/~~ - not GA
- [x] speed improvements
- [ ] implement playlist diffing
- [ ] implement forever mode
- [x] fix remix vercel errors ⚠️ REMIX FUTURE CHANGE: The `@remix-run/vercel` runtime adapter has been deprecated in favor of out of the box Vercel functionality and will be removed in Remix v2. Please update your code by removing `@remix-run/vercel` & `@vercel/node` from your `package.json`, removing your `server.js`/`server.ts` file, and removing the `server` & `serverBuildPath` options from your `remix.config.js`.
- [ ] spinners for everything
- [ ] clean up code
- [x] auto reuth if token expires
- [ ] error boundary
- [x] link to Spotidy settings page
- Spotify API extension request stuff
  - [x] Is metadata attributed with the Spotify logo and a link back to the applicable artist, album, track, or playlist Spotify service?
    - If you display any Spotify Content you must clearly attribute the content as being supplied and made available by Spotify, by using the Spotify Marks. Our Branding Guidelines include some examples of what you should and shouldn’t do.
    - [x] Metadata, cover art and Audio Preview Clips must be accompanied by a link back to the applicable album, content or playlist on the Spotify Service.
    - [x] You must not offer metadata, cover art, and/or Audio Preview Clips as a standalone service or product. 
  - 

# UI bits

- [x] mobile first
- [x] landing page and app in same thing?
- [x] footer for about stuff

# Links

- https://vercel.com/docs/cron-jobs
- https://remix.run/docs/en/main/hooks/use-action-data
- https://reactrouter.com/en/main/hooks/use-fetcher

# general
- submit to spotify + supabase showcase

# DESIGN PRINCIPLES

- [x] all spotify interaction is handled server side
- [x] supabase - weird split happening here

# known refactors

- [x] playlistRow
- [x] isPlaylistspotifyOWned - not a clean split client v server. maybe make its own prop
- reduce returned fields by spotify - serializer?
- store playlist snapshots in DB to avoid making dupe requests to spotify for discover weekly
- dont fetch all songs in playlist at once, use next cursor
