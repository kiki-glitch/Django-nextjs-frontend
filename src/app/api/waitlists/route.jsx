"use server"

import { NextResponse } from "next/server";
import Apiproxy from "../proxy";


const DJANGO_API_WAITLIST_URL = "http://127.0.0.1:8000/api/waitlists"

export async function GET(request) {
    const {data, status} = await Apiproxy.get(DJANGO_API_WAITLIST_URL,true)
    return NextResponse.json(data, {status:status})
}

export async function POST(request) {
    const requestData = await request.json()
    const {data, status} = await Apiproxy.post(DJANGO_API_WAITLIST_URL,requestData,true)
    return NextResponse.json(data, {status:status})
    
}