import { redirect } from "next/navigation";
import { getUserOnboardingStatus } from "@/actions/user";
import DashboardView from "./_components/dashboardView";
import { getIndustryInsights } from "@/actions/dashboard";
const IndustryInsights =async () => {
  
    const { isOnboarded } = await getUserOnboardingStatus();
  
    if(!isOnboarded){
      redirect('/onboarding')
    }

  const insights =await getIndustryInsights();
  return (
    <div className="container mx-auto">
       <DashboardView insights={insights} />
    </div>
  )
}

export default IndustryInsights
