"use client";

import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import { useAuth } from "@/components/authProvider";
import { ThemeToggleButton } from "@/components/themeToggleButton";
import { WaitListForm } from "./waitlists/forms";

const fetcher = (...args) => fetch(...args).then(res=>res.json())

export default function Home() {

  const auth = useAuth()
  const{data, error, isLoading} = useSWR("http://127.0.0.1:8000/api/hello", fetcher)
  if (error) return <div>failed to load....</div>
  if (isLoading) return <div>loading...</div>

  async function handleClick() {
    await getDjangoAPIData()
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>
          <WaitListForm/>
        </div>
        {/* <div>
          {auth.isAuthenticated ? "Hello User": "Hello guest"}
        </div>
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        /> */}
        <div>
          <ThemeToggleButton/>
        </div>
        <div>
          {JSON.stringify(data)}
        </div>
        
      </main>
    </div>
  );
}
