import Typography from "@/components/ui/Typography";

export default function Home() {
  return (
    <main>
      <section id="welcome" className="text-center p-12">
        <Typography as="h1">Welcome to Mycelium</Typography>
        <Typography>
          Mycelium is a API Gateway and Identity Provider for your applications
        </Typography>
      </section>
    </main>
  );
}
