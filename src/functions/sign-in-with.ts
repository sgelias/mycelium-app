import { IdentityProvider } from "@/types/identity-provider";
import { signIn } from "next-auth/react";

export default function signInWith(provider: IdentityProvider) {
    return signIn(provider, {
        callbackUrl: "/profile",
        redirect: false
    })
}
