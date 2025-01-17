"use client"
import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(()=>{
    router.push('/login');
  },[]);
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      {/* <Link href={"/login"}> <Button variant="outline">Login</Button></Link> */}
    </div>
  );
}
