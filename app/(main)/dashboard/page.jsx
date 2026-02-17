import { redirect } from "next/navigation";
import { getUserOnboardingStatus } from "@/actions/user";
import DashboardView from "./_components/dashboardView";
import { getIndustryInsights } from "@/actions/dashboard";
import { requireOnboarding } from "@/lib/requireOnboarding";
const IndustryInsights =async () => {
  
  await requireOnboarding();

  const insights =await getIndustryInsights();
  return (
    <div className="container mx-auto">
       <DashboardView insights={insights} />
    </div>
  )
}

export default IndustryInsights
