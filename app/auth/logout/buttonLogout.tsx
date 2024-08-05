"use client"
import { signOut } from "next-auth/react";
import Link from "next/link";

import React from 'react'

export const ButtonLogout = () => {
  return (
    <Link href={'/'} onClick={() => signOut({ callbackUrl: '/' })} className="bg-[#009E5B] hover:bg-[#009e5ce0] text-white rounded-lg px-4 py-2">
    Logout
  </Link>
  )
}
