import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';
import axios from 'axios';

export async function POST(req: NextRequest) {
    const { id } = await req.json();
    const session = await getServerSession(authOption);


    if (!session?.user?.id) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    try {

        const user = await prisma.user.findFirst({
            where : {
                id : +id
            }
        });

        if(!user){
            
        return NextResponse.json({ error: 'User Doesnt Exist' }, { status: 500 });
        }

        

        const contact = await prisma.user.delete({
            where:{
                id:+id
            }
        });

        return NextResponse.json({ msg: 'User Removed Successfully' }, { status: 200 });

    } catch (e) {
        console.log(e);
        return NextResponse.json({ error: 'Something Went Wrong' }, { status: 500 });
    }

}