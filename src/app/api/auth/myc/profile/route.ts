import { NextResponse } from "next/server";
import { Profile } from "@/types/profile";
import { AuthorizationHeader, ssrRequireSessionToken } from "@/functions/ssr-require-session-token";
import { MYC_NO_ROLE } from "@/constants/urls";


export const dynamic = "force-dynamic";
export const revalidate = 60 * 2; // 2 minutes


export async function GET() {
    try {
        const session = await ssrRequireSessionToken({ asHeader: true }) as AuthorizationHeader;

        const data: Profile | null | "error" = await fetch(
            `${MYC_NO_ROLE}/profile/`,
            { headers: session }
        )
            .then((res) => {
                if (res.status === 403) return null;
                return res.json();
            })
            .catch((err) => {
                console.error(err);
                return "error";
            });

        return NextResponse.json(data);
    } catch (e: any) {
        return NextResponse.json(e);
    }
}
