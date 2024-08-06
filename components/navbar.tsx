"use client"
import { ButtonLogout } from '@/app/auth/logout/buttonLogout';
import { CircleUser } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar(){
  const {status, data:session} = useSession();

  if(status === "authenticated"){
    return <>
    <ButtonLogout />
    <span
      className="flex items-center gap-2 border border-muted-foreground rounded-lg px-4 py-2"
    >
      <CircleUser />  <span className="font-bold">
        {session?.user?.name}
      </span>
    </span>
  </>
  }else {
    return (<Link href={'/auth/login'} className="bg-[#009E5B] hover:bg-[#009e5ce0] text-white rounded-lg px-4 py-2">
    Login
  </Link>)
  }
}