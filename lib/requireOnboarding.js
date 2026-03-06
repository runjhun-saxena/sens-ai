import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import { headers } from "next/headers";

export async function requireOnboarding() {
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { isOnboarded: true },
  });

  if (!user?.isOnboarded) {
    redirect("/onboarding");
  }

  return user;
}