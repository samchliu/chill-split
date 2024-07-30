"use server";

import prisma from "@/lib/db";
import { notFound } from "next/navigation";

export async function getUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      groupUsers: {
        select: {
          group: {
            select: {
              id: true,
              name: true,
              picture: true,
            },
          },
        },
      },
    },
  });
  if (!user) notFound();
  const sorted = { ...user, groups: user.groupUsers.map((item) => item.group) };
  return sorted;
}
