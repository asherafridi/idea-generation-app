import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { SidebarTrigger } from './Sidebar'

const SocialMediaCard = () => {
  return (
    
    <div className="w-full bg-background border hover:shadow-lg rounded-lg  flex flex-col items-center justify-center font-body p-4 py-16">
        <img src='/chat.png' className='w-16' />
        <h3 className='text-2xl mt-2 font-heading font-medium'>Reddit</h3>
        <form className='w-full mt-12 flex flex-col items-center'>
            <input type='text' className='w-[80%] py-2 text-md bg-background rounded-lg border border-gray-400 px-4 font-body' placeholder='Enter Reddit Link' />
            <Button className='w-[80%] mt-4 bg-[rgba(106,68,255,0.2)] rounded-lg text-blue-800 border-blue-800 border'>
                Connect
            </Button>
        </form>
    </div>
  )
}

export default SocialMediaCard