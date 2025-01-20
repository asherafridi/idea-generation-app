import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOption } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { description, name, title } = await req.json();

    // Retrieve user session
    const session = await getServerSession(authOption);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

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

    // Check if an idea with the same name and title already exists for the user
    const existingIdea = await prisma.ideaHistory.findFirst({
      where: {
        user_id: +userId,
        name: name,
        title: title,
      },
    });

    if (existingIdea) {
      return NextResponse.json(
        { error: "An idea with this name and title already exists." },
        { status: 400 }
      );
    }

    // Create the new idea
    const newIdea = await prisma.ideaHistory.create({
      data: {
        title: title,
        name: name,
        description: description,
        user_id: +userId,
      },
    });

    return NextResponse.json(
      {
        message: "Idea saved successfully.",
        idea: newIdea,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in saving idea:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
