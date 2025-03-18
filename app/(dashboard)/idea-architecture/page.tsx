"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import IdeaBar from "@/components/IdeaBar";
import toast from "react-hot-toast";
import Link from "next/link";
import axios from "axios";
import { useIdea } from "@/components/IdeaProvider";
import { Skeleton } from "@/components/ui/skeleton";
import Tour from "@/components/Tours";
import { ideaPrototypePageSteps } from "@/components/tour";

// Interface for the API response
interface DiagramResponse {
  imageUrl: string;
  createEraserFileUrl: string;
  diagrams: {
    diagramType: string;
    code: string;
  }[];
}

// Page Component
const Page: React.FC = () => {
  const [diagramData, setDiagramData] = useState<DiagramResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { prototypeText } = useIdea();

  // Fetch diagram data from the API
  useEffect(() => {
    const fetchDiagramData = async () => {
      try {
        setLoading(true);
        const response = await axios.post<DiagramResponse>(
          "https://app.eraser.io/api/render/prompt", // Replace with your API endpoint
          { idea: prototypeText },
          {
            headers: { "Content-Type": "application/json",
              "Authorization" :"Bearer ngSvOEpJZLZrT43hEbum"
             },
          }
        );
        setDiagramData(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch diagram data. Please try again.");
        setLoading(false);
      }
    };

    fetchDiagramData();
  }, [prototypeText]);

  return (
    <div className="w-full pb-16 min-h-screen">
      <IdeaBar menu="" />
      <div className="w-full mt-4">
        <div className="w-full flex px-6 gap-[480px]">
          <Button
            variant="outline"
            className="font-body py-6 flex gap-4 bg-background text-xl"
            onClick={() => router.back()}
            aria-label="Go Back"
          >
            <ArrowLeft /> Back
          </Button>
        </div>
        <div className="flex justify-center flex-col items-center mt-4">
          <h1 className="font-heading font-bold text-6xl">
            Architecture & Diagram
          </h1>
          <p className="font-body mt-4 text-lg">
            A diagram view showing how the idea will work in a real context.
          </p>
        </div>

        {loading ? (
          <Skeleton className="w-full h-[300px] bg-gray-100 mx-8lg:mx-32" />
        ) : diagramData ? (
          <div className="mt-8 px-6 mx-32">
            <div className="flex flex-col items-center gap-4">
              {/* Display the diagram image */}
              <img
                src={diagramData.imageUrl}
                alt="Architecture Diagram"
                className="w-full max-w-4xl rounded-lg shadow-lg"
              />
            </div>
          </div>
        ) : (
          <p className="text-center text-lg">No diagram data found.</p>
        )}
      </div>

      <Tour pageSteps={ideaPrototypePageSteps} />
    </div>
  );
};

export default Page;