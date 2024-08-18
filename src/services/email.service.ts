import { EmailRegistrationStatus } from "@/types/email-registration-status";
import { MYC_NO_ROLE } from "@/constants/urls";

/**
 * Check email status
 * 
 * This function is used to check the status of an email in the system. The
 * status can be one of the following:
 * 
 * - notRegistered: The email is not registered in the system.
 * - registeredAndInternal: The email is registered in the system and is an
 *   Mycelial user.
 * - registeredButExternal: The email is registered in the system but is an
 *   external user, given the provider.
 * 
 * 
 * @param email 
 * @returns 
 */
export async function checkEmailStatus(
    email: string
): Promise<Partial<EmailRegistrationStatus> | undefined> {
    try {
        const response = await fetch(`${MYC_NO_ROLE}/users/status/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            return await response.json();
        }

        if ([204, 404].includes(response.status)) {
            return { notRegistered: email }
        };

        if (response.status === 500) {
            throw new Error('Internal server error');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to check email status');
    }

    return undefined;
}
