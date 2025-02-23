"use client"
import { File, Flame, Globe, Lightbulb, RefreshCw, Sparkles, SquareCheckBig, Twitter } from 'lucide-react';
import React, { useState } from 'react'

export default function IdeaBar({menu} : {menu:string}) {
  const [tab, setTab] = useState(menu);

  const tabs = [
    { id: "generation", label: "Idea Generation", icon : <Lightbulb   /> },
    { id: "list", label: "Idea List", icon : <SquareCheckBig />  },
    { id: "refinement", label: "Idea Refinement", icon : <RefreshCw />  },
    { id: "prototype", label: "Prototype", icon : <Sparkles />  },
  ];
  
  return (
      <div className="flex w-full bg-background h-auto lg:h-16  font-body  overflow-hidden relative rounded-none">
    {tabs.map((item, index) => (
      <button
        key={item.id}
        className={`w-1/4 transition-all ${item.id} flex flex-col lg:flex-row items-center px-12 justify-between py-4 duration-300 text-md lg:text-lg ${
          tab === item.id
            ? "bg-blue-500 text-white z-10 "
            : "bg-background text-foreground text-black"
        } `} 
      >
        <div className='flex flex-col lg:flex-row items-center gap-4'>{item.icon} <span>{item.label}</span></div><span className={` w-4 h-4 rounded-full hidden lg:block ${
          tab === item.id
            ? "bg-white text-white z-10 "
            : "bg-black text-foreground text-black"
        }`}></span>
      </button>
    ))}
  </div>
  )
}
