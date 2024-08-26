"use client";

import { CgDarkMode } from "react-icons/cg";
import { cva, VariantProps } from "class-variance-authority";
import { useThemeMode } from "flowbite-react";
import Typography from "./Typography";
import Link from "next/link";

const appHeaderStyles = cva("text-gray-500 dark:text-gray-50 rounded-lg", {
  variants: {
    discrete: {
      true: "bg-transparent",
      false: "bg-indigo-800 dark:text-white"
    }
  },
  defaultVariants: {
    discrete: false,
  },
});

interface AppHeaderProps extends BaseProps, VariantProps<typeof appHeaderStyles> { }

export default function AppHeader({ discrete, ...props }: AppHeaderProps) {
  return (
    <header className={appHeaderStyles({ discrete })} {...props}>
      <div className="container mx-auto py-3 flex justify-between align-middle">
        <Typography as="h2" reverseBackground={!discrete}>
          <Link href="/">Mycelium</Link>
        </Typography>
        <Typography as="span" reverseBackground={!discrete}>
          <ThemeSwitch reverseBackground={!discrete} />
        </Typography>
      </div>
    </header>
  );
}

const themeSwitchStyles = cva("text-indigo-600 dark:text-yellow-400 text-2xl cursor-pointer", {
  variants: {
    reverseBackground: {
      true: "text-gray-50 dark:text-gray-600",
    }
  },
  defaultVariants: {
    reverseBackground: false,
  },
});

interface ThemeSwitchProps extends BaseProps, VariantProps<typeof themeSwitchStyles> { }

function ThemeSwitch({ reverseBackground }: ThemeSwitchProps) {
  const theme = useThemeMode();

  return (
    <div
      onClick={() => theme.setMode(theme.mode === "dark" ? "light" : "dark")}
      className={themeSwitchStyles({ reverseBackground })}
    >
      <CgDarkMode />
    </div>
  )
}
