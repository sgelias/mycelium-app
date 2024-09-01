"use client";

import useSWR from "swr";
import Head from "./head";
import useMemoizedPermissions from "@/hooks/use-memoized-permissions";
import { useMemo, useState } from "react";
import { Role } from "@/types/profile";
import { Permission } from "@/types/permissions";
import { Table } from "flowbite-react";
import { Account, AccountListResponse } from "@/types/accounts";
import { formatDDMMYY } from "@/functions/format-dd-mm-yy";
import { MyceliumEmail } from "@/types/mycelium-email";
import SearchBar from "@/components/ui/SearchBar";
import { HorizontalLoadingBar } from "@/components/ui/HorizontalLoadingBar";

interface Props { }

export default function Page({ }: Props) {
  const {
    profile,
    permissions,
    isLoading: isLoadingProfile,
    isValidating: isValidatingProfile
  } = useMemoizedPermissions({
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

  const [skip, setSkip] = useState(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [searchTag, setSearchTag] = useState<string | undefined>(undefined);

  const memoizedUrl = useMemo(() => {
    if (isLoadingProfile || isValidatingProfile) return null;
    if (!profile || !permissions) return null;
    if (!permissions?.includes(Permission.View)) return null;

    let searchParams = new URLSearchParams();
    searchParams.append("skip", skip.toString());
    searchParams.append("pageSize", pageSize.toString());
    if (searchTerm) searchParams.append("term", searchTerm);
    if (searchTag) searchParams.append("tagValue", searchTag);

    return `/api/auth/myc/role-controlled/user-account-manager?${searchParams.toString()}`;
  }, [
    profile,
    permissions,
    searchTerm,
    skip,
    pageSize,
    isLoadingProfile,
    isValidatingProfile
  ]);

  const {
    data: accounts,
    isLoading: isLoadingAccounts,
    isValidating: isValidatingAccounts,
    mutate: mutateAccounts,
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

  const handleSubmitSearch = (term?: string, tag?: string) => {
    if (setSearchTerm) setSearchTerm(term);
    if (setSearchTag) setSearchTag(tag);

    mutateAccounts(accounts, { rollbackOnError: true });
  };

  return (
    <div className="container mx-auto py-4 h-[92vh]">
      <Head />

      <HorizontalLoadingBar
        isLoading={
          isLoadingAccounts ||
            isValidatingAccounts ||
            isLoadingProfile ||
            isValidatingProfile
            ? true
            : false
        }
      />

      <SearchBar
        onSubmit={handleSubmitSearch}
        placeholder="Search for users..."
        fullWidth
        setSkip={setSkip}
        setPageSize={setPageSize}
      />

      <div className="xl:max-w-5xl mx-auto overflow-x-auto border-2 dark:border-indigo-900 rounded-lg">
        <Table className="rounded-lg shadow">
          <Table.Head>
            <Table.HeadCell>Account Identifiers</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Tags</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Created</Table.HeadCell>
            <Table.HeadCell>Updated</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {(accounts && accounts?.records) ? accounts?.records?.map((account, index) => (
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
            )) : (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell colSpan={6}>No accounts to show</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
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
