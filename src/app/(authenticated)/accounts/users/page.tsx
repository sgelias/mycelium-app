"use client";

import useSWR from "swr";
import Head from "./head";
import useMemoizedPermissions from "@/hooks/use-memoized-permissions";
import { useMemo } from "react";
import { Role } from "@/types/profile";
import { Permission } from "@/types/permissions";
import { Table } from "flowbite-react";
import Image from "next/image";
import { Account, AccountListResponse } from "@/types/accounts";
import { formatDDMMYY } from "@/functions/format-dd-mm-yy";
import Typography from "@/components/ui/Typography";
import { MyceliumEmail } from "@/types/mycelium-email";

interface Props { }

export default function Page({ }: Props) {
  const { profile, permissions, isLoading, isValidating } = useMemoizedPermissions({
    roles: [
      {
        role: Role.StdUserAccountManager,
        permission: Permission.View,
      },
      {
        role: Role.StdUserAccountManager,
        permission: Permission.Create,
      },
      {
        role: Role.StdUserAccountManager,
        permission: Permission.Update,
      },
      {
        role: Role.StdUserAccountManager,
        permission: Permission.Delete,
      }
    ]
  });

  const memoizedUrl = useMemo(() => {
    if (isLoading || isValidating) return null;
    if (!profile || !permissions) return null;

    if (permissions?.includes(Permission.View)) {
      return "/api/auth/myc/role-controlled/user-account-manager";
    }

    return null;
  }, [profile, permissions]);

  const {
    data: accounts,
    isLoading: isLoadingAccounts,
    isValidating: isValidatingAccounts,
    mutate,
  } = useSWR<AccountListResponse>(
    memoizedUrl,
    (url: string) =>
      fetch(url)
        .then((res) => {
          if (res.ok && res.status === 200) return res.json();
          if (res.ok && res.status === 204) return [];

          throw new Error("Failed to fetch roles");
        })
        .catch((err) => {
          console.error(err);
          return [];
        }),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: false,
    }
  );

  return (
    <div className="container mx-auto py-4 h-[92vh]">
      <Head />

      <div className="overflow-x-auto border-2 dark:border-indigo-900 rounded-lg">
        <Table className="rounded-lg shadow">
          <Table.Head>
            <Table.HeadCell>Account Identifiers</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Tags</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Created</Table.HeadCell>
            <Table.HeadCell>Updated</Table.HeadCell>
          </Table.Head>

          {!isLoadingAccounts && !isValidatingAccounts && !accounts ? (
            <div className="m-12 flex flex-col gap-2 text-center">
              <Image
                alt="Searching for accounts"
                src="/undrow.co/undraw_searching_re_3ra9.svg"
                width={400}
                height={400}
              />
              <Typography as="h2">No accounts found</Typography>
            </div>
          ) : (
            <Table.Body className="divide-y">
              {accounts?.records?.map((account, index) => (
                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <OwnerCard owners={account.owners} />
                  </Table.Cell>
                  <Table.Cell>{account.name}</Table.Cell>
                  <Table.Cell>
                    <ul>
                      {account.tags?.map((tag, index) => (
                        <li key={index}>{tag.value}</li>
                      ))}
                    </ul>
                  </Table.Cell>
                  <Table.Cell>{account.verboseStatus}</Table.Cell>
                  <Table.Cell>{formatDDMMYY(account.created, true)}</Table.Cell>
                  <Table.Cell>{formatDDMMYY(account.updated, true)}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          )}
        </Table>
      </div>
    </div>
  )
}

function OwnerCard({ owners }: { owners: Account["owners"] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {owners?.records?.map((owner, index) => (
        <div key={index}>
          <div>{owner.firstName} {owner.lastName}</div>
          <div className="text-slate-500">{MyceliumEmail.fromEmailInterface(owner.email).toString()}</div>
        </div>
      ))}
    </div>
  )
}
