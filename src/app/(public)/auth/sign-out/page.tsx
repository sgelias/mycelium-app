"use client";

import Button from "@/components/ui/Button";
import { signOut } from "next-auth/react";

interface Props { }

export default function Page({ }: Props) {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  }

  return (
    <div>
      <Button
        onClick={handleSignOut}
        role="button"
        fullWidth
        intent="warning"
      >
        Are you sure you want to sign out?
      </Button>
    </div>
  );
}
