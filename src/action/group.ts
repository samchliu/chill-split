"use server";

import prisma from "@/lib/db";
import { redirect } from "next/navigation";

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
