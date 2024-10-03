"use client";

import { useEffect } from "react";
import { Inter } from "next/font/google";
import liff from "@line/liff";
import { login } from "./action";
import { useRouter } from "next/navigation";
// import {
//   PlainIcon,
//   DollarSignIcon,
//   StarIcon,
//   MealIcon,
//   HeartIcon,
// } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const liffId = process.env.NEXT_PUBLIC_LIFF_ID!;
const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    async function init() {
      try {
        console.log("start liff.init()...");
        await liff.init({ liffId, withLoginOnExternalBrowser: true });
        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          const { userId, error } = await login(liff.getAccessToken()!);
          if (error) liff.login();
          router.push(`/user/${userId}`);
        }
      } catch (error) {
        if (!process.env.NEXT_PUBLIC_LIFF_ID) {
          console.info(
            "LIFF Starter: Please make sure that you provided `NEXT_PUBLIC_LIFF_ID` as an environmental variable.",
          );
        }
      }
    }

    init();
  });

  return (
    <span>loading</span>
  );
}
