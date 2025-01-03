"use client";
import IdeaBar from "@/components/IdeaBar";
import { Button } from "@/components/ui/button";
import { QuestionMarkIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

const page = () => {
  return (
    <div className="w-full">
      <IdeaBar menu="generation" />

      <div className="max-w-4xl mx-auto mt-32 flex flex-col items-center">
        <h1 className=" font-heading text-5xl font-semibold">Generate Ideas</h1>
        <p className="mt-4 font-body text-gray-800">
          Brainstorm new ideas for your business in a few seconds.
        </p>
        <form className="w-[500px] mt-4">
          <input
            type="text"
            placeholder="Enter Idea Name"
            className="w-full p-5 rounded-xl border-blue-400 border font-body outline-none focus:ring-1 ring-blue-600"
          />
          <div className="relative w-full mt-4">
            <select className="w-full p-5 rounded-xl border-blue-400 border font-body outline-none focus:ring-1 ring-blue-600 appearance-none">
              <option>Smart Cities</option>
              <option>Artificial Intelligence</option>
              <option>Blockchain</option>
            </select>
            {/* Custom Arrow */}
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
              placeholder="Provide your product/services concept here..."
              rows={8}
              className="w-full p-5 rounded-xl border-blue-400 border font-body outline-none focus:ring-1 ring-blue-600"
            ></textarea>
            {/* Question Mark Icon */}
            <div className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 rounded-full border border-blue-600 text-blue-600 bg-white">
              <QuestionMarkIcon />
            </div>
          </div>
          <div className="w-full flex justify-center">
            <Button variant={"outline"} className="bg-background w-64 text-lg font-body h-12 mx-auto">Generate Idea</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
