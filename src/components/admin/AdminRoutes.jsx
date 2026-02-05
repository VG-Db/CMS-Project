import { Routes,Route } from "react-router-dom"
import AdminLayout from "./AdminLayout"
import AdminDashboard from "./AdminDashboard"
import { UserManagementPage } from "./UserManagementPage"
import { CertificationManagementPage } from "./CertificationManagementPage"
import { EnrollmentManagementPage } from "./EnrollmentManagementPage"
import { CourseManagementPage } from "./CourseManagementPage"
import { SettingsPage } from "./SettingsPage"

// import { AdminBookings } from "./AdminBookings"
// import { ManageAdmin } from "./ManageAdmin"
// import { ManageCategories } from "./ManageCategories"
// import { ManageCabs } from "./ManageCabs"



const AdminRoutes = () => {
  return (
    <div>
       <Routes>
       <Route path="/" element={<AdminLayout/>}>
        <Route index element={<AdminDashboard />} />
       <Route path="dashboard" element={<AdminDashboard />} />
       <Route path="users" element={<UserManagementPage />} />
        <Route path="certifications" element={<CertificationManagementPage />} />
        <Route path="enrollments" element={<EnrollmentManagementPage />} />
        <Route path="courses" element={<CourseManagementPage />} />
        <Route path="settings" element={<SettingsPage  />} />

       {/* <Route path="admins" element={<ManageAdmin />} />
       <Route path="categories" element={<ManageCategories />} />
       <Route path="cabs" element={<ManageCabs />} />  */}

       
       </Route>

       </Routes>
    </div>
  )
}

export default AdminRoutes
