"use client";

import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(res=>res.json())

const WAITLIST_API_URL = "/api/waitlists"
export default function Page() {

  // GET Requests
  const{data, error, isLoading} = useSWR(WAITLIST_API_URL, fetcher)
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
