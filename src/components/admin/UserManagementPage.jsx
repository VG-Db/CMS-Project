import React, { useState } from "react"
import {
  Search,
  Eye,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  User,
  MapPin,
  Briefcase,
  Calendar,
  GraduationCap,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  UserCheck,
  Download,
  Ban,
  UserX,
  AlertTriangle,
  RefreshCw
} from "lucide-react"
const suspensionReasons = [
  {
    value: "policy_violation",
    label: "Policy Violation",
    description:
      "User violated platform terms of service or community guidelines"
  },
  {
    value: "fraudulent_activity",
    label: "Fraudulent Activity",
    description: "Suspected fraudulent behavior or misrepresentation"
  },
  {
    value: "inappropriate_behavior",
    label: "Inappropriate Behavior",
    description: "Harassment, spam, or other inappropriate conduct"
  },
  {
    value: "security_concern",
    label: "Account Security Concern",
    description: "Compromised account or suspicious login activity"
  },
  {
    value: "inactivity",
    label: "Extended Inactivity",
    description: "Account inactive for extended period"
  },
  {
    value: "other",
    label: "Other",
    description: "Other administrative reason"
  }
]
// Mock data for registered users
const registeredUsers = [
  {
    id: "1",
    firstName: "Maria",
    lastName: "Santos",
    email: "maria.santos@example.com",
    title: "Dr",
    gender: "Female",
    dateOfBirth: "1985-03-15",
    membershipCategory: "Professional Member",
    jobTitle: "Prevention Specialist",
    organization: "Manila Health Center",
    countryOrigin: "Philippines",
    countryResidence: "Philippines",
    experienceYear: "2015",
    areasOfWorkPrevention: [
      "Programme Delivery",
      "Training/Further Education",
      "Research"
    ],
    areasOfWorkTreatment: ["Medical/Health"],
    areasOfInterest: ["Community", "Youth", "School"],
    completedTraining: "Yes",
    academicQualifications:
      "PhD in Public Health, University of the Philippines",
    shortBio:
      "Dedicated prevention specialist with over 8 years of experience in community-based prevention programs.",
    registeredDate: "2024-01-15",
    status: "active",
    coursesEnrolled: 5,
    coursesCompleted: 3
  },
  {
    id: "2",
    firstName: "James",
    lastName: "Okonkwo",
    email: "james.okonkwo@example.com",
    title: "Mr",
    gender: "Male",
    dateOfBirth: "1990-07-22",
    membershipCategory: "Regular Member",
    jobTitle: "Social Worker",
    organization: "Lagos Community Services",
    countryOrigin: "Nigeria",
    countryResidence: "Nigeria",
    experienceYear: "2018",
    areasOfWorkPrevention: ["Social Services", "Programme Delivery"],
    areasOfWorkTreatment: ["Programme Delivery", "Social Services"],
    areasOfInterest: ["Community", "Family", "Youth"],
    completedTraining: "Yes",
    academicQualifications: "BSc Social Work, University of Lagos",
    shortBio:
      "Community-focused social worker dedicated to supporting families affected by substance use disorders.",
    registeredDate: "2024-02-20",
    status: "active",
    coursesEnrolled: 3,
    coursesCompleted: 2
  },
  {
    id: "3",
    firstName: "Sarah",
    lastName: "Chen",
    email: "sarah.chen@example.com",
    title: "Ms",
    gender: "Female",
    dateOfBirth: "1992-11-08",
    membershipCategory: "Student Member",
    jobTitle: "Graduate Student",
    organization: "National University of Singapore",
    countryOrigin: "Singapore",
    countryResidence: "Singapore",
    experienceYear: "2022",
    areasOfWorkPrevention: ["Research", "Student/Youth"],
    areasOfWorkTreatment: [],
    areasOfInterest: ["Recovery", "Medical", "Research"],
    completedTraining: "No",
    academicQualifications: "Currently pursuing Masters in Clinical Psychology",
    shortBio:
      "Graduate student researching evidence-based recovery support methodologies.",
    registeredDate: "2024-03-10",
    status: "active",
    coursesEnrolled: 2,
    coursesCompleted: 1
  },
  {
    id: "4",
    firstName: "Ahmed",
    lastName: "Hassan",
    email: "ahmed.hassan@example.com",
    title: "Prof",
    gender: "Male",
    dateOfBirth: "1975-05-30",
    membershipCategory: "DDR Professional Member",
    jobTitle: "Director of Prevention Programs",
    organization: "Cairo Prevention Institute",
    countryOrigin: "Egypt",
    countryResidence: "Egypt",
    experienceYear: "2005",
    areasOfWorkPrevention: [
      "Policy",
      "Training/Further Education",
      "Research",
      "Programme Delivery"
    ],
    areasOfWorkTreatment: ["Policy", "Training/Further Education"],
    areasOfInterest: ["Population Wide", "Community", "School"],
    completedTraining: "Yes",
    academicQualifications:
      "PhD in Psychology, Cairo University; Masters in Public Health",
    shortBio:
      "Leading prevention researcher and trainer with 20+ years of experience.",
    registeredDate: "2023-11-05",
    status: "active",
    coursesEnrolled: 8,
    coursesCompleted: 8
  },
  {
    id: "5",
    firstName: "Elena",
    lastName: "Rodriguez",
    email: "elena.rodriguez@example.com",
    title: "Dr",
    gender: "Female",
    dateOfBirth: "1988-09-12",
    membershipCategory: "Professional Member",
    jobTitle: "Clinical Psychologist",
    organization: "Mexico City Treatment Center",
    countryOrigin: "Mexico",
    countryResidence: "Mexico",
    experienceYear: "2012",
    areasOfWorkPrevention: ["Medical/Health"],
    areasOfWorkTreatment: ["Programme Delivery", "Medical/Health", "Research"],
    areasOfInterest: ["Treatment Centre", "Recovery", "Family"],
    completedTraining: "Yes",
    academicQualifications: "PsyD Clinical Psychology, UNAM",
    shortBio:
      "Clinical psychologist specializing in addiction treatment and family therapy approaches.",
    registeredDate: "2024-01-28",
    status: "active",
    coursesEnrolled: 4,
    coursesCompleted: 2
  }
]
// Mock data for pending registrations
const pendingUsers = [
  {
    id: "p1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    title: "Mr",
    gender: "Male",
    dateOfBirth: "1995-06-20",
    membershipCategory: "Regular Member",
    jobTitle: "Community Health Worker",
    organization: "Boston Health Initiative",
    countryOrigin: "United States",
    countryResidence: "United States",
    experienceYear: "2020",
    areasOfWorkPrevention: ["Programme Delivery", "Community"],
    areasOfWorkTreatment: [],
    areasOfInterest: ["Community", "Youth"],
    completedTraining: "No",
    academicQualifications: "BA in Public Health, Boston University",
    shortBio: "Passionate about community health and prevention work.",
    registeredDate: "2024-06-15",
    status: "pending"
  },
  {
    id: "p2",
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@example.com",
    title: "Dr",
    gender: "Female",
    dateOfBirth: "1982-12-03",
    membershipCategory: "Professional Member",
    jobTitle: "Psychiatrist",
    organization: "Delhi Medical College",
    countryOrigin: "India",
    countryResidence: "India",
    experienceYear: "2010",
    areasOfWorkPrevention: ["Medical/Health", "Research"],
    areasOfWorkTreatment: [
      "Medical/Health",
      "Programme Delivery",
      "Training/Further Education"
    ],
    areasOfInterest: ["Medical", "Treatment Centre", "Recovery"],
    completedTraining: "Yes",
    academicQualifications:
      "MD Psychiatry, AIIMS Delhi; Fellowship in Addiction Medicine",
    shortBio:
      "Board-certified psychiatrist with subspecialty in addiction medicine.",
    registeredDate: "2024-06-18",
    status: "pending"
  },
  {
    id: "p3",
    firstName: "Michael",
    lastName: "Thompson",
    email: "michael.t@example.com",
    title: "Mr",
    gender: "Male",
    dateOfBirth: "1998-04-11",
    membershipCategory: "Student Member",
    jobTitle: "Graduate Research Assistant",
    organization: "University of Toronto",
    countryOrigin: "Canada",
    countryResidence: "Canada",
    experienceYear: "2023",
    areasOfWorkPrevention: ["Research", "Student/Youth"],
    areasOfWorkTreatment: [],
    areasOfInterest: ["School", "Youth", "Research"],
    completedTraining: "No",
    academicQualifications: "Currently pursuing MSc in Health Psychology",
    shortBio:
      "First-year graduate student interested in school-based prevention programs.",
    registeredDate: "2024-06-20",
    status: "pending"
  },
  {
    id: "p4",
    firstName: "Fatima",
    lastName: "Al-Rashid",
    email: "fatima.alrashid@example.com",
    title: "Ms",
    gender: "Female",
    dateOfBirth: "1990-08-25",
    membershipCategory: "DDR Professional Member",
    jobTitle: "Program Manager",
    organization: "UAE Ministry of Health",
    countryOrigin: "United Arab Emirates",
    countryResidence: "United Arab Emirates",
    experienceYear: "2014",
    areasOfWorkPrevention: ["Policy", "Programme Delivery", "Funding"],
    areasOfWorkTreatment: ["Policy", "Programme Delivery"],
    areasOfInterest: ["Population Wide", "Community", "Family"],
    completedTraining: "Yes",
    academicQualifications: "MPH, Johns Hopkins University; BA in Psychology",
    shortBio:
      "Government program manager overseeing national drug demand reduction initiatives.",
    registeredDate: "2024-06-22",
    status: "pending"
  }
]
// Mock data for suspended users
const suspendedUsers = [
  {
    id: "s1",
    firstName: "Robert",
    lastName: "Miller",
    email: "robert.miller@example.com",
    title: "Mr",
    gender: "Male",
    dateOfBirth: "1987-04-18",
    membershipCategory: "Regular Member",
    jobTitle: "Prevention Coordinator",
    organization: "Chicago Prevention Network",
    countryOrigin: "United States",
    countryResidence: "United States",
    experienceYear: "2016",
    areasOfWorkPrevention: ["Programme Delivery"],
    areasOfWorkTreatment: [],
    areasOfInterest: ["Community", "Youth"],
    completedTraining: "Yes",
    academicQualifications: "BA in Social Work",
    shortBio: "Prevention coordinator with community outreach experience.",
    registeredDate: "2023-08-10",
    status: "suspended",
    coursesEnrolled: 3,
    coursesCompleted: 1,
    suspensionInfo: {
      reason: "policy_violation",
      reasonLabel: "Policy Violation",
      suspendedDate: "2024-06-01",
      suspendedBy: "Admin User",
      notes: "Multiple violations of community guidelines in discussion forums."
    }
  },
  {
    id: "s2",
    firstName: "Lisa",
    lastName: "Wang",
    email: "lisa.wang@example.com",
    title: "Ms",
    gender: "Female",
    dateOfBirth: "1993-09-25",
    membershipCategory: "Student Member",
    jobTitle: "Research Assistant",
    organization: "Beijing University",
    countryOrigin: "China",
    countryResidence: "China",
    experienceYear: "2021",
    areasOfWorkPrevention: ["Research"],
    areasOfWorkTreatment: [],
    areasOfInterest: ["Research", "Youth"],
    completedTraining: "No",
    academicQualifications: "Currently pursuing PhD in Public Health",
    shortBio: "Research assistant focusing on prevention methodologies.",
    registeredDate: "2024-01-05",
    status: "suspended",
    coursesEnrolled: 2,
    coursesCompleted: 0,
    suspensionInfo: {
      reason: "security_concern",
      reasonLabel: "Account Security Concern",
      suspendedDate: "2024-06-15",
      suspendedBy: "System",
      suspendedUntil: "2024-07-15",
      notes: "Suspicious login activity detected from multiple locations."
    }
  }
]
export function UserManagementPage() {
  const [activeTab, setActiveTab] = useState("registered")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showSuspendModal, setShowSuspendModal] = useState(false)
  const [userToSuspend, setUserToSuspend] = useState(null)
  // Suspension form state
  const [suspensionReason, setSuspensionReason] = useState("policy_violation")
  const [suspensionDuration, setSuspensionDuration] = useState("indefinite")
  const [suspensionEndDate, setSuspensionEndDate] = useState("")
  const [suspensionNotes, setSuspensionNotes] = useState("")
  const getCurrentUsers = () => {
    switch (activeTab) {
      case "registered":
        return registeredUsers
      case "pending":
        return pendingUsers
      case "suspended":
        return suspendedUsers
      default:
        return registeredUsers
    }
  }
  const currentUsers = getCurrentUsers()
  const filteredUsers = currentUsers.filter(
    user =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.organization.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const handleViewUser = user => {
    setSelectedUser(user)
    setShowDetailModal(true)
  }
  const handleApprove = userId => {
    console.log("Approving user:", userId)
    setShowDetailModal(false)
  }
  const handleReject = userId => {
    console.log("Rejecting user:", userId)
    setShowDetailModal(false)
  }
  const openSuspendModal = user => {
    setUserToSuspend(user)
    setSuspensionReason("policy_violation")
    setSuspensionDuration("indefinite")
    setSuspensionEndDate("")
    setSuspensionNotes("")
    setShowSuspendModal(true)
    setShowDetailModal(false)
  }
  const handleSuspend = () => {
    if (!userToSuspend) return
    console.log("Suspending user:", userToSuspend.id, {
      reason: suspensionReason,
      duration: suspensionDuration,
      endDate:
        suspensionDuration === "temporary" ? suspensionEndDate : undefined,
      notes: suspensionNotes
    })
    setShowSuspendModal(false)
    setUserToSuspend(null)
  }
  const handleReactivate = userId => {
    console.log("Reactivating user:", userId)
    setShowDetailModal(false)
  }
  const getMembershipBadgeColor = category => {
    switch (category) {
      case "Professional Member":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "Student Member":
        return "bg-green-100 text-green-700 border-green-200"
      case "DDR Professional Member":
        return "bg-purple-100 text-purple-700 border-purple-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }
  // Calculate stats
  const totalUsers =
    registeredUsers.length + pendingUsers.length + suspendedUsers.length
  const activeUsers = registeredUsers.filter(u => u.status === "active").length
  const pendingCount = pendingUsers.length
  const suspendedCount = suspendedUsers.length
  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          User Management
        </h1>
        <p className="text-slate-600">
          Manage registered users, review pending registrations, and handle
          suspensions
        </p>
      </div>

      {/* Stats Cards - Updated to match Certification page design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Total Users",
            value: totalUsers.toString(),
            sub: "+12 this month",
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-50",
            badge: "All Time",
            badgeColor: "text-blue-600 bg-blue-50"
          },
          {
            label: "Active Users",
            value: activeUsers.toString(),
            sub: `${Math.round((activeUsers / totalUsers) * 100)}% of total`,
            icon: UserCheck,
            color: "text-green-600",
            bg: "bg-green-50",
            badge: "Active",
            badgeColor: "text-green-600 bg-green-50"
          },
          {
            label: "Pending Approval",
            value: pendingCount.toString(),
            sub: "Awaiting review",
            icon: Clock,
            color: "text-orange-600",
            bg: "bg-orange-50",
            badge: "Pending",
            badgeColor: "text-orange-600 bg-orange-50"
          },
          {
            label: "Suspended",
            value: suspendedCount.toString(),
            sub: "Accounts on hold",
            icon: UserX,
            color: "text-red-600",
            bg: "bg-red-50",
            badge: "Suspended",
            badgeColor: "text-red-600 bg-red-50"
          }
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl border-2 border-slate-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${stat.badgeColor}`}
              >
                {stat.badge}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
            <p className="text-xs text-slate-400 mt-2">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 mb-8">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab("registered")}
            className={`pb-4 px-2 font-medium text-sm transition-colors relative flex items-center gap-2 ${
              activeTab === "registered"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <UserCheck className="w-4 h-4" />
            Registered Users
            <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">
              {registeredUsers.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`pb-4 px-2 font-medium text-sm transition-colors relative flex items-center gap-2 ${
              activeTab === "pending"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Clock className="w-4 h-4" />
            Pending Registrations
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {pendingUsers.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("suspended")}
            className={`pb-4 px-2 font-medium text-sm transition-colors relative flex items-center gap-2 ${
              activeTab === "suspended"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <UserX className="w-4 h-4" />
            Suspended Users
            {suspendedUsers.length > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {suspendedUsers.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, or organization..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex gap-3">
          <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500">
            <option>All Categories</option>
            <option>Professional Member</option>
            <option>Student Member</option>
            <option>DDR Professional Member</option>
            <option>Regular Member</option>
          </select>
          {activeTab === "suspended" && (
            <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500">
              <option>All Reasons</option>
              {suspensionReasons.map(r => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          )}
          <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-sm font-medium">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* User List - Registered Users */}
      {activeTab === "registered" && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Courses
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Registered
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map(user => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-200 text-slate-700 rounded-full flex items-center justify-center font-semibold text-sm">
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">
                          {user.title} {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-slate-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">
                      {user.organization}
                    </div>
                    <div className="text-xs text-slate-500">
                      {user.jobTitle}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">
                      {user.countryResidence}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <span className="text-green-600 font-medium">
                        {user.coursesCompleted || 0}
                      </span>
                      <span className="text-slate-400"> / </span>
                      <span className="text-slate-600">
                        {user.coursesEnrolled || 0}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">
                      Completed / Enrolled
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600">
                      {new Date(user.registeredDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        }
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openSuspendModal(user)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Suspend User"
                      >
                        <Ban className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="text-sm text-slate-600">
              Showing{" "}
              <span className="font-semibold">{filteredUsers.length}</span> of{" "}
              <span className="font-semibold">{currentUsers.length}</span> users
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 border border-slate-200 rounded-lg hover:bg-white transition-colors disabled:opacity-50">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="px-3 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-lg">
                1
              </button>
              <button className="px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-white rounded-lg transition-colors">
                2
              </button>
              <button className="p-2 border border-slate-200 rounded-lg hover:bg-white transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pending Users - Card Layout */}
      {activeTab === "pending" && (
        <div className="space-y-4">
          {filteredUsers.map(user => (
            <div
              key={user.id}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="hidden md:flex w-12 h-12 bg-orange-100 rounded-full items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">
                        {user.title} {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-sm text-slate-500">{user.email}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                      Pending Approval
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mt-3">
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4" />
                      <span>{user.jobTitle}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {user.organization}, {user.countryResidence}
                      </span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Applied{" "}
                        {new Date(user.registeredDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <button
                    onClick={() => handleViewUser(user)}
                    className="flex-1 md:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Review
                  </button>
                  <button
                    onClick={() => handleApprove(user.id)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg border border-slate-200 hover:border-green-200 transition-colors"
                    title="Quick Approve"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleReject(user.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg border border-slate-200 hover:border-red-200 transition-colors"
                    title="Quick Reject"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Suspended Users - Card Layout */}
      {activeTab === "suspended" && (
        <div className="space-y-4">
          {filteredUsers.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                No Suspended Users
              </h3>
              <p className="text-slate-500">
                All users are currently in good standing.
              </p>
            </div>
          ) : (
            filteredUsers.map(user => (
              <div
                key={user.id}
                className="bg-white rounded-xl border border-red-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="hidden md:flex w-12 h-12 bg-red-100 rounded-full items-center justify-center flex-shrink-0">
                    <UserX className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-slate-200 text-slate-700 rounded-full flex items-center justify-center  font-semibold text-sm">
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">
                          {user.title} {user.firstName} {user.lastName}
                        </h3>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                      <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full flex items-center gap-1">
                        <Ban className="w-3 h-3" />
                        Suspended
                      </span>
                    </div>

                    {/* Suspension Info */}
                    {user.suspensionInfo && (
                      <div className="bg-white rounded-lg p-3 mt-3 border border-red-100">
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center gap-1.5 text-red-700">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="font-medium">
                              {user.suspensionInfo.reasonLabel}
                            </span>
                          </div>
                          <span className="text-red-300">•</span>
                          <div className="flex items-center gap-1.5 text-red-600">
                            <Calendar className="w-4 h-4" />
                            <span>
                              Suspended{" "}
                              {new Date(
                                user.suspensionInfo.suspendedDate
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                              })}
                            </span>
                          </div>
                          {user.suspensionInfo.suspendedUntil ? (
                            <>
                              <span className="text-red-300">•</span>
                              <div className="flex items-center gap-1.5 text-red-600">
                                <Clock className="w-4 h-4" />
                                <span>
                                  Until{" "}
                                  {new Date(
                                    user.suspensionInfo.suspendedUntil
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric"
                                  })}
                                </span>
                              </div>
                            </>
                          ) : (
                            <>
                              <span className="text-red-300">•</span>
                              <span className="text-red-600 font-medium">
                                Indefinite
                              </span>
                            </>
                          )}
                        </div>
                        {user.suspensionInfo.notes && (
                          <p className="text-sm text-red-700 mt-2 pt-2 border-t border-red-200">
                            <span className="font-medium">Notes:</span>{" "}
                            {user.suspensionInfo.notes}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mt-3">
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" />
                        <span>{user.jobTitle}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {user.organization}, {user.countryResidence}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <button
                      onClick={() => handleViewUser(user)}
                      className="flex-1 md:flex-none px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button
                      onClick={() => handleReactivate(user.id)}
                      className="flex-1 md:flex-none px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Reactivate
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDetailModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div
              className="sticky top-0 border-b border-slate-200 bg-white px-8 py-6 flex items-start justify-between"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl bg-slate-200 text-slate-700"
                >
                  {selectedUser.firstName[0]}
                  {selectedUser.lastName[0]}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {selectedUser.title} {selectedUser.firstName}{" "}
                    {selectedUser.lastName}
                  </h2>
                  <p className="text-slate-600">{selectedUser.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {selectedUser.status === "pending" && (
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-lg">
                        Pending Approval
                      </span>
                    )}
                    {selectedUser.status === "suspended" && (
                      <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-lg flex items-center gap-1">
                        <Ban className="w-3 h-3" />
                        Suspended
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Suspension Alert */}
            {selectedUser.status === "suspended" &&
              selectedUser.suspensionInfo && (
                <div className="mx-8 mt-6 bg-white border border-red-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-bold text-red-900">
                        Account Suspended
                      </h4>
                      <p className="text-sm text-red-700 mt-1">
                        <span className="font-medium">Reason:</span>{" "}
                        {selectedUser.suspensionInfo.reasonLabel}
                      </p>
                      <p className="text-sm text-red-700">
                        <span className="font-medium">Suspended on:</span>{" "}
                        {new Date(
                          selectedUser.suspensionInfo.suspendedDate
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                        {" by "}
                        {selectedUser.suspensionInfo.suspendedBy}
                      </p>
                      {selectedUser.suspensionInfo.suspendedUntil ? (
                        <p className="text-sm text-red-700">
                          <span className="font-medium">Suspended until:</span>{" "}
                          {new Date(
                            selectedUser.suspensionInfo.suspendedUntil
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                          })}
                        </p>
                      ) : (
                        <p className="text-sm text-red-700">
                          <span className="font-medium">Duration:</span>{" "}
                          Indefinite (until manual review)
                        </p>
                      )}
                      {selectedUser.suspensionInfo.notes && (
                        <p className="text-sm text-red-700 mt-2 pt-2 border-t border-red-200">
                          <span className="font-medium">Notes:</span>{" "}
                          {selectedUser.suspensionInfo.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

            {/* Modal Content */}
            <div className="px-8 py-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Details */}
                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Personal Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-slate-500">Full Name</span>
                      <span className="font-medium text-slate-900">
                        {selectedUser.title} {selectedUser.firstName}{" "}
                        {selectedUser.lastName}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-slate-500">Gender</span>
                      <span className="font-medium text-slate-900">
                        {selectedUser.gender}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-slate-500">Date of Birth</span>
                      <span className="font-medium text-slate-900">
                        {new Date(selectedUser.dateOfBirth).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Professional Details */}
                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-green-600" />
                    Professional Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-slate-500">Job Title</span>
                      <span className="font-medium text-slate-900">
                        {selectedUser.jobTitle}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-slate-500">Organization</span>
                      <span className="font-medium text-slate-900">
                        {selectedUser.organization}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-slate-500">Experience Since</span>
                      <span className="font-medium text-slate-900">
                        {selectedUser.experienceYear}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    Location
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-slate-500">Country of Origin</span>
                      <span className="font-medium text-slate-900">
                        {selectedUser.countryOrigin}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-slate-500">
                        Country of Residence
                      </span>
                      <span className="font-medium text-slate-900">
                        {selectedUser.countryResidence}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Training */}
                <div className="bg-slate-50 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-orange-600" />
                    Training & Qualifications
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-slate-500">UTC/UPC Training</span>
                      <span
                        className={`font-medium ${
                          selectedUser.completedTraining === "Yes"
                            ? "text-green-600"
                            : "text-slate-900"
                        }`}
                      >
                        {selectedUser.completedTraining}
                      </span>
                    </div>
                    <div className="py-2">
                      <span className="text-slate-500 block mb-2">
                        Academic Qualifications
                      </span>
                      <span className="font-medium text-slate-900 text-sm">
                        {selectedUser.academicQualifications}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Areas of Work - Prevention */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-3">
                    Areas of Work - Prevention
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.areasOfWorkPrevention.length > 0 ? (
                      selectedUser.areasOfWorkPrevention.map((area, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg"
                        >
                          {area}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-400 text-sm">
                        None specified
                      </span>
                    )}
                  </div>
                </div>

                {/* Areas of Work - Treatment */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-3">
                    Areas of Work - Treatment
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.areasOfWorkTreatment.length > 0 ? (
                      selectedUser.areasOfWorkTreatment.map((area, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-lg"
                        >
                          {area}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-400 text-sm">
                        None specified
                      </span>
                    )}
                  </div>
                </div>

                {/* Areas of Interest */}
                <div className="md:col-span-2">
                  <h3 className="text-sm font-bold text-slate-900 mb-3">
                    Areas of Interest
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.areasOfInterest.map((area, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-50 text-purple-700 text-sm font-medium rounded-lg"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <div className="md:col-span-2">
                  <h3 className="text-sm font-bold text-slate-900 mb-3">
                    Profile / Bio
                  </h3>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl">
                    {selectedUser.shortBio}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-8 py-4 flex items-center justify-between">
              <div className="text-sm text-slate-500 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Registered on{" "}
                {new Date(selectedUser.registeredDate).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  }
                )}
              </div>

              {selectedUser.status === "pending" ? (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleReject(selectedUser.id)}
                    className="flex items-center gap-2 px-6 py-2.5 border-2 border-red-200 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(selectedUser.id)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </button>
                </div>
              ) : selectedUser.status === "suspended" ? (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="px-6 py-2.5 text-slate-600 font-semibold rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleReactivate(selectedUser.id)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reactivate Account
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openSuspendModal(selectedUser)}
                    className="flex items-center gap-2 px-6 py-2.5 border-2 border-red-200 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Ban className="w-4 h-4" />
                    Suspend User
                  </button>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="px-6 py-2.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Suspend User Modal */}
      {showSuspendModal && userToSuspend && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSuspendModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Modal Header */}
            <div className="bg-white border-b border-red-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Ban className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Suspend User
                  </h2>
                  <p className="text-sm text-slate-600">
                    {userToSuspend.firstName} {userToSuspend.lastName}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5">
              {/* Warning */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium">This action will:</p>
                  <ul className="list-disc list-inside mt-1 space-y-0.5">
                    <li>Prevent the user from logging in</li>
                    <li>Pause all course enrollments</li>
                    <li>Block certificate downloads</li>
                  </ul>
                  <p className="mt-2">Progress and data will be preserved.</p>
                </div>
              </div>

              {/* Reason Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Suspension Reason *
                </label>
                <select
                  value={suspensionReason}
                  onChange={e => setSuspensionReason(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                >
                  {suspensionReasons.map(reason => (
                    <option key={reason.value} value={reason.value}>
                      {reason.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 mt-1">
                  {
                    suspensionReasons.find(r => r.value === suspensionReason)
                      ?.description
                  }
                </p>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Duration
                </label>
                <div className="space-y-2">
                  <label
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      suspensionDuration === "indefinite"
                        ? "border-red-500 bg-red-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="duration"
                      value="indefinite"
                      checked={suspensionDuration === "indefinite"}
                      onChange={() => setSuspensionDuration("indefinite")}
                      className="text-red-600 focus:ring-red-500"
                    />
                    <div>
                      <span className="font-medium text-slate-900">
                        Indefinite
                      </span>
                      <p className="text-xs text-slate-500">
                        Until manually reactivated by admin
                      </p>
                    </div>
                  </label>
                  <label
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      suspensionDuration === "temporary"
                        ? "border-red-500 bg-red-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="duration"
                      value="temporary"
                      checked={suspensionDuration === "temporary"}
                      onChange={() => setSuspensionDuration("temporary")}
                      className="text-red-600 focus:ring-red-500"
                    />
                    <div>
                      <span className="font-medium text-slate-900">
                        Temporary
                      </span>
                      <p className="text-xs text-slate-500">
                        Auto-reactivates on specified date
                      </p>
                    </div>
                  </label>
                </div>
                {suspensionDuration === "temporary" && (
                  <div className="mt-3">
                    <label className="block text-sm text-slate-600 mb-1">
                      Suspend until:
                    </label>
                    <input
                      type="date"
                      value={suspensionEndDate}
                      onChange={e => setSuspensionEndDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Admin Notes (Optional)
                </label>
                <textarea
                  value={suspensionNotes}
                  onChange={e => setSuspensionNotes(e.target.value)}
                  placeholder="Add any relevant notes about this suspension..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => setShowSuspendModal(false)}
                className="px-5 py-2.5 text-slate-600 font-semibold rounded-lg hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSuspend}
                disabled={
                  suspensionDuration === "temporary" && !suspensionEndDate
                }
                className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Ban className="w-4 h-4" />
                Suspend User
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
