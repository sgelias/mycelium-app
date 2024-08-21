import AppHeader from "@/components/ui/AppHeader";
import Sidebar from "@/components/ui/Sidebar";

export default function AuthenticatedLayout({ children }: BaseProps) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full bg-neutral-200 dark:bg-neutral-800">
        <AppHeader discrete />
        {children}
      </div>
    </div>
  );
}
