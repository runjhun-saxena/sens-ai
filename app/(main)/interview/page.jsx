import React from 'react'
import { getAssessments } from '@/actions/interview';
import QuizList from './_components/quizList';
import StatsCards from './_components/statsCard';
const InterviewPage = async() => {

  const assessments = await getAssessments();
  const PerformanceChart = dynamic(() => import('./_components/performanceChart'), { ssr: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold gradient-title text-5xl md:text-6xl">
      Interview Preperation
        </h1>
        
      </div>
      <div className="space-y-6">
        <StatsCards assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
    </div>
  );
}

export default InterviewPage;
