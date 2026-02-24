import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Homepage } from './components/pages/Homepage'
import { LoginPage } from './components/pages/LoginPage'
import { RegisterPage } from './components/pages/RegisterPage'
import { CourseIntroPage } from './components/pages/CourseIntroPage'
import { PreTestPage } from './components/pages/PreTestPage'
import { CurriculumDetailsPage } from './components/pages/CurriculumDetailsPage'
import AdminRoutes from './components/admin/AdminRoutes'
import { LearnerDashboard } from './components/customer/mylearningTab/LearnerDashboard'
import { CourseLearningPage } from './components/customer/mylearningTab/CourseLearningPage'
import { UserProfilePage } from './components/customer/mylearningTab/UserProfilePage'

//



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element = {<Homepage/>}/>
      <Route path='/login' element = {<LoginPage/>}/>
      <Route path='/register' element = {<RegisterPage/>}/>
      <Route path='/course/:courseId' element={<CourseIntroPage />} />
      <Route path='/course/:courseId/pretest' element={<PreTestPage />} />
      <Route path='/curriculum/:curriculumId' element={<CurriculumDetailsPage />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/mylearning" element={<LearnerDashboard />} />
       <Route path="/learn/:courseId" element={<CourseLearningPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
      
      
      

    </Routes>
    </>
  )
}

export default App
