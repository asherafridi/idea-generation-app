import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';
import { hashPass } from '@/lib/hash';

export async function PUT(req: NextRequest) {
    const { email, password, name,id } = await req.json(); // Parse the JSON string back into an object
    const session = await getServerSession(authOption);
    console.log(id);
    if (!session?.user?.id) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    try {
        // Check if the user exists
        const user = await prisma.user.findFirst({
            where: {
                id:+id
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Hash the new password if provided
        let hashPassword = user.password;
        if (password) {
            hashPassword = await hashPass(password);
        }

        // Update the user
        const updatedUser = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                name: name ,
                email: email ,
                password: hashPassword,
            }
        });

        return NextResponse.json({ msg: 'User Updated Successfully', user: updatedUser }, { status: 200 });

    } catch (e) {
        console.log(e);
        return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });
    }
}