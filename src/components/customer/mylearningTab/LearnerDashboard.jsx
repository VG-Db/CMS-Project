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
    ArrowRight,
    Trophy,
    Download,
    Eye,
    Star,
    Medal,
    BookOpen,
    Search,
    Plus
} from "lucide-react"
import { Footer } from "../../Footer"
// Mock data - Enrolled programs
const enrolledPrograms = [
    {
        id: "1",
        title: "Introduction to Prevention Science",
        code: "UPC 1",
        curriculum: "upc",
        status: "in-progress",
        progress: 65,
        duration: "40 hours",
        completedModules: 3,
        totalModules: 5,
        enrolledDate: "2025-01-15"
    },
    {
        id: "2",
        title: "Treatment for Substance Use Disorders",
        code: "UTC 2",
        curriculum: "utc",
        status: "in-progress",
        progress: 40,
        duration: "33 hours",
        completedModules: 2,
        totalModules: 6,
        enrolledDate: "2025-01-20"
    },
    {
        id: "3",
        title: "The PEER Model",
        code: "URC 1",
        curriculum: "urc",
        status: "completed",
        progress: 100,
        duration: "24 hours",
        completedModules: 4,
        totalModules: 4,
        enrolledDate: "2024-12-01"
    },
    {
        id: "4",
        title: "Family Based Prevention Interventions",
        code: "UPC 4",
        curriculum: "upc",
        status: "in-progress",
        progress: 25,
        duration: "32 hours",
        completedModules: 1,
        totalModules: 4,
        enrolledDate: "2025-01-25"
    },
    {
        id: "5",
        title: "Basic Counselling Skills",
        code: "UTC 4",
        curriculum: "utc",
        status: "not-started",
        progress: 0,
        duration: "33 hours",
        completedModules: 0,
        totalModules: 5,
        enrolledDate: "2025-01-28"
    },
    {
        id: "6",
        title: "School-based Prevention Interventions",
        code: "UPC 5",
        curriculum: "upc",
        status: "in-progress",
        progress: 80,
        duration: "40 hours",
        completedModules: 4,
        totalModules: 5,
        enrolledDate: "2024-11-15"
    }
]
// All available programs (including ones not enrolled)
const allPrograms = [
    ...enrolledPrograms,
    {
        id: "7",
        title: "Advanced Prevention Strategies",
        code: "UPC 2",
        curriculum: "upc",
        status: "not-enrolled",
        progress: 0,
        duration: "45 hours",
        completedModules: 0,
        totalModules: 6,
        enrolledDate: ""
    },
    {
        id: "8",
        title: "Community-Based Prevention",
        code: "UPC 3",
        curriculum: "upc",
        status: "not-enrolled",
        progress: 0,
        duration: "38 hours",
        completedModules: 0,
        totalModules: 5,
        enrolledDate: ""
    },
    {
        id: "9",
        title: "Introduction to Treatment",
        code: "UTC 1",
        curriculum: "utc",
        status: "not-enrolled",
        progress: 0,
        duration: "30 hours",
        completedModules: 0,
        totalModules: 4,
        enrolledDate: ""
    },
    {
        id: "10",
        title: "Motivational Interviewing",
        code: "UTC 3",
        curriculum: "utc",
        status: "not-enrolled",
        progress: 0,
        duration: "28 hours",
        completedModules: 0,
        totalModules: 4,
        enrolledDate: ""
    },
    {
        id: "11",
        title: "Group Therapy Techniques",
        code: "UTC 5",
        curriculum: "utc",
        status: "not-enrolled",
        progress: 0,
        duration: "35 hours",
        completedModules: 0,
        totalModules: 5,
        enrolledDate: ""
    },
    {
        id: "12",
        title: "Recovery Capital Assessment",
        code: "URC 2",
        curriculum: "urc",
        status: "not-enrolled",
        progress: 0,
        duration: "26 hours",
        completedModules: 0,
        totalModules: 4,
        enrolledDate: ""
    },
    {
        id: "13",
        title: "Building Recovery Communities",
        code: "URC 3",
        curriculum: "urc",
        status: "not-enrolled",
        progress: 0,
        duration: "32 hours",
        completedModules: 0,
        totalModules: 5,
        enrolledDate: ""
    }
]
const achievements = [
    {
        id: "1",
        name: "First Course Complete!",
        description: "Completed your first program",
        type: "gold",
        earnedDate: "2025-01-10",
        icon: "trophy"
    },
    {
        id: "2",
        name: "Quick Learner",
        description: "Completed a module in one session",
        type: "silver",
        earnedDate: "2025-01-18",
        icon: "star"
    },
    {
        id: "3",
        name: "Prevention Pioneer",
        description: "Started your first UPC course",
        type: "bronze",
        earnedDate: "2025-01-15",
        icon: "medal"
    }
]
const certificates = [
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
    }
]
const notifications = [
    {
        id: "1",
        message: "New course available: UTC 5",
        time: "2 hours ago",
        unread: true
    },
    {
        id: "2",
        message: "Certificate approved for URC 1",
        time: "1 day ago",
        unread: true
    },
    {
        id: "3",
        message: "Reminder: Complete UPC 1 assessment",
        time: "2 days ago",
        unread: false
    },
    {
        id: "4",
        message: "Achievement unlocked: Quick Learner",
        time: "3 days ago",
        unread: false
    },
    {
        id: "5",
        message: "Welcome to Universal Curricula!",
        time: "1 week ago",
        unread: false
    }
]
export function LearnerDashboard() {
    const [activeFilter, setActiveFilter] = useState("all")
    const [viewFilter, setViewFilter] = useState("pending")
    const [showViewDropdown, setShowViewDropdown] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)
    const unreadCount = notifications.filter(n => n.unread).length
    // Filter programs based on view filter and curriculum filter
    const getFilteredPrograms = () => {
        let programs = []
        switch (viewFilter) {
            case "pending":
                // In progress or not started (enrolled but not completed)
                programs = enrolledPrograms.filter(
                    p => p.status === "in-progress" || p.status === "not-started"
                )
                break
            case "completed":
                // Completed programs
                programs = enrolledPrograms.filter(p => p.status === "completed")
                break
            case "browse":
                // All programs including not enrolled
                programs = allPrograms
                break
        }
        // Apply curriculum filter
        if (activeFilter !== "all") {
            programs = programs.filter(p => p.curriculum === activeFilter)
        }
        return programs
    }
    const filteredPrograms = getFilteredPrograms()
    const getViewFilterLabel = () => {
        switch (viewFilter) {
            case "pending":
                return "My Pending Programs"
            case "completed":
                return "Completed Programs"
            case "browse":
                return "Browse All Programs"
        }
    }
    const getCurriculumColor = curriculum => {
        switch (curriculum) {
            case "upc":
                return {
                    bg: "bg-blue-500",
                    light: "bg-blue-100",
                    text: "text-blue-700",
                    border: "border-blue-200"
                }
            case "utc":
                return {
                    bg: "bg-emerald-500",
                    light: "bg-emerald-100",
                    text: "text-emerald-700",
                    border: "border-emerald-200"
                }
            case "urc":
                return {
                    bg: "bg-purple-500",
                    light: "bg-purple-100",
                    text: "text-purple-700",
                    border: "border-purple-200"
                }
        }
    }
    const getStatusBadge = status => {
        switch (status) {
            case "in-progress":
                return {
                    bg: "bg-amber-100",
                    text: "text-amber-700",
                    label: "In Progress"
                }
            case "completed":
                return {
                    bg: "bg-green-100",
                    text: "text-green-700",
                    label: "Completed"
                }
            case "not-started":
                return {
                    bg: "bg-slate-100",
                    text: "text-slate-600",
                    label: "Not Started"
                }
            case "not-enrolled":
                return {
                    bg: "bg-blue-100",
                    text: "text-blue-700",
                    label: "Available"
                }
        }
    }
    const getAchievementColor = type => {
        switch (type) {
            case "gold":
                return "text-amber-500"
            case "silver":
                return "text-slate-400"
            case "bronze":
                return "text-orange-600"
        }
    }
    const getAchievementBg = type => {
        switch (type) {
            case "gold":
                return "bg-amber-50 border-amber-200"
            case "silver":
                return "bg-slate-50 border-slate-200"
            case "bronze":
                return "bg-orange-50 border-orange-200"
        }
    }
    const handleApply = programId => {
        // In a real app, this would call an API to enroll the user
        alert(`Applied to program ${programId}! You will be enrolled shortly.`)
    }
    return (
        <div>
            <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
                {/* Custom Learner Header */}
                <header className="flex-shrink-0 z-50 bg-white border-b border-slate-200 shadow-sm">
                    <div className="w-full px-4 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Left Side - Logo & Explore */}
                            <div
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => (window.location.href = "/")}
                            >
                                <img
                                    src="/logo2.png"
                                    alt="TrainHub Logo"
                                    className="w-16 h-16 p-2"
                                />

                            </div>

                            {/* Center - Search (optional) */}
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

                            {/* Right Side - Nav Links, Notifications & Profile */}
                            <div className="flex items-center gap-2 sm:gap-8">
                                <button
                                    onClick={() => (window.location.href = "/mylearning")}
                                    className="hidden sm:block px-3 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    My Learning
                                </button>

                                {/* Notifications */}
                                <div className="relative">
                                    <button
                                        onClick={() => {
                                            setShowNotifications(!showNotifications)
                                            setShowUserMenu(false)
                                            setShowViewDropdown(false)
                                        }}
                                        className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                    >
                                        <Bell className="w-5 h-5" />
                                        {unreadCount > 0 && (
                                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                                {unreadCount}
                                            </span>
                                        )}
                                    </button>

                                    {/* Notifications Dropdown */}
                                    {showNotifications && (
                                        <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50">
                                            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                                                <h3 className="font-semibold text-slate-900">
                                                    Notifications
                                                </h3>
                                                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                                                    Mark all as read
                                                </button>
                                            </div>
                                            <div className="max-h-96 overflow-y-auto">
                                                {notifications.map(notif => (
                                                    <div
                                                        key={notif.id}
                                                        className={`px-4 py-3 border-b border-slate-100 hover:bg-slate-50 cursor-pointer ${notif.unread ? "bg-blue-50/50" : ""
                                                            }`}
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            {notif.unread && (
                                                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                                            )}
                                                            <div className={notif.unread ? "" : "ml-5"}>
                                                                <p className="text-sm text-slate-900">
                                                                    {notif.message}
                                                                </p>
                                                                <p className="text-xs text-slate-500 mt-1">
                                                                    {notif.time}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="px-4 py-3 border-t border-slate-200 text-center">
                                                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                                    View all notifications
                                                </button>
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
                                            setShowViewDropdown(false)
                                        }}
                                        className="flex items-center gap-2 p-1  transition-colors"
                                    >
                                        <div className="w-9 h-9 bg-slate-200 hover:bg-slate-200/70 rounded-full flex items-center justify-center text-slate-700 font-semibold text-sm">
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
                                                <p className="font-semibold text-slate-900">Oneth Sayakkara</p>
                                                <p className="text-sm text-slate-500">
                                                    onethsayakkara@gmail.com
                                                </p>
                                            </div>
                                            <div className="py-2">
                                                <button
                                                    onClick={() => (window.location.href = "/profile")}
                                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors"
                                                >
                                                    <User className="w-4 h-4" />
                                                    <span className="text-sm font-medium">My Profile</span>
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        (window.location.href = "/profile?tab=achievements")
                                                    }
                                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors"
                                                >
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

                {/* Main Content - Two Independent Scrollable Columns */}
                <div className="flex-1 overflow-hidden">
                    <div className="h-full w-full px-4 lg:px-8 py-8">
                        <div className="h-full flex flex-col lg:flex-row">
                            {/* Left Column - My Learning (2/3) - Fixed header, scrollable cards */}
                            <div className="flex-1 lg:w-2/3 flex flex-col h-full pr-6 lg:pr-8">
                                {/* Fixed Section Header */}
                                <div className="flex-shrink-0 mb-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <BookOpen className="w-8 h-8 text-slate-700" />
                                            <h1 className="text-3xl font-bold text-slate-900">
                                                My Learning
                                            </h1>
                                        </div>

                                        {/* View Filter Dropdown */}
                                        <div className="relative">
                                            <button
                                                onClick={() => {
                                                    setShowViewDropdown(!showViewDropdown)
                                                    setShowNotifications(false)
                                                    setShowUserMenu(false)
                                                }}
                                                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                                            >
                                                <span className="text-sm font-medium text-slate-700">
                                                    {getViewFilterLabel()}
                                                </span>
                                                <ChevronDown className="w-4 h-4 text-slate-400" />
                                            </button>

                                            {showViewDropdown && (
                                                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50">
                                                    <div className="py-1">
                                                        <button
                                                            onClick={() => {
                                                                setViewFilter("pending")
                                                                setShowViewDropdown(false)
                                                            }}
                                                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${viewFilter === "pending"
                                                                ? "bg-blue-50 text-blue-700"
                                                                : "text-slate-700 hover:bg-slate-50"
                                                                }`}
                                                        >
                                                            <Clock className="w-4 h-4" />
                                                            <span className="text-sm font-medium">
                                                                My Pending Programs
                                                            </span>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setViewFilter("completed")
                                                                setShowViewDropdown(false)
                                                            }}
                                                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${viewFilter === "completed"
                                                                ? "bg-blue-50 text-blue-700"
                                                                : "text-slate-700 hover:bg-slate-50"
                                                                }`}
                                                        >
                                                            <CheckCircle className="w-4 h-4" />
                                                            <span className="text-sm font-medium">
                                                                Completed Programs
                                                            </span>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setViewFilter("browse")
                                                                setShowViewDropdown(false)
                                                            }}
                                                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${viewFilter === "browse"
                                                                ? "bg-blue-50 text-blue-700"
                                                                : "text-slate-700 hover:bg-slate-50"
                                                                }`}
                                                        >
                                                            <Compass className="w-4 h-4" />
                                                            <span className="text-sm font-medium">
                                                                Browse All Programs
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-lg text-slate-600">
                                        {viewFilter === "pending" &&
                                            "In Progress & Not Started Programs"}
                                        {viewFilter === "completed" && "Programs You Have Completed"}
                                        {viewFilter === "browse" && "Explore All Available Programs"}
                                    </p>
                                </div>

                                {/* Fixed Filter Pills */}
                                <div className="flex-shrink-0 flex flex-wrap items-center gap-3 mb-6">
                                    {[
                                        {
                                            id: "all",
                                            label: "All Programs"
                                        },
                                        {
                                            id: "upc",
                                            label: "UPC - Prevention"
                                        },
                                        {
                                            id: "utc",
                                            label: "UTC - Treatment"
                                        },
                                        {
                                            id: "urc",
                                            label: "URC - Recovery"
                                        }
                                    ].map(filter => (
                                        <button
                                            key={filter.id}
                                            onClick={() => setActiveFilter(filter.id)}
                                            className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${activeFilter === filter.id
                                                ? "bg-blue-600 text-white shadow-md"
                                                : "bg-white text-blue-600 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50"
                                                }`}
                                        >
                                            {filter.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Scrollable Programs Grid */}
                                <div className="flex-1 overflow-y-auto pr-2 scrollbar-hidden">
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-4">
                                        {filteredPrograms.map(program => {
                                            const status = getStatusBadge(program.status)
                                            const isNotEnrolled = program.status === "not-enrolled"
                                            return (
                                                <div
                                                    key={program.id}
                                                    className="bg-white rounded-xl border border-slate-200 shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden group cursor-pointer"
                                                >
                                                    {/* Card Body */}
                                                    <div className="p-6">
                                                        {/* Top Row - Badges */}
                                                        <div className="flex items-center justify-between mb-3">
                                                            <span className="px-2.5 py-1 text-xs font-bold rounded bg-yellow-50 text-black">
                                                                {program.curriculum.toUpperCase()}
                                                            </span>
                                                            <span
                                                                className={`px-2.5 py-1 text-xs font-semibold rounded ${status.bg} ${status.text}`}
                                                            >
                                                                {status.label}
                                                            </span>
                                                        </div>

                                                        {/* Program Title */}
                                                        <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                                                            {program.title}
                                                        </h3>
                                                        <p className="text-sm text-slate-500 mb-4">
                                                            {program.code}
                                                        </p>

                                                        {/* Progress Section - Only show for enrolled programs */}
                                                        {!isNotEnrolled && (
                                                            <div className="mb-4">
                                                                <div className="flex items-center justify-between mb-2">
                                                                    <span className="text-sm text-slate-600">
                                                                        Progress
                                                                    </span>
                                                                    <span className="text-sm font-semibold text-slate-900">
                                                                        {program.progress}%
                                                                    </span>
                                                                </div>
                                                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                                                    <div
                                                                        className="h-full bg-blue-600 rounded-full transition-all duration-500"
                                                                        style={{
                                                                            width: `${program.progress}%`
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Stats Row */}
                                                        <div
                                                            className={`flex items-center ${isNotEnrolled
                                                                ? "justify-between"
                                                                : "justify-between"
                                                                } text-sm text-slate-500 mb-5`}
                                                        >
                                                            <div className="flex items-center gap-1.5">
                                                                <Clock className="w-4 h-4" />
                                                                <span>{program.duration}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1.5">
                                                                <BookOpen className="w-4 h-4" />
                                                                <span>Self-paced</span>
                                                            </div>
                                                            {!isNotEnrolled && program.enrolledDate && (
                                                                <div className="flex items-center gap-1.5">
                                                                    <Calendar className="w-4 h-4" />
                                                                    <span>
                                                                        {new Date(
                                                                            program.enrolledDate
                                                                        ).toLocaleDateString("en-US", {
                                                                            month: "short",
                                                                            day: "numeric"
                                                                        })}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Action Button */}
                                                        {isNotEnrolled ? (
                                                            <button
                                                                onClick={() => handleApply(program.id)}
                                                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                                                            >
                                                                <Plus className="w-4 h-4" />
                                                                Apply Now
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() =>
                                                                    (window.location.href = `/learn/${program.id}`)
                                                                }
                                                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                                                            >
                                                                <Play className="w-4 h-4" />
                                                                {program.status === "not-started"
                                                                    ? "Start Learning"
                                                                    : program.status === "completed"
                                                                        ? "Review"
                                                                        : "Continue"}
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {filteredPrograms.length === 0 && (
                                        <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
                                            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                                                No programs found
                                            </h3>
                                            <p className="text-slate-600 mb-6">
                                                {viewFilter === "pending"
                                                    ? "You have no pending programs. Browse all programs to get started!"
                                                    : viewFilter === "completed"
                                                        ? "You haven't completed any programs yet. Keep learning!"
                                                        : "Try selecting a different filter"}
                                            </p>
                                            <button
                                                onClick={() => {
                                                    setViewFilter("browse")
                                                    setActiveFilter("all")
                                                }}
                                                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                Browse Courses
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Vertical Divider */}
                            <div className="hidden lg:block w-px bg-slate-200 flex-shrink-0" />

                            {/* Right Column - Achievements & Certificates (1/3) - Independent Scroll with hidden scrollbar */}
                            <div className="lg:w-[400px] xl:w-[450px] flex-shrink-0 overflow-y-auto pl-6 lg:pl-8 scrollbar-hidden">
                                <div className="space-y-8 pb-4">
                                    {/* Latest Achievements */}
                                    <section>
                                        <div className="flex items-center gap-2 mb-4">
                                            <Trophy className="w-6 h-6 text-amber-500" />
                                            <h2 className="text-xl font-bold text-slate-900">
                                                Latest Achievements
                                            </h2>
                                        </div>

                                        <div className="space-y-3">
                                            {achievements.map(achievement => {
                                                const AchievementIcon =
                                                    achievement.icon === "trophy"
                                                        ? Trophy
                                                        : achievement.icon === "star"
                                                            ? Star
                                                            : Medal
                                                return (
                                                    <div
                                                        key={achievement.id}
                                                        className={`bg-white rounded-xl border p-4 ${getAchievementBg(
                                                            achievement.type
                                                        )} hover:shadow-md transition-shadow`}
                                                    >
                                                        <div className="flex items-start gap-4">
                                                            <div
                                                                className={`w-14 h-14 rounded-full bg-white border-2 ${achievement.type === "gold"
                                                                    ? "border-amber-300"
                                                                    : achievement.type === "silver"
                                                                        ? "border-slate-300"
                                                                        : "border-orange-300"
                                                                    } flex items-center justify-center flex-shrink-0`}
                                                            >
                                                                <AchievementIcon
                                                                    className={`w-7 h-7 ${getAchievementColor(
                                                                        achievement.type
                                                                    )}`}
                                                                />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="font-semibold text-slate-900">
                                                                    {achievement.name}
                                                                </h4>
                                                                <p className="text-sm text-slate-600 mt-0.5">
                                                                    {achievement.description}
                                                                </p>
                                                                <p className="text-xs text-slate-400 mt-2">
                                                                    Earned on{" "}
                                                                    {new Date(
                                                                        achievement.earnedDate
                                                                    ).toLocaleDateString("en-US", {
                                                                        month: "short",
                                                                        day: "numeric",
                                                                        year: "numeric"
                                                                    })}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        {achievements.length === 0 && (
                                            <div className="bg-white rounded-xl border border-slate-200 p-6 text-center">
                                                <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                                <p className="text-slate-600 font-medium">
                                                    No achievements yet
                                                </p>
                                                <p className="text-sm text-slate-500 mt-1">
                                                    Complete courses to earn badges
                                                </p>
                                            </div>
                                        )}
                                    </section>

                                    {/* Certificates */}
                                    <section>
                                        <div className="flex items-center gap-2 mb-4">
                                            <Award className="w-6 h-6 text-blue-600" />
                                            <h2 className="text-xl font-bold text-slate-900">
                                                My Certificates
                                            </h2>
                                        </div>

                                        <div className="space-y-3">
                                            {certificates.map(cert => {
                                                const colors = getCurriculumColor(cert.curriculum)
                                                return (
                                                    <div
                                                        key={cert.id}
                                                        className={`bg-white rounded-xl border-2 ${colors.border} p-4 hover:shadow-md transition-shadow`}
                                                    >
                                                        <div className="text-center">
                                                            <div
                                                                className={`w-12 h-12 ${colors.light} rounded-lg flex items-center justify-center mx-auto mb-3`}
                                                            >
                                                                <Award className={`w-6 h-6 ${colors.text}`} />
                                                            </div>
                                                            <h4 className="font-semibold text-slate-900 text-sm">
                                                                {cert.programName}
                                                            </h4>
                                                            <p className="text-xs font-mono text-slate-500 mt-1">
                                                                {cert.certificateId}
                                                            </p>
                                                            <p className="text-xs text-slate-400 mt-2">
                                                                Issued:{" "}
                                                                {new Date(cert.issueDate).toLocaleDateString(
                                                                    "en-US",
                                                                    {
                                                                        month: "short",
                                                                        day: "numeric",
                                                                        year: "numeric"
                                                                    }
                                                                )}
                                                            </p>

                                                            <div className="flex items-center justify-center gap-2 mt-4">
                                                                <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                                                                    <Download className="w-4 h-4" />
                                                                    PDF
                                                                </button>
                                                                <button
                                                                    onClick={() => window.open('/pdf/ABDULLAHI MUSA_UTC 5.pdf', '_self')}
                                                                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                                                                >
                                                                    <Eye className="w-4 h-4" />
                                                                    View
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        {certificates.length === 0 && (
                                            <div className="bg-white rounded-xl border border-slate-200 p-6 text-center">
                                                <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                                <p className="text-slate-600 font-medium">
                                                    No certificates yet
                                                </p>
                                                <p className="text-sm text-slate-500 mt-1">
                                                    Finish programs to receive certificates
                                                </p>
                                            </div>
                                        )}
                                    </section>

                                    {/* Show All Button */}
                                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-colors">
                                        <a href="/profile?tab=achievements">
                                            Show All Achievements & Certificates
                                        </a>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Click outside to close dropdowns */}
                {(showNotifications || showUserMenu || showViewDropdown) && (
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => {
                            setShowNotifications(false)
                            setShowUserMenu(false)
                            setShowViewDropdown(false)
                        }}
                    />
                )}
            </div>
            <Footer />
        </div>
    )
}
