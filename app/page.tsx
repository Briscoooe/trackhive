import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '../components/LogoutButton'
import SupabaseLogo from '../components/SupabaseLogo'
import NextJsLogo from '../components/NextJsLogo'
import NavBar from "@/components/NavBar";

export const dynamic = 'force-dynamic'

export default async function Index() {

  return (
    <div className="w-full flex flex-col items-center">
      home
    </div>
  )
}
