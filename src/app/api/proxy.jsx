import { getToken } from "@/lib/auth"

export default class Apiproxy{
    
    static async getHeaders(requireAuth){
        let headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
        const authToken = await getToken()
        if(authToken && requireAuth){
            headers["Authorization"] = `Bearer ${authToken}`
        }
        return headers
    }

    static async post(endpoint, object, requireAuth){
        const jsonData = JSON.stringify(object)
        const headers = await Apiproxy.getHeaders(requireAuth)
        
        const requestOptions = {
            method: "POST",
            headers: headers,
            body:jsonData
        }
        return await fetch(endpoint, requestOptions)
        
    }

    static async get(endpoint, requireAuth){
        const headers = await Apiproxy.getHeaders(requireAuth)
        const requestOptions = {
            method: "GET",
            headers: headers,
        }
        return await fetch(endpoint, requestOptions)   
    }
}

