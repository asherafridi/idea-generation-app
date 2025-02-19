import { authOption } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOption);

    if (!session?.user) {
        return NextResponse.json({ msg: 'Authentication Error' }, { status: 500 });
    }


    try {
        // Fetch paginated data
        const database = await prisma.database.findMany({
            select:{
                id:true,
                type:true,
                description:true
            },
            where: {
                user_id: +session.user.id
            }
        });

        return NextResponse.json({
            databases: database,
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ msg: 'Error fetching data', error: error.message }, { status: 500 });
    }
}
