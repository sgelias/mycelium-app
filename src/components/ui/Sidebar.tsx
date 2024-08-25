"use client"

import { cva, VariantProps } from "class-variance-authority";
import { Tooltip } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
      <div>
        <Link href={pathName} className="border-2 border-white dark:border-lime-500 rounded-full p-2 dark:text-lime-500 flex">
          <RiProfileFill className="text-3xl" />
        </Link>
      </div>

      <Tooltip content="Go to sign out page">
        <Link href="/auth/sign-out">
          <LiaSignOutAltSolid className="text-2xl text-gray-200 dark:text-red-600 hover:dark:text-gray-400 hover:cursor-pointer" />
        </Link>
      </Tooltip>
    </aside>
  )
}
