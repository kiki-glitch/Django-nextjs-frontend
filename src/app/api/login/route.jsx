// "use server"
// "use client";

import { getRefreshToken, getToken, setToken, setRefreshToken } from '@/app/lib/auth'
import {NextResponse} from 'next/server'

const DJANGO_API_LOGIN_URL = "http://127.0.0.1:8000/api/token/pair"

export async function POST(request) {

    let myAuthToken = null;
    let myRefreshToken = null;
    try {
    myAuthToken = await getToken();
    myRefreshToken = await getRefreshToken();
    } catch (e) {
    console.log("No cookies yet");
    }
    console.log(myAuthToken, myRefreshToken)

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
    }
    
    return NextResponse.json({"hello":"world"}, {status:200})
}