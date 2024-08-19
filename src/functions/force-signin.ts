import { redirect } from "next/navigation";

export function forceSignIn({ customUrl }: { customUrl?: string } = {}) {
    return redirect(customUrl || "/auth/sign-up");
}
