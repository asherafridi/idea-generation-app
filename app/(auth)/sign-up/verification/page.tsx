import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"
import Link from "next/link"

const page = () => {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card className="w-[450px] bg-secondary ">
                <CardHeader className="">
                    <CardTitle className="text-center">Verification</CardTitle>
                    <CardDescription className="text-center">Please enter the one-time password sent to your email.</CardDescription>
                </CardHeader>
                <CardContent className="">
                    <form>
                        <div className="flex flex-col w-full items-center gap-2">
                            <div className="flex justify-center w-full space-y-1.5">
                                <InputOTP maxLength={6} className="border-primary">
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSeparator />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>

                            <div className="h-1">
                            </div>
                            <Button className="w-full">Submit</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default page