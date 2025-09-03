"use server"

import {cookies} from 'next/headers'
import {NextResponse} from 'next/server'

const DJANGO_API_LOGIN_URL = "http://127.0.0.1:8000/api/token/pair"

export async function POST(request) {

    const myAuthToken = cookies().get('auth-token')
    console.log(myAuthToken.value)

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
        const authToken = rData.access
        // ✅ await cookies() to get the cookies store
        const cookieStore = await cookies();
        cookieStore.set({
            name:'auth-token',
            value:authToken,
            httpOnly: true,
            sameSite:'strict',
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 3600
        })
    }
    
    return NextResponse.json({"hello":"world"}, {status:200})
}