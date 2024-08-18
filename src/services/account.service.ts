/**
 * Create a new account
 * 
 * The email domain is used as the account name.
 * 
 * @param email 
 * @returns 
 */
export async function createAccount(email: string) {
    return await fetch("/api/auth/myc/sign-up/accounts", {
        method: "POST",
        body: JSON.stringify({ accountName: email.split("@")[0] }),
        headers: { "Content-Type": "application/json" },
    });
}
