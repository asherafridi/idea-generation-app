import { User } from "lucide-react";
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

const ProfileMenu = ({ isExpanded }: { isExpanded: boolean }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <button
          className={`w-full py-2 rounded flex items-center hover:bg-gray-200 ${
            isExpanded ? "flex-row px-4 gap-2" : "flex-col gap-1"
          }`}
        >
          <User />
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
              <div className="w-16 h-16 rounded-full bg-gray-400"></div>
              <h1 className="font-body text-xl font-medium mt-4 text-foreground">
                Company Name
              </h1>
            </div>

            <div className="w-full border-b border-gray-500 font-body flex justify-between b py-3 px-2 mt-12 items-center">
              <h3 className="text-lg text-foreground">Email</h3>
              <div className="flex items-center gap-2">
                <Link href={"#"} className="text-blue-400 text-md">
                  {"company@gmail.com"}
                </Link>{" "}
                <ArrowTopRightIcon />
              </div>
            </div>

            <div className="w-full border-b border-gray-500 font-body flex justify-between b py-3 px-2 mt-4 items-center">
              <h3 className="text-lg text-foreground">Theme</h3>
              <div className="flex items-center gap-2">
                <ThemeToggle /> <ArrowTopRightIcon />
              </div>
            </div>

            <div className="w-full  font-body  b py-3 px-2 mt-4 ">
              <div className="flex justify-between items-center">
                <h3 className="text-lg text-foreground">Send Feedback</h3>
                <div className="flex items-center gap-2">
                  <ArrowTopRightIcon />
                </div>
              </div>
              
              <span className="mt-2">Chatbot AI can make mistakes. Consider checking important information and send us your feedback</span>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileMenu;
