import React, { useEffect, useState } from "react"
import { Menu, X, LogIn, ChevronDown, LogOut } from "lucide-react"

const curriculaMenu = [
  {
    id: "upc",
    name: "Universal Prevention Curriculum",
    acronym: "UPC",
    courses: [
      "Introduction to Prevention Science",
      "Physiology and Pharmacology",
      "Monitoring and Evaluation",
      "Family Based Prevention",
      "School-based Prevention",
      "Workplace-based Prevention",
      "Environment-based Prevention",
      "Media-based Prevention",
      "Community-based Prevention"
    ]
  },
  {
    id: "utc",
    name: "Universal Treatment Curriculum",
    acronym: "UTC",
    courses: [
      "Introduction to the Science of Addiction",
      "Treatment for Substance Use Disorders",
      "Common Co-occurring Mental Disorders",
      "Basic Counselling Skills",
      "Intake, Screening, Assessment",
      "Case Management",
      "Crisis Intervention",
      "Ethics for Addiction Professionals"
    ]
  },
  {
    id: "urc",
    name: "Universal Recovery Curriculum",
    acronym: "URC",
    courses: ["The PEER Model", "The Recovery Allies Model"]
  }
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showCurriculaDropdown, setShowCurriculaDropdown] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Check if user is logged in
    const logged = localStorage.getItem("logged") === "true"
    const email = localStorage.getItem("email")

    setIsLoggedIn(logged)
    setUserEmail(email || "User")
  }, [])

  const scrollToSection = id => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
      setIsMobileMenuOpen(false)
    }
  }

  const handleLogin = () => {
    window.location.href = "/login"
  }

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("email")
    localStorage.removeItem("password")
    localStorage.removeItem("logged")
    localStorage.removeItem("role")

    // Redirect to login
    window.location.href = "/login"
  }

  const navigateToCurriculum = curriculumId => {
    window.location.href = `/curriculum/${curriculumId}`
    setShowCurriculaDropdown(false)
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!userEmail) return "U"
    const parts = userEmail.split("@")[0].split(".")
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return userEmail[0].toUpperCase()
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200"
          : "bg-white border-b border-slate-200"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => (window.location.href = "/")}
          >
            <img
              src="/logo2.png"
              alt="TrainHub Logo"
              className="w-16 h-16"
            />
            
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Universal Curricula Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShowCurriculaDropdown(true)}
              onMouseLeave={() => setShowCurriculaDropdown(false)}
            >
              <button className="font-medium text-slate-700 hover:text-slate-900 transition-colors flex items-center gap-1">
                Universal Curricula
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${showCurriculaDropdown ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Dropdown Menu */}
              {showCurriculaDropdown && (
                <div className="absolute top-full left-0 mt-2 w-[800px] bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden">
                  <div className="grid grid-cols-3 divide-x divide-slate-200">
                    {curriculaMenu.map(curriculum => (
                      <div
                        key={curriculum.id}
                        className="p-6 hover:bg-slate-50 transition-colors"
                      >
                        <button
                          onClick={() => navigateToCurriculum(curriculum.id)}
                          className="w-full text-left mb-4 group"
                        >
                          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                            {curriculum.acronym}
                          </div>
                          <div className="font-bold text-slate-900 group-hover:text-slate-700 transition-colors mb-2">
                            {curriculum.name}
                          </div>
                        </button>

                        <div className="space-y-2">
                          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                            Courses:
                          </div>
                          {curriculum.courses
                            .slice(0, 5)
                            .map((course, index) => (
                              <div
                                key={index}
                                className="text-sm text-slate-600 leading-relaxed"
                              >
                                • {course}
                              </div>
                            ))}
                          {curriculum.courses.length > 5 && (
                            <div className="text-sm text-slate-500 italic">
                              +{curriculum.courses.length - 5} more courses
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => navigateToCurriculum(curriculum.id)}
                          className="mt-4 text-sm font-semibold text-slate-900 hover:text-slate-700 transition-colors"
                        >
                          View All Courses →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => scrollToSection("what-we-do")}
              className="font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              What We Do
            </button>

            <button
              onClick={() => scrollToSection("how-it-works")}
              className="font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              Success Stories
            </button>

            {/* Show "My Learning" ONLY if logged in */}
            {isLoggedIn && (
              <>
                <div className="w-px h-6 bg-slate-200"></div>
                <button
                  onClick={() => (window.location.href = "/mylearning")}
                  className="font-medium text-slate-700 hover:text-slate-900 transition-colors"
                >
                  My Learning
                </button>
              </>
            )}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              // Show avatar and profile dropdown when logged in
              <div className="relative">
                <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 font-semibold flex items-center justify-center hover:bg-slate-200 transition-colors shadow-sm"
                  title={userEmail}
                >
                  {getUserInitials()}N
                </button>

                                  <div className="hidden sm:flex flex-col items-start">
                    <span className="text-sm font-semibold text-slate-900">
                      User Learer 
                    </span>
                    <span className="text-xs px-1.5 py-0.5 text-blue-700 rounded font-medium">
                      Learner
                    </span>
                  </div>
                  </div>


                {/* Profile Dropdown */}
                {showProfileDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden">
                    <div className="px-4 py-4 border-b border-slate-200">
                      <div className="text-sm text-slate-600">Welcome Back !</div>
                    </div>

                    <div className="py-2">
                      <button
                        onClick={() => {
                          window.location.href = "/mylearning"
                          setShowProfileDropdown(false)
                        }}
                        className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        My Learning
                      </button>
                      <button
                        onClick={() => {
                          window.location.href = "/profile"
                          setShowProfileDropdown(false)
                        }}
                        className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        Profile
                      </button>
                    </div>

                    <div className="border-t border-slate-200 py-2">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Show Login button ONLY if NOT logged in
              <>
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-300 flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {/* Show user info if logged in */}
            {isLoggedIn && (
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-semibold flex items-center justify-center">
                    {getUserInitials()}
                  </div>
                  <div>
                    <div className="text-xs text-slate-600">Logged in as</div>
                    <div className="font-semibold text-slate-900 truncate">
                      {userEmail}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Curricula Section */}
            <div className="border-b border-slate-200 pb-3 mb-3">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                Universal Curricula
              </div>
              {curriculaMenu.map(curriculum => (
                <button
                  key={curriculum.id}
                  onClick={() => navigateToCurriculum(curriculum.id)}
                  className="block w-full text-left px-4 py-3 text-slate-700 font-medium hover:bg-slate-50 rounded-lg transition-colors mb-2"
                >
                  <div className="text-xs text-slate-500 mb-1">
                    {curriculum.acronym}
                  </div>
                  <div className="font-semibold">{curriculum.name}</div>
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollToSection("how-it-works")}
              className="block w-full text-left px-4 py-3 text-slate-700 font-medium hover:bg-slate-50 rounded-lg transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("who-should-certify")}
              className="block w-full text-left px-4 py-3 text-slate-700 font-medium hover:bg-slate-50 rounded-lg transition-colors"
            >
              Who Should Certify
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="block w-full text-left px-4 py-3 text-slate-700 font-medium hover:bg-slate-50 rounded-lg transition-colors"
            >
              Success Stories
            </button>

            {/* Show My Learning ONLY if logged in */}
            {isLoggedIn && (
              <button
                onClick={() => {
                  window.location.href = "/my-learning"
                  setIsMobileMenuOpen(false)
                }}
                className="block w-full text-left px-4 py-3 text-slate-700 font-medium hover:bg-slate-50 rounded-lg transition-colors border-t border-b border-slate-200 py-3 my-3"
              >
                My Learning
              </button>
            )}

            {/* Show logout or login buttons */}
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    window.location.href = "/profile"
                    setIsMobileMenuOpen(false)
                  }}
                  className="block w-full text-left px-4 py-3 text-slate-700 font-medium hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Profile Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-6 py-3 text-red-600 font-semibold border-2 border-red-300 rounded-lg hover:bg-red-50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="w-full px-6 py-3 text-slate-700 font-semibold border-2 border-slate-300 rounded-lg hover:bg-slate-50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
                <button className="w-full px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all duration-300 shadow-sm">
                  Apply Now
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
