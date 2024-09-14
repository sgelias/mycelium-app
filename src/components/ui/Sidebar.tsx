"use client"

import { cva, VariantProps } from "class-variance-authority";
import { Tooltip } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaAddressCard } from "react-icons/fa";
import { GrOrganization } from "react-icons/gr";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { RiProfileFill } from "react-icons/ri";

const styles = cva("bg-indigo-600 dark:bg-slate-700 h-screen min-w-md px-5 py-12 flex flex-col justify-between align-middle items-center border-r-2 dark:border-indigo-900 shadow", {
  variants: {
    open: {
      true: "w-64",
    },
  },
  defaultVariants: {
    open: false,
  },
});

interface Props extends BaseProps, VariantProps<typeof styles> { }

export default function Sidebar({ ...props }: Props) {
  const pathName = usePathname();

  return (
    <aside className={styles({})} {...props}>
      <div className="flex flex-col gap-8">
        <Link href="/profile" className="border-2 border-white dark:border-lime-500 rounded-full p-2 dark:text-lime-500 flex">
          <RiProfileFill className="text-3xl" />
        </Link>

        <Link href="/accounts/subscriptions" className="border-2 border-white dark:border-lime-500 rounded-full p-2 dark:text-lime-500 flex">
          <FaAddressCard className="text-3xl" />
        </Link>
      </div>

      <Tooltip content="Go to sign out page">
        <Link href="/auth/sign-out">
          <LiaSignOutAltSolid className="text-3xl text-gray-200 dark:text-red-600 hover:dark:text-gray-400 hover:cursor-pointer" />
        </Link>
      </Tooltip>
    </aside>
  )
}
