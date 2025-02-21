import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';

export async function POST(req: NextRequest) {
    const { id, name, email } = await req.json();
    const session = await getServerSession(authOption);


    if (!session?.user?.id) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    try {

        const contact = await prisma.user.update({
            where: {
                id: +id
            },
            data: {
                name: name,
                email: email
            }
        });



        return NextResponse.json({ msg: 'User Updated Successfully' }, { status: 200 });

    } catch (e) {
        console.log(e);
        return NextResponse.json({ error: 'Something Went Wrong' }, { status: 500 });
    }

}