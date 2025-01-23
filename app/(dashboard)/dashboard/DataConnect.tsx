"use client";

import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link2, Plus, Trash } from "lucide-react";
import axios from "axios";
import IdeaContext, { useIdea } from "@/components/IdeaProvider";
import { useSidebar } from "@/components/Sidebar";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import FormButton from "@/components/FormButton";

export default function DataConnect() {
  const [links, setLinks] = useState<string[]>([]);
  const [newLink, setNewLink] = useState<string>("");

  const [btnLoader, setBtnLoader] = useState(false);

  const { text, setText } = useIdea();

  const router = useRouter();

  const handleAddLink = () => {
    if (newLink.trim() !== "") {
      setLinks((prev) => [...prev, newLink]);
      setNewLink("");
    }
  };

  const handleDeleteLink = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    setBtnLoader(true);
  
    // If there's a new link in the input, add it to the links list before submission
    if (newLink.trim() !== "") {
      setLinks((prev) => [...prev, newLink]);
      setNewLink("");
    }
  
    axios
      .post(
        "https://scrape.vetaai.com/scrape",
        {
          urls: [...links, newLink.trim()],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setBtnLoader(false);
        setText(res.data.enhanced_text);
        router.push("/idea-generation");
      })
      .catch((error) => {
        setBtnLoader(false);
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.message);
          toast.error(error.message);
          console.error("Response:", error.response?.data);
        } else {
          console.error("Unexpected error:", error);
        }
      });
  };

  return (
    <div className="mx-16 mx-auto">
      <h2 className="text-foreground font-heading mt-12 mb-4 text-3xl font-body font-medium flex justify-between items-center">
        Data Connect
      </h2>
    <div className="flex items-center gap-16">
      <div className="mt-12 w-1/2">
        {/* Input Field */}
        <div className="">
          <input
            type="text"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            placeholder="Enter Database Hostname"
            className=" focus:outline-none w-full font-body text-foreground placeholder-gray-400 mb-6 flex gap-4 bg-background text-foreground p-4 rounded-xl border border-blue-500"
          />
        </div>
        <div className="">
          <input
            type="text"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            placeholder="Enter Database Port"
            className=" focus:outline-none w-full font-body text-foreground placeholder-gray-400 mb-6 flex gap-4 bg-background text-foreground p-4 rounded-xl border border-blue-500"
          />
        </div>
        <div className="">
          <input
            type="text"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            placeholder="Enter Database Username"
            className=" focus:outline-none w-full font-body text-foreground placeholder-gray-400 mb-6 flex gap-4 bg-background text-foreground p-4 rounded-xl border border-blue-500"
          />
        </div>
        <div className="">
          <input
            type="text"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            placeholder="Enter Database Password"
            className=" focus:outline-none w-full font-body text-foreground placeholder-gray-400 mb-6 flex gap-4 bg-background text-foreground p-4 rounded-xl border border-blue-500"
          />
        </div>
        
      <div className="mt-6  max-w-xl mx-auto">
        <FormButton text="Connect" state={btnLoader} onClick={handleSubmit} className="hover:bg-blue-600 hover:text-white" />
      </div>
      </div>
      <div className="w-1/2"><img src="/images/aws.png" className="bg-transparent" /></div>

    </div>
    </div>
  );
}
