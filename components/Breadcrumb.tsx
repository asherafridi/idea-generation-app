"use client"
import { usePathname } from 'next/navigation';
import React from 'react';

const Breadcrumb = ({text}:{text:string}) => {
  

  return (
    <div className='text-xl hidden lg:block '>
      <h1 className='text-center text-5xl font-heading font-bold'>{text}</h1>
    </div>
  );
};

export default Breadcrumb;
