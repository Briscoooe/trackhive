import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata = {
  title: "Trackhive",
  description: "Trackhive is a web app to archive Spotify playlists so you never lose your favorite songs.",
};
export const dynamic = 'force-dynamic';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-background flex flex-col items-center bg-gray-100">
          <NavBar />
          <div className="animate-in flex flex-col gap-14 opacity-0 max-w-2xl w-full px-3 py-4 text-foreground">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
