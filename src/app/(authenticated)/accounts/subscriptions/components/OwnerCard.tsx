import { Account, Email } from "@/types/accounts";
import { MyceliumEmail } from "@/types/mycelium-email";

export default function OwnerCard({ owners }: { owners: Account["owners"] }) {
  const formatEmail = (email: Email) => {
    return MyceliumEmail.fromEmailInterface(email).toString();
  }

  return (
    <div className="flex flex-wrap gap-2">
      {owners?.records?.map((owner, index) => (
        <div key={index}>
          <div className="font-bold">{owner.firstName} {owner.lastName}</div>
          <div className="text-slate-500">{formatEmail(owner.email)}</div>
        </div>
      ))}
    </div>
  )
}
