"use client";

import PageBody from "@/components/ui/PageBody";
import Head from "./head";
import Card from "@/components/ui/Card";
import { Tooltip } from "flowbite-react";
import Typography from "@/components/ui/Typography";
import useMemoizedPermissions from "@/hooks/use-memoized-permissions";
import { Role } from "@/types/profile";
import { Permission } from "@/types/permissions";
import { HorizontalLoadingBar } from "@/components/ui/HorizontalLoadingBar";
import Image from "next/image";

interface Props {
  params: {
    accountId: string;
  };
}

export default function Page({ params: { accountId } }: Props) {
  const {
    profile,
    permissions,
    isLoading: isLoadingProfile,
    isValidating: isValidatingProfile
  } = useMemoizedPermissions({
    roles: [
      {
        role: Role.StdSubscriptionAccountManager,
        permission: Permission.Create,
      },
      {
        role: Role.StdSubscriptionAccountManager,
        permission: Permission.Update,
      },
      {
        role: Role.StdSubscriptionAccountManager,
        permission: Permission.Delete,
      },
    ]
  });

  return (
    <PageBody>
      <Head />

      <HorizontalLoadingBar
        isLoading={
          isLoadingProfile ||
            isValidatingProfile
            ? true
            : false
        }
      />

      <PageBody flex gap={3}>
        <Card width="lg">
          <Card.Header>
            <Typography as="h2">
              John Doe
            </Typography>
          </Card.Header>

          <Card.Body flex="col" justify="between">
            <div>
              <Typography>
                More
              </Typography>
            </div>

          </Card.Body>
        </Card>

        <Card width="lg">
          <Card.Header>
            <Typography as="h2">
              Actions
            </Typography>
          </Card.Header>

          <Card.Body flex="col" justify="between">
            <div>
              <Typography>
                Show only if the user has the permission to view this page
              </Typography>
            </div>

          </Card.Body>
        </Card>

        <div className="m-auto hidden xl:block">
          <Typography as="h1">
            Do it only if necessary!
          </Typography>
          <Image
            alt="Mindfulness"
            src="/undraw.co/undraw_dog_c7i6.svg"
            width={500}
            height={500}
          />
        </div>
      </PageBody>
    </PageBody>
  )
}
