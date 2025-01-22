import { Pencil, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import ThemeToggle from "./ThemeToggle";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ProfileEdit from "./ProfileEdit";

const ProfileMenu = ({ isExpanded }: { isExpanded: boolean }) => {
  const session = useSession();
  return (
    <Dialog>
      <DialogTrigger>
        <button
          className={`w-full py-2 rounded flex items-center  font-body font-medium  hover:bg-gray-200 dark:hover:bg-gray-800 ${
            isExpanded ? "flex-row px-4 gap-2" : "flex-col gap-1"
          }`}
        >
          <User fill="#000" />
          <span className={`text-center`}>Profile</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-heading text-center mb-8 text-xl">
            Profile & Settings
          </DialogTitle>
          <DialogDescription>
            <div className="flex w-full items-center flex-col">
              <div className="relative group">
                <Avatar className="w-16 h-16 text-xl">
                  <AvatarImage src={session.data?.user?.image == null ? '' : session.data?.user?.image} />
                  <AvatarFallback>
                    {session.data?.user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {/* Pencil Icon */}
                <ProfileEdit />
              </div>
              <h1 className="font-body text-xl font-medium mt-4 text-foreground">
                {session.data?.user?.name}
              </h1>
            </div>

            <div className="w-full border-b border-gray-500 font-body flex justify-between b py-3 px-2 mt-12 items-center">
              <h3 className="text-lg text-foreground">Email</h3>
              <div className="flex items-center gap-2">
                <Link href={"#"} className="text-blue-400 text-md">
                  {session.data?.user.email}
                </Link>{" "}
              </div>
            </div>

            <div className="w-full border-b border-gray-500 font-body flex justify-between b py-3 px-2 mt-4 items-center">
              <h3 className="text-lg text-foreground">Theme</h3>
              <div className="flex items-center gap-2">
                <ThemeToggle />
              </div>
            </div>

            <div className="w-full  font-body  b py-3 px-2 mt-4 ">
              <div className="flex justify-between items-center">
                <h3 className="text-lg text-foreground">Send Feedback</h3>
                <div className="flex items-center gap-2"></div>
              </div>

              <span className="mt-2">
                Chatbot AI can make mistakes. Consider checking important
                information and send us your feedback
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileMenu;
