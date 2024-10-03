"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import prisma from "@/lib/db";
import { encrypt } from "@/lib/jwt";

const clientId = process.env.LINE_CHANNEL_ID!;
const userProfileSchema = z.object({
  userId: z.string(),
  displayName: z.string(),
  pictureUrl: z.string().url(),
});

export async function login(accessToken: string) {
  try {
    const accessTokenVerifyResponse = await fetch(
      `https://api.line.me/oauth2/v2.1/verify?access_token=${accessToken}`,
    );
    const { client_id, expires_in } = await accessTokenVerifyResponse.json();
    if (clientId === undefined) {
      throw new Error(
        "Please make sure that you provided `LINE_CHANNEL_ID` as an environmental variable.",
      );
    }
    if (client_id !== clientId || expires_in < 0) throw new Error();

    const getUserProfileResponse = await fetch(
      `https://api.line.me/v2/profile`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const getUserProfileResponseBody = await getUserProfileResponse.json();
    const userProfile = userProfileSchema.parse(getUserProfileResponseBody);

    const user = await prisma.user.upsert({
      where: { lineId: userProfile.userId },
      update: {},
      create: {
        lineId: userProfile.userId,
        name: userProfile.displayName,
        picture: userProfile.pictureUrl,
      },
    });

    cookies().set({
      name: "CHILL_SPLIT_TOKEN",
      value: await encrypt({ client_id: user.id }),
      expires: new Date(Date.now() + 900 * 1000),
      // httpOnly: true,
    });
    return { userId: user.id };
  } catch {
    return { error: "Unauthorized" };
  }
}
