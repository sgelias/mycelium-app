"use client";

import { cva } from "class-variance-authority";
import AppHeader from "@/components/ui/AppHeader";
import Container from "@/components/ui/Container";
import { GoogleProvider } from "@/components/ui/icons";
import Typography from "@/components/ui/Typography";
import Link from "next/link";
import { IdentityProvider } from "@/types/identity-provider";
import Divider from "@/components/ui/Divider";
import signInWith from "@/functions/sign-in-with";
import { useSession } from "next-auth/react";

const signStyles = cva("w-full text-4xl border-2 border-white p-12 rounded-full dark:bg-slate-800 bg-slate-50 hover:bg-indigo-700 text-gray-800 dark:text-white hover:text-white hover:cursor-pointer", {
  variants: {
    flex: {
      true: "flex items-center justify-center gap-4",
    },
  },
  defaultVariants: {
  },
});

export default function Home() {
  const { status } = useSession();

  return (
    <Container>
      <AppHeader discrete />

      <section id="welcome" className="text-center min-h-[50vh] py-20">
        <Typography as="title" padding="lg">Welcome to Mycelium</Typography>
        <Typography>
          Mycelium is a API Gateway and Identity Provider for your applications
        </Typography>
      </section>

      <section id="sign" className="bg-indigo-500 dark:bg-indigo-700 min-h-[50vh] p-12 text-center">
        <Typography as="h2" reverseBackground>Identify yourself</Typography>

        <div className="flex flex-col justify-center items-center gap-12 my-8 mx-auto max-w-lg min-w-max">

          {status === "authenticated" ? (
            <Link
              href="/profile"
              className={signStyles({})}
            >
              My Mycelium Profile
            </Link>
          ) : (
            <>
              <Link
                href="/auth/sign-up"
                className={signStyles({})}
              >
                Sign-up to Mycelium
              </Link>

              <Divider orOption />

              <div
                onClick={() => signInWith(IdentityProvider.MYCELIUM)}
                className={signStyles({ flex: true })}
              >
                Sign-in with Mycelium
              </div>

              <div
                onClick={() => signInWith(IdentityProvider.GOOGLE)}
                className={signStyles({ flex: true })}
              >
                Sign-in with <GoogleProvider size="lg" />
              </div>
            </>
          )}
        </div>
      </section>

      <section id="features" className="min-h-[50vh] flex flex-col justify-center text-center gap-12">
        Functionalities
      </section>
    </Container>
  );
}
