import { cn } from "@/lib/utils"
import { useAuth } from "@/components/authProvider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

const WAITLIST_URL = "/api/waitlists/";

export function WaitListForm({className,...props}) {

    const[message, setMessage] = useState("")
    const[error, setError] = useState("")

    async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const objectFromForm = Object.fromEntries(formData);
    const jsonData = JSON.stringify(objectFromForm);

    try {
      const response = await fetch(WAITLIST_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsonData,
      });

    //   const rData = await response.json();

      if (response.ok) {
        setMessage("Thank you for joining")
      } else {
        setError("There was an error with your request. Please try again");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }

  return (
    <div className={cn("gap-1", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div>{message && message}</div>
            <div>{error && error}</div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Enter your email"
                  required
                />
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
