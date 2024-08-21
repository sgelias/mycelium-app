import AppHeader from "@/components/ui/AppHeader";
import Container from "@/components/ui/Container";
import { GoogleProvider } from "@/components/ui/icons";
import Typography from "@/components/ui/Typography";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <AppHeader discrete />

      <section id="welcome" className="text-center min-h-[50vh] py-20">
        <Typography as="title" padding="lg">Welcome to Mycelium</Typography>
        <Typography>
          Mycelium is a API Gateway and Identity Provider for your applications
        </Typography>
      </section>

      <section id="sign" className="bg-indigo-700 min-h-[50vh] flex flex-col justify-center text-center items-center gap-12 p-12">
        <Typography as="h2" reverseBackground>Identify yourself</Typography>

        <Link
          href="/auth/sign-up"
          className="max-w-lg min-w-max text-4xl border-2 border-white p-12 rounded-full bg-gray-800 hover:bg-indigo-700 text-white hover:text-white"
        >
          Sign-up to Mycelium
        </Link>

        <Link
          href="/auth/sign-in/oauth2/google"
          className="max-w-lg min-w-max text-4xl border-2 border-white p-12 rounded-full bg-gray-800 hover:bg-indigo-700 text-white hover:text-white flex items-center justify-center gap-4"
        >
          Sign-in with <GoogleProvider size="lg" />
        </Link>
      </section>

      <section id="features" className="min-h-[50vh] flex flex-col justify-center text-center gap-12">
        Functionalities
      </section>
    </Container>
  );
}
