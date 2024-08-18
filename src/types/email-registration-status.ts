import { MyceliumEmail } from "./mycelium-email";

/**
 * Email registration literal status.
 *
 * @description Such status is used to determine whether the user is registered
 * or not.
 */
export type EmailRegistrationLiteralStatus = undefined
    | "notRegistered"
    | "registeredAndInternal"
    | "registeredButExternal";


export interface EmailRegistrationStatus {
    notRegistered: string;
    registeredAndInternal: MyceliumEmail;
    registeredButExternal: MyceliumEmail;
}
