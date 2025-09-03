// -> url -> /login
"use client";

const LOGIN_URL = "/api/login/"

export default function Page(){

    async function handleSubmit(event){
        event.preventDefault()
        console.log(event, event.target)
        
    }

    return <div className="h-[95vh]">
        <div className="max-w-md mx-auto py-5">
            <h1>Login Here</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" required name="username" placeholder="Your Username"/>
                <input type="password" required name="password" placeholder="Your Password"/>
                <button type="submit">Login</button>
            </form>
        </div>
    </div>
    
    
}