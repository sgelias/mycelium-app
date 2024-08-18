import { IdentityProvider } from "@/types/identity-provider";
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"


export const authOptions: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt",
        //maxAge: 60 * 30, // 1/2 hour
    },
    providers: [
        GoogleProvider({
            name: "Mycelium APP",
            //@ts-ignore
            clientId: process.env.GOOGLE_AD_CLIENT_ID,
            //@ts-ignore
            clientSecret: process.env.GOOGLE_AD_CLIENT_SECRET,
            //scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/admin.directory.user.readonly https://www.googleapis.com/auth/admin.directory.group.readonly",
            idToken: true,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                    redirect_uri: process.env.GOOGLE_AD_REDIRECT_URI,
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account, profile }) {
            /* console.group("jwt");
            console.log("token", token);
            console.log("user", user);
            console.log("account", account);
            console.log("profile", profile);
            console.groupEnd(); */

            if (account?.provider === IdentityProvider.GOOGLE) {
                token.accessToken = account.access_token;
                token.idToken = account.id_token;
                token.refreshToken = account.refresh_token;
                token.provider = account.provider;

                // @ts-ignore
                token.givenName = profile?.given_name;

                // @ts-ignore
                token.familyName = profile?.family_name;
            }

            return token;
        },
        async session({ session, user, token }) {
            /* console.group("session");
            console.log("session", session);
            console.log("user", user);
            console.log("token", token);
            console.groupEnd(); */

            if (token.accessToken) {
                // @ts-ignore
                session.accessToken = token.accessToken;

                // @ts-ignore
                session.idToken = token.idToken;

                // @ts-ignore
                session.provider = token.provider;
            }

            return session;
        },
    }
}
