"use client";

import Tools from "@/components/tools";
import Broadcast from "@/components/broadcast";
import Introduction from "@/components/introduction";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    const queryParams = new URLSearchParams(url.search);
    const urlCallback = queryParams.get('callbackUrlLogin');
    if (urlCallback) {
      const pathName = new URL(urlCallback!).pathname;
      router.push(pathName);
    }
  }, [router])

  
  return (
    <>
      <main className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Tools />

        <Broadcast />

        <Introduction />
      </main>
      {/* <TableTools /> */}
    </>
  );
}
