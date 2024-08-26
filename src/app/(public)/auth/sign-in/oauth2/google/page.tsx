"use client";

import Button from "@/components/ui/Button";
import { GoogleProvider } from "@/components/ui/icons";
import signInWith from "@/functions/sign-in-with";
import { IdentityProvider } from "@/types/identity-provider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Oauth2Page() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) router.push("/profile");

  return (
    <>
      <Button
        onClick={() => signInWith(IdentityProvider.GOOGLE)}
        role="button"
        fullWidth
        intent="link"
      >
        <GoogleProvider />
      </Button>
    </>
  );
}
