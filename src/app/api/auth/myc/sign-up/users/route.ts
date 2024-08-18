import { MYC_NO_ROLE } from "@/constants/urls";
import { AuthorizationHeader, ssrRequireSessionToken } from "@/functions/ssr-require-session-token";
import { IdentityProvider } from "@/types/identity-provider";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const provider = searchParams.get("provider") || undefined;
        let headers = { "Content-Type": "application/json" };

        if (provider && provider !== IdentityProvider.MYCELIUM) {
            const session = await ssrRequireSessionToken({ asHeader: true }) as AuthorizationHeader;
            headers = { ...headers, ...session };
        }

        return await fetch(new URL(`${MYC_NO_ROLE}/users/`), {
            method: "POST",
            body: JSON.stringify({ ...await req.json() }),
            headers,
        });
    } catch (e: any) {
        console.error("Error on create user:", e);
        return NextResponse.json(e);
    }
}
