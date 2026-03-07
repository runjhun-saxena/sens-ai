import { getUserOnboardingStatus } from "@/actions/user";
import OnboardingForm from "./_components/onboardingForm";
import { industries } from "@/data/industries";
import { redirect } from "next/navigation";

const OnboardingPage = async () => {
  const { isOnboarded } = await getUserOnboardingStatus();

  if (isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <main>
      <OnboardingForm industries={industries} />
    </main>
  );
};

export default OnboardingPage;