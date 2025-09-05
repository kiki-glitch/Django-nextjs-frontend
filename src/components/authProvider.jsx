"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useSearchParams, usePathname, useRouter} from "next/navigation";

const AuthContext = createContext(null)

const LOGIN_REDIRECT_URL = "/"
const LOGOUT_REDIRECT_URL = "/login"
const LOGIN_REQUIRED_URL = "/login"
const LOCAL_STORAGE_KEY = "is_logged_in"
const LOCAL_USERNAME_KEY = "username"

export function AuthProvider({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const [username, setUsername]= useState("")
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // ✅ Sync cookies → localStorage on mount
    useEffect(() => {
        const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("auth-token="))

        if (token) {
            localStorage.setItem(LOCAL_STORAGE_KEY, "1")
            setIsAuthenticated(true)
        } else {
            localStorage.setItem(LOCAL_STORAGE_KEY, "0")
            setIsAuthenticated(false)
        }

        const storedUn = localStorage.getItem(LOCAL_USERNAME_KEY)
        if (storedUn) setUsername(storedUn)
    }, [])


    const login = (username) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, "1")
        setIsAuthenticated(true) 
        if(username){
            localStorage.setItem(LOCAL_USERNAME_KEY, `${username}`)
            setUsername(username)
        }else{
            localStorage.removeItem(LOCAL_USERNAME_KEY)
        }
        // ✅ safeguard: double-check persistence
        // setTimeout(() => {
        //     const storedAuthStatus = localStorage.getItem(LOCAL_STORAGE_KEY)
        //     if (storedAuthStatus !== "1") {
        //         console.log("Auth state not persisted, fixing…")
        //         localStorage.setItem(LOCAL_STORAGE_KEY, "1")
        // }
        // }, 50)
        const nextUrl = searchParams.get("next")
        const invalidNextUrl = ['/login', '/logout']
        const nextUrlValid = nextUrl && nextUrl.startsWith("/") && !invalidNextUrl.includes(nextUrl)
        console.log(nextUrl, nextUrlValid)
        if (nextUrlValid) {
            router.replace(nextUrl)
            return
        }
        else{
            router.replace(LOGIN_REDIRECT_URL)
            return
        }
    }

    const logout = () => {
        setIsAuthenticated(false)
        localStorage.setItem(LOCAL_STORAGE_KEY, "0")
        localStorage.removeItem(LOCAL_USERNAME_KEY)
        router.replace(LOGOUT_REDIRECT_URL)

    }

    const loginRequiredRedirect = () => {
        setIsAuthenticated(false)
        localStorage.setItem(LOCAL_STORAGE_KEY, "0")
        let loginWithNextURL = `${LOGIN_REQUIRED_URL}?next=${pathname}`
        if (LOGIN_REQUIRED_URL === pathname){
            loginWithNextURL = `${LOGIN_REQUIRED_URL}`
        }
        router.replace(loginWithNextURL)

    }

    return <AuthContext.Provider value={{isAuthenticated, login, logout, loginRequiredRedirect, username}}>
        {children}
    </AuthContext.Provider>
}

export function useAuth(){
    return useContext(AuthContext)
}