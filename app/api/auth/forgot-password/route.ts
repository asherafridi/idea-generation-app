import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

// Define types for request and response
interface ForgotPasswordRequestBody {
  email: string;
}

interface TokenData {
  time: string;
  userId: string;
  for: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { email }: ForgotPasswordRequestBody = await req.json();

  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        email: email,
      },
    });

    const token = createToken(user.id.toString());
    await sendVerificationEmail(token, user.email);

    return NextResponse.json(
      { msg: 'Forgot Password email has been sent to your inbox.' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { msg: 'User Not Found!', e: error.code },
          { status: 500 }
        );
      }
    }
    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      return NextResponse.json({ msg: error.cause }, { status: 500 });
    }
    return NextResponse.json({ msg: 'Something Went Wrong!' }, { status: 500 });
  }
}

const createToken = (id: string): string => {
  const jwtSecret = process.env.JWT_SECRET || 'defaultSecret'; // Use an environment variable for the secret
  const data: TokenData = {
    time: new Date().toISOString(),
    userId: id,
    for: 'forgot-password',
  };
  return jwt.sign(data, jwtSecret);
}

const sendVerificationEmail = async (token: string, email: string): Promise<void> => {
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
      address: process.env.MAIL_USER!,
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

const htmlTemplate = (token: string): string => {
  const host = process.env.APP_HOSTNAME!;
  return `<!doctype html>
<html lang="en">
  <a href="${host}/forgot-password/verify?token=${token}" target="_blank">Forgot Your Password.</a>
</html>`;
}
