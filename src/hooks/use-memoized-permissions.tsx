"use client";

import { forceSignIn } from "@/functions/force-signin";
import { Permission, PermissionList } from "@/types/permissions";
import { Profile, Role } from "@/types/profile";
import { useMemo } from "react";
import useSWR from "swr";

interface Props {
  forceRedirect?: boolean;
  resourceId?: string;
  pathName?: string;
  roles?: { role: Role; permission: Permission }[];
}

export interface UseMemoizedOutput {
  profile: Profile | null | undefined;
  permissions: PermissionList;
  rolePermissions: PermissionList | undefined;
  isManager: boolean | undefined;
  isStaff: boolean | undefined;
  isLoading: boolean;
  isValidating: boolean;
  mutate: () => Promise<Profile | null | undefined>;
}

/**
 * Collect the user's permissions and memoize them.
 *
 * @param forceRedirect If true, will redirect the user to the sign-in page if
 * they are not authenticated.
 * @param resourceId The resource ID to filter permissions by.
 * @param roles The roles to filter permissions by.
 */
export default function useMemoizedPermissions({
  forceRedirect,
  resourceId,
  pathName,
  roles,
}: Props = {}): UseMemoizedOutput {

  /**
   * Fetch the user's profile
   */
  const {
    data: profile,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<Profile | null>(
    "/api/auth/myc/profile",
    (url: string) =>
      fetch(url, { next: { revalidate: 60 * 5 } })
        .then((res) => res.json())
        .catch((err) => {
          console.error(err);
          return null;
        }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true,
    }
  );

  /**
   * Memoize the user's permissions
   * 
   * If the user is a manager or staff, they will have all permissions. If the
   * user is not a manager or staff, they will have the permissions of the
   * licensed resources they have access to. If a resource ID is provided, the
   * permissions will be filtered by that resource.
   */
  const memoizedPermissions = useMemo(() => {
    if (resourceId) {
      return (profile?.licensedResources || [])
        .filter((i) => {
          if (!resourceId) {
            return true;
          }

          return i.accId === resourceId;
        })
        .flatMap((i) => i.perms)
        .reduce((acc, curr) => {
          if (!acc.includes(curr)) acc.push(curr);
          return acc;
        }, [] as PermissionList);
    }

    if (profile?.isManager || profile?.isStaff) {
      return [
        Permission.View,
        Permission.Create,
        Permission.Update,
        Permission.Delete,
      ];
    }

    return (profile?.licensedResources || [])
      .flatMap((i) => i.perms)
      .reduce((acc, curr) => {
        if (!acc.includes(curr)) acc.push(curr);
        return acc;
      }, [] as PermissionList);
  }, [
    profile?.isManager,
    profile?.isStaff,
    profile?.licensedResources,
    resourceId,
  ]);

  /**
   * Memoize the user's role permissions
   */
  const memoizedRoles = useMemo(() => {
    if (!roles) {
      return undefined;
    }

    return roles
      .filter((role) => {
        const licensedResource = profile?.licensedResources?.find(
          (i) => i.role === role.role
        );

        if (licensedResource) {
          return licensedResource.perms.includes(role.permission);
        }

        return false;
      })
      .map((i) => i.permission)
      .reduce((acc, curr) => {
        if (!acc.includes(curr)) acc.push(curr);
        return acc;
      }, [] as PermissionList);
  }, [profile, roles]);

  /**
   * Redirect the user to the sign-in page if they are not authenticated
   */
  if (
    isLoading === false &&
    isValidating === false &&
    !profile &&
    forceRedirect
  ) forceSignIn({ customUrl: pathName });

  return {
    profile,
    permissions: memoizedPermissions,
    rolePermissions: memoizedRoles,
    isManager: profile?.isManager,
    isStaff: profile?.isStaff,
    isLoading,
    isValidating,
    mutate,
  };
}
