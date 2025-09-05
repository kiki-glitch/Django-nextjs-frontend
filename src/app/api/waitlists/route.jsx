"use server"

import { NextResponse } from "next/server";
import Apiproxy from "../proxy";


const DJANGO_API_WAITLIST_URL = "http://127.0.0.1:8000/api/waitlists"

export async function GET(request) {
    const response = await Apiproxy.get(DJANGO_API_WAITLIST_URL,true)
    const result = await response.json()
    let status = response.status
    
    return NextResponse.json({...result}, {status:status})
}

export async function POST(request) {
    const requestData = await request.json()
    const response = await Apiproxy.post(DJANGO_API_WAITLIST_URL,requestData,true)
    console.log(response.status)
    try{
        const rData = await response.json()
        console.log(rData)
    }catch(error){
        return NextResponse.json({message:"Not found"}, {status:500})
    }
    if (response.ok){
        console.log("Post successful")
        return NextResponse.json({}, {status:200})
    }
    return NextResponse.json({}, {status:400})
    
}