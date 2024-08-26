"use client";

import Button from "@/components/ui/Button";
import signInWith from "@/functions/sign-in-with";
import { IdentityProvider } from "@/types/identity-provider";

interface Props { }

export default function Page({ }: Props) {
  return (
    <>
      <h1>Password</h1>
      <p>
        This is a password page. You can use this page to authenticate with
        internal providers.
      </p>
      <Button
        onClick={() => signInWith(IdentityProvider.MYCELIUM)}
        role="button"
      //fullWidth
      //intent="link"
      >
        Mycelium Credentials
      </Button>
    </>
  );
}
