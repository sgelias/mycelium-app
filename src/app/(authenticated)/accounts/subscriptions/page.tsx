"use client";

import useSWR from "swr";
import Head from "./head";
import useMemoizedPermissions from "@/hooks/use-memoized-permissions";
import { useMemo, useState } from "react";
import { Role } from "@/types/profile";
import { Permission } from "@/types/permissions";
import { Table, ToggleSwitch } from "flowbite-react";
import { AccountListResponse } from "@/types/accounts";
import { formatDDMMYY } from "@/functions/format-dd-mm-yy";
import SearchBar from "@/components/ui/SearchBar";
import { HorizontalLoadingBar } from "@/components/ui/HorizontalLoadingBar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import OwnerCard from "./components/OwnerCard";
import PageBody from "@/components/ui/PageBody";
import Link from "next/link";
import Typography from "@/components/ui/Typography";
import Image from "next/image";

interface Props { }

export default function Page({ }: Props) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const {
    profile,
    permissions,
    isLoading: isLoadingProfile,
    isValidating: isValidatingProfile
  } = useMemoizedPermissions({
    roles: [
      {
        role: Role.StdSubscriptionAccountManager,
        permission: Permission.View,
      },
    ]
  });

  const memoizedIsSubscriptionState = useMemo(() => {
    if (searchParams.has("isSubscription")) {
      return searchParams.get("isSubscription") === "true";
    }

    return false;
  }, []);

  const [skip, setSkip] = useState(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [searchTag, setSearchTag] = useState<string | undefined>(undefined);
  const [isSubscription, setIsSubscription] = useState<boolean>(memoizedIsSubscriptionState);

  const memoizedUrl = useMemo(() => {
    if (isLoadingProfile || isValidatingProfile) return null;
    if (!profile || !permissions) return null;
    if (!permissions?.includes(Permission.View)) return null;

    let searchParams = new URLSearchParams();
    searchParams.append("skip", skip.toString());
    searchParams.append("pageSize", pageSize.toString());
    searchParams.append("isSubscription", isSubscription.toString());

    if (searchTerm) searchParams.append("term", searchTerm);
    if (searchTag) searchParams.append("tagValue", searchTag);

    return `/api/auth/myc/role-controlled/subscription-account-manager?${searchParams.toString()}`;
  }, [
    profile,
    permissions,
    searchTerm,
    skip,
    pageSize,
    isLoadingProfile,
    isValidatingProfile,
    isSubscription
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

  /**
   * Set the isSubscription state
   *
   * @description The handle should include the URL state change and the state
   * change of the isSubscription state.
   *
   * @param checked 
   */
  const handleSetIsSubscription = (checked: boolean) => {
    setIsSubscription(checked);

    let currentState = new URLSearchParams(searchParams.toString());
    currentState.set("isSubscription", checked.toString());
    router.push(`${pathName}?${currentState.toString()}`);
  }

  /**
   * Handle the search submission
   * 
   * @param term The search term
   * @param tag The search tag
   */
  const handleSubmitSearch = (term?: string, tag?: string) => {
    if (setSearchTerm) setSearchTerm(term);
    if (setSearchTag) setSearchTag(tag);

    mutateAccounts(accounts, { rollbackOnError: true });
  };

  return (
    <PageBody>
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

      <div className="xl:max-w-5xl mx-auto my-2 p-3 overflow-x-auto rounded-lg">
        <ToggleSwitch
          label={isSubscription ? "Show Users" : "Show Subscriptions"}
          checked={isSubscription}
          onChange={(checked) => handleSetIsSubscription(checked)}
          color="indigo"
          theme={{
            toggle: {
              checked: {
                color: {
                  indigo: "bg-indigo-500"
                }
              }
            }
          }}
        />
      </div>

      <div className="xl:max-w-5xl mx-auto flex flex-col justify-between h-full">
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

            <Table.Body className="divide-y">
              {(accounts && accounts?.records) ? accounts?.records?.map((account, index) => (
                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Link
                      href={`${pathName}/${account.id}`}
                      className="text-indigo-500 dark:text-indigo-400 hover:underline"
                    >
                      <OwnerCard owners={account.owners} />
                    </Link>
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

        <div className="xl:max-w-5xl mx-auto bottom-0 flex flex-col gap-8 justify-center align-middle items-center hover:transform hover:scale-105 hover:-translate-y-40 transition-transform duration-500">
          <Image
            alt="Mindfulness"
            src="/undraw.co/undraw_fun_moments_2vha.svg"
            width={250}
            height={250}
          />
        </div>
      </div>
    </PageBody>
  )
}
