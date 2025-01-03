import { authOption } from "@/lib/auth";
import prisma from "@/lib/db";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

export async function POST(req: NextRequest) {
    const { token } = await req.json();
    try {
        let data = await verifyToken(token);
        let diffrenceMin = timeDiffrence(data.time);

        if (diffrenceMin > 30) {
            return NextResponse.json({ msg: 'Verification link has expired.' }, { status: 500 });
        }

        const user = await prisma.user.findFirstOrThrow({
            where: {
                id: +data.userId,
            },
        });

        

        if (user.verificationToken != token) {
            return NextResponse.json({ msg: 'Invalid Token' }, { status: 500 });
        }
        if (user.subaccount_id == null) {

            const options = {
                method: 'POST',
                headers: {
                    authorization: process.env.BLAND_KEY,
                    'Content-Type': 'application/json'
                },
                data: {
                    balance: 2,
                    first_name: user.name,
                    last_name: user.email,
                    login_enabled: false
                }
            };

            const request = await axios.post('https://api.bland.ai/v1/subaccounts', options.data, { headers: options.headers });
            console.log(request);
            const userUpdate = await prisma.user.update({
                where: {
                    id: +data.userId,
                },
                data: {
                    status: true,
                    subaccount_id : request.data.subaccount_id,
                    subaccount_key : request.data.subaccount_key
                }
            });
        }else{

            const userToken = await prisma.user.update({
                where: {
                    id: +data.userId,
                },
                data: {
                    status: true
                }
            });
        }


        return NextResponse.json({ msg: 'Email Verified Successfully' }, { status: 200 });

    } catch (e) {
        console.log(e);
        return NextResponse.json({ msg: 'Something Went Wrong!' }, { status: 500 });
    }
}

const verifyToken = (token: any) => {
    let jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
    return jwt.verify(token, jwtSecret);
}

const timeDiffrence = (date: any) => {

    let currentDate: any = new Date();
    let pastDate: any = new Date(date); // Assuming data.time is a valid date string or timestamp

    // Calculate the difference in milliseconds
    let differenceInMs = currentDate - pastDate;

    // Convert the difference to minutes
    let differenceInMinutes = differenceInMs / (1000 * 60);

    return differenceInMinutes;
}