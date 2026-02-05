import React, { useState } from "react"
import {
  Search,
  Edit,
  Eye,
  Trash2,
  Users,
  Clock,
  FileText,
  CheckCircle,
  Plus
} from "lucide-react"
const mockCourses = [
  {
    id: "1",
    code: "UPC 1",
    title: "Introduction to Prevention Science",
    description:
      "Overview of the science that underlies evidence-based prevention interventions and strategies.",
    curriculum: "UPC",
    status: "published",
    createdBy: "Admin User",
    createdDate: "Jan 15, 2024",
    stats: {
      hours: 40,
      students: 234,
      completion: 85,
      materials: 5
    }
  },
  {
    id: "2",
    code: "UTC 2",
    title: "Treatment for Substance Use Disorders",
    description:
      "Foundation for learning about substance use disorder (SUD) treatment and continuum of care.",
    curriculum: "UTC",
    status: "published",
    createdBy: "Admin User",
    createdDate: "Jan 20, 2024",
    stats: {
      hours: 33,
      students: 189,
      completion: 72,
      materials: 8
    }
  },
  {
    id: "3",
    code: "URC 1",
    title: "The PEER Model",
    description:
      "Core competencies and skills to work as a recovery support professional.",
    curriculum: "URC",
    status: "draft",
    createdBy: "Sarah Smith",
    createdDate: "Feb 1, 2024",
    stats: {
      hours: 24,
      students: 0,
      completion: 0,
      materials: 3
    }
  },
  {
    id: "4",
    code: "UPC 5",
    title: "School-based Prevention",
    description:
      "Science behind school-based prevention interventions and application in school settings.",
    curriculum: "UPC",
    status: "inactive",
    createdBy: "Admin User",
    createdDate: "Dec 10, 2023",
    stats: {
      hours: 40,
      students: 45,
      completion: 90,
      materials: 6
    }
  }
]
export function AllCoursesTab({ onCreateClick }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [filterCurriculum, setFilterCurriculum] = useState("All")
  const getStatusColor = status => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-orange-100 text-orange-700"
      case "draft":
        return "bg-slate-100 text-slate-700"
      case "inactive":
        return "bg-red-100 text-red-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }
  const getCurriculumColor = curr => {
    switch (curr) {
      case "UPC":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "UTC":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "URC":
        return "bg-purple-100 text-purple-700 border-purple-200"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg w-full sm:w-64 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              value={filterCurriculum}
              onChange={e => setFilterCurriculum(e.target.value)}
            >
              <option value="All">All Curricula</option>
              <option value="UPC">UPC</option>
              <option value="UTC">UTC</option>
              <option value="URC">URC</option>
            </select>
            <select
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <button
          onClick={onCreateClick}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create New Course
        </button>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCourses.map(course => (
          <div
            key={course.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-100">
              <div className="flex justify-between items-start mb-3">
                <span
                  className={`px-2.5 py-0.5 rounded text-xs font-bold border ${getCurriculumColor(
                    course.curriculum
                  )}`}
                >
                  {course.curriculum}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${getStatusColor(
                    course.status
                  )}`}
                >
                  {course.status}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-1 font-mono">
                {course.code}
              </div>
              <h3 className="text-lg font-bold text-slate-900 line-clamp-2 mb-2">
                {course.title}
              </h3>
              <p className="text-sm text-slate-600 line-clamp-2">
                {course.description}
              </p>
            </div>

            {/* Stats */}
            <div className="px-5 py-4 bg-slate-50 grid grid-cols-2 gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{course.stats.hours} hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-400" />
                <span>{course.stats.students} students</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-slate-400" />
                <span>{course.stats.completion}% completion</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                <span>{course.stats.materials} materials</span>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 mt-auto border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-medium ${
                    course.status === "published"
                      ? "text-green-600"
                      : "text-slate-400"
                  }`}
                >
                  {course.status === "published" ? "Visible" : "Hidden"}
                </span>
                <div
                  className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${
                    course.status === "published"
                      ? "bg-green-500"
                      : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${
                      course.status === "published" ? "left-4.5" : "left-0.5"
                    }`}
                    style={{
                      left: course.status === "published" ? "18px" : "2px"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
