import { LandingPageSection } from "~/components/LandingPageSection";
import { NativeLinkTag } from "~/components/NativeLinkTag";

export default function Index() {
  return (
    <div>
      <h1 className="mb-6 sm:mb-4 text-4xl font-bold tracking-tight text-center sm:text-left leading-none text-gray-900 md:text-4xl lg:text-5xl">
        Keep your Spotify playlists intact
      </h1>

      <LandingPageSection title="What is it?">
        You know how it goes. You open your Spotify and there's a fresh batch of
        songs in your Discover Weekly or Release Radar. You spot a few
        interesting titles, make a mental note to check them out, but life gets
        in the way. Before you know it, it's a new week, the playlist updates,
        and those songs are gone. It's a bit like losing a book before you've
        had the chance to open it. That's where TrackHive comes in. It's a tool
        I built to help us hold onto those missed opportunities and keep
        exploring new music at our own pace.
      </LandingPageSection>
      <LandingPageSection title="How does it work?">
        TrackHive is pretty straightforward. You start by signing in with your
        Spotify account. Once that's done, TrackHive gets to work, using the
        Spotify API to keep tabs on your favorite playlists. You can choose to
        use Snapshot Mode, which saves a copy of your playlists each week before
        they update, or Endless Playlist, which continuously adds new songs to
        the same playlist over time.
      </LandingPageSection>
      <LandingPageSection title="Is it free?">
        Yes, and always will be. It costs me $0 to run TrackHive, so I'm happy
        to offer it for free.
      </LandingPageSection>
      <LandingPageSection title="Who made this?">
        TrackHive is made by{" "}
        <NativeLinkTag href={"https://twitter.com/brianbriscoe_"}>
          Brian Briscoe
        </NativeLinkTag>
        . And if you're wondering, yes, the entirety of this page was written by
        ChatGPT. If you find any particularly witty or charming bits of text,
        you can thank our AI overlords. But if you spot any typos or grammatical
        errors, well, those are probably mine.
      </LandingPageSection>
      <LandingPageSection title="Open source">
        If you care, the entire thing is{" "}
        <NativeLinkTag href={"https://github.com/briscoooe/trackhive"}>
          open source
        </NativeLinkTag>
        . Built using
        <ul className={"list-disc ml-4"}>
          <li>
            <NativeLinkTag href={"https://remix.run/"}>Remix</NativeLinkTag>
          </li>
          <li>
            <NativeLinkTag href={"https://tailwindcss.com/"}>
              Tailwind
            </NativeLinkTag>
          </li>
          <li>
            <NativeLinkTag href={"https://ui.shadcn.com/"}>
              shadcn/ui
            </NativeLinkTag>
          </li>
          <li>
            <NativeLinkTag href={"https://supabase.com/"}>
              Supabase
            </NativeLinkTag>
          </li>
          <li>
            <NativeLinkTag href={"https://vercel.com/"}>Vercel</NativeLinkTag>
          </li>
        </ul>
      </LandingPageSection>
    </div>
  );
}
