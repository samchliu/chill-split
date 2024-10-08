'use server';

import prisma from '@/lib/db';
import { notFound, redirect } from 'next/navigation';

export async function fetchUser(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      groupMembers: {
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
  const sorted = {
    ...user,
    groups: user.groupMembers.map((item) => item.group),
  };
  return sorted;
}

export async function createGroup(group: {
  name: string;
  picture: string;
  adminId: string;
  members: { name: string; avatar: string }[];
}) {
  const tempUsers = await prisma.user.createManyAndReturn({
    data: group.members,
  });
  const memberIds = tempUsers.map((user) => user.id).concat([group.adminId]);
  const newGroup = await prisma.group.create({
    data: {
      name: group.name,
      picture: group.picture,
      groupAdmins: {
        create: { userId: group.adminId },
      },
      groupMembers: {
        create: memberIds.map((id) => ({ user: { connect: { id } } })),
      },
    },
  });
  redirect(`/group/${newGroup.id}`);
}
