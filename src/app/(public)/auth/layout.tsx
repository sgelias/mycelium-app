export default function AuthLayout({ children }: BaseProps) {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="border-2 rounded-xl min-h-[60vh] p-8">
          <h1 className="text-2xl text-neutral-500 mb-5">Public Zone</h1>
          {children}
        </div>
      </main>
    </div>
  );
}
