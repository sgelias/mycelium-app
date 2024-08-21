import AppHeader from "@/components/ui/AppHeader";

export default function PublicLayout({ children }: BaseProps) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}
