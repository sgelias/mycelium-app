import { authOptions } from "@/lib/auth";
import { IdentityProvider } from "@/types/identity-provider";
import { SessionToken } from "@/types/session-token";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface Props {
    asHeader?: boolean;
    asBearer?: boolean;
}

export type AuthorizationHeader = {
    Authorization: string;
};

export type SessionTokenOrHeader = SessionToken | AuthorizationHeader | string | undefined;

export async function ssrRequireSessionToken(
    { asBearer, asHeader }: Props = {}
): Promise<SessionTokenOrHeader> {
    const session: SessionToken | null = await getServerSession(authOptions);

    if (!session) {
        throw NextResponse.json({ status: 401, message: "Unauthorized" });
    }

    const sessionToken = session.provider === IdentityProvider.GOOGLE
        ? session.idToken
        : session.accessToken;

    if (asBearer) { return `Bearer ${sessionToken}` as string };

    if (asHeader) {
        return {
            Authorization: `Bearer ${sessionToken}`
        } as AuthorizationHeader
    };

    return session as SessionToken;
}
