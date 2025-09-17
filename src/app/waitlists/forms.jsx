import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

const WAITLIST_API_URL = "/api/waitlists/";

export function WaitListForm({className,...props}) {

    const[message, setMessage] = useState("")
    const[errors, setErrors] = useState("")
    const[error, setError] = useState("")

    async function handleSubmit(event) {
      event.preventDefault();
      setMessage("")
      setErrors("")
      setError("")
      const formData = new FormData(event.target);
      const objectFromForm = Object.fromEntries(formData);
      const jsonData = JSON.stringify(objectFromForm);

      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: jsonData,
        };

        const response = await fetch(WAITLIST_API_URL, requestOptions);
        const data = await response.json()
        console.log("Response data:", data)
        if (response.status === 201 || response.status === 200) {
          setMessage("Thank you for joining")
        } else {
          setErrors(data)
          if (!data.email){
            setError("There was an error with your request. Please try again");
          }
        }
      } catch (err) {
        console.error("Error:", err);
      }
  }

  return (
    <div className={cn("gap-1", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
            {message && <div className='rounded-md bg-accent p-3 font-semibold text-sm'>{message}</div>}
            {error &&<div className='rounded-md text-white bg-destructive p-3 font-semibold text-sm'>{error}</div>}
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <div className={errors?.email ? "rounded-lg p-3 border border-destructive" : ''}>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Enter your email"
                  required
                />
                {errors && errors?.email && errors?.email.length > 0 && <div className='p-1 text-sm bg-destructive text-center text-white'>
                  {errors?.email.map((err, idx) => {
                    return !err.message ? null : <p key={`err-${idx}`}>
                      {err.message}
                    </p>
                  })}
                  </div>
                }
              </div>
              </div>
              <Button type="submit" className="w-full">
                Join Waitlist
              </Button>
            </div>
          </form>
          
        </CardContent>
      </Card>
    </div>
  )
}
