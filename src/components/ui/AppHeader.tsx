"use client";

import { DarkThemeToggle, useThemeMode } from "flowbite-react";
import Typography from "./Typography";
import { useEffect } from "react";

export default function AppHeader() {
  const theme = useThemeMode();

  useEffect(() => { theme }, [theme]);

  return (
    <header className="bg-indigo-800 dark:text-white">
      <div className="container mx-auto p-4 flex justify-between">
        <Typography as="h1" reverseBackground>Mycelium</Typography>
        <Typography as="span" reverseBackground>
          <DarkThemeToggle className="flex gap-3 text-2xl text-gray-300 dark:text-gray-200" />
        </Typography>
      </div>
    </header>
  );
}
