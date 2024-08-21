"use client";

import Button from "@/components/ui/Button";
import { GoogleProvider } from "@/components/ui/icons";
import { IdentityProvider } from "@/types/identity-provider";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Oauth2Page() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) router.push("/profile");

  return (
    <>
      <Button
        onClick={() => signIn(IdentityProvider.GOOGLE, {
          callbackUrl: "/profile",
          redirect: false
        })}
        role="button"
        fullWidth
        intent="link"
      >
        <GoogleProvider />
      </Button>
    </>
  );
}
