import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Link href={"/login"}> <Button variant="outline">Login</Button></Link>
    </div>
  );
}
