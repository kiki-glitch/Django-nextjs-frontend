"use client";

import useSWR from "swr";
import { useEffect } from "react";
import { useAuth } from "@/components/authProvider";

const fetcher = async url => {
  const res = await fetch(url)
 
  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status
    throw error
  }
 
  return res.json()
}

const WAITLIST_API_URL = "/api/waitlists"
export default function Page() {

  // GET Requests
  const{data, error, isLoading} = useSWR(WAITLIST_API_URL, fetcher)
  const auth = useAuth()

  useEffect(() => {
    if(error?.status === 401){
        auth.loginRequiredRedirect()
    }
  },[auth, error])
  if (error) return <div>failed to load....</div>
  if (isLoading) return <div>loading...</div>

  async function handleClick() {
    await getDjangoAPIData()
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">       
        <div>
          {JSON.stringify(data)}
        </div>
        
    </div>
  );
}
