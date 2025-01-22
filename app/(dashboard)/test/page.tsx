"use client"
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react'
import React from 'react'

const page = () => {
    const {data:session,update} = useSession();
    const logSession = ()=>{
        console.log(session);
    }


    const updateSession = ()=>{
         update({
            name : "Ashir"
        });
    }
  return (
    <div>

<Button onClick={updateSession}>Update Session</Button>
<Button onClick={logSession}>Log Session</Button>
    </div>
  )
}

export default page