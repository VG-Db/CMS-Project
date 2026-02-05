import React, { useEffect, useMemo, useState, Component } from 'react'
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  BookOpen,
  User,
  Calendar,
  ChevronDown,
  Download,
  FileText,
  X,
  Check,
  AlertCircle,
  Shield,
  GraduationCap,
  Mail,
} from 'lucide-react'
// --- Types ---
type CurriculumType = 'upc' | 'utc' | 'urc'
type EnrollmentStatus = 'active' | 'completed' | 'dropped'
type ApplicationStatus = 'pending' | 'approved' | 'rejected'
interface UserInfo {
  id: string
  name: string
  email: string
  avatar: string
  country: string
  registrationDate: string
  organization: string
  jobTitle: string
}
interface Enrollment {
  id: string
  programName: string
  courseCode: string
  curriculum: CurriculumType
  enrollmentDate: string
  progress: number
  lastActive: string
  status: EnrollmentStatus
}
interface UserWithEnrollments {
  user: UserInfo
  enrollments: Enrollment[]
  totalCourses: number
  activeCourses: number
  completedCourses: number
  lastActivity: string
}
interface PendingEnrollment {
  id: string
  user: UserInfo
  programName: string
  courseCode: string
  curriculum: CurriculumType
  requestDate: string
  prerequisitesMet: boolean
  statementOfInterest: string
  status: ApplicationStatus
}
// --- Mock Data ---
const mockUsersWithEnrollments: UserWithEnrollments[] = [
  {
    user: {
      id: 'u1',
      name: 'Sarah Jenkins',
      email: 'sarah.j@example.com',
      avatar: 'SJ',
      country: 'UK',
      registrationDate: 'Feb 2024',
      organization: 'NHS Foundation Trust',
      jobTitle: 'Clinical Nurse Specialist',
    },
    enrollments: [
      {
        id: 'e1',
        programName: 'Introduction to Prevention',
        courseCode: 'UPC 1',
        curriculum: 'upc',
        enrollmentDate: '2025-01-15',
        progress: 45,
        lastActive: '2 hours ago',
        status: 'active',
      },
      {
        id: 'e2',
        programName: 'Treatment for SUD',
        courseCode: 'UTC 2',
        curriculum: 'utc',
        enrollmentDate: '2025-01-10',
        progress: 78,
        lastActive: '1 hour ago',
        status: 'active',
      },
      {
        id: 'e3',
        programName: 'The PEER Model',
        courseCode: 'URC 1',
        curriculum: 'urc',
        enrollmentDate: '2024-12-20',
        progress: 100,
        lastActive: '3 days ago',
        status: 'completed',
      },
    ],
    totalCourses: 3,
    activeCourses: 2,
    completedCourses: 1,
    lastActivity: '1 hour ago',
  },
  {
    user: {
      id: 'u2',
      name: 'Michael Chen',
      email: 'm.chen@example.com',
      avatar: 'MC',
      country: 'Singapore',
      registrationDate: 'Mar 2024',
      organization: 'Singapore Anti-Narcotics Association',
      jobTitle: 'Counsellor',
    },
    enrollments: [
      {
        id: 'e4',
        programName: 'Basic Counselling Skills',
        courseCode: 'UTC 4',
        curriculum: 'utc',
        enrollmentDate: '2025-01-10',
        progress: 12,
        lastActive: '1 day ago',
        status: 'active',
      },
      {
        id: 'e5',
        programName: 'Introduction to Prevention',
        courseCode: 'UPC 1',
        curriculum: 'upc',
        enrollmentDate: '2024-11-05',
        progress: 100,
        lastActive: '2 weeks ago',
        status: 'completed',
      },
    ],
    totalCourses: 2,
    activeCourses: 1,
    completedCourses: 1,
    lastActivity: '1 day ago',
  },
  {
    user: {
      id: 'u3',
      name: 'Amara Patel',
      email: 'amara.p@example.com',
      avatar: 'AP',
      country: 'India',
      registrationDate: 'Jan 2024',
      organization: 'Mumbai Health Initiative',
      jobTitle: 'Social Worker',
    },
    enrollments: [
      {
        id: 'e6',
        programName: 'Family Based Prevention',
        courseCode: 'UPC 4',
        curriculum: 'upc',
        enrollmentDate: '2024-12-05',
        progress: 100,
        lastActive: '1 week ago',
        status: 'completed',
      },
      {
        id: 'e7',
        programName: 'School-based Prevention',
        courseCode: 'UPC 5',
        curriculum: 'upc',
        enrollmentDate: '2025-01-20',
        progress: 25,
        lastActive: '5 hours ago',
        status: 'active',
      },
    ],
    totalCourses: 2,
    activeCourses: 1,
    completedCourses: 1,
    lastActivity: '5 hours ago',
  },
  {
    user: {
      id: 'u4',
      name: 'David Wilson',
      email: 'david.w@example.com',
      avatar: 'DW',
      country: 'USA',
      registrationDate: 'Apr 2024',
      organization: 'Community Recovery Center',
      jobTitle: 'Peer Support Specialist',
    },
    enrollments: [
      {
        id: 'e8',
        programName: 'The PEER Model',
        courseCode: 'URC 1',
        curriculum: 'urc',
        enrollmentDate: '2025-01-20',
        progress: 5,
        lastActive: '3 days ago',
        status: 'active',
      },
    ],
    totalCourses: 1,
    activeCourses: 1,
    completedCourses: 0,
    lastActivity: '3 days ago',
  },
  {
    user: {
      id: 'u5',
      name: 'Elena Rodriguez',
      email: 'elena.r@example.com',
      avatar: 'ER',
      country: 'Spain',
      registrationDate: 'May 2024',
      organization: 'Barcelona Youth Services',
      jobTitle: 'Youth Worker',
    },
    enrollments: [
      {
        id: 'e9',
        programName: 'School-based Prevention',
        courseCode: 'UPC 5',
        curriculum: 'upc',
        enrollmentDate: '2025-01-25',
        progress: 0,
        lastActive: 'Never',
        status: 'active',
      },
      {
        id: 'e10',
        programName: 'Community-based Prevention',
        courseCode: 'UPC 9',
        curriculum: 'upc',
        enrollmentDate: '2025-01-26',
        progress: 10,
        lastActive: '6 hours ago',
        status: 'active',
      },
    ],
    totalCourses: 2,
    activeCourses: 2,
    completedCourses: 0,
    lastActivity: '6 hours ago',
  },
]
const mockPendingEnrollments: PendingEnrollment[] = [
  {
    id: 'p1',
    user: {
      id: 'u6',
      name: 'James Smith',
      email: 'james.s@example.com',
      avatar: 'JS',
      country: 'Australia',
      registrationDate: 'Jun 2024',
      organization: 'Sydney Health District',
      jobTitle: 'Public Health Officer',
    },
    programName: 'Advanced Counselling Skills',
    courseCode: 'UTC 5',
    curriculum: 'utc',
    requestDate: '2025-01-28',
    prerequisitesMet: true,
    statementOfInterest:
      'I am looking to advance my counselling skills to better serve my clients in the public health sector. I have completed the basic module and wish to continue my education.',
    status: 'pending',
  },
  {
    id: 'p2',
    user: {
      id: 'u7',
      name: 'Fatima Al-Sayed',
      email: 'fatima.a@example.com',
      avatar: 'FA',
      country: 'UAE',
      registrationDate: 'Jul 2024',
      organization: 'Dubai Wellness Center',
      jobTitle: 'Psychologist',
    },
    programName: 'Crisis Intervention',
    courseCode: 'UTC 7',
    curriculum: 'utc',
    requestDate: '2025-01-27',
    prerequisitesMet: true,
    statementOfInterest:
      'Crisis intervention is a critical part of my daily work. This course will provide the structured framework I need to handle complex cases effectively.',
    status: 'pending',
  },
  {
    id: 'p3',
    user: {
      id: 'u8',
      name: 'Kwame Osei',
      email: 'kwame.o@example.com',
      avatar: 'KO',
      country: 'Ghana',
      registrationDate: 'Aug 2024',
      organization: 'Accra Community Health',
      jobTitle: 'Program Coordinator',
    },
    programName: 'Monitoring and Evaluation',
    courseCode: 'UPC 3',
    curriculum: 'upc',
    requestDate: '2025-01-26',
    prerequisitesMet: false,
    statementOfInterest:
      "I need to implement better monitoring systems for our community programs. Although I haven't completed UPC 1 formally, I have 5 years of experience in the field.",
    status: 'pending',
  },
]
// --- Helper Components ---
const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    active: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
    dropped: 'bg-red-100 text-red-700',
    pending: 'bg-orange-100 text-orange-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  }
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${styles[status as keyof typeof styles]}`}
    >
      {status}
    </span>
  )
}
const CurriculumBadge = ({ type }: { type: CurriculumType }) => {
  const styles = {
    upc: 'bg-blue-100 text-blue-700',
    utc: 'bg-emerald-100 text-emerald-700',
    urc: 'bg-purple-100 text-purple-700',
  }
  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${styles[type]}`}
    >
      {type}
    </span>
  )
}
export function EnrollmentManagementPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'pending'>('active')
  const [selectedUser, setSelectedUser] = useState<UserWithEnrollments | null>(
    null,
  )
  const [selectedPending, setSelectedPending] =
    useState<PendingEnrollment | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  // Calculate total enrollments
  const totalEnrollments = useMemo(() => {
    return mockUsersWithEnrollments.reduce((sum, u) => sum + u.totalCourses, 0)
  }, [])
  // Track if sidebar/modal is open
  const isSidebarOpen = selectedUser !== null || selectedPending !== null
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isSidebarOpen])
  return (
    <>
      <div
        className={
          isSidebarOpen ? 'overflow-hidden max-h-[calc(100vh-4rem)]' : ''
        }
      >
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Enrollment Management
          </h1>
          <p className="text-slate-600">
            Manage course enrollments and review applications
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 mb-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('active')}
              className={`pb-4 px-2 font-medium text-sm transition-colors relative flex items-center gap-2 ${activeTab === 'active' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Enrolled Users
              <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {mockUsersWithEnrollments.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`pb-4 px-2 font-medium text-sm transition-colors relative flex items-center gap-2 ${activeTab === 'pending' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Pending Applications
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {mockPendingEnrollments.length}
              </span>
            </button>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center mb-8">
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg w-full sm:w-64 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2 w-full lg:w-auto">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium flex-1 lg:flex-none justify-center">
              <FileText className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'active' ? (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-slate-900">
                      User
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-900">
                      Total Courses
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-900">
                      In Progress
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-900">
                      Completed
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-900">
                      Last Activity
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-900 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockUsersWithEnrollments.map((userEnrollment) => (
                    <tr
                      key={userEnrollment.user.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-700">
                            {userEnrollment.user.avatar}
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">
                              {userEnrollment.user.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              {userEnrollment.user.email}
                            </div>
                            <div className="text-xs text-slate-400">
                              {userEnrollment.user.organization}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-slate-400" />
                          <span className="font-bold text-slate-900">
                            {userEnrollment.totalCourses}
                          </span>
                          <span className="text-slate-500">courses</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                          <Clock className="w-3 h-3" />
                          {userEnrollment.activeCourses}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                          <CheckCircle className="w-3 h-3" />
                          {userEnrollment.completedCourses}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-600">
                          {userEnrollment.lastActivity}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedUser(userEnrollment)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View Courses
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
              <div className="text-sm text-slate-500">
                Showing{' '}
                <span className="font-medium text-slate-900">
                  {mockUsersWithEnrollments.length}
                </span>{' '}
                users with{' '}
                <span className="font-medium text-slate-900">
                  {totalEnrollments}
                </span>{' '}
                total enrollments
              </div>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 border border-slate-200 rounded text-sm disabled:opacity-50"
                  disabled
                >
                  Previous
                </button>
                <button className="px-3 py-1 border border-slate-200 rounded text-sm hover:bg-slate-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-slate-900">
                      User
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-900">
                      Requested Course
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-900">
                      Request Date
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-900">
                      Prerequisites
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-900 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockPendingEnrollments.map((pending) => (
                    <tr
                      key={pending.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
                            {pending.user.avatar}
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">
                              {pending.user.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              {pending.user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="font-medium text-slate-900">
                            {pending.programName}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-xs font-bold rounded border border-slate-200">
                              {pending.courseCode}
                            </span>
                            <CurriculumBadge type={pending.curriculum} />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-900">
                          {new Date(pending.requestDate).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-slate-500">
                          Waiting 2 days
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {pending.prerequisitesMet ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            <CheckCircle className="w-3 h-3" />
                            Met
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                            <AlertCircle className="w-3 h-3" />
                            Missing
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedPending(pending)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors"
                          >
                            Review
                          </button>
                          <button className="p-1.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors">
                            <Check className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* User Enrollments Sidebar */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setSelectedUser(null)}
          />
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="font-bold text-lg text-slate-900">
                User Enrollments
              </h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* User Info */}
              <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
                <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-xl font-bold text-slate-700">
                  {selectedUser.user.avatar}
                </div>
                <div>
                  <div className="font-bold text-lg text-slate-900">
                    {selectedUser.user.name}
                  </div>
                  <div className="text-sm text-slate-500">
                    {selectedUser.user.email}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {selectedUser.user.jobTitle} at{' '}
                    {selectedUser.user.organization}
                  </div>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
                  <div className="text-2xl font-bold text-slate-900">
                    {selectedUser.totalCourses}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Total Courses
                  </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
                  <div className="text-2xl font-bold text-blue-700">
                    {selectedUser.activeCourses}
                  </div>
                  <div className="text-xs text-blue-600 mt-1">In Progress</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                  <div className="text-2xl font-bold text-green-700">
                    {selectedUser.completedCourses}
                  </div>
                  <div className="text-xs text-green-600 mt-1">Completed</div>
                </div>
              </div>

              {/* Course List */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                  Enrolled Courses ({selectedUser.enrollments.length})
                </h3>
                <div className="space-y-3">
                  {selectedUser.enrollments.map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="bg-white border border-slate-200 rounded-xl p-4 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-bold text-slate-900">
                            {enrollment.programName}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-xs font-bold rounded border border-slate-200">
                              {enrollment.courseCode}
                            </span>
                            <CurriculumBadge type={enrollment.curriculum} />
                          </div>
                        </div>
                        <StatusBadge status={enrollment.status} />
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${enrollment.progress === 100 ? 'bg-green-500' : 'bg-blue-600'}`}
                            style={{
                              width: `${enrollment.progress}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-600 w-10 text-right">
                          {enrollment.progress}%
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>
                          Enrolled:{' '}
                          {new Date(
                            enrollment.enrollmentDate,
                          ).toLocaleDateString()}
                        </span>
                        <span>Last active: {enrollment.lastActive}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                  <Mail className="w-4 h-4" /> Send Progress Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pending Application Modal */}
      {selectedPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 px-8 py-6 border-b border-slate-200 flex justify-between items-center rounded-t-2xl">
              <div>
                <h2 className="font-bold text-2xl text-slate-900">
                  Review Enrollment Application
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Request ID: {selectedPending.id} •{' '}
                  {new Date(selectedPending.requestDate).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedPending(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: User Profile */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-xl font-bold text-slate-700">
                      {selectedPending.user.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-lg text-slate-900">
                        {selectedPending.user.name}
                      </div>
                      <div className="text-sm text-slate-500">
                        {selectedPending.user.email}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm border-t border-slate-200 pt-4 mt-4">
                    <div>
                      <span className="text-slate-500 block text-xs uppercase tracking-wider mb-1">
                        Organization
                      </span>
                      <span className="font-medium text-slate-900">
                        {selectedPending.user.organization}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs uppercase tracking-wider mb-1">
                        Job Title
                      </span>
                      <span className="font-medium text-slate-900">
                        {selectedPending.user.jobTitle}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs uppercase tracking-wider mb-1">
                        Country
                      </span>
                      <span className="font-medium text-slate-900">
                        {selectedPending.user.country}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4">
                    Requested Course
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">Curriculum</span>
                      <CurriculumBadge type={selectedPending.curriculum} />
                    </div>
                    <div>
                      <span className="text-sm text-slate-500 block mb-1">
                        Program Name
                      </span>
                      <span className="font-medium text-slate-900">
                        {selectedPending.programName}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-slate-500 block mb-1">
                        Course Code
                      </span>
                      <span className="font-medium text-slate-900">
                        {selectedPending.courseCode}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Application Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* Prerequisites Check */}
                <div
                  className={`rounded-xl p-6 border ${selectedPending.prerequisitesMet ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}
                >
                  <h3
                    className={`font-bold text-lg mb-2 flex items-center gap-2 ${selectedPending.prerequisitesMet ? 'text-green-800' : 'text-orange-800'}`}
                  >
                    {selectedPending.prerequisitesMet ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <AlertCircle className="w-5 h-5" />
                    )}
                    Prerequisites Check
                  </h3>
                  <p
                    className={`text-sm ${selectedPending.prerequisitesMet ? 'text-green-700' : 'text-orange-700'}`}
                  >
                    {selectedPending.prerequisitesMet
                      ? 'This user meets all the required prerequisites for this course.'
                      : 'This user has not completed the required prerequisite courses. Approval requires manual override.'}
                  </p>
                </div>

                {/* Statement of Interest */}
                <div>
                  <h3 className="font-bold text-lg text-slate-900 mb-4">
                    Statement of Interest
                  </h3>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-slate-700 leading-relaxed italic">
                    "{selectedPending.statementOfInterest}"
                  </div>
                </div>

                {/* Admin Notes */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Admin Notes (Optional)
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="Add internal notes about this application..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-white px-8 py-6 border-t border-slate-200 flex justify-between items-center rounded-b-2xl">
              <button
                onClick={() => setSelectedPending(null)}
                className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <div className="flex gap-4">
                <button className="px-6 py-3 border-2 border-red-100 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-colors">
                  Reject Application
                </button>
                <button className="px-8 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-200 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Approve Enrollment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
