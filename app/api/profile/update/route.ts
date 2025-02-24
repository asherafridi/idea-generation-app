import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOption } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { imageUrl,
        companyName } = await req.json();

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

    const updatedUser = await prisma.user.update({
        where: { id: +userId },
        data: {
            profileImg : imageUrl,
            name : companyName
        },
      });

      const updateAllSubUser = await prisma.user.updateMany({
        where: { referrer_id: +userId },
        data:{
          profileImg : imageUrl,
        }
      })


    return NextResponse.json(
      {
        message: "Profle Updated Successfully"
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
