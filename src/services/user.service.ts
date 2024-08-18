import { IdentityProvider } from "@/types/identity-provider";

/**
 * Create a user
 *
 * This function is used to create a user in the system. If the user request
 * contains a provider, the authentication should include the provider from the
 * request token, then, the user should ve considered external and the provider
 * should be stored in the user data.
 *
 * @param email The user email
 * @param firstName The user first name
 * @param lastName The user last name
 * @param password The user password as optional
 * @param provider The user provider as optional
 * @returns 
 */
export async function createUser(
    email: string,
    firstName: string,
    lastName: string,
    password?: string,
    provider?: IdentityProvider,
) {
    let url = "/api/auth/myc/sign-up/users";
    if (provider && provider !== IdentityProvider.MYCELIUM) {
        url += `?provider=${provider}`;
    }

    return await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            email,
            firstName,
            lastName,
            redirectUrl: "http://localhost:3000/sign-up/activate",
            password,
        }),
    });
}
