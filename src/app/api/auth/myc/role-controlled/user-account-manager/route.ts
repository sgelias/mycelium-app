import { NextResponse } from "next/server";

export async function GET() {
    try {
        return NextResponse.json({ status: 404, message: "Not Found" });
    } catch (error: any) {
        return NextResponse.json({
            status: 500,
            error: "Internal Server Error",
            message: error.message
        });
    }
}
