"use client";

import { IdentityProvider } from "@/types/identity-provider";
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { GoogleProvider } from "./ui/icons";
import { createUser } from "@/services/user.service";
import { createAccount } from "@/services/account.service";
import { useRouter } from "next/navigation";

export type CreationStatus = undefined | "success" | "fail";

interface IFormInput {
  email: string,
  firstName: string,
  lastName: string,
  provider: IdentityProvider,
  password?: string;
  passwordRepeat?: string;
}

type PasswordSecurityRequirements = {
  minLength: boolean;
  atLeastOneNumber: boolean;
  atLeastOneSpecialCharacter: boolean;
  atLeastOneUppercaseLetter: boolean;
};

interface Props {
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  provider: IdentityProvider;
}

export default function HandleMyceliumSignUp({
  email,
  firstName,
  lastName,
  provider,
}: Props) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [passwordState, setPasswordState] =
    useState<PasswordSecurityRequirements>({
      minLength: false,
      atLeastOneNumber: false,
      atLeastOneSpecialCharacter: false,
      atLeastOneUppercaseLetter: false,
    });
  const [passwordStateCounter, setPasswordStateCounter] = useState<number>(0);

  const {
    formState: { errors },
    handleSubmit,
    control,
    watch,
  } = useForm<IFormInput>({
    defaultValues: {
      email: email,
      firstName: firstName,
      lastName: lastName,
      provider: provider,
      password: "",
    },
  });

  const password = watch("password");

  const [userCreationStatus, setUserCreationStatus] =
    useState<CreationStatus>(undefined);

  const [accountCreationStatus, setAccountCreationStatus] =
    useState<CreationStatus>(undefined);

  useEffect(() => {
    const createdSuccessfully =
      userCreationStatus === "success" && accountCreationStatus === "success";

    if (createdSuccessfully) router.push("/profile");
  }, [userCreationStatus, accountCreationStatus]);

  useEffect(() => {
    if (provider === IdentityProvider.MYCELIUM && password) {
      checkPasswordSecurityRequirements(password);
    }
  }, [password]);

  useEffect(() => {
    const counter =
      (passwordState.minLength ? 1 : 0) +
      (passwordState.atLeastOneNumber ? 1 : 0) +
      (passwordState.atLeastOneSpecialCharacter ? 1 : 0) +
      (passwordState.atLeastOneUppercaseLetter ? 1 : 0);

    setPasswordStateCounter((counter / 4) * 100);
  }, [passwordState]);

  const checkPasswordSecurityRequirements = (password: string) => {
    const minLength = password.length >= 6;
    const atLeastOneNumber = /\d/.test(password);
    const atLeastOneSpecialCharacter =
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
    const atLeastOneUppercaseLetter = /[A-Z]/.test(password);

    setPasswordState({
      minLength,
      atLeastOneNumber,
      atLeastOneSpecialCharacter,
      atLeastOneUppercaseLetter,
    });
  };

  const onSubmit: SubmitHandler<IFormInput> = async ({
    password,
    email,
    firstName,
    lastName,
    provider,
  }: IFormInput) => {
    const trimEmail = email.trim();
    const trimFirstName = firstName.trim();
    const trimLastName = lastName.trim();
    const trimPassword = password?.trim();
    const resultPassword = trimPassword === "" ? undefined : trimPassword;

    setIsSubmitting(true);

    try {
      const resUser = await createUser(
        trimEmail,
        trimFirstName,
        trimLastName,
        resultPassword,
        provider,
      );

      if (resUser.ok || resUser.status === 409) {
        const { code } = await resUser.json();

        if (resUser.status === 409 && code !== "MYC00002") {
          throw new Error("User already exists");
        }

        setUserCreationStatus("success");

        const resAccount = await createAccount(trimEmail);

        if (resAccount.ok || resAccount.status === 409) {
          setAccountCreationStatus("success");
        }

        return;
      }
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <label>Email</label>
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <>
                <input
                  id="email"
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 my-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"
                  placeholder="email@domain.com"
                  required
                  disabled
                  {...field}
                />
                {errors?.email && <p>{errors.email.message}</p>}
              </>
            )}
          />

          <label>First Name</label>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <>
                <input
                  id="firstName"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 my-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="First name"
                  required
                  autoFocus
                  {...field}
                />
                {errors?.firstName && <p>{errors.firstName.message}</p>}
              </>
            )}
          />

          <label>Last Name</label>
          <Controller
            name="lastName"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <>
                <input
                  id="lastName"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 my-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Last name"
                  required
                  {...field}
                />
                {errors?.lastName && <p>{errors.lastName.message}</p>}
              </>
            )}
          />

          {provider !== IdentityProvider.MYCELIUM
            ? (
              <div>
                <label>Identity Provider</label>
                <div className="border border-neutral-500 rounded-lg p-2 mt-2">
                  {matchProvider(provider)}
                </div>
              </div>
            ) : (
              <>
                <label>Password</label>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true, minLength: 6 }}
                  render={({ field }) => (
                    <input
                      id="password"
                      type="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 my-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      {...field}
                    />
                  )}
                />
                {errors?.password && <p>{errors.password.message}</p>}

                <div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{
                        width: passwordStateCounter + "%",
                        transition: "width 0.2s ease-in-out",
                      }}
                    />
                  </div>
                  <ul className="my-5">
                    <li
                      className="text-sm text-neutral-700 dark:text-neutral-300 ml-2"
                      style={{
                        color: passwordState.minLength ? "green" : "",
                      }}
                    >
                      At least 6 characters
                    </li>
                    <li
                      className="text-sm text-neutral-700 dark:text-neutral-300 ml-2"
                      style={{
                        color: passwordState.atLeastOneNumber ? "green" : "",
                      }}
                    >
                      At least one number
                    </li>
                    <li
                      className="text-sm text-neutral-700 dark:text-neutral-300 ml-2"
                      style={{
                        color: passwordState.atLeastOneSpecialCharacter
                          ? "green"
                          : "",
                      }}
                    >
                      At least one special character
                    </li>
                    <li
                      className="text-sm text-neutral-700 dark:text-neutral-300 ml-2"
                      style={{
                        color: passwordState.atLeastOneUppercaseLetter
                          ? "green"
                          : "",
                      }}
                    >
                      At least one uppercase letter
                    </li>
                  </ul>
                </div>

                <label>Repeat Password</label>
                <Controller
                  name="passwordRepeat"
                  control={control}
                  rules={{
                    required: true,
                    validate: (value) =>
                      value === password || "The passwords do not match",
                  }}
                  render={({ field }) => (
                    <input
                      id="passwordRepeat"
                      type="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 my-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      {...field}
                    />
                  )}
                />
                {errors?.passwordRepeat && <p>{errors.passwordRepeat.message}</p>}
              </>
            )}

          {isSubmitting ? (
            <Spinner />
          ) : (
            <>
              {errors.email === undefined &&
                errors.firstName === undefined &&
                errors.lastName === undefined && (
                  <input
                    type="submit"
                    value="Send"
                    className="px-4 py-2 mt-12 w-full rounded-lg border hover:cursor-pointer"
                  />
                )}
            </>
          )}
        </form>
      </div>
    </>
  )
}

function matchProvider(provider: IdentityProvider) {
  switch (provider) {
    case IdentityProvider.GOOGLE:
      return <GoogleProvider />;
    default:
      return <></>;
  }
}
