import { getToken } from "@/lib/auth";
import { NextResponse } from "next/server";


const DJANGO_API_WAITLIST_URL = "http://127.0.0.1:8000/api/waitlists"

export async function GET(request) {
    const authToken = await getToken()
    if(!authToken) {
        return NextResponse.json({}, {status:401})
    }

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${authToken}`
        }
    }

    const response = await fetch(DJANGO_API_WAITLIST_URL,options)
    console.log(response)
    const result = await response.json()
    let status = response.status
    
    return NextResponse.json({...result}, {status:status})
}