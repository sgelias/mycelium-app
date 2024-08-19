"use client";

import { GoogleProvider } from "@/components/ui/icons";
import { IdentityProvider } from "@/types/identity-provider";
import { Button } from "flowbite-react";
import { signIn } from "next-auth/react";

export default function Oauth2Page() {
  return (
    <>
      <Button
        onClick={() => signIn(IdentityProvider.GOOGLE, {
          callbackUrl: "/profile",
          redirect: false
        })}
        role="button"
        fullSized
        className="text-gray-500 font-bold p-3 flex justify-center align-middle items-center rounded-lg border border-gray-300 hover:bg-gray-100 hover:border-gray-400"
        color="white"
      >
        <GoogleProvider />
      </Button>
    </>
  );
}
