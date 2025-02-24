"use client";

import React, { useState, useEffect } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { usePathname } from "next/navigation";
import { dashboardPageSteps, ideaGenerationPageSteps, ideaListPageSteps, ideaPrototypePageSteps, ideaRefinementPageSteps } from "./tour";

interface TourProps {
  pageSteps: Step[];
}

const Tour: React.FC<TourProps> = ({ pageSteps }) => {
  const pathname = usePathname();
  const [runTour, setRunTour] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);

  useEffect(() => {
    // Load the steps for the current page
    switch (pathname) {
      case "/dashboard":
        setSteps(dashboardPageSteps);
        break;
      case "/idea-generation":
        setSteps(ideaGenerationPageSteps);
        break;
      case "/idea-list":
        setSteps(ideaListPageSteps);
        break;
      case "/idea-refinement":
        setSteps(ideaRefinementPageSteps);
        break;
      case "/idea-prototype":
        setSteps(ideaPrototypePageSteps);
        break;

      default:
        setSteps([]);
    }

    // Check local storage to see if the user has completed the tour for this page
    const hasCompletedTour = localStorage.getItem(
      `hasCompletedTour-${pathname}`
    );
    if (!hasCompletedTour) {
      setRunTour(true);
    }
  }, [pathname]);

  const handleTourCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
        setRunTour(false);
        // Mark the tour as completed for this page in local storage
        localStorage.setItem(`hasCompletedTour-${pathname}`, "true");
      }
      
  };

  return (
    <Joyride
      steps={steps}
      run={runTour}
      callback={handleTourCallback}
      continuous={true}
      showProgress={true}
      showSkipButton={false}
      locale={{
        last : "Got It"
      }}
      styles={{
        options: {
          primaryColor: "#4f46e5",
          zIndex: 1000,
        },
        tooltipContainer: {
          fontFamily: "'Montserrat', sans-serif",
          background: "#fff",
        },
        tooltipTitle: {
          fontSize: "18px",
          fontWeight: "600",
          alignContent: "flex-start",
          marginTop: "10px",
        },
        tooltipContent: {
          fontSize: "16px",
          fontWeight: "500",
        },
        buttonNext: {
          fontSize: "14px",
          fontFamily: "'Montserrat', sans-serif",
          borderRadius: "14px",
          padding: "10px 20px",
          background: "#6A44FF1F",
          color: "#368DFF",
          fontWeight: "600",
          border: "2px solid #368DFF",
        },
        buttonBack: {
          fontSize: "14px",
          fontFamily: "'Montserrat', sans-serif",
          borderRadius: "14px",
          padding: "10px 20px",
          color: "#368DFF",
          fontWeight: "600",
        },
      }}
    />
  );
};

export default Tour;
