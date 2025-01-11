import { authOption } from "@/lib/auth";
import prisma from "@/lib/db";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

// Define types for the token and user data
interface TokenData {
    time: string;
    userId: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    status: boolean;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    const { token }: { token: string } = await req.json();  // Specify that token is a string

    try {
        const data = await verifyToken(token);
        const differenceMin = timeDifference(data.time);

        if (differenceMin > 30) {
            return NextResponse.json({ msg: 'Verification link has expired.' }, { status: 500 });
        }

        const user = await prisma.user.findFirstOrThrow({
            where: {
                id: +data.userId,
            },
        });

        if (user.email !== token) {
            return NextResponse.json({ msg: 'Invalid Token' }, { status: 500 });
        }

        if (user.id == null) {
            const options = {
                method: 'POST',
                headers: {
                    authorization: process.env.BLAND_KEY || '',
                    'Content-Type': 'application/json',
                },
                data: {
                    balance: 2,
                    first_name: user.name,
                    last_name: user.email,
                    login_enabled: false,
                },
            };

            const request = await axios.post('https://api.bland.ai/v1/subaccounts', options.data, { headers: options.headers });
            console.log(request);

            const userUpdate = await prisma.user.update({
                where: {
                    id: +data.userId,
                },
                data: {
                    status: true,
                },
            });
        } else {
            const userToken = await prisma.user.update({
                where: {
                    id: +data.userId,
                },
                data: {
                    status: true,
                },
            });
        }

        return NextResponse.json({ msg: 'Email Verified Successfully' }, { status: 200 });

    } catch (e) {
        console.log(e);
        return NextResponse.json({ msg: 'Something Went Wrong!' }, { status: 500 });
    }
}

// Function to verify the JWT token and return the decoded data
const verifyToken = (token: string): TokenData => {
    const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
    try {
        const decoded = jwt.verify(token, jwtSecret) as TokenData;
        return decoded;
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
}

// Function to calculate the time difference in minutes
const timeDifference = (date: string): number => {
    const currentDate = new Date();
    const pastDate = new Date(date);

    const differenceInMs = currentDate.getTime() - pastDate.getTime();
    const differenceInMinutes = differenceInMs / (1000 * 60);

    return differenceInMinutes;
}
