import { MyceliumEmail } from "./mycelium-email";

interface RegisteredEmail {
    email: MyceliumEmail;
    provider?: {
        external: string;
        internal: {};
    };
}

export interface EmailRegistrationStatus {
    notRegistered: string;
    registeredAndInternal: RegisteredEmail;
    registeredButExternal: RegisteredEmail;
}
