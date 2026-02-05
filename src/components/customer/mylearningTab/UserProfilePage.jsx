import React, { useState } from "react"
import {
  Compass,
  Bell,
  User,
  Award,
  Settings,
  LogOut,
  ChevronDown,
  Clock,
  CheckCircle,
  Calendar,
  Play,
  Trophy,
  Download,
  Eye,
  Star,
  Medal,
  BookOpen,
  Search,
  Camera,
  Edit2,
  Share2,
  Lock,
  Globe,
  Shield,
  MessageSquare,
  Filter,
  X,
  Plus,
  Save
} from "lucide-react"
import { Footer } from "../../Footer"
// --- Mock Data ---
const initialProfile = {
  name: "Oneth Sayakkara",
  email: "oneth@example.com",
  phone: "+94 77 123 4567",
  country: "Sri Lanka",
  organization: "UNODC",
  bio:
    "Passionate about prevention science and community health. Dedicated to implementing evidence-based strategies for substance use prevention.",
  role: "Learner",
  avatarUrl: "",
  joinDate: "January 2024",
  language: "English (US)",
  timezone: "(GMT+05:30) Sri Jayawardenepura",
  emailNotifications: {
    enrollments: true,
    certificates: true,
    announcements: false,
    feedback: true
  },
  privacy: {
    publicProfile: true,
    showAchievements: true,
    showProgress: false
  }
}
const achievementsData = [
  {
    id: "1",
    name: "First Course Complete!",
    description: "Completed your first program successfully",
    type: "gold",
    earnedDate: "2025-01-10",
    icon: "trophy",
    curriculum: "urc"
  },
  {
    id: "2",
    name: "Quick Learner",
    description: "Completed a module in one session",
    type: "silver",
    earnedDate: "2025-01-18",
    icon: "star",
    curriculum: "upc"
  },
  {
    id: "3",
    name: "Prevention Pioneer",
    description: "Started your first UPC course",
    type: "bronze",
    earnedDate: "2025-01-15",
    icon: "medal",
    curriculum: "upc"
  },
  {
    id: "4",
    name: "Perfect Score",
    description: "Scored 100% on a module exam",
    type: "gold",
    earnedDate: "2025-02-01",
    icon: "star",
    curriculum: "utc"
  },
  {
    id: "5",
    name: "Consistent Learner",
    description: "Logged in for 7 consecutive days",
    type: "silver",
    earnedDate: "2025-01-25",
    icon: "medal"
  },
  {
    id: "6",
    name: "Feedback Champion",
    description: "Submitted detailed feedback for 3 courses",
    type: "bronze",
    earnedDate: "2025-01-30",
    icon: "message-square" // mapped later
  }
]
const certificatesData = [
  {
    id: "1",
    programName: "Universal Recovery Curriculum",
    certificateId: "URC-2025-00123",
    issueDate: "2025-01-10",
    curriculum: "urc"
  },
  {
    id: "2",
    programName: "Introduction to Prevention",
    certificateId: "UPC-2024-00456",
    issueDate: "2024-12-20",
    curriculum: "upc"
  },
  {
    id: "3",
    programName: "Treatment for Substance Use Disorders",
    certificateId: "UTC-2025-00789",
    issueDate: "2025-02-15",
    curriculum: "utc"
  }
]
const historyData = [
  {
    id: "1",
    type: "certificate",
    description: "Earned Certificate of Completion",
    courseName: "Treatment for Substance Use Disorders",
    date: "2 hours ago",
    status: "completed"
  },
  {
    id: "2",
    type: "exam",
    description: "Passed Final Assessment",
    courseName: "Treatment for Substance Use Disorders",
    date: "3 hours ago",
    status: "passed"
  },
  {
    id: "3",
    type: "completion",
    description: "Completed Module 6: Ethics in Treatment",
    courseName: "Treatment for Substance Use Disorders",
    date: "5 hours ago",
    status: "completed"
  },
  {
    id: "4",
    type: "start",
    description: "Resumed learning",
    courseName: "Treatment for Substance Use Disorders",
    date: "Yesterday",
    status: "in-progress"
  },
  {
    id: "5",
    type: "enrollment",
    description: "Enrolled in new course",
    courseName: "Basic Counselling Skills",
    date: "2 days ago",
    status: "in-progress"
  },
  {
    id: "6",
    type: "feedback",
    description: "Submitted course feedback",
    courseName: "Introduction to Prevention Science",
    date: "1 week ago",
    status: "completed"
  },
  {
    id: "7",
    type: "certificate",
    description: "Earned Certificate of Completion",
    courseName: "Introduction to Prevention Science",
    date: "1 week ago",
    status: "completed"
  }
]
// --- Helper Functions ---
const getCurriculumColor = curriculum => {
  switch (curriculum) {
    case "upc":
      return {
        bg: "bg-blue-500",
        light: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        badge: "bg-blue-100 text-blue-800",
        gradient: "from-blue-500 to-blue-600"
      }
    case "utc":
      return {
        bg: "bg-emerald-500",
        light: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        badge: "bg-emerald-100 text-emerald-800",
        gradient: "from-emerald-500 to-emerald-600"
      }
    case "urc":
      return {
        bg: "bg-purple-500",
        light: "bg-purple-50",
        text: "text-purple-700",
        border: "border-purple-200",
        badge: "bg-purple-100 text-purple-800",
        gradient: "from-purple-500 to-purple-600"
      }
    default:
      return {
        bg: "bg-slate-500",
        light: "bg-slate-50",
        text: "text-slate-700",
        border: "border-slate-200",
        badge: "bg-slate-100 text-slate-800",
        gradient: "from-slate-500 to-slate-600"
      }
  }
}
const getActivityIcon = type => {
  switch (type) {
    case "enrollment":
      return <Plus className="w-5 h-5 text-blue-600" />
    case "start":
      return <Play className="w-5 h-5 text-indigo-600" />
    case "completion":
      return <CheckCircle className="w-5 h-5 text-green-600" />
    case "exam":
      return <Trophy className="w-5 h-5 text-amber-500" />
    case "certificate":
      return <Award className="w-5 h-5 text-purple-600" />
    case "feedback":
      return <MessageSquare className="w-5 h-5 text-teal-600" />
  }
}
// --- Main Component ---
export function UserProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(initialProfile)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showCertificateModal, setShowCertificateModal] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  // Header state
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  // Filters
  const [certFilter, setCertFilter] = useState("all")
  const [historyFilter, setHistoryFilter] = useState("all")
  const handleSaveProfile = () => {
    setIsEditing(false)
    // API call would go here
  }
  const handleViewCertificate = cert => {
    setSelectedCertificate(cert)
    setShowCertificateModal(true)
  }
  // Filtered lists
  const filteredAchievements = achievementsData.filter(a =>
    certFilter === "all" ? true : a.curriculum === certFilter
  )
  const filteredCertificates = certificatesData.filter(c =>
    certFilter === "all" ? true : c.curriculum === certFilter
  )
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      {/* --- Header (Reused Pattern) --- */}
      <header className="flex-shrink-0 z-50 bg-white border-b border-slate-200 shadow-sm sticky top-0">
        <div className="w-full px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Side */}
            <div className="flex items-center gap-4">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => (window.location.href = "/")}
              >
                <img
                  src="/logo2.png"
                  alt="TrainHub Logo"
                  className="w-12 h-12"
                />

              </div>
            </div>

            {/* Center - Search */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search courses, articles and resources"
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2 sm:gap-8">
              <button
                onClick={() => (window.location.href = "/mylearning")}
                className="hidden sm:block px-3 py-2 text-slate-600 font-semibold hover:bg-slate-50 rounded-lg transition-colors"
              >
                My Learning
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications)
                    setShowUserMenu(false)
                  }}
                  className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    2
                  </span>
                </button>
                {/* Notification Dropdown (Simplified for this page) */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-slate-200">
                      <h3 className="font-semibold text-slate-900">
                        Notifications
                      </h3>
                    </div>
                    <div className="p-4 text-center text-slate-500 text-sm">
                      No new notifications
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowUserMenu(!showUserMenu)
                    setShowNotifications(false)
                  }}
                  className="flex items-center gap-2 p-1  rounded-lg transition-colors"
                >
                  <div className="w-9 h-9 bg-slate-200  hover:bg-slate-200/70 text-slate-700 rounded-full flex items-center justify-center font-semibold text-sm">
                    ON
                  </div>
                  <div className="hidden sm:flex flex-col items-start">
                    <span className="text-sm font-semibold text-slate-900">
                      Oneth Sayakkara
                    </span>
                    <span className="text-xs px-1.5 py-0.5 text-blue-700 rounded font-medium">
                      Learner
                    </span>
                  </div>
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-slate-200">
                      <p className="font-semibold text-slate-900">
                        Oneth Sayakkara
                      </p>
                      <p className="text-sm text-slate-500">
                        onethsayakkara@gmail.com
                      </p>
                    </div>
                    <div className="py-2">
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 bg-blue-50 text-blue-700 font-medium transition-colors">
                        <User className="w-4 h-4" />
                        <span className="text-sm">My Profile</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors">
                        <Award className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          My Achievements
                        </span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors">
                        <Settings className="w-4 h-4" />
                        <span className="text-sm font-medium">Settings</span>
                      </button>
                    </div>
                    <div className="border-t border-slate-200 py-2">
                      <button
                        onClick={() => (window.location.href = "/login")}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 space-y-8">
        {/* --- Profile Banner --- */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Left Side: Avatar & Name */}
            <div className="flex-1 flex flex-col md:flex-row items-center md:items-center gap-6 text-center md:text-left">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-slate-600 text-white flex items-center justify-center text-5xl font-medium border-4 border-white shadow-lg">
                  ON
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-colors border-2 border-white">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                <p className="text-slate-500 font-medium">Welcome,</p>
                <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">
                  {profile.name}
                </h1>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                  {profile.role}
                </span>
              </div>
            </div>

            {/* Right Side: Stats */}
            <div className="w-full md:w-auto flex flex-row justify-center md:justify-end items-center gap-4 md:gap-8 border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-8">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-2">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-2xl font-semibold text-slate-900">2</span>
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                  Certificates
                </span>
              </div>
              <div className="w-px h-12 bg-slate-200 hidden md:block"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <span className="text-2xl font-semibold text-slate-900">4</span>
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                  Completed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- Tabs Navigation --- */}
        <div className="border-b border-slate-200">
          <nav
            className="flex space-x-8 overflow-x-auto scrollbar-hidden"
            aria-label="Tabs"
          >
            {[
              {
                id: "profile",
                label: "Profile",
                icon: User
              },
              {
                id: "achievements",
                label: "Achievements & Certifications",
                icon: Award
              },
              {
                id: "history",
                label: "Learning History",
                icon: Clock
              }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors
                  ${activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }
                `}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* --- Tab Content --- */}
        <div className="min-h-[500px]">
          {/* TAB 1: PROFILE */}
          {activeTab === "profile" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Personal Information */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-900">
                      Personal Information
                    </h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit Profile
                      </button>
                    ) : (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="text-slate-600 hover:text-slate-800 font-medium text-sm"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveProfile}
                          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={profile.name}
                        onChange={e =>
                          setProfile({
                            ...profile,
                            name: e.target.value
                          })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 disabled:bg-slate-50 disabled:text-slate-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        disabled={!isEditing}
                        value={profile.email}
                        onChange={e =>
                          setProfile({
                            ...profile,
                            email: e.target.value
                          })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-slate-300  disabled:bg-slate-50 disabled:text-slate-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        disabled={!isEditing}
                        value={profile.phone}
                        onChange={e =>
                          setProfile({
                            ...profile,
                            phone: e.target.value
                          })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-slate-300  disabled:bg-slate-50 disabled:text-slate-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        Country
                      </label>
                      <select
                        disabled={!isEditing}
                        value={profile.country}
                        onChange={e =>
                          setProfile({
                            ...profile,
                            country: e.target.value
                          })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-slate-300  disabled:bg-slate-50 disabled:text-slate-500 transition-colors"
                      >
                        <option>Sri Lanka</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Australia</option>
                      </select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-slate-700">
                        Organization
                      </label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={profile.organization}
                        onChange={e =>
                          setProfile({
                            ...profile,
                            organization: e.target.value
                          })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-slate-300  disabled:bg-slate-50 disabled:text-slate-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-slate-700">
                        Bio
                      </label>
                      <textarea
                        rows={4}
                        disabled={!isEditing}
                        value={profile.bio}
                        onChange={e =>
                          setProfile({
                            ...profile,
                            bio: e.target.value
                          })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-slate-300  disabled:bg-slate-50 disabled:text-slate-500 transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Settings Sidebar */}
              <div className="space-y-8">
                {/* Account Settings */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-slate-500" />
                    Account Settings
                  </h2>
                  <div className="space-y-6">
                    <button
                      onClick={() => setShowPasswordModal(true)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors group"
                    >
                      <span className="font-medium text-slate-700">
                        Change Password
                      </span>
                      <Lock className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                    </button>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-slate-700 block">
                        Language
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <select
                          value={profile.language}
                          onChange={e =>
                            setProfile({
                              ...profile,
                              language: e.target.value
                            })
                          }
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300  bg-white text-sm"
                        >
                          <option>English (US)</option>
                          <option>Spanish</option>
                          <option>French</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-slate-700 block">
                        Time Zone
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <select
                          value={profile.timezone}
                          onChange={e =>
                            setProfile({
                              ...profile,
                              timezone: e.target.value
                            })
                          }
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300  bg-white text-sm"
                        >
                          <option>(GMT+05:30) Sri Jayawardenepura</option>
                          <option>(GMT+00:00) London</option>
                          <option>(GMT-05:00) Eastern Time</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Privacy Settings */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-slate-500" />
                    Privacy Settings
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">
                        Public Profile
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profile.privacy.publicProfile}
                          onChange={e =>
                            setProfile({
                              ...profile,
                              privacy: {
                                ...profile.privacy,
                                publicProfile: e.target.checked
                              }
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">
                        Show Achievements
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profile.privacy.showAchievements}
                          onChange={e =>
                            setProfile({
                              ...profile,
                              privacy: {
                                ...profile.privacy,
                                showAchievements: e.target.checked
                              }
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ACHIEVEMENTS & CERTIFICATIONS */}
          {activeTab === "achievements" && (
            <div className="space-y-12">
              {/* Filter Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                  <span className="text-sm font-medium text-slate-500 mr-2">
                    Filter by:
                  </span>
                  {["all", "upc", "utc", "urc"].map(filter => (
                    <button
                      key={filter}
                      onClick={() => setCertFilter(filter)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${certFilter === filter
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                    >
                      {filter.toUpperCase()}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-sm font-medium text-slate-500">
                    Sort by:
                  </span>
                  <select className="px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Latest First</option>
                    <option>Oldest First</option>
                    <option>Name (A-Z)</option>
                  </select>
                </div>
              </div>

              {/* Achievements Section */}
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-amber-500" />
                  Achievements
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAchievements.map(achievement => (
                    <div
                      key={achievement.id}
                      className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow flex items-start gap-4"
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${achievement.type === "gold"
                            ? "bg-amber-100 text-amber-600"
                            : achievement.type === "silver"
                              ? "bg-slate-100 text-slate-500"
                              : "bg-orange-100 text-orange-600"
                          }`}
                      >
                        {achievement.icon === "trophy" ? (
                          <Trophy className="w-6 h-6" />
                        ) : achievement.icon === "star" ? (
                          <Star className="w-6 h-6" />
                        ) : (
                          <Medal className="w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {achievement.name}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                          {achievement.description}
                        </p>
                        <p className="text-xs text-slate-400 mt-3">
                          Earned on {achievement.earnedDate}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Certifications Section */}
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 text-blue-600" />
                  Certifications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCertificates.map(cert => {
                    const styles = getCurriculumColor(cert.curriculum)
                    return (
                      <div
                        key={cert.id}
                        className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group"
                      >
                        <div

                        />
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div
                              className={`w-12 h-12 rounded-lg flex items-center justify-center ${styles.light}`}
                            >
                              <Award className={`w-6 h-6 ${styles.text}`} />
                            </div>
                            <span
                              className={`px-2 py-1 rounded text-xs font-bold uppercase ${styles.badge}`}
                            >
                              {cert.curriculum}
                            </span>
                          </div>
                          <h3 className="font-semibold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {cert.programName}
                          </h3>
                          <p className="text-sm text-slate-500 font-mono mb-1">
                            ID: {cert.certificateId}
                          </p>
                          <p className="text-sm text-slate-500 mb-6">
                            Issued: {cert.issueDate}
                          </p>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => window.open('/pdf/ABDULLAHI MUSA_UTC 5.pdf', '_self')}
                              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-lg text-sm transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-lg text-sm transition-colors">
                              <Download className="w-4 h-4" />
                              PDF
                            </button>
                            <button className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg transition-colors">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            </div>
          )}

          {/* TAB 3: LEARNING HISTORY */}
          {activeTab === "history" && (
            <div className="space-y-8">
              {/* Summary Stats */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  {
                    label: "Enrolled",
                    value: "6",
                    icon: BookOpen,
                    color: "text-blue-600",
                    bg: "bg-blue-50"
                  },
                  {
                    label: "Completed",
                    value: "4",
                    icon: CheckCircle,
                    color: "text-green-600",
                    bg: "bg-green-50"
                  },
                  {
                    label: "In Progress",
                    value: "2",
                    icon: Play,
                    color: "text-amber-600",
                    bg: "bg-amber-50"
                  },
                  {
                    label: "Avg. Time",
                    value: "32h",
                    icon: Clock,
                    color: "text-purple-600",
                    bg: "bg-purple-50"
                  },
                  {
                    label: "Total Hours",
                    value: "120",
                    icon: Trophy,
                    color: "text-indigo-600",
                    bg: "bg-indigo-50"
                  }
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center"
                  >
                    <div
                      className={`w-8 h-8 ${stat.bg} ${stat.color} rounded-full flex items-center justify-center mb-2`}
                    >
                      <stat.icon className="w-4 h-4" />
                    </div>
                    <span className="text-xl font-bold text-slate-900">
                      {stat.value}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <select
                    value={historyFilter}
                    onChange={e => setHistoryFilter(e.target.value)}
                    className="flex-1 sm:w-48 px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Activity Types</option>
                    <option value="enrollment">Enrollments</option>
                    <option value="completion">Completions</option>
                    <option value="exam">Exams</option>
                    <option value="certificate">Certificates</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <select className="flex-1 sm:w-48 px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Last 30 Days</option>
                    <option>Last 6 Months</option>
                    <option>Last Year</option>
                    <option>All Time</option>
                  </select>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                  <h3 className="font-bold text-slate-900">
                    Activity Timeline
                  </h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {historyData
                    .filter(
                      item =>
                        historyFilter === "all" || item.type === historyFilter
                    )
                    .map(activity => (
                      <div
                        key={activity.id}
                        className="p-6 hover:bg-slate-50 transition-colors flex gap-4"
                      >
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                            {getActivityIcon(activity.type)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                            <p className="font-medium text-slate-900">
                              {activity.description}
                            </p>
                            <span className="text-xs text-slate-500 whitespace-nowrap">
                              {activity.date}
                            </span>
                          </div>
                          <p className="text-sm text-blue-600 font-medium mt-0.5">
                            {activity.courseName}
                          </p>
                          {activity.status && (
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-2 capitalize
                            ${activity.status === "completed"
                                  ? "bg-green-100 text-green-700"
                                  : activity.status === "passed"
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-blue-100 text-blue-700"
                                }`}
                            >
                              {activity.status}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="p-4 border-t border-slate-200 text-center">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                    Load More Activity
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* --- Modals --- */}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-900">
                Change Password
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Current Password
                </label>
                <input
                  type="password"
                  class="w-full px-4 py-2 rounded-lg border border-slate-300 "
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  New Password
                </label>
                <input
                  type="password"
                  class="w-full px-4 py-2 rounded-lg border border-slate-300 "
                />
                <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-amber-500"></div>
                </div>
                <p className="text-xs text-amber-600">Medium strength</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  class="w-full px-4 py-2 rounded-lg border border-slate-300 "
                />
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 text-slate-600 font-medium hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {showCertificateModal && selectedCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center flex-shrink-0">
              <h3 className="font-bold text-lg text-slate-900">
                Certificate Preview
              </h3>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-8 bg-slate-100 flex items-center justify-center">
              {/* Mock Certificate Visual */}
              <div className="bg-white w-full max-w-3xl aspect-[1.414/1] shadow-lg border-8 border-double border-slate-200 p-12 flex flex-col items-center text-center justify-between relative">
                <div className="absolute top-0 left-0 w-full h-4  "></div>

                <div className="space-y-6">
                  <div className="w-20 h-20 bg-slate-900 text-white rounded-xl flex items-center justify-center text-2xl font-bold mx-auto">
                    UC
                  </div>
                  <h1 className="text-4xl font-serif text-slate-900">
                    Certificate of Completion
                  </h1>
                  <p className="text-slate-500 text-lg">
                    This is to certify that
                  </p>
                  <p className="text-3xl font-bold text-blue-900 font-serif italic">
                    {profile.name}
                  </p>
                  <p className="text-slate-500 text-lg">
                    has successfully completed the program
                  </p>
                  <h2 className="text-2xl font-bold text-slate-800">
                    {selectedCertificate.programName}
                  </h2>
                </div>

                <div className="flex justify-between w-full items-end mt-12">
                  <div className="text-left">
                    <p className="text-sm text-slate-500">Date Issued</p>
                    <p className="font-medium">
                      {selectedCertificate.issueDate}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 border-4 border-slate-200 rounded-full flex items-center justify-center text-slate-300 mb-2">
                      <Award className="w-12 h-12" />
                    </div>
                    <p className="text-xs text-slate-400">OFFICIAL SEAL</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Certificate ID</p>
                    <p className="font-mono font-medium">
                      {selectedCertificate.certificateId}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-white border-t border-slate-200 flex justify-between items-center flex-shrink-0">
              <div className="flex gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4" /> Verified Certificate
                </span>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 flex items-center gap-2">
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside handler for dropdowns */}
      {(showNotifications || showUserMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotifications(false)
            setShowUserMenu(false)
          }}
        />
      )}
      <Footer />
    </div>
  )
}
