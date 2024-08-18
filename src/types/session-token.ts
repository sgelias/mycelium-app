import { IdentityProvider } from "./identity-provider";
import { Profile } from "./profile";

export interface AuthState {
    profile: Profile | null;
    loggedIn: boolean;
}


export interface SessionToken {
    user: {
        id: string,
        name: string,
        email: string,
        image: string | null
    },
    accessToken: string,
    refreshToken: string,
    provider: IdentityProvider,
    idToken?: string,
    error?: string | undefined
}


export interface GoogleSessionToken extends SessionToken {
    accessToken: string,
    idToken: string,
    refreshToken: string,
    givenName?: string,
    familyName?: string
}
