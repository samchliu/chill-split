"use server";

import prisma from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import { headers } from "next/headers";

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
  const users = await prisma.user.createManyAndReturn({
    data: groupData.users,
  });
  const userIds = [groupData.creatorId, ...users.map((user) => user.id)];
  const group = await prisma.group.create({
    data: {
      name: groupData.name,
      picture: groupData.picture,
      creator: { connect: { id: groupData.creatorId } },
      groupUsers: {
        create: userIds.map((userId) => ({
          user: { connect: { id: userId } },
        })),
      },
    },
  });

  redirect(`/group/${group.id}`);
}

export async function getGroupById(groupId: string) {
  const clientId = headers().get("client-id")!;
  const groupUser = await prisma.groupUser.findUnique({
    where: {
      groupId_userId: {
        groupId: groupId,
        userId: clientId,
      },
    },
  });
  if (!groupUser) notFound();

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

  let sortedGroup = {
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
  return { userId: clientId, group: sortedGroup };
}
