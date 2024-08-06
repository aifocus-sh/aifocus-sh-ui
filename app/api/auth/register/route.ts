import db from "@/lib/db";
import { FormUserValues } from "@/types/forms";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
	try {
		const data: FormUserValues = await request.json();

		const userByEmail = await db.user?.findUnique({
			where: {
				email: data.email,
			},
		});

		if (userByEmail) {
			return NextResponse.json(
				{
					message: "Email already exists",
				},
				{ status: 400 }
			);
		}

		const userByName = await db.user?.findUnique({
			where: {
				username: data.username,
			},
		});

		if (userByName) {
			return NextResponse.json(
				{
					message: "Username already exists",
				},
				{ status: 400 }
			);
		}

		const hasPassword = await bcrypt.hash(data.password, 7);
		const newUser = await db.user.create({
			data: {
				email: data.email,
				password: hasPassword,
				username: data.username,
			},
		});

		const { password: _, ...user } = newUser;
		return NextResponse.json(user);
	} catch (error) {
        return NextResponse.json(
            {
                error: 'Internal server error',  
				              
            },
            { status: 500 }
        );
    }
}
