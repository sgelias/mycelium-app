"use client"

import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { RiProfileFill } from "react-icons/ri";

const styles = cva("bg-indigo-600 dark:bg-neutral-700 h-screen min-w-md px-5 py-12 flex flex-col justify-between align-middle items-center", {
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
      <Link href={pathName} className="border-2 border-white dark:border-indigo-600 rounded-full p-2 dark:text-indigo-600">
        <RiProfileFill className="text-3xl" />
      </Link>

      <Link href="/auth/sign-out">
        <LiaSignOutAltSolid className="text-2xl text-gray-300 hover:text-gray-600 hover:dark:text-gray-400 hover:cursor-pointer" />
      </Link>
    </aside>
  )
}
