export default function AuthenticatedLayout({ children }: BaseProps) {
  return (
    <div>
      <h1 className="text-2xl text-neutral-500 mb-5">Authenticated Zone</h1>
      {children}
    </div>
  );
}
