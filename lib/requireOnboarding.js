import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";

export async function requireOnboarding() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: { isOnboarded: true },
  });

  if (!user?.isOnboarded) {
    redirect("/onboarding");
  }

  return user;
}