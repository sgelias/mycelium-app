import Container from "@/components/ui/Container";

export default function AuthLayout({ children }: BaseProps) {
  return (
    <Container>
      <div className="flex w-fit m-auto p-5 min-h-[80vh] justify-center items-center">
        <Container.Box>
          {children}
        </Container.Box>
      </div>
    </Container>
  );
}
