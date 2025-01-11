"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import IdeaBar from "@/components/IdeaBar";
import { useIdea } from "@/components/IdeaProvider";
import { Button } from "@/components/ui/button";
import { QuestionMarkIcon } from "@radix-ui/react-icons";
import FormButton from "@/components/FormButton";

interface FormData {
  ideaName: string;
  category: string;
  concept: string;
  enhanced_text?: string;
}

interface ApiResponse {
  data: {
    ideas?: string;
  };
}

interface Idea {
  idea_id: number;
  title: string;
  idea: string;
}

const Page: React.FC = () => {
  const { text, setIdeas } = useIdea();
  const router = useRouter();

  // useEffect(() => {
  //   if (!text) {
  //     router.push("/dashboard");
  //   }

  //   const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  //     if (text) {
  //       event.preventDefault();
  //       event.returnValue = ""; // Default browser prompt
  //     }
  //   };

  //   if (text) {
  //     window.addEventListener("beforeunload", handleBeforeUnload);
  //   }

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [text, router]);

  const [btnLoader, setBtnLoader] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    ideaName: "",
    category: "Smart Cities",
    concept: "",
    enhanced_text: text,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const convertToJSON = (input: string): Idea[] => {
    const sections = input.trim().split("\n\n");
    return sections.map((section, index) => {
      const [titleLine, ...descriptionLines] = section.split("\n");
      const title = titleLine.replace("Title: ", "").trim();
      const description = descriptionLines.join(" ").trim();
      return {
        idea_id: index + 1,
        title,
        idea: description,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnLoader(true);

    try {
      const data = {
        idea_type: formData.category,
        short_description: formData.concept,
        text_data: formData.enhanced_text,
      };

      const response: ApiResponse = await axios.post(
        "https://idea.vetaai.com/api/v1/generate-ideas",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data?.ideas) {
        const enhance_ideas = convertToJSON(response.data.ideas);
        setIdeas(enhance_ideas);
        router.push("/idea-list");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error: unknown) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : (error as Error).message || "Unknown error occurred";
      console.error("Error generating idea:", errorMessage);
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setBtnLoader(false);
    }
  };

  return (
    <div className="w-full">
      <IdeaBar menu="generation" />

      <div className="max-w-4xl mx-auto  mt-16 md:mt-32 flex flex-col items-center">
        <h1 className="font-heading text-5xl font-semibold">Generate Ideas</h1>
        <p className=" px-4 text-center mt-4 font-body text-gray-800">
          Brainstorm new ideas for your business in a few seconds.
        </p>
        <form className="w-full px-4 md:w-[500px] mt-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="ideaName"
            placeholder="Enter Idea Name"
            value={formData.ideaName}
            onChange={handleInputChange}
            className="w-full bg-background p-5 rounded-xl border-blue-400 border font-body outline-none focus:ring-1 ring-blue-600"
          />
          <div className="relative w-full mt-4">
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full bg-background p-5 rounded-xl border-blue-400 border font-body outline-none focus:ring-1 ring-blue-600 appearance-none"
            >
              <option>Smart Cities</option>
              <option>Artificial Intelligence</option>
              <option>Blockchain</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          <div className="relative w-full mt-4">
            <textarea
              name="concept"
              placeholder="Provide your product/services concept here..."
              rows={8}
              value={formData.concept}
              onChange={handleInputChange}
              className="w-full bg-background p-5 rounded-xl border-blue-400 border font-body outline-none focus:ring-1 ring-blue-600"
            ></textarea>
            <div className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 rounded-full border border-blue-600 text-blue-600 bg-white">
              <QuestionMarkIcon />
            </div>
          </div>
          <div className="mt-4 w-full flex justify-center">
            <FormButton
              state={btnLoader}
              text="Generate Idea"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
