import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOption } from "@/lib/auth";

import { Client } from "pg"; // Use ES6 import syntax

export async function POST(req: NextRequest) {
  try {
    const { dbType, description, connectionString } = await req.json();

    // Retrieve user session
    const session = await getServerSession(authOption);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Check if user exists
    

    if (dbType.toLowerCase() === "postgres") {
          const client = await postgresConnection(connectionString);
    
          try {
            // Query to fetch table names from the PostgreSQL database
            const result = await client.query(`
              SELECT table_name
              FROM information_schema.tables
              WHERE table_schema = 'public';
            `);
    
            // Close the PostgreSQL connection
            await client.end();

             await prisma.database.create({
                data:{
                    type : dbType.toLowerCase(),
                    description: description,
                    connectionString:connectionString,
                    user_id: +userId
                }
              });

    
            // Return the table names
            return NextResponse.json(
              {
                msg: "Database Connected Successfully."// Extract the rows from the result
              },
              { status: 200 }
            );
          } catch (pgError) {
            // Handle PostgreSQL query errors
            console.error("PostgreSQL query error:", pgError);
            await client.end(); // Ensure the connection is closed
            return NextResponse.json(
              {
                msg: "Error querying PostgreSQL database",
                error: pgError instanceof Error ? pgError.message : "Unknown error",
              },
              { status: 500 }
            );
          }
        }

    // Check if an idea with the same name and title already exists for the user
    



    return NextResponse.json(
      {
        message: "No DBType Selected.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in saving idea:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}



// Helper function to connect to PostgreSQL
const postgresConnection = async (connectionString: string) => {
  const client = new Client({
    connectionString: connectionString,
  });

  await client.connect();
  return client;
};