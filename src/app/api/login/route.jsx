// "use server"
// "use client";

import {setToken, setRefreshToken } from '@/app/lib/auth'
import {NextResponse} from 'next/server'

const DJANGO_API_LOGIN_URL = "http://127.0.0.1:8000/api/token/pair"

export async function POST(request) {

    const requestData = await request.json()
    console.log(requestData)
    const jsonData = JSON.stringify(requestData)
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:jsonData
    }
    const response = await fetch(DJANGO_API_LOGIN_URL, requestOptions)
    const rData = await response.json()
    console.log(rData)
    if (response.ok){
        console.log("logged in")
        const {access, refresh} = rData
        // ✅ await cookies() to get the cookies store
        await setToken(access)
        await setRefreshToken(refresh);

        return NextResponse.json({"logged In":true}, {status:200})
    }
    
    return NextResponse.json({"logged In":false, ...rData}, {status:400})
    
}