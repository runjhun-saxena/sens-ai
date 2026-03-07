"use server";

import { db } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { generateAIInsights } from "./dashboard";
import { headers } from "next/headers";

async function getCurrentUserId() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user?.id;
}

export async function updateUser(data) {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    // Start a transaction to handle both operations
    const result = await db.$transaction(
      async (tx) => {
        // First check if industry exists
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,
          },
        });

        // If industry doesn't exist, create it with default values
        if (!industryInsight) {
          const insights = await generateAIInsights(data.industry);

         industryInsight = await tx.industryInsight.create({
            data: {
              industry: data.industry,
              ...insights,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
        }

        // Now update the user
const updatedUser = await tx.user.update({
  where: {
    id: user.id,
  },
  data: {
    industry: data.industry,
    experience: data.experience,
    bio: data.bio,
    skills: data.skills,
    isOnboarded: true, // 🔥 ADD THIS
  },
});

        return { updatedUser, industryInsight };
      },
      {
        timeout: 10000, // default: 5000
      }
    );

        return { success: true, ...result };

    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Failed to update user"); 

    }
}

export async function getUserOnboardingStatus() {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { isOnboarded: true },
  });

  if (!user) throw new Error("User not found");

  return {
    isOnboarded: user.isOnboarded,
  };
}