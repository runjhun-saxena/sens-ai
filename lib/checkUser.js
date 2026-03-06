import { auth } from "./auth";
import { db } from "./prisma";
import { headers } from "next/headers";

export const checkUser = async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
      return null;
    }

    const user = session.user;
    
    // Check if user already exists in database
    const loggedInUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    // Create new user if doesn't exist
    const newUser = await db.user.create({
      data: {
        id: user.id,
        name: user.name,
        image: user.image,
        email: user.email,
        emailVerified: user.emailVerified || false,
      },
    });

    return newUser;
  } catch (error) {
    console.log("checkUser error:", error.message);
    return null;
  }
};