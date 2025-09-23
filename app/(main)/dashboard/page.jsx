import { redirect } from "next/navigation";
import { getUserOnboardingStatus } from "@/actions/user";
const IndustryInsights =async () => {
  
    const { isOnboarded } = await getUserOnboardingStatus();
  
    if(!isOnboarded){
      redirect('/onboarding')
    }
  return (
    <div>
      Industry Insights
    </div>
  )
}

export default IndustryInsights
