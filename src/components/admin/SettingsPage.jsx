import React, { useState } from "react"
import {
  Globe,
  Bell,
  Shield,
  Users,
  GraduationCap,
  Save,
  Check,
  AlertCircle
} from "lucide-react"
export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [saveStatus, setSaveStatus] = useState("idle")
  // General Settings State
  const [generalSettings, setGeneralSettings] = useState({
    platformName: "Universal Curricula",
    tagline: "Professional Development in Prevention, Treatment & Recovery",
    supportEmail: "support@universalcurricula.org",
    timezone: "UTC",
    language: "en",
    maintenanceMode: false
  })
  // Registration Settings State
  const [registrationSettings, setRegistrationSettings] = useState({
    registrationMode: "approval",
    emailVerification: true,
    autoApproveStudents: false,
    requireOrganization: true,
    requireBio: false,
    termsRequired: true
  })
  // Course Settings State
  const [courseSettings, setCourseSettings] = useState({
    defaultPassingScore: 70,
    preTestPassingScore: 70,
    examPassingScore: 70,
    maxExamAttempts: 3,
    certificateValidityYears: 3,
    showCorrectAnswers: true,
    allowCourseReview: true
  })
  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    welcomeEmail: true,
    approvalEmail: true,
    enrollmentEmail: true,
    completionEmail: true,
    certificateEmail: true,
    reminderEmails: true,
    adminNewUserAlert: true,
    adminCourseSubmitAlert: true
  })
  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    minPasswordLength: 8,
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
    sessionTimeoutMinutes: 60,
    maxLoginAttempts: 5,
    lockoutDurationMinutes: 30
  })
  const handleSave = () => {
    setSaveStatus("saving")
    // Simulate API call
    setTimeout(() => {
      setSaveStatus("saved")
      setTimeout(() => setSaveStatus("idle"), 2000)
    }, 1000)
  }
  const tabs = [
    {
      id: "general",
      label: "General",
      icon: Globe
    },
    {
      id: "registration",
      label: "Registration",
      icon: Users
    },
    {
      id: "courses",
      label: "Courses & Exams",
      icon: GraduationCap
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell
    },
    {
      id: "security",
      label: "Security",
      icon: Shield
    }
  ]
  const Toggle = ({ enabled, onChange }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        enabled ? "bg-blue-600" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
          enabled ? "left-7" : "left-1"
        }`}
      />
    </button>
  )
  return (
    <>
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
          <p className="text-slate-600">
            Configure platform settings and preferences
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saveStatus === "saving"}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all ${
            saveStatus === "saved"
              ? "bg-green-600 text-white"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {saveStatus === "saving" ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : saveStatus === "saved" ? (
            <>
              <Check className="w-4 h-4" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Tabs */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                    : "text-slate-600 hover:bg-slate-50 border-l-4 border-transparent"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {/* General Settings */}
          {activeTab === "general" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">
                  General Settings
                </h2>
                <p className="text-sm text-slate-500">
                  Basic platform configuration
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Platform Name
                  </label>
                  <input
                    type="text"
                    value={generalSettings.platformName}
                    onChange={e =>
                      setGeneralSettings({
                        ...generalSettings,
                        platformName: e.target.value
                      })
                    }
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={generalSettings.tagline}
                    onChange={e =>
                      setGeneralSettings({
                        ...generalSettings,
                        tagline: e.target.value
                      })
                    }
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Support Email
                  </label>
                  <input
                    type="email"
                    value={generalSettings.supportEmail}
                    onChange={e =>
                      setGeneralSettings({
                        ...generalSettings,
                        supportEmail: e.target.value
                      })
                    }
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Timezone
                    </label>
                    <select
                      value={generalSettings.timezone}
                      onChange={e =>
                        setGeneralSettings({
                          ...generalSettings,
                          timezone: e.target.value
                        })
                      }
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">
                        Eastern Time (US)
                      </option>
                      <option value="America/Los_Angeles">
                        Pacific Time (US)
                      </option>
                      <option value="Europe/London">London (GMT)</option>
                      <option value="Asia/Manila">Manila (PHT)</option>
                      <option value="Asia/Singapore">Singapore (SGT)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Default Language
                    </label>
                    <select
                      value={generalSettings.language}
                      onChange={e =>
                        setGeneralSettings({
                          ...generalSettings,
                          language: e.target.value
                        })
                      }
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="ar">Arabic</option>
                      <option value="zh">Chinese</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Maintenance Mode
                      </h3>
                      <p className="text-sm text-slate-500">
                        Temporarily disable access for non-admin users
                      </p>
                    </div>
                    <Toggle
                      enabled={generalSettings.maintenanceMode}
                      onChange={val =>
                        setGeneralSettings({
                          ...generalSettings,
                          maintenanceMode: val
                        })
                      }
                    />
                  </div>
                  {generalSettings.maintenanceMode && (
                    <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-center gap-2 text-orange-800 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      Platform is in maintenance mode. Only admins can access.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Registration Settings */}
          {activeTab === "registration" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">
                  Registration Settings
                </h2>
                <p className="text-sm text-slate-500">
                  Control how users can register on the platform
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Registration Mode
                  </label>
                  <div className="space-y-2">
                    {[
                      {
                        value: "open",
                        label: "Open Registration",
                        desc: "Anyone can register and access immediately"
                      },
                      {
                        value: "approval",
                        label: "Approval Required",
                        desc: "New registrations require admin approval"
                      },
                      {
                        value: "closed",
                        label: "Closed",
                        desc: "Registration is disabled, invite only"
                      }
                    ].map(option => (
                      <label
                        key={option.value}
                        className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                          registrationSettings.registrationMode === option.value
                            ? "border-blue-600 bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="registrationMode"
                          value={option.value}
                          checked={
                            registrationSettings.registrationMode ===
                            option.value
                          }
                          onChange={e =>
                            setRegistrationSettings({
                              ...registrationSettings,
                              registrationMode: e.target.value
                            })
                          }
                          className="mt-1"
                        />
                        <div>
                          <span className="font-medium text-slate-900">
                            {option.label}
                          </span>
                          <p className="text-sm text-slate-500">
                            {option.desc}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 space-y-4">
                  <h3 className="font-semibold text-slate-900">
                    Registration Requirements
                  </h3>

                  {[
                    {
                      key: "emailVerification",
                      label: "Require Email Verification",
                      desc: "Users must verify email before accessing"
                    },
                    {
                      key: "autoApproveStudents",
                      label: "Auto-approve Student Members",
                      desc:
                        "Automatically approve student category registrations"
                    },
                    {
                      key: "requireOrganization",
                      label: "Require Organization",
                      desc: "Organization field is mandatory"
                    },
                    {
                      key: "requireBio",
                      label: "Require Bio/Profile",
                      desc: "Short bio is mandatory during registration"
                    },
                    {
                      key: "termsRequired",
                      label: "Require Terms Acceptance",
                      desc: "Users must accept terms and conditions"
                    }
                  ].map(setting => (
                    <div
                      key={setting.key}
                      className="flex items-center justify-between py-2"
                    >
                      <div>
                        <h4 className="font-medium text-slate-900">
                          {setting.label}
                        </h4>
                        <p className="text-sm text-slate-500">{setting.desc}</p>
                      </div>
                      <Toggle
                        enabled={registrationSettings[setting.key]}
                        onChange={val =>
                          setRegistrationSettings({
                            ...registrationSettings,
                            [setting.key]: val
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Course Settings */}
          {activeTab === "courses" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">
                  Course & Exam Settings
                </h2>
                <p className="text-sm text-slate-500">
                  Default settings for courses and assessments
                </p>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Pre-Test Passing Score (%)
                    </label>
                    <input
                      type="number"
                      min="50"
                      max="100"
                      value={courseSettings.preTestPassingScore}
                      onChange={e =>
                        setCourseSettings({
                          ...courseSettings,
                          preTestPassingScore: parseInt(e.target.value)
                        })
                      }
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Final Exam Passing Score (%)
                    </label>
                    <input
                      type="number"
                      min="50"
                      max="100"
                      value={courseSettings.examPassingScore}
                      onChange={e =>
                        setCourseSettings({
                          ...courseSettings,
                          examPassingScore: parseInt(e.target.value)
                        })
                      }
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Max Exam Attempts
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={courseSettings.maxExamAttempts}
                      onChange={e =>
                        setCourseSettings({
                          ...courseSettings,
                          maxExamAttempts: parseInt(e.target.value)
                        })
                      }
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Certificate Validity (Years)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={courseSettings.certificateValidityYears}
                      onChange={e =>
                        setCourseSettings({
                          ...courseSettings,
                          certificateValidityYears: parseInt(e.target.value)
                        })
                      }
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 space-y-4">
                  <h3 className="font-semibold text-slate-900">
                    Exam Behavior
                  </h3>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="font-medium text-slate-900">
                        Show Correct Answers
                      </h4>
                      <p className="text-sm text-slate-500">
                        Display correct answers after exam submission
                      </p>
                    </div>
                    <Toggle
                      enabled={courseSettings.showCorrectAnswers}
                      onChange={val =>
                        setCourseSettings({
                          ...courseSettings,
                          showCorrectAnswers: val
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="font-medium text-slate-900">
                        Allow Course Review
                      </h4>
                      <p className="text-sm text-slate-500">
                        Let learners review completed courses
                      </p>
                    </div>
                    <Toggle
                      enabled={courseSettings.allowCourseReview}
                      onChange={val =>
                        setCourseSettings({
                          ...courseSettings,
                          allowCourseReview: val
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">
                  Notification Settings
                </h2>
                <p className="text-sm text-slate-500">
                  Configure email notifications
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-4">
                    User Notifications
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        key: "welcomeEmail",
                        label: "Welcome Email",
                        desc: "Send welcome email on registration"
                      },
                      {
                        key: "approvalEmail",
                        label: "Approval Email",
                        desc: "Notify when registration is approved"
                      },
                      {
                        key: "enrollmentEmail",
                        label: "Enrollment Confirmation",
                        desc: "Confirm course enrollment"
                      },
                      {
                        key: "completionEmail",
                        label: "Course Completion",
                        desc: "Notify when course is completed"
                      },
                      {
                        key: "certificateEmail",
                        label: "Certificate Issued",
                        desc: "Notify when certificate is ready"
                      },
                      {
                        key: "reminderEmails",
                        label: "Progress Reminders",
                        desc: "Send reminders for incomplete courses"
                      }
                    ].map(setting => (
                      <div
                        key={setting.key}
                        className="flex items-center justify-between py-2 px-4 bg-slate-50 rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium text-slate-900">
                            {setting.label}
                          </h4>
                          <p className="text-sm text-slate-500">
                            {setting.desc}
                          </p>
                        </div>
                        <Toggle
                          enabled={notificationSettings[setting.key]}
                          onChange={val =>
                            setNotificationSettings({
                              ...notificationSettings,
                              [setting.key]: val
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-4">
                    Admin Notifications
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        key: "adminNewUserAlert",
                        label: "New User Registration",
                        desc: "Alert admins of new registrations"
                      },
                      {
                        key: "adminCourseSubmitAlert",
                        label: "Course Submission",
                        desc: "Alert when course is submitted for approval"
                      }
                    ].map(setting => (
                      <div
                        key={setting.key}
                        className="flex items-center justify-between py-2 px-4 bg-slate-50 rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium text-slate-900">
                            {setting.label}
                          </h4>
                          <p className="text-sm text-slate-500">
                            {setting.desc}
                          </p>
                        </div>
                        <Toggle
                          enabled={notificationSettings[setting.key]}
                          onChange={val =>
                            setNotificationSettings({
                              ...notificationSettings,
                              [setting.key]: val
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">
                  Security Settings
                </h2>
                <p className="text-sm text-slate-500">
                  Password policies and session management
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-4">
                    Password Requirements
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Minimum Password Length
                      </label>
                      <input
                        type="number"
                        min="6"
                        max="20"
                        value={securitySettings.minPasswordLength}
                        onChange={e =>
                          setSecuritySettings({
                            ...securitySettings,
                            minPasswordLength: parseInt(e.target.value)
                          })
                        }
                        className="w-32 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>

                    <div className="space-y-3">
                      {[
                        {
                          key: "requireUppercase",
                          label: "Require Uppercase Letter",
                          desc: "At least one uppercase letter (A-Z)"
                        },
                        {
                          key: "requireNumbers",
                          label: "Require Numbers",
                          desc: "At least one number (0-9)"
                        },
                        {
                          key: "requireSpecialChars",
                          label: "Require Special Characters",
                          desc: "At least one special character (!@#$%^&*)"
                        }
                      ].map(setting => (
                        <div
                          key={setting.key}
                          className="flex items-center justify-between py-2"
                        >
                          <div>
                            <h4 className="font-medium text-slate-900">
                              {setting.label}
                            </h4>
                            <p className="text-sm text-slate-500">
                              {setting.desc}
                            </p>
                          </div>
                          <Toggle
                            enabled={securitySettings[setting.key]}
                            onChange={val =>
                              setSecuritySettings({
                                ...securitySettings,
                                [setting.key]: val
                              })
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-4">
                    Session & Login
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Session Timeout (min)
                      </label>
                      <input
                        type="number"
                        min="15"
                        max="480"
                        value={securitySettings.sessionTimeoutMinutes}
                        onChange={e =>
                          setSecuritySettings({
                            ...securitySettings,
                            sessionTimeoutMinutes: parseInt(e.target.value)
                          })
                        }
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Max Login Attempts
                      </label>
                      <input
                        type="number"
                        min="3"
                        max="10"
                        value={securitySettings.maxLoginAttempts}
                        onChange={e =>
                          setSecuritySettings({
                            ...securitySettings,
                            maxLoginAttempts: parseInt(e.target.value)
                          })
                        }
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Lockout Duration (min)
                      </label>
                      <input
                        type="number"
                        min="5"
                        max="120"
                        value={securitySettings.lockoutDurationMinutes}
                        onChange={e =>
                          setSecuritySettings({
                            ...securitySettings,
                            lockoutDurationMinutes: parseInt(e.target.value)
                          })
                        }
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
