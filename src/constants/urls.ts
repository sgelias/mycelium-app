// ? ---------------------------------------------------------------------------
// ? Mycelium API URL's
// ? ---------------------------------------------------------------------------

const MYC_API_SCOPE = `${process.env.API_URL}/myc`;

const MYC_STANDARD_ROLES = `${MYC_API_SCOPE}/std`;

export const MYC_NO_ROLE = `${MYC_STANDARD_ROLES}/no-role`;

export const MYC_SUBSCRIPTION_ACCOUNT_MANAGERS = `${MYC_STANDARD_ROLES}/subscription-account-manager`;

export const MYC_USER_ACCOUNT_MANAGERS = `${MYC_STANDARD_ROLES}/user-account-manager`;

export const MYC_GUEST_ACCOUNT_MANAGERS = `${MYC_STANDARD_ROLES}/guest-manager`;

export const MYC_SYSTEM_ACCOUNT_MANAGERS = `${MYC_STANDARD_ROLES}/system-manager`;
