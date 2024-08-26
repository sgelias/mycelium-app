import { MYC_SUBSCRIPTION_ACCOUNT_MANAGERS } from "@/constants/urls";
import { AuthorizationHeader, ssrRequireSessionToken } from "@/functions/ssr-require-session-token";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const session = await ssrRequireSessionToken({ asHeader: true }) as AuthorizationHeader;

        const { searchParams } = new URL(req.url);
        const pageSize = searchParams.get('pageSize');

        const params = new URLSearchParams();
        params.append('isSubscription', 'false');
        if (pageSize) params.append('pageSize', pageSize);

        const url = `${MYC_SUBSCRIPTION_ACCOUNT_MANAGERS}/accounts/?${params.toString()}`;

        const data = await fetch(url, { headers: session })
            .then((res) => {
                if (res.status === 403) return null;
                return res.json();
            })
            .catch((err) => {
                console.error(err);
                return "error";
            });

        return NextResponse.json(data);

    } catch (error: any) {
        return NextResponse.json({
            status: 500,
            error: "Internal Server Error",
            message: error.message
        });
    }
}
