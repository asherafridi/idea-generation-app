import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { hashPass } from "@/lib/hash";
import { Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";

// Define types for the request body
interface ResetPasswordRequestBody {
  token: string;
  password: string;
  confirm_password: string;
}

// Define types for the JWT token payload
interface TokenData {
  time: string;
  userId: string;
  for: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { token, password, confirm_password }: ResetPasswordRequestBody = await req.json();
  
  try {
    // Verify the token and calculate the time difference
    const data = verifyToken(token);
    const differenceMin = timeDifference(data.time);

    if (differenceMin > 150) {
      return NextResponse.json({ msg: 'Password link has expired.' }, { status: 500 });
    }

    // Find the user in the database
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id: +data.userId,
      },
    });

    // Check if the passwords match
    if (password !== confirm_password) {
      return NextResponse.json({ msg: 'Confirm Password does not match the password' }, { status: 400 });
    }

    // Hash the new password
    const hashPassword = await hashPass(password);

    // Check if the new password is the same as the old password
    if (user.password === hashPassword) {
      return NextResponse.json({ msg: 'New password cannot be the same as the old password.' }, { status: 400 });
    }

    // Update the user's password
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashPassword,
      },
    });

    return NextResponse.json({ msg: 'Password changed successfully' }, { status: 200 });

  } catch (error) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle specific Prisma error codes
      if (error.code === "P2025") {
        // Record not found
        return NextResponse.json({ msg: "User not found" }, { status: 404 });
      }
      // Handle other known Prisma errors
      return NextResponse.json({ msg: `Prisma error: ${error.message}` }, { status: 500 });
    }

    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      // Handle unknown Prisma errors
      return NextResponse.json({ msg: "Unknown database error" }, { status: 500 });
    }

    return NextResponse.json({ msg: "Something went wrong!" }, { status: 500 });
  }
}

// Function to verify the JWT token
const verifyToken = (token: string): TokenData => {
  const jwtSecret = process.env.JWT_SECRET || "defaultSecret";
  try {
    const decoded = jwt.verify(token, jwtSecret) as TokenData;
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

// Function to calculate the time difference in minutes
const timeDifference = (date: string): number => {
  const currentDate = new Date();
  const pastDate = new Date(date);

  const differenceInMs = currentDate.getTime() - pastDate.getTime();
  const differenceInMinutes = differenceInMs / (1000 * 60);

  return differenceInMinutes;
};
