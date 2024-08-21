"use client";

import { usePathname, useRouter } from "next/navigation";
import { checkEmailStatus } from "@/services/email.service";
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { TextInput } from "flowbite-react";
import Button from "./ui/Button";

interface IFormInput {
  email: string
}

interface Props { }

export default function EmailHandler({ }: Props) {
  const router = useRouter();
  const pathName = usePathname();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const status = await checkEmailStatus(data.email.trim());
    console.log(status);

    if (!status) {
      alert("Email is possible invalid. Please try again.");
      return;
    }

    const {
      notRegistered,
      registeredAndInternal,
      registeredButExternal,
    } = status;

    if (notRegistered) {
      router.push(`${pathName}/sign-up?email=${notRegistered}`);
      return;
    }

    if (registeredAndInternal) {
      router.push(`${pathName}/sign-in/password?email=${registeredAndInternal.email.toString()}`);
      return;
    }

    if (registeredButExternal) {
      const external = registeredButExternal.provider?.external;

      if (external && external.toLowerCase().indexOf("google") >= 0) {
        router.push(`${pathName}/sign-in/oauth2/google`);
        return;
      }

      router.push(`${pathName}/sign-in/oauth2`);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextInput type="email" {...field} />
        )}
      />

      <Button fullWidth>Check email</Button>
    </form>
  );
}
