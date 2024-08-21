"use client";

import Card from "@/components/ui/Card";
import useMemoizedPermissions from "@/hooks/use-memoized-permissions";
import { usePathname } from "next/navigation";

interface Props { }

export default function Page({ }: Props) {
  const pathName = usePathname();
  const { profile } = useMemoizedPermissions({ forceRedirect: true, pathName });

  return profile && (
    <div className="container mx-auto p-4 flex gap-3 justify-start h-[92vh]">
      <Card>
        <Card.Header>
          Account Owner's
        </Card.Header>

        <Card.Body>
          {profile?.owners?.map((owner, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span>{owner.firstName}</span>
              <span>{owner.lastName}</span>
              <span>({owner.username})</span>
            </div>
          ))}
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          Invitations
        </Card.Header>

        <Card.Body>
          <pre>
            {JSON.stringify(profile, null, 2)}
          </pre>
        </Card.Body>
      </Card>
    </div>
  );
}
