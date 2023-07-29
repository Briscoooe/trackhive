import './globals.css'
import NavBar from "@/components/NavBar";

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-background flex flex-col items-center">
          <NavBar/>
          <div className="animate-in flex flex-col gap-14 opacity-0 max-w-2xl w-full px-3 py-8 text-foreground">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
