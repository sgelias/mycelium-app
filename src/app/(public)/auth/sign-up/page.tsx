"use client";

import { Button } from "flowbite-react";
import { signIn, useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { IdentityProvider } from "@/types/identity-provider";
import HandleMyceliumSignUp from "@/components/HandleMyceliumSignUp";
import { GoogleProvider } from "@/components/ui/icons";
import Head from "./head";

interface Props { }

export default function Page({ }: Props) {
  const { data: session, status } = useSession();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const callbackUrl = searchParams.get("callbackUrl") || pathname;
  const emailParam = searchParams.get("email") || undefined;
  const providerParam = searchParams.get("provider");

  const [provider, setProvider] = useState<IdentityProvider>(
    (providerParam as IdentityProvider) || IdentityProvider.MYCELIUM
  );

  const shouldSignUpWithData = useMemo(() => {
    if (session && status === "authenticated") {
      const splitName = session.user?.name?.split(" ");

      return {
        email: session.user?.email || "",
        firstName: splitName?.at(0),
        lastName: splitName?.at(1),
        provider: (provider || providerParam) as IdentityProvider,
      }
    };

    return false;
  }, [session, status, provider, providerParam]);

  const handleSignIn = (provider: IdentityProvider) => {
    setProvider(provider);
    signIn(provider, {
      callbackUrl: `${callbackUrl}?provider=${provider}`,
      redirect: false
    });
  }

  return (
    <>
      <Head />

      {provider === IdentityProvider.MYCELIUM && !shouldSignUpWithData && (
        <div>
          <HandleMyceliumSignUp
            provider={provider}
            email={emailParam}
            firstName=""
            lastName=""
          />

          <div className="flex w-full items-center justify-between py-12">
            <hr className="w-full" />
            <span className="text-sm px-2 uppercase">or</span>
            <hr className="w-full" />
          </div>

          <p className="text-xl mb-5 max-w-xs whitespace-pre">
            Sign-up with a identity provider
          </p>

          <div className="flex flex-col gap-5">
            <Button
              onClick={() => handleSignIn(IdentityProvider.GOOGLE)}
              role="button"
              fullSized
              className="text-gray-500 font-bold p-3 flex justify-center align-middle items-center rounded-lg border border-gray-300 hover:bg-gray-100 hover:border-gray-400"
              color="white"
            >
              <GoogleProvider />
            </Button>
          </div>
        </div>
      )}

      {shouldSignUpWithData && (
        <HandleMyceliumSignUp
          provider={shouldSignUpWithData.provider}
          email={shouldSignUpWithData.email}
          firstName={shouldSignUpWithData.firstName}
          lastName={shouldSignUpWithData.lastName}
        />
      )}

      {!shouldSignUpWithData && provider !== IdentityProvider.MYCELIUM && (
        <div>
          <p className="text-xl mb-5 max-w-xs whitespace-pre">
            Sign-up with a identity provider
          </p>
        </div>
      )}
    </>
  );
}
