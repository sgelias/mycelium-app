"use client";

import { GiGearHammer } from "react-icons/gi";
import { GrUserManager } from "react-icons/gr";
import { FaRegLightbulb } from "react-icons/fa";
import Banner from "@/components/ui/Banner";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import useMemoizedPermissions from "@/hooks/use-memoized-permissions";
import { Tooltip } from "flowbite-react";
import Image from "next/image";
import { Fragment } from "react";

interface Props { }

export default function Page({ }: Props) {
  const { profile } = useMemoizedPermissions();

  return profile && (
    <div className="container mx-auto py-4 flex gap-3 h-[92vh]">
      <Card>
        <Card.Header>
          <Tooltip content={`Registered Account Owners: ${profile?.owners ? profile?.owners.length : 0}`} placement="right">
            Account Owner's
          </Tooltip>
        </Card.Header>

        <Card.Body flex="col" justify="between">
          <div>
            {profile?.owners?.map((owner, index) => (
              <Fragment key={index}>
                <Typography as="h2">
                  <div className="flex items-center gap-1">
                    <span>{owner.firstName} {owner.lastName}</span>
                  </div>
                </Typography>

                <Tooltip content="email" placement="right">
                  <Typography>
                    {owner.email}
                  </Typography>
                </Tooltip>

                {(profile.isManager || profile.isStaff) && (
                  <div className="flex gap-3 my-5 align-middle items-center">
                    {profile.isStaff && (
                      <Tooltip content="Staff User">
                        <div className="border rounded-lg p-1 border-gray-600 dark:border-lime-500">
                          <GiGearHammer className="inline dark:text-lime-500 text-2xl" />
                        </div>
                      </Tooltip>
                    )}

                    {profile.isManager && (
                      <Tooltip content="Manager User">
                        <div className="border rounded-lg p-1 border-gray-600 dark:border-lime-500">
                          <GrUserManager className="inline dark:text-lime-500 text-2xl" />
                        </div>
                      </Tooltip>
                    )}
                  </div>
                )}
              </Fragment>
            ))}
          </div>

          <Banner
            title={(
              <span>
                <FaRegLightbulb className="text-yellow-500 inline" />
                <span className="ml-2">Tip</span>
              </span>
            )}
            maxWidth="xs"
          >
            Your invitations will be displayed here once you have been invited
            to join an account
          </Banner>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          Invitations
        </Card.Header>

        <Card.Body>
          <pre>
            {JSON.stringify(profile, null, 2)}
          </pre>
        </Card.Body>
      </Card>

      <div className="m-auto hidden xl:block">
        <Typography as="h1">
          Welcome to your Mycelium profile
        </Typography>
        <Image
          alt="Mindfulness"
          src="/undraw.co/undraw_powerful_re_frhr.svg"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
