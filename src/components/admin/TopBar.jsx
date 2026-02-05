import React, { useEffect, useState } from 'react'
import { Menu, ChevronRight, Search, Bell } from 'lucide-react'

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard"
  },
  {
    id: "users",
    label: "User Management"
  },
  {
    id: "curricula",
    label: "Curricula"
  },
  {
    id: "courses",
    label: "Courses"
  },
  {
    id: "enrollments",
    label: "Enrollments"
  },
  {
    id: "certifications",
    label: "Certifications"
  },
  {
    id: "content",
    label: "Content & News"
  },
  {
    id: "reports",
    label: "Reports & Analytics"
  },
  {
    id: "settings",
    label: "Settings"
  }
]

export const TopBar = ({ collapsed, setSidebarOpen, currentPage = "dashboard" }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [userEmail, setUserEmail] = useState("")

    useEffect(() => {
      const email = localStorage.getItem("email") || ""
      
      setUserEmail(email)
    }, [])


    const getUserInitials = (email) => {
    if (!email) return "U"
    
    // If email has a name before @
    const namePart = email.split('@')[0]
    const names = namePart.split(/[._-]/)
    
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase()
    }
    
    return namePart.substring(0, 2).toUpperCase()
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between px-4 lg:px-8 h-16">
        {/* Left: Mobile menu + Breadcrumb */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden md:flex items-center gap-2 text-sm">
            <span className="text-slate-500">Dashboard</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="text-slate-900 font-medium">
              {menuItems.find(item => item.id === currentPage)?.label ||
                "Overview"}
            </span>
          </div>
        </div>

        {/* Right: Search, Notifications, Profile */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg border border-slate-200 w-64">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-slate-900 placeholder-slate-400"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-xl">
                <div className="p-4 border-b border-slate-200">
                  <h3 className="font-semibold text-slate-900">
                    Notifications
                  </h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {[
                    {
                      text: "New user registration pending approval",
                      time: "5 min ago",
                      type: "info"
                    },
                    {
                      text: "Certificate request from John Doe",
                      time: "1 hour ago",
                      type: "warning"
                    },
                    {
                      text: "Course approval needed: UPC 10",
                      time: "2 hours ago",
                      type: "info"
                    }
                  ].map((notif, index) => (
                    <div
                      key={index}
                      className="p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer"
                    >
                      <p className="text-sm text-slate-900">{notif.text}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {notif.time}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-slate-200">
                  <button className="text-sm text-slate-600 hover:text-slate-900 font-medium">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {getUserInitials(userEmail)}
          </div>
        </div>
      </div>
    </header>
  )
}
