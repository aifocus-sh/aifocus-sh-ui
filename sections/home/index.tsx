"use client";

import Tools from "@/components/tools";
import Broadcast from "@/components/broadcast";
import Introduction from "@/components/introduction";

export default function Home() {
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
