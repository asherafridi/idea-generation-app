import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';
import axios from 'axios';
import { Prisma } from '@prisma/client';

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

export async function POST(req: NextRequest) {
    const { email } = await req.json();

    try {
        const user = await prisma.user.findFirstOrThrow({
            where: {
                email: email,
            },
        });

        const token = createToken(user.id.toString());
        await sendVerificationEmail(token, user.email);

        return NextResponse.json({ msg: 'Forgot Password email has been sent to your inbox.' }, { status: 200 });

    } catch (error) {
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return NextResponse.json({ msg: 'User Not Found!',e : error.code }, { status: 500 });
            }
        }
        if(error instanceof Prisma.PrismaClientUnknownRequestError){
            
            return NextResponse.json({ msg: error.cause }, { status: 500 });
        }
        return NextResponse.json({ msg: 'Something Went Wrong!' }, { status: 500 });
    }
}

const createToken = (id: string) => {
    const jwtSecret = process.env.JWT_SECRET || 'defaultSecret'; // Use an environment variable for the secret
    const data = {
        time: Date(),
        userId: id,
        for: 'forgot-password',
    };
    return jwt.sign(data, jwtSecret);
}

const sendVerificationEmail = async (token: string, email: string) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT || '587'),
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    const mailOptions = {
        from: {
            name: 'Lexa Talk',
            address: process.env.MAIL_USER,
        },
        to: email,
        subject: 'Forgot Password Link From Lexa Talk',
        html: htmlTemplate(token),
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.log('Error:', error);
    }
}

const htmlTemplate = (token: string) => {
    const host = process.env.APP_HOSTNAME;
    return `<!doctype html>
<html lang="en">
  <!-- Your HTML content here -->
  <a href="${host}/forgot-password/verify?token=${token}" target="_blank">Forgot Your Password.</a>
  <!-- End of HTML content -->
</html>`;
}
