import { DarkThemeToggle } from "flowbite-react";

export default function AppHeader() {
  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto p-4 flex justify-between">
        <h1 className="text-3xl font-bold">Mycelium</h1>
        <DarkThemeToggle className="flex gap-3" />
      </div>
    </header>
  );
}
