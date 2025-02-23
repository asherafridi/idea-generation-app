import { Step } from "react-joyride";

export const dashboardPageSteps: Step[] = [
  {
    target: ".social",
    title: "Social Media", 
    content: "Please pick a social media channel of your choice to collect customer review data for idea generation",
    disableBeacon: true, 
  },
  {
    target: ".data",
    title: "Data Connect",  // Target the idea history button
    content: "Set up your database by entering the required configuration details to ensure seamless connectivity and functionality.",
  },
  {
    target: ".document",
    title: "Upload Document",  // Target the idea history button
    content: "Upload your document here to share important files or information needed for your project or review.",
  },
  {
    target: ".website",
    title: "Website Link",  // Target the idea history button
    content: "Enter the website link to provide quick access or reference for your project or resource.",
  },
];


export const ideaGenerationPageSteps: Step[] = [
    {
      target: ".generation",
      title: "Idea Generation", 
      content: "Select a category that best fits your idea and wrote down your thoughts to kickstart the idea generation process.",
      disableBeacon: true, 
    },
  ];

  export const ideaListPageSteps: Step[] = [
    {
      target: ".list",
      title: "Idea List", 
      content: "Choose multiple ideas from the list to refine and develop them further for better clarity and impact.",
      disableBeacon: true, 
    },
  ];
  export const ideaRefinementPageSteps: Step[] = [
    {
      target: ".refinement",
      title: "Idea Refinement", 
      content: "Select an idea to view its details, refine it further, and explore available prototypes for a deeper understanding.",
      disableBeacon: true, 
    },
  ];
  
  export const ideaPrototypePageSteps: Step[] = [
    {
      target: ".prototype",
      title: "Idea Prototype", 
      content: "Explore potential partners and resources to discover components and prototypes that can help bring your idea to life.",
      disableBeacon: true, 
    },
  ];