"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { time } from "motion";

export async function updateuser(data) { // this will be our server action and this will take sime data as input

    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique(
        {
            where: {
                clerkUserId: userId,
            }
        }
    )

    if (!user) {
        throw new Error("User not found");
    }

    try {
        const result = await db.$transaction(
            async (tx) => {
                //Find if the industr exists ?
                let industryInsight = await tx.industryInsight.findUnique({
                    where: {
                        industry: data.industry
                    }
                });

                //Industry exist nahi kerti hai then create it with drfault value - will replace this later with ai 
                if (!industryInsight) {
                    industryInsight = await tx.industryInsight.create({
                        data: {
                            industry: data.industry,
                            salaryRanges: [],
                            growthRates: 0,
                            demandLevel: 'Medium',
                            topSkills: [],
                            marketOutlook: 'Neutral',
                            keyTrends: [],
                            recommendedSkills: [],
                            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // next update in 7 days

                        }
                    })
                }



                //update the user 
                        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });
        return {updatedUser, industryInsight};
            },
            {
                timeout: 10000, // 10 seconds timeout
            }

        )

    } catch (error) {

    }
}

export async function getUserOnboardingStatus(){
        const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique(
        {
            where: {
                clerkUserId: userId,
            }
        }
    )

    if (!user) {
        throw new Error("User not found");
    }
  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });
        return {
      isOnboarded: !!user?.industry,
    };
  }  catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}