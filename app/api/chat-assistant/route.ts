import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth/next";
import axios from "axios";
import { authOption } from "@/lib/auth";


export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    
        const session = await getServerSession(authOption);

    // Validate input
    if (!text || text.trim() === "") {
      return NextResponse.json(
        { error: "Text is required to create a knowledge base." },
        { status: 400 }
      );
    }

    // Retrieve user session
    

    const userId = session.user.id;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: +userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    // Call the external API to create a knowledge base
    const externalApiResponse = await axios.post(
      "https://scrape.vetaai.com/api/knowledge",
      { text },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    
    console.log(externalApiResponse.data);


    // Update the user in the database with the new data
    const updatedUser = await prisma.user.update({
      where: { id: +userId },
      data: {
        apiKey: externalApiResponse.data.api_key,
        knowledgeBaseId: externalApiResponse.data.knowledge_base_id,
        userId : externalApiResponse.data.user_id
      },
    });

    return NextResponse.json(
      {
        message: "Knowledge base created and user updated successfully.",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in creating knowledge base or updating user:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
