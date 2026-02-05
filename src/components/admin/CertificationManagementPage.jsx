import React, { useEffect, useState } from "react"
import {
  Award,
  Shield,
  Heart,
  Users,
  Search,
  Download,
  Mail,
  Eye,
  Trash2,
  CheckCircle,
  Copy,
  FileText,
  X,
  Check,
  Printer
} from "lucide-react"
// --- Mock Data ---
const mockCertificates = [
  {
    id: "1",
    certificateId: "URC-2025-00123",
    user: {
      id: "u1",
      name: "Oneth Sayakkara",
      email: "oneth@example.com",
      avatar: "OS",
      country: "Sri Lanka",
      registrationDate: "Jan 2024"
    },
    programName: "Universal Recovery Curriculum",
    courseCode: "URC 1",
    curriculum: "urc",
    issueDate: "2025-01-15",
    status: "active",
    downloadCount: 3,
    lastDownloaded: "2025-01-20"
  },
  {
    id: "2",
    certificateId: "UPC-2025-00456",
    user: {
      id: "u2",
      name: "Sarah Jenkins",
      email: "sarah.j@example.com",
      avatar: "SJ",
      country: "UK",
      registrationDate: "Feb 2024"
    },
    programName: "Introduction to Prevention",
    courseCode: "UPC 1",
    curriculum: "upc",
    issueDate: "2025-01-14",
    status: "active",
    downloadCount: 1,
    lastDownloaded: "2025-01-14"
  },
  {
    id: "3",
    certificateId: "UTC-2025-00789",
    user: {
      id: "u3",
      name: "Michael Chen",
      email: "m.chen@example.com",
      avatar: "MC",
      country: "Singapore",
      registrationDate: "Mar 2024"
    },
    programName: "Treatment for SUD",
    courseCode: "UTC 2",
    curriculum: "utc",
    issueDate: "2025-01-10",
    status: "revoked",
    downloadCount: 0
  },
  {
    id: "4",
    certificateId: "UPC-2025-00567",
    user: {
      id: "u4",
      name: "Amara Patel",
      email: "amara.p@example.com",
      avatar: "AP",
      country: "India",
      registrationDate: "Jan 2024"
    },
    programName: "Family Based Prevention",
    courseCode: "UPC 4",
    curriculum: "upc",
    issueDate: "2025-01-08",
    status: "active",
    downloadCount: 5,
    lastDownloaded: "2025-01-25"
  },
  {
    id: "5",
    certificateId: "UTC-2025-00890",
    user: {
      id: "u5",
      name: "David Wilson",
      email: "david.w@example.com",
      avatar: "DW",
      country: "USA",
      registrationDate: "Apr 2024"
    },
    programName: "Basic Counselling Skills",
    courseCode: "UTC 4",
    curriculum: "utc",
    issueDate: "2025-01-05",
    status: "active",
    downloadCount: 2,
    lastDownloaded: "2025-01-06"
  }
]
const mockApplications = [
  {
    id: "a1",
    user: {
      id: "u6",
      name: "Elena Rodriguez",
      email: "elena.r@example.com",
      avatar: "ER",
      country: "Spain",
      registrationDate: "May 2024"
    },
    programName: "School-based Prevention",
    courseCode: "UPC 5",
    curriculum: "upc",
    requestDate: "2025-01-28T10:30:00",
    preTestScore: 85,
    modulesCompleted: 5,
    totalModules: 5,
    examScore: 92,
    feedbackSubmitted: true,
    status: "pending"
  },
  {
    id: "a2",
    user: {
      id: "u7",
      name: "James Smith",
      email: "james.s@example.com",
      avatar: "JS",
      country: "Australia",
      registrationDate: "Jun 2024"
    },
    programName: "The PEER Model",
    courseCode: "URC 1",
    curriculum: "urc",
    requestDate: "2025-01-28T09:15:00",
    preTestScore: 75,
    modulesCompleted: 4,
    totalModules: 4,
    examScore: 88,
    feedbackSubmitted: true,
    status: "pending"
  },
  {
    id: "a3",
    user: {
      id: "u8",
      name: "Fatima Al-Sayed",
      email: "fatima.a@example.com",
      avatar: "FA",
      country: "UAE",
      registrationDate: "Jul 2024"
    },
    programName: "Treatment Continuum",
    courseCode: "UTC 2",
    curriculum: "utc",
    requestDate: "2025-01-27T14:20:00",
    preTestScore: 90,
    modulesCompleted: 6,
    totalModules: 6,
    examScore: 95,
    feedbackSubmitted: true,
    status: "pending"
  }
]
const mockActivityLog = [
  {
    id: "l1",
    action: "Certificate Resent",
    user: "Admin User",
    timestamp: "Jan 15, 2025 at 4:00 PM"
  },
  {
    id: "l2",
    action: "Certificate Emailed",
    user: "System",
    timestamp: "Jan 10, 2025 at 3:16 PM"
  },
  {
    id: "l3",
    action: "Certificate Issued",
    user: "Admin User",
    timestamp: "Jan 10, 2025 at 3:15 PM"
  },
  {
    id: "l4",
    action: "Application Approved",
    user: "Admin User",
    timestamp: "Jan 10, 2025 at 3:15 PM"
  },
  {
    id: "l5",
    action: "Certificate Requested",
    user: "Oneth Sayakkara",
    timestamp: "Jan 10, 2025 at 2:30 PM"
  }
]
// --- Helper Components ---
const StatusBadge = ({ status }) => {
  const styles = {
    active: "bg-green-100 text-green-700",
    revoked: "bg-red-100 text-red-700",
    pending: "bg-orange-100 text-orange-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700"
  }
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${styles[status]}`}
    >
      {status}
    </span>
  )
}
const CurriculumBadge = ({ type }) => {
  const styles = {
    upc: "bg-blue-100 text-blue-700",
    utc: "bg-emerald-100 text-emerald-700",
    urc: "bg-purple-100 text-purple-700"
  }
  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${styles[type]}`}
    >
      {type}
    </span>
  )
}
// --- Main Page Component ---
export function CertificationManagementPage() {
  const [activeTab, setActiveTab] = useState("issued")
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [selectedItems, setSelectedItems] = useState(new Set())
  // Modals state
  const [showRevokeModal, setShowRevokeModal] = useState(false)
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  // Track if sidebar/modal is open
  const isSidebarOpen =
    selectedCertificate !== null || selectedApplication !== null
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isSidebarOpen])
  // Handlers
  const toggleSelection = id => {
    const newSelected = new Set(selectedItems)
    if (newSelected.has(id)) newSelected.delete(id)
    else newSelected.add(id)
    setSelectedItems(newSelected)
  }
  const handleSelectAll = items => {
    if (selectedItems.size === items.length) setSelectedItems(new Set())
    else setSelectedItems(new Set(items.map(i => i.id)))
  }
  return (
    <>
      <div
        className={
          isSidebarOpen ? "overflow-hidden max-h-[calc(100vh-4rem)]" : ""
        }
      >
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Certification Management
          </h1>
          <p className="text-slate-600">
            Review, approve, and manage user certificates
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 mb-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("issued")}
              className={`pb-4 px-2 font-medium text-sm transition-colors relative ${
                activeTab === "issued"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Issued Certificates
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`pb-4 px-2 font-medium text-sm transition-colors relative flex items-center gap-2 ${
                activeTab === "pending"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Pending Applications
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {mockApplications.length}
              </span>
            </button>
          </div>
        </div>

        {activeTab === "issued" ? (
          <div className="space-y-8">
            {/* Filters Row */}
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search certificates..."
                    className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg w-full sm:w-64 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500">
                    <option>All Curricula</option>
                    <option>UPC</option>
                    <option>UTC</option>
                    <option>URC</option>
                  </select>
                  <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Revoked</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 w-full lg:w-auto">
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium flex-1 lg:flex-none justify-center">
                  <FileText className="w-4 h-4" />
                  Export Excel
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium flex-1 lg:flex-none justify-center">
                  <Download className="w-4 h-4" />
                  Download All
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: "Total Issued",
                  value: "892",
                  sub: "+45 this month",
                  icon: Award,
                  color: "text-blue-600",
                  bg: "bg-blue-50"
                },
                {
                  label: "UPC Certificates",
                  value: "456",
                  sub: "51% of total",
                  icon: Shield,
                  color: "text-blue-700",
                  bg: "bg-blue-50"
                },
                {
                  label: "UTC Certificates",
                  value: "334",
                  sub: "37% of total",
                  icon: Heart,
                  color: "text-emerald-700",
                  bg: "bg-emerald-50"
                },
                {
                  label: "URC Certificates",
                  value: "102",
                  sub: "12% of total",
                  icon: Users,
                  color: "text-purple-700",
                  bg: "bg-purple-50"
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
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                  <p className="text-xs text-slate-400 mt-2">{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Certificates Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 w-10">
                        <input
                          type="checkbox"
                          checked={
                            selectedItems.size === mockCertificates.length
                          }
                          onChange={() => handleSelectAll(mockCertificates)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                      </th>
                      <th className="px-6 py-4 font-semibold text-slate-900">
                        Certificate ID
                      </th>
                      <th className="px-6 py-4 font-semibold text-slate-900">
                        User
                      </th>
                      <th className="px-6 py-4 font-semibold text-slate-900">
                        Program
                      </th>
                      <th className="px-6 py-4 font-semibold text-slate-900">
                        Issue Date
                      </th>
                      <th className="px-6 py-4 font-semibold text-slate-900">
                        Status
                      </th>
                      <th className="px-6 py-4 font-semibold text-slate-900 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mockCertificates.map(cert => (
                      <tr
                        key={cert.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedItems.has(cert.id)}
                            onChange={() => toggleSelection(cert.id)}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 font-mono text-slate-600">
                            {cert.certificateId}
                            <button className="text-slate-400 hover:text-blue-600">
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200  flex items-center justify-center text-xs font-bold text-slate-700">
                              {cert.user.avatar}
                            </div>
                            <div>
                              <div className="font-medium text-slate-900">
                                {cert.user.name}
                              </div>
                              <div className="text-xs text-slate-500">
                                {cert.user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className="font-medium text-slate-900">
                              {cert.programName}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-xs font-bold rounded border border-slate-200">
                                {cert.courseCode}
                              </span>
                              <CurriculumBadge type={cert.curriculum} />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-slate-900">{cert.issueDate}</div>
                          <div className="text-xs text-slate-500">
                            10 days ago
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={cert.status} />
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedCertificate(cert)}
                              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Download"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Revoke"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                <div className="text-sm text-slate-500">
                  Showing{" "}
                  <span className="font-medium text-slate-900">1-5</span> of{" "}
                  <span className="font-medium text-slate-900">892</span>
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
          </div>
        ) : (
          <div className="space-y-8">
            {/* Pending Applications Tab Content */}
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg w-full sm:w-64 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500">
                  <option>Newest First</option>
                  <option>Oldest First</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-slate-900">
                        User
                      </th>
                      <th className="px-6 py-4 font-semibold text-slate-900">
                        Program
                      </th>
                      <th className="px-6 py-4 font-semibold text-slate-900">
                        Request Date
                      </th>
                      <th className="px-6 py-4 font-semibold text-slate-900">
                        Completion Status
                      </th>
                      <th className="px-6 py-4 font-semibold text-slate-900 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mockApplications.map(app => (
                      <tr
                        key={app.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
                              {app.user.avatar}
                            </div>
                            <div>
                              <div className="font-medium text-slate-900">
                                {app.user.name}
                              </div>
                              <div className="text-xs text-slate-500">
                                {app.user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className="font-medium text-slate-900">
                              {app.programName}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-xs font-bold rounded border border-slate-200">
                                {app.courseCode}
                              </span>
                              <CurriculumBadge type={app.curriculum} />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-slate-900">
                            {new Date(app.requestDate).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-slate-500">
                            2 hours ago
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                              <CheckCircle className="w-3 h-3" /> Pre-test
                            </div>
                            <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                              <CheckCircle className="w-3 h-3" /> Modules
                            </div>
                            <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                              <CheckCircle className="w-3 h-3" /> Exam
                            </div>
                          </div>
                          <div className="mt-2 text-xs font-bold text-green-600">
                            Ready for Approval
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedApplication(app)}
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
          </div>
        )}

        {/* Certificate Details Modal - Vertical Layout */}
        {selectedCertificate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-8 py-6 border-b border-slate-200 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-lg font-bold text-slate-900">
                      {selectedCertificate.certificateId}
                    </span>
                    <StatusBadge status={selectedCertificate.status} />
                  </div>
                  <p className="text-slate-500 text-sm">
                    Issued on {selectedCertificate.issueDate} • Downloaded{" "}
                    {selectedCertificate.downloadCount} times
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content - Vertical Stack */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {/* Certificate Preview */}
                <div className="bg-gradient-to-br from-slate-100 to-slate-50 border-2 border-slate-200 rounded-2xl p-3 flex flex-col items-center justify-center text-center">
                  <img
              src="/Certification.png"
              alt="Certification"
            />
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
                    <Eye className="w-4 h-4" /> View Certificate PDF
                  </button>
                  <div className="grid grid-cols-3 gap-2">
                    <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors text-sm">
                      <Download className="w-4 h-4" /> Download
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors text-sm">
                      <Printer className="w-4 h-4" /> Print
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors text-sm">
                      <Mail className="w-4 h-4" /> Resend
                    </button>
                  </div>
                </div>

                {/* User Information */}
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
                    User Information
                  </h4>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full text-slate-700 bg-slate-200 flex items-center justify-center text-lg font-bold ">
                      {selectedCertificate.user.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-lg text-slate-900">
                        {selectedCertificate.user.name}
                      </div>
                      <div className="text-sm text-slate-500">
                        {selectedCertificate.user.email}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {selectedCertificate.user.country} • Joined{" "}
                        {selectedCertificate.user.registrationDate}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Program Details */}
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
                    Program Details
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Curriculum</span>
                      <div className="flex items-center gap-2">
                        <CurriculumBadge
                          type={selectedCertificate.curriculum}
                        />
                        <span className="font-medium text-slate-900">
                          {selectedCertificate.curriculum === "upc"
                            ? "Universal Prevention"
                            : selectedCertificate.curriculum === "utc"
                            ? "Universal Treatment"
                            : "Universal Recovery"}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">
                        Course Code
                      </span>
                      <span className="font-bold text-slate-900">
                        {selectedCertificate.courseCode}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">
                        Program Name
                      </span>
                      <span className="font-medium text-slate-900">
                        {selectedCertificate.programName}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-slate-500">Issue Date</span>
                      <span className="font-medium text-slate-900">
                        {selectedCertificate.issueDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Academic Performance */}
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
                    Academic Performance
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-900">
                          Pre-Test Score
                        </span>
                      </div>
                      <span className="text-lg font-bold text-green-700">
                        85%
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-900">
                          Modules Completed
                        </span>
                      </div>
                      <span className="text-lg font-bold text-green-700">
                        3/3
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-900">
                          Final Exam Score
                        </span>
                      </div>
                      <span className="text-lg font-bold text-green-700">
                        92%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Activity Log */}
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
                    Activity Log
                  </h4>
                  <div className="relative pl-4 border-l-2 border-slate-200 space-y-4">
                    {mockActivityLog.map(log => (
                      <div key={log.id} className="relative">
                        <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-slate-300 border-2 border-white" />
                        <p className="text-sm font-medium text-slate-900">
                          {log.action}
                        </p>
                        <p className="text-xs text-slate-500">
                          by {log.user} • {log.timestamp}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-slate-50 px-8 py-5 border-t border-slate-200 flex justify-between items-center">
                <button className="flex items-center gap-2 px-4 py-2.5 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors">
                  <Copy className="w-4 h-4" /> Copy Link
                </button>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedCertificate(null)}
                    className="px-6 py-2.5 text-slate-600 font-bold hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                  {selectedCertificate.status === "active" && (
                    <button className="flex items-center gap-2 px-6 py-2.5 border-2 border-red-200 text-red-600 font-bold rounded-lg hover:bg-red-50 transition-colors">
                      <Trash2 className="w-4 h-4" /> Revoke
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Application Review Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white z-10 px-8 py-6 border-b border-slate-200 flex justify-between items-center rounded-t-2xl">
                <div>
                  <h2 className="font-bold text-2xl text-slate-900">
                    Review Application
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">
                    Request ID: {selectedApplication.id} •{" "}
                    {new Date(
                      selectedApplication.requestDate
                    ).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: User & Course */}
                <div className="lg:col-span-1 space-y-8">
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-xl font-bold text-slate-700">
                        {selectedApplication.user.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-lg text-slate-900">
                          {selectedApplication.user.name}
                        </div>
                        <div className="text-sm text-slate-500">
                          {selectedApplication.user.email}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm border-t border-slate-200 pt-4 mt-4">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Country</span>
                        <span className="font-medium">
                          {selectedApplication.user.country}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Registration</span>
                        <span className="font-medium">
                          {selectedApplication.user.registrationDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-4">
                      Course Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">
                          Curriculum
                        </span>
                        <CurriculumBadge
                          type={selectedApplication.curriculum}
                        />
                      </div>
                      <div>
                        <span className="text-sm text-slate-500 block mb-1">
                          Program Name
                        </span>
                        <span className="font-medium text-slate-900">
                          {selectedApplication.programName}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-500 block mb-1">
                          Course Code
                        </span>
                        <span className="font-medium text-slate-900">
                          {selectedApplication.courseCode}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Verification */}
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-4">
                      Completion Verification
                    </h3>
                    <div className="space-y-4">
                      {/* Pre-Test */}
                      <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <Check className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">
                              Pre-Test Assessment
                            </p>
                            <p className="text-xs text-slate-500">
                              Completed Jan 5, 2025
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">
                            {selectedApplication.preTestScore}%
                          </p>
                          <p className="text-xs text-slate-500">Score</p>
                        </div>
                      </div>

                      {/* Modules */}
                      <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <Check className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">
                              Learning Modules
                            </p>
                            <p className="text-xs text-slate-500">
                              All modules completed
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">
                            {selectedApplication.modulesCompleted}/
                            {selectedApplication.totalModules}
                          </p>
                          <p className="text-xs text-slate-500">Completed</p>
                        </div>
                      </div>

                      {/* Exam */}
                      <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <Check className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">
                              Final Exam
                            </p>
                            <p className="text-xs text-slate-500">
                              Passed on first attempt
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">
                            {selectedApplication.examScore}%
                          </p>
                          <p className="text-xs text-slate-500">
                            Score (Pass: 70%)
                          </p>
                        </div>
                      </div>

                      {/* Feedback */}
                      <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <Check className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">
                              Feedback Survey
                            </p>
                            <p className="text-xs text-slate-500">
                              Submitted Jan 10, 2025
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">Submitted</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* System Validation */}
                  <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                    <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5" /> System Validation
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm text-blue-800">
                        <CheckCircle className="w-4 h-4 text-blue-600" />{" "}
                        Pre-test score ≥ 70%
                      </div>
                      <div className="flex items-center gap-2 text-sm text-blue-800">
                        <CheckCircle className="w-4 h-4 text-blue-600" /> All
                        modules completed
                      </div>
                      <div className="flex items-center gap-2 text-sm text-blue-800">
                        <CheckCircle className="w-4 h-4 text-blue-600" /> Exam
                        score ≥ 70%
                      </div>
                      <div className="flex items-center gap-2 text-sm text-blue-800">
                        <CheckCircle className="w-4 h-4 text-blue-600" />{" "}
                        Account in good standing
                      </div>
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
                  onClick={() => setSelectedApplication(null)}
                  className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <div className="flex gap-4">
                  <button className="px-6 py-3 border-2 border-red-100 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-colors">
                    Reject Application
                  </button>
                  <button className="px-8 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-200 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" /> Approve & Issue
                    Certificate
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
