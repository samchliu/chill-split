"use server";

import prisma from "@/lib/db";
import { redirect, notFound } from "next/navigation";

type GroupData = {
  name: string;
  picture: string;
  creatorId: string;
  users: {
    name: string;
    picture: string;
  }[];
};

export async function createGroup(groupData: GroupData) {
  const group = await prisma.group.create({
    data: {
      name: groupData.name,
      picture: groupData.picture,
      creator: { connect: { id: groupData.creatorId } },
      groupUsers: {
        create: groupData.users.map((item) => ({
          user: { create: item },
        })),
      },
    },
  });

  redirect(`/group/${group.id}`);
}

export async function getGroupById(groupId: string) {
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: {
      groupUsers: {
        select: {
          user: true,
        },
      },
      expenses: {
        select: {
          id: true,
          name: true,
          category: true,
          amount: true,
          date: true,
          note: true,
          payerId: true,
          sharers: {
            select: {
              amount: true,
              user: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
    },
  });
  if (!group) notFound();

  let sorted = {
    id: group.id,
    name: group.name,
    picture: group.picture,
    creatorId: group.creatorId,
    users: group.groupUsers.map((item) => ({
      id: item.user.id,
      name: item.user.name,
      picture: item.user.picture,
      adoptable: !Boolean(item.user.lineId),
    })),
    expenses: group.expenses.map((expense) => ({
      ...expense,
      sharers: expense.sharers.map((sharer) => ({
        id: sharer.user.id,
        amount: sharer.amount,
      })),
    })),
  };
  return sorted;
}
