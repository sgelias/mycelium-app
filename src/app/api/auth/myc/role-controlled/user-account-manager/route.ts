import { MYC_SUBSCRIPTION_ACCOUNT_MANAGERS } from "@/constants/urls";
import { AuthorizationHeader, ssrRequireSessionToken } from "@/functions/ssr-require-session-token";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const session = await ssrRequireSessionToken({ asHeader: true }) as AuthorizationHeader;

        const { searchParams } = new URL(req.url);
        const term = searchParams.get('term');
        const tagValue = searchParams.get('tagValue');
        const skip = searchParams.get('skip');
        const pageSize = searchParams.get('pageSize');

        const params = new URLSearchParams();
        params.append('isSubscription', 'false');
        if (term) params.append('term', term);
        if (tagValue) params.append('tagValue', tagValue);
        if (skip) params.append('skip', skip);
        if (pageSize) params.append('pageSize', pageSize);

        const url = `${MYC_SUBSCRIPTION_ACCOUNT_MANAGERS}/accounts/?${params.toString()}`;

        const data = await fetch(url, { headers: session })
            .then((res) => {
                if (res.status === 403) return null;
                if (res.ok && res.status === 200) return res.json();
                if (res.ok && res.status === 204) return [];
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
