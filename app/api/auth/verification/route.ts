import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';
import axios from 'axios';
import { Prisma } from '@prisma/client';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

// Define types for the token and user data
interface TokenData {
  time: string;
  userId: string;
}

interface User {
  id: number;
  email: string;
  status: boolean;
  verificationToken?: string | null;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const session = await getServerSession(authOption);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id: +session.user.id,
      },
    });

    if (user.status) {
      return NextResponse.json({ msg: 'User is Already Verified' }, { status: 200 });
    }

    let tokenExpired = false;

    if (user.id) {
      try {
        const userLink = verifyToken(user.password); // Verifies token
        if (timeDifference(userLink.time) < 30) {
          return NextResponse.json({ msg: 'Token already sent to the email.' }, { status: 500 });
        }
      } catch (e: any) {
        if (e.name === 'TokenExpiredError') {
          tokenExpired = true; // Token has expired, need to send a new one
        } else {
          throw e; // Other errors, such as invalid token
        }
      }
    }

    if (!user.id || tokenExpired) {
      const token = createToken(session.user.id); // Create a new token

      await prisma.user.update({
        where: {
          id: +session.user.id,
        },
        data: {
        },
      });

      await sendVerificationEmail(token, user.email); // Send email with new token
      return NextResponse.json({ msg: 'Verification email has been sent.' }, { status: 200 });
    }

  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({ msg: 'User Not Found!', e: error.code }, { status: 500 });
      }
    }
    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      return NextResponse.json({ msg: 'Unknown Error' + error.cause, e: error }, { status: 500 });
    }
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
};

// Function to calculate the time difference in minutes
const timeDifference = (date: string): number => {
  const currentDate = new Date();
  const pastDate = new Date(date);

  const differenceInMs = currentDate.getTime() - pastDate.getTime();
  const differenceInMinutes = differenceInMs / (1000 * 60);

  return differenceInMinutes;
};

// Function to create a new JWT token
const createToken = (id: string): string => {
  const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
  const data = {
    time: new Date().toISOString(),
    userId: id,
  };

  return jwt.sign(data, jwtSecret, { expiresIn: '30m' }); // Token expires in 30 minutes
};

// Function to send the verification email with the token
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
      address: process.env.MAIL_USER,
    },
    to: email,
    subject: 'Verification Link From Lexa Talk',
    html: htmlTemplate(token),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send verification email');
  }
};

// Function to generate the HTML template for the email
const htmlTemplate = (token: string): string => {
  const host = process.env.APP_HOSTNAME;
  return `<!doctype html>
    <html>
      <body>
        <p>Please click the link below to verify your email:</p>
        <a href="${host}/verify/email?token=${token}">Verify your Email</a>
      </body>
    </html>
  `;
};
