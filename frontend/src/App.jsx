import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import { ToastProvider } from './hooks/useToast'
import ScrollToTop from './components/ScrollToTop'

import PublicLayout from './layouts/PublicLayout'
import DashboardLayout from './layouts/DashboardLayout'

import Landing from './pages/public/Landing'
import About from './pages/public/About'
import HowItWorks from './pages/public/HowItWorks'
import Institutions from './pages/public/Institutions'
import Industry from './pages/public/Industry'
import InternshipsPublic from './pages/public/InternshipsPublic'
import Research from './pages/public/Research'
import TechnologiesPublic from './pages/public/TechnologiesPublic'
import Login from './pages/public/Login'
import Register from './pages/public/Register'

import Dashboard from './pages/shared/Dashboard'
import Notifications from './pages/shared/Notifications'
import Profile from './pages/shared/Profile'
import Settings from './pages/shared/Settings'
import Analytics from './pages/shared/Analytics'

import SkillProfile from './pages/student/SkillProfile'
import SkillMapping from './pages/student/SkillMapping'
import SkillAssessment from './pages/student/SkillAssessment'
import SkillGapAnalysis from './pages/student/SkillGapAnalysis'
import AICareerMatch from './pages/student/AICareerMatch'
import LearningRecommendations from './pages/student/LearningRecommendations'
import MentorshipProjects from './pages/student/MentorshipProjects'
import DigitalPortfolio from './pages/student/DigitalPortfolio'
import InternshipMarketplace from './pages/student/InternshipMarketplace'
import InternshipDetail from './pages/student/InternshipDetail'
import MyApplications from './pages/student/MyApplications'
import Placement from './pages/student/Placement'

import IndustryOpportunities from './pages/industry/IndustryOpportunities'

import InstitutionStudents from './pages/institution/InstitutionStudents'
import InstitutionSkillAnalytics from './pages/institution/InstitutionSkillAnalytics'

import RndChallenges from './pages/rnd/RndChallenges'
import RndChallengeDetail from './pages/rnd/RndChallengeDetail'
import CollaborationList from './pages/rnd/CollaborationList'
import CollaborationDetail from './pages/rnd/CollaborationDetail'

import TechnologyMarketplace from './pages/technology/TechnologyMarketplace'
import TechnologyDetail from './pages/technology/TechnologyDetail'
import Licensing from './pages/technology/Licensing'

import AdminEntityTable from './pages/admin/AdminEntityTable'
import AdminVerification from './pages/admin/AdminVerification'

import NotFound from './pages/shared/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <ScrollToTop />
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/institutions" element={<Institutions />} />
              <Route path="/industry" element={<Industry />} />
              <Route path="/internships" element={<InternshipsPublic />} />
              <Route path="/research" element={<Research />} />
              <Route path="/technologies" element={<TechnologiesPublic />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/analytics" element={<Analytics />} />

              <Route path="/skill-profile" element={<SkillProfile />} />
              <Route path="/skill-mapping" element={<SkillMapping />} />
              <Route path="/skill-assessment" element={<SkillAssessment />} />
              <Route path="/skill-gap-analysis" element={<SkillGapAnalysis />} />
              <Route path="/ai-career-match" element={<AICareerMatch />} />
              <Route path="/learning-recommendations" element={<LearningRecommendations />} />
              <Route path="/mentorship-projects" element={<MentorshipProjects />} />
              <Route path="/digital-portfolio" element={<DigitalPortfolio />} />
              <Route path="/marketplace/internships" element={<InternshipMarketplace />} />
              <Route path="/marketplace/internships/:id" element={<InternshipDetail />} />
              <Route path="/applications" element={<MyApplications />} />
              <Route path="/placement" element={<Placement />} />

              <Route path="/opportunities" element={<IndustryOpportunities />} />

              <Route path="/institution/students" element={<InstitutionStudents />} />
              <Route path="/institution/skill-analytics" element={<InstitutionSkillAnalytics />} />

              <Route path="/rnd" element={<RndChallenges />} />
              <Route path="/rnd/:id" element={<RndChallengeDetail />} />
              <Route path="/collaboration" element={<CollaborationList />} />
              <Route path="/collaboration/:id" element={<CollaborationDetail />} />

              <Route path="/technology-marketplace" element={<TechnologyMarketplace />} />
              <Route path="/technology-marketplace/:id" element={<TechnologyDetail />} />
              <Route path="/licensing" element={<Licensing />} />

              <Route path="/admin/verification" element={<AdminVerification />} />
              <Route path="/admin/:entity" element={<AdminEntityTable />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
