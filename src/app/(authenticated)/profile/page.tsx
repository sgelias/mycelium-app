"use client";

import useMemoizedPermissions from "@/hooks/use-memoized-permissions";
import { usePathname } from "next/navigation";

interface Props { }

export default function Page({ }: Props) {
  const pathName = usePathname();
  const { profile } = useMemoizedPermissions({ forceRedirect: true, pathName });

  return (
    <div className="container mx-auto p-4 flex justify-between">
      <pre>
        {JSON.stringify(profile, null, 2)}
      </pre>
    </div>
  );
}
