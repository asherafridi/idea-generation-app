import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import prisma  from '@/lib/db'
import { isSamePass } from "@/lib/hash";
import { authOption } from "@/lib/auth";

const handler = NextAuth(authOption);

export { handler as GET, handler as POST }