import { ChildrenRecord } from "./children-record";
import { PaginatedListResponse } from "./list-responses";
import { ParentRecord } from "./parent-record";

interface Owner {
    id: string;
    username: string;
    email: Email;
    firstName: string;
    lastName: string;
    isActive: boolean;
    created: string;
    updated: string;
}

export interface Account {
    id: string;
    name: string;
    tags: AccountTagList | undefined;
    isActive: boolean;
    isChecked: boolean;
    isArchived: boolean;
    isDefault: boolean;
    verboseStatus: 'active' | 'inactive' | 'pending' | 'archived';

    owners: ChildrenRecord<Owner>;
    accountType: ParentRecord<AccountType>;
    guestUsers: any;
    created: Date;
    updated: Date;
}

export type AccountList = Account[];

export interface AccountListResponse extends PaginatedListResponse<AccountList> { }

export interface Email {
    username: string;
    domain: string;
}

interface AccountType {
    id: string;
    name: string;
    description: string;
    isSubscription: boolean;
    isManager: boolean;
    isStaff: boolean;
}

export enum AccountTagGroup {
    TAG = "tag",
    CUSTOMER_CODE = "customer-code",
    ALTERNATIVE_ID = "alternative-id",
    ROLE = "role",
}

export interface AccountTag {
    id: string;
    value: string;
    meta: {
        group: AccountTagGroup,
        restrictedTo: string[],
    };
}

export type AccountTagList = AccountTag[];
