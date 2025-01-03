import { authOption } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest,res : NextResponse) {

    const session = await getServerSession(authOption);

    if(!session?.user){
        return NextResponse.json({msg:'Authentication Error'},{status:500});
    }
    const contact = await prisma.user.findFirst({
        where:{
            id : +session?.user?.id
        }
    });
    return NextResponse.json({result:contact?.status},{status:200});

}