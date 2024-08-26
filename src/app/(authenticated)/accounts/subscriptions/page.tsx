import Head from "./head";

interface Props { }

export default function Page({ }: Props) {
  return (
    <div className="container mx-auto py-4 flex gap-3 h-[92vh]">
      <Head />
      <h1>Subscriptions</h1>
    </div>
  )
}
