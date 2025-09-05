"use server"

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

export async function POST(request) {

    const requestData = await request.json()
    const jsonData = JSON.stringify(requestData)
    let headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    const authToken = getToken()
    if(authToken){
        headers["Authorization"] = `Bearer ${authToken}`
    }
    const requestOptions = {
        method: "POST",
        headers: headers,
        body:jsonData
    }
    const response = await fetch(DJANGO_API_WAITLIST_URL, requestOptions)
    console.log(response.status)
    try{
        const rData = await response.json()
    }catch(error){
        return NextResponse.json({message:"Not found"}, {status:500})
    }
    // console.log(rData)
    if (response.ok){
        console.log("Post successful")
        return NextResponse.json({}, {status:200})
    }
    return NextResponse.json({"Post success":false, ...rData}, {status:400})
    
    
    
}