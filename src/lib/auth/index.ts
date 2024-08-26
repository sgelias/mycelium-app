import { IdentityProvider } from "@/types/identity-provider";
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { MYC_NO_ROLE } from "@/constants/urls";
import { MyceliumEmail } from "@/types/mycelium-email";


export const authOptions: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt",
        //maxAge: 60 * 30, // 1/2 hour
    },
    providers: [
        CredentialsProvider({
            name: "Mycelium Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "username@domain.com",
                },
                password: {
                    label: "Password",
                    type: "password"
                },
            },
            async authorize(credentials) {
                const res = await fetch(`${MYC_NO_ROLE}/users/login/`, {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const body = await res.json();

                if (res.ok && body) {
                    return body;
                }

                return null;
            },
        }),
        GoogleProvider({
            name: "Google Auth",
            //@ts-ignore
            clientId: process.env.GOOGLE_AD_CLIENT_ID,
            //@ts-ignore
            clientSecret: process.env.GOOGLE_AD_CLIENT_SECRET,
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
            } else if (
                account?.provider &&
                [IdentityProvider.MYCELIUM, "credentials"].includes(account.provider)
            ) {
                // @ts-ignore
                const { user: _localUser, token: localToken } = user;
                const localUser = JSON.parse(_localUser);

                token.provider = account.provider;

                // @ts-ignore
                token.accessToken = localToken;

                // @ts-ignore
                const { id, email, firstName, lastName } = localUser;

                token.sub = id;

                token.name = `${firstName} ${lastName}`;

                // @ts-ignore
                const { username, domain } = email;

                token.email = new MyceliumEmail(username, domain).toString();
            }

            return token;
        },
        async session({ session, token }) {
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
