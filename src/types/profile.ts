import { PermissionList } from "./permissions";

export enum Role {
    Customer = 'customer',
    CustomerPartner = 'customer-partner',
    ResultsExpert = 'results-expert',
    Manager = 'manager',
    Staff = 'staff',
}

/**
 * Extends default roles to include Mycelium-specific roles.
 */
export enum Role {
    StdGuestManager = 'guest-manager',
    StdSubscriptionAccountManager = 'subscription-account-manager',
    StdSystemManager = 'system-manager',
    StdUserAccountManager = 'user-account-manager',
}

export enum GuestRoles {
    ONLY_AUTH = 'auth',
    MANAGER = 'manager',
    CUSTOMER_VIEWER = 'customer-viewer',
    CUSTOMER_CREATOR = 'customer-creator',
    CUSTOMER_PARTNER_VIEWER = 'customer-partner-viewer',
    CUSTOMER_PARTNER_CREATOR = 'customer-partner-creator',
    RESULT_EXPERT_VIEWER = 'result-expert-viewer',
    RESULT_EXPERT_EDITOR = 'result-expert-editor',
}

export interface OwnerCredential {
    email: string;
    firstName?: string;
    lastName?: string;
    username?: string;
}

type OwnerCredentialList = OwnerCredential[];

export interface Profile {
    accId: string;
    owners: OwnerCredentialList;

    accountIsActive: boolean;
    accountWasApproved: boolean;
    accountWasArchived: boolean;
    verboseStatus: 'active' | 'inactive' | 'pending' | 'archived';

    isManager: boolean;
    isStaff: boolean;
    isSubscription: boolean;
    licensedResources?: LicensedResources;
}

export type LicensedResources = LicensedResource[];

export interface LicensedResource {
    id?: string;
    accId: string;
    isAccStd: boolean;
    accName: string;
    guestRoleId: string;
    guestRoleName: string;
    role: Role;
    perms: PermissionList;
}
