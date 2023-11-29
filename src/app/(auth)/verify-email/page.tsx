"use client";

import VerifyEmail from "@/components/VerifyEmail";
import { trpc } from "@/trpc/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const VerifyEmailPage = ({ searchParams }: PageProps) => {
  const token = searchParams.token;
  const toEmail = searchParams.to;
  const router = useRouter();

  const { data } = trpc.auth.emailVerified.useQuery({ email: toEmail });

  useEffect(() => {
    if (toEmail && typeof toEmail === "string") {
      if (data?.success) {
        toast.success("Email verified! You can now sign in.");
        router.push("/sign-in");
        return;
      } else {
        console.log("not verified");
      }

      document.addEventListener("visibilitychange", (event) => {
        if (document.visibilityState == "visible") {
          if (data?.success) {
            toast.success("Email verified! You can now sign in.");
            router.push("/sign-in");
            return;
          } else {
            console.log("not verified");
          }
        }
      });
    }
  });

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {token && typeof token === "string" ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
              <Image
                src="/hippo-email-sent.png"
                fill
                alt="hippo email sent image"
                priority
                sizes="100%"
              />
            </div>

            <h3 className="font-semibold text-2xl">Check your email</h3>

            {toEmail ? (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verification link to{" "}
                <span className="font-semibold">{toEmail}</span>.
              </p>
            ) : (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verification link to your email.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
