import { MYC_NO_ROLE } from "@/constants/urls";
import { AuthorizationHeader, ssrRequireSessionToken } from "@/functions/ssr-require-session-token";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await ssrRequireSessionToken({ asHeader: true }) as AuthorizationHeader;

        return await fetch(new URL(`${MYC_NO_ROLE}/accounts/`), {
            method: "POST",
            body: JSON.stringify({ ...await req.json() }),
            headers: { "Content-Type": "application/json", ...session },
        });
    } catch (e: any) {
        console.error("Error on create user:", e);
        return NextResponse.json(e);
    }
}
