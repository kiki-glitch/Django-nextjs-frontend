import { cookies } from "next/headers";

const TokenAge = 3600

export async function getToken(){
    //api request
    const cookieStore = await cookies()
    const myAuthToken = cookieStore.get('auth-token')
    return myAuthToken?.value
}

export async function getRefreshToken(){
    //api request
    const cookieStore = await cookies()
    const myAuthToken = cookieStore.get('auth-refresh-token')
    return myAuthToken?.value
}


export async function setToken(authToken){
    //login
    const cookieStore = await cookies();
    return cookieStore.set({
            name:'auth-token',
            value:authToken,
            httpOnly: true,
            sameSite:'strict',
            secure: process.env.NODE_ENV !== 'development',
            maxAge: TokenAge
        })
}

export async function setRefreshToken(authRefreshToken){
    //login
    const cookieStore = await cookies();
    return cookieStore.set({
            name:'auth-refresh-token',
            value:authRefreshToken,
            httpOnly: true,
            sameSite:'strict',
            secure: process.env.NODE_ENV !== 'development',
            maxAge: TokenAge
        })
}

export async function deleteTokens(){
    //logout
    const cookieStore = await cookies();
    cookieStore.delete('auth-token')
    return cookieStore.delete('auth-refresh-token')

}