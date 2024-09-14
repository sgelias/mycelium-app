import AppHeader from "@/components/ui/AppHeader";
import Container from "@/components/ui/Container";
import Sidebar from "@/components/ui/Sidebar";

export default function AuthenticatedLayout({ children }: BaseProps) {
  return (
    <div className="flex max-h-screen overflow-hidden">
      <Sidebar />
      <Container>
        <AppHeader discrete />
        {children}
      </Container>
    </div>
  );
}
