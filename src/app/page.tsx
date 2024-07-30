"use client";

import { useEffect } from "react";
import { Inter } from "next/font/google";
import liff from "@line/liff";
import { login } from "@/action/login";
import { useRouter } from "next/navigation";
import {
  PlainIcon,
  DollarSignIcon,
  StarIcon,
  MealIcon,
  HeartIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const liffId = process.env.NEXT_PUBLIC_LIFF_ID!;
const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    async function init() {
      try {
        console.log("start liff.init()...");
        await liff.init({ liffId });
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
    <main className="[&>div]:flex-center grid h-[225vw] grid-cols-4 grid-rows-9 overflow-hidden">
      <div className="bg-brand-yellow"></div>
      <div className="bg-brand-green">
        <PlainIcon className="scale-90 fill-primary" />
      </div>
      <div className="bg-primary">
        <div className="flex-center h-full w-full rounded-full bg-brand-yellow">
          <DollarSignIcon className="scale-[0.7] fill-primary" />
        </div>
      </div>
      <div className="bg-brand-green"></div>
      <div className="bg-brand-orange"></div>
      <div className="bg-brand-yellow"></div>
      <div className="bg-brand-orange"></div>
      <div className="bg-primary">
        <StarIcon className="-rotate-45 fill-brand-green" />
      </div>
      <div className="bg-primary">
        <div className="flex-center h-full w-full rounded-full bg-brand-yellow">
          <DollarSignIcon className="scale-[0.7] fill-brand-orange" />
        </div>
      </div>
      <div className="col-span-3 row-span-1 bg-brand-pink text-4xl font-black tracking-wider">
        <span className={cn("text-[2.625rem]", inter.className)}>CHILL</span>
        <span>後算帳</span>
      </div>
      <div className="bg-brand-orange">
        <MealIcon className="scale-[0.8] fill-brand-yellow" />
      </div>
      <div className="bg-brand-yellow"></div>
      <div className="bg-brand-orange"></div>
      <div className="bg-brand-yellow">
        <HeartIcon className="scale-95 fill-brand-green" />
      </div>
      <div className="bg-primary"></div>
      <div className="bg-brand-green">
        <PlainIcon className="rotate-90 scale-90 fill-brand-yellow" />
      </div>
      <div className="bg-brand-yellow"></div>
      <div className="bg-brand-green"></div>
      <div
        className={cn(
          "col-span-3 row-span-1 bg-brand-pink text-2xl font-bold tracking-wide",
          inter.className,
        )}
      >
        Chill Trips, Easy Splites.
      </div>
      <div className="bg-primary">
        <DollarSignIcon className="scale-[0.7] fill-brand-green" />
      </div>
      <div className="bg-brand-green"></div>
      <div className="bg-brand-orange"></div>
      <div className="bg-primary">
        <StarIcon className="-rotate-45 fill-brand-yellow" />
      </div>
      <div className="bg-brand-orange"></div>
      <div className="bg-brand-orange">
        <HeartIcon className="scale-95 fill-primary" />
      </div>
      <div className="bg-brand-yellow">
        <DollarSignIcon className="scale-[0.7] fill-brand-green" />
      </div>
      <div className="bg-brand-orange">
        <MealIcon className="scale-[0.8] fill-brand-green" />
      </div>
      <div className="bg-primary">
        <div className="flex-center h-full w-full rounded-full bg-brand-yellow">
          <DollarSignIcon className="scale-[0.7] fill-brand-orange" />
        </div>
      </div>
      <div className="bg-brand-yellow"></div>
      <div className="bg-brand-green"></div>
      <div className="bg-primary"></div>
      <div className="bg-brand-green"></div>
    </main>
  );
}
