"use client";

import { Button } from "flowbite-react";
import { signOut } from "next-auth/react";

interface Props { }

export default function Page({ }: Props) {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/auth" });
  }

  return (
    <div>
      <Button
        role="button"
        fullSized
        className="text-white dark:text-gray-700 bg-red-500 font-bold p-3 flex justify-center align-middle items-center rounded-lg border border-gray-300 hover:bg-gray-100 hover:border-gray-400"
        onClick={handleSignOut}
      >
        Are you sure you want to sign out?
      </Button>
    </div>
  );
}
