import { MyceliumEmail } from "./mycelium-email";

interface RegisteredEmail {
    email: MyceliumEmail;
    provider?: {
        external: string;
    };
}

export interface EmailRegistrationStatus {
    notRegistered: string;
    registeredAndInternal: RegisteredEmail;
    registeredButExternal: RegisteredEmail;
}
