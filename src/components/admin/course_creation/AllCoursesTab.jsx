import React, { useState, useRef } from "react"
import {
  Search, Edit, Eye, Trash2, Users, Clock, FileText, CheckCircle,
  Plus, X, ArrowLeft, Send, ChevronDown, ChevronUp, Check,
  History, Shield, Info, Upload, Briefcase, Lock,
  File, PlayCircle, Layers, Download, Save
} from "lucide-react"

// ─── Mock Data ────────────────────────────────────────────────────────────────
const initialCourses = [
  {
    id: "1", code: "UPC 1", title: "Introduction to Prevention Science",
    description: "Overview of the science that underlies evidence-based prevention interventions and strategies.",
    curriculum: "UPC", status: "published", upcSeries: "practitioners",
    createdBy: "Admin User", createdDate: "Jan 15, 2024", duration: "40", level: "Beginner",
    introduction: {
      text: "Welcome to Introduction to Prevention Science.",
      videoUrl: "https://youtube.com/watch?v=example",
      objectives: ["Understand core prevention science principles", "Apply evidence-based frameworks", "Develop prevention strategies"],
      estimatedTime: "8"
    },
    materials: [
      { id: "m1", type: "pdf", name: "Module 1 - Prevention Foundations.pdf", size: "2.4 MB", uploadedBy: "Admin User", uploadedAt: "Jan 16, 2024" },
      { id: "m2", type: "pdf", name: "Module 2 - Risk & Protective Factors.pdf", size: "1.8 MB", uploadedBy: "Admin User", uploadedAt: "Jan 17, 2024" },
      { id: "m3", type: "elearning", name: "Interactive: Science of Prevention", size: "—", uploadedBy: "graphic-designer", uploadedAt: "Jan 18, 2024" },
      { id: "m4", type: "video", name: "Introduction Video.mp4", size: "45 MB", uploadedBy: "graphic-designer", uploadedAt: "Jan 19, 2024" },
      { id: "m5", type: "pdf", name: "Course Workbook.pdf", size: "3.1 MB", uploadedBy: "Admin User", uploadedAt: "Jan 20, 2024" },
    ],
    stats: { hours: 40, students: 234, completion: 85 }
  },
  {
    id: "2", code: "UTC 2", title: "Treatment for Substance Use Disorders",
    description: "Foundation for learning about substance use disorder (SUD) treatment and continuum of care.",
    curriculum: "UTC", status: "published",
    createdBy: "Admin User", createdDate: "Jan 20, 2024", duration: "33", level: "Intermediate",
    introduction: { text: "This course covers SUD treatment essentials.", videoUrl: "", objectives: ["Identify SUD symptoms", "Understand treatment options", "Apply continuum of care"], estimatedTime: "6" },
    materials: [
      { id: "m6", type: "pdf", name: "SUD Overview.pdf", size: "1.2 MB", uploadedBy: "Admin User", uploadedAt: "Jan 21, 2024" },
      { id: "m7", type: "elearning", name: "Treatment Pathways Module", size: "—", uploadedBy: "graphic-designer", uploadedAt: "Jan 22, 2024" },
    ],
    stats: { hours: 33, students: 189, completion: 72 }
  },
  {
    id: "3", code: "URC 1", title: "The PEER Model",
    description: "Core competencies and skills to work as a recovery support professional.",
    curriculum: "URC", status: "draft",
    createdBy: "Sarah Smith", createdDate: "Feb 1, 2024", duration: "24", level: "Beginner",
    introduction: { text: "Introduction to the PEER recovery model.", videoUrl: "", objectives: ["Understand PEER principles", "Develop recovery skills", "Support community recovery"], estimatedTime: "4" },
    materials: [
      { id: "m9", type: "pdf", name: "PEER Model Guide.pdf", size: "2.0 MB", uploadedBy: "Admin User", uploadedAt: "Feb 2, 2024" },
    ],
    stats: { hours: 24, students: 0, completion: 0 }
  },
  {
    id: "4", code: "UPC 5", title: "School-based Prevention",
    description: "Science behind school-based prevention interventions and application in school settings.",
    curriculum: "UPC", status: "inactive", upcSeries: "managers",
    createdBy: "Admin User", createdDate: "Dec 10, 2023", duration: "40", level: "Advanced",
    introduction: { text: "School-based prevention fundamentals.", videoUrl: "", objectives: ["Design school programs", "Assess risk factors", "Implement prevention"], estimatedTime: "7" },
    materials: [
      { id: "m10", type: "pdf", name: "School Prevention Handbook.pdf", size: "4.5 MB", uploadedBy: "Admin User", uploadedAt: "Dec 11, 2023" },
    ],
    stats: { hours: 40, students: 45, completion: 90 }
  }
]

let coursesStore = JSON.parse(JSON.stringify(initialCourses))
let pendingEditsStore = []

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getUserRole() {
  try { return localStorage.getItem("userRole") || "admin" } catch { return "admin" }
}

const statusColor = s => ({ published: "bg-emerald-100 text-emerald-700", pending: "bg-amber-100 text-amber-700", draft: "bg-slate-100 text-slate-600", inactive: "bg-red-100 text-red-600" }[s] || "bg-slate-100 text-slate-600")
const curriculumColor = c => ({ UPC: "bg-blue-100 text-blue-700 border-blue-200", UTC: "bg-emerald-100 text-emerald-700 border-emerald-200", URC: "bg-purple-100 text-purple-700 border-purple-200" }[c] || "bg-slate-100 text-slate-600")
const matBadgeColor = t => ({ pdf: "bg-red-50 text-red-600 border-red-100", video: "bg-blue-50 text-blue-600 border-blue-100", elearning: "bg-purple-50 text-purple-600 border-purple-100" }[t] || "bg-slate-50 text-slate-600 border-slate-100")

const MatIcon = ({ type }) => {
  if (type === "pdf") return <File className="w-4 h-4 text-red-500" />
  if (type === "video") return <PlayCircle className="w-4 h-4 text-blue-500" />
  if (type === "elearning") return <Layers className="w-4 h-4 text-purple-500" />
  return <FileText className="w-4 h-4 text-slate-400" />
}

function getDiffFields(original, edited) {
  const changes = []
  const chk = (key, label) => { if (JSON.stringify(original[key]) !== JSON.stringify(edited[key])) changes.push({ key, label, from: original[key], to: edited[key] }) }
  chk("title", "Course Title"); chk("description", "Description"); chk("code", "Course Code")
  chk("curriculum", "Curriculum"); chk("upcSeries", "UPC Series"); chk("duration", "Duration"); chk("level", "Level")
  const iA = original.introduction || {}, iB = edited.introduction || {}
  if (JSON.stringify(iA.text) !== JSON.stringify(iB.text)) changes.push({ key: "introduction.text", label: "Introduction Text", from: iA.text, to: iB.text })
  if (JSON.stringify(iA.objectives) !== JSON.stringify(iB.objectives)) changes.push({ key: "introduction.objectives", label: "Learning Objectives", from: iA.objectives, to: iB.objectives })
  if (JSON.stringify(iA.videoUrl) !== JSON.stringify(iB.videoUrl)) changes.push({ key: "introduction.videoUrl", label: "Intro Video URL", from: iA.videoUrl, to: iB.videoUrl })
  if (JSON.stringify(iA.estimatedTime) !== JSON.stringify(iB.estimatedTime)) changes.push({ key: "introduction.estimatedTime", label: "Estimated Time", from: iA.estimatedTime, to: iB.estimatedTime })
  const origIds = new Set((original.materials || []).map(m => m.id))
  const editIds = new Set((edited.materials || []).map(m => m.id))
  const added = (edited.materials || []).filter(m => !origIds.has(m.id))
  const removed = (original.materials || []).filter(m => !editIds.has(m.id))
  if (added.length > 0) changes.push({ key: "materials.added", label: "Materials Added", from: null, to: added.map(m => m.name).join(", ") })
  if (removed.length > 0) changes.push({ key: "materials.removed", label: "Materials Removed", from: removed.map(m => m.name).join(", "), to: null })
  return changes
}

// ══════════════════════════════════════════════════════════════════════════════
// MATERIALS SECTION
// ══════════════════════════════════════════════════════════════════════════════
function MaterialsSection({ materials, editable, onMaterialsChange, role }) {
  const fileInputRef = useRef(null)
  const [addType, setAddType] = useState("pdf")
  const [addName, setAddName] = useState("")
  const [addUrl, setAddUrl] = useState("")
  const [showAddRow, setShowAddRow] = useState(false)

  const handleDelete = (id) => onMaterialsChange(materials.filter(m => m.id !== id))

  const handleAdd = () => {
    if (!addName.trim()) return
    onMaterialsChange([...materials, {
      id: "new_" + Math.random().toString(36).substr(2, 6),
      type: addType, name: addName.trim(),
      size: "—", url: addUrl.trim() || "#",
      uploadedBy: role,
      uploadedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    }])
    setAddName(""); setAddUrl(""); setShowAddRow(false)
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    const newMats = files.map(f => ({
      id: "new_" + Math.random().toString(36).substr(2, 6),
      type: f.name.endsWith(".pdf") ? "pdf" : f.name.match(/\.(mp4|mov|avi)$/i) ? "video" : "pdf",
      name: f.name,
      size: f.size > 1024 * 1024 ? (f.size / (1024 * 1024)).toFixed(1) + " MB" : (f.size / 1024).toFixed(0) + " KB",
      url: "#", uploadedBy: role,
      uploadedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    }))
    onMaterialsChange([...materials, ...newMats])
    e.target.value = ""
  }

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-slate-500" />
          <h3 className="font-bold text-slate-900 text-sm">Course Materials</h3>
          <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">{materials.length}</span>
        </div>
        {editable && (
          <div className="flex items-center gap-2">
            <input ref={fileInputRef} type="file" multiple accept=".pdf,.mp4,.mov" className="hidden" onChange={handleFileUpload} />
            <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 bg-white rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <Upload className="w-3.5 h-3.5" /> Upload File
            </button>
            <button onClick={() => setShowAddRow(!showAddRow)} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Add Material
            </button>
          </div>
        )}
      </div>

      {editable && showAddRow && (
        <div className="px-4 py-3 bg-blue-50 border-b border-blue-100 flex items-center gap-3 flex-wrap">
          <select value={addType} onChange={e => setAddType(e.target.value)} className="px-2 py-1.5 border border-slate-200 rounded-lg text-xs bg-white text-slate-700 focus:outline-none focus:border-blue-400">
            <option value="pdf">PDF</option>
            <option value="video">Video</option>
            <option value="elearning">eLearning</option>
          </select>
          <input type="text" placeholder="Material name / title" value={addName} onChange={e => setAddName(e.target.value)}
            className="flex-1 min-w-40 px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-400" />
          <input type="text" placeholder="URL (optional)" value={addUrl} onChange={e => setAddUrl(e.target.value)}
            className="w-44 px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-400" />
          <button onClick={handleAdd} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700">Add</button>
          <button onClick={() => { setShowAddRow(false); setAddName(""); setAddUrl("") }} className="p-1.5 text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
        </div>
      )}

      {materials.length === 0 ? (
        <div className="p-8 text-center text-slate-400 text-sm">No materials added yet.</div>
      ) : (
        <div className="divide-y divide-slate-100">
          {materials.map((mat) => {
            const isNew = String(mat.id).startsWith("new_")
            return (
              <div key={mat.id} className={`flex items-center gap-4 px-4 py-3 hover:bg-slate-50 transition-colors ${isNew ? "bg-emerald-50/60" : ""}`}>
                <div className={`w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 ${matBadgeColor(mat.type)}`}>
                  <MatIcon type={mat.type} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-800 truncate">{mat.name}</span>
                    {isNew && <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-md flex-shrink-0">NEW</span>}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                    <span className={`text-xs font-semibold px-1.5 py-0.5 rounded border capitalize ${matBadgeColor(mat.type)}`}>{mat.type}</span>
                    {mat.size && mat.size !== "—" && <span className="text-xs text-slate-400">{mat.size}</span>}
                    <span className="text-xs text-slate-400">by {mat.uploadedBy}</span>
                    <span className="text-xs text-slate-400">{mat.uploadedAt}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Download">
                    <Download className="w-4 h-4" />
                  </button>
                  {editable && (
                    <button onClick={() => handleDelete(mat.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Remove">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// COURSE DETAILS VIEW
// ══════════════════════════════════════════════════════════════════════════════
function CourseDetailsView({ course, onEdit, onBack }) {
  const [activeTab, setActiveTab] = useState("overview")
  const role = getUserRole()

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-8 py-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="flex items-center gap-1.5 text-slate-300 hover:text-white text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Courses
          </button>
          <span className="text-slate-500">/</span>
          <span className="text-slate-300 text-sm">{course.code}</span>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${curriculumColor(course.curriculum)}`}>{course.curriculum}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${statusColor(course.status)}`}>{course.status}</span>
            </div>
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p className="text-slate-300 mt-1 text-sm">{course.code} · Created by {course.createdBy} · {course.createdDate}</p>
          </div>
          <button onClick={onEdit} className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-400 text-white rounded-xl font-bold transition-colors shadow-lg">
            <Edit className="w-4 h-4" /> {role === "graphic-designer" ? "Edit Materials" : "Edit Course"}
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-6">
          {[
            { icon: Clock, label: "Hours", value: course.stats.hours },
            { icon: Users, label: "Students", value: course.stats.students },
            { icon: CheckCircle, label: "Completion", value: `${course.stats.completion}%` },
            { icon: FileText, label: "Materials", value: course.materials?.length || 0 },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white/10 rounded-xl p-3 text-center">
              <Icon className="w-4 h-4 mx-auto mb-1 text-slate-300" />
              <div className="text-lg font-bold">{value}</div>
              <div className="text-xs text-slate-400">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-b border-slate-200 bg-slate-50 px-8">
        <div className="flex gap-6">
          {["overview", "introduction", "materials"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`py-3 text-sm font-semibold border-b-2 transition-colors capitalize ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8">
        {activeTab === "overview" && (
          <div className="max-w-3xl space-y-6">
            <div><h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</h3><p className="text-slate-700 leading-relaxed">{course.description}</p></div>
            <div className="grid grid-cols-2 gap-6">
              <div><h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Curriculum</h3><span className={`inline-block px-3 py-1 rounded-lg text-sm font-bold border ${curriculumColor(course.curriculum)}`}>{course.curriculum}</span></div>
              {course.upcSeries && <div><h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">UPC Series</h3><p className="text-slate-700 text-sm">{course.upcSeries === "managers" ? "Managers & Supervisors" : "Practitioners"}</p></div>}
              <div><h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Duration</h3><p className="text-slate-700">{course.duration} hours</p></div>
              <div><h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Level</h3><p className="text-slate-700">{course.level}</p></div>
            </div>
          </div>
        )}
        {activeTab === "introduction" && (
          <div className="max-w-3xl space-y-6">
            {course.introduction?.text && <div><h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Introduction Text</h3><p className="text-slate-700 leading-relaxed bg-slate-50 rounded-xl p-4">{course.introduction.text}</p></div>}
            {course.introduction?.videoUrl && <div><h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Video URL</h3><a href={course.introduction.videoUrl} className="text-blue-600 text-sm underline">{course.introduction.videoUrl}</a></div>}
            {course.introduction?.objectives?.length > 0 && (
              <div><h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Learning Objectives</h3>
                <ul className="space-y-2">{course.introduction.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm"><span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span><span className="text-slate-700">{obj}</span></li>
                ))}</ul>
              </div>
            )}
            {course.introduction?.estimatedTime && <div><h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Estimated Time</h3><p className="text-slate-700">{course.introduction.estimatedTime} hours</p></div>}
          </div>
        )}
        {activeTab === "materials" && (
          <div className="max-w-3xl">
            <MaterialsSection materials={course.materials || []} editable={false} role={role} onMaterialsChange={() => {}} />
          </div>
        )}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// EDIT COURSE FORM
// ══════════════════════════════════════════════════════════════════════════════
function EditCourseForm({ course, onCancel }) {
  const role = getUserRole()
  const isGraphicDesigner = role === "graphic-designer"

  const [formData, setFormData] = useState({
    title: course.title, description: course.description, code: course.code,
    curriculum: course.curriculum, upcSeries: course.upcSeries || "",
    duration: course.duration || "", level: course.level || "Beginner",
    introduction: { ...(course.introduction || {}) }
  })
  const [objectives, setObjectives] = useState(course.introduction?.objectives || [""])
  const [materials, setMaterials] = useState(JSON.parse(JSON.stringify(course.materials || [])))
  const [showPreview, setShowPreview] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [savedMaterials, setSavedMaterials] = useState(false)

  const editedCourse = { ...formData, introduction: { ...formData.introduction, objectives }, materials }
  const changes = getDiffFields(course, editedCourse)

  // For graphic-designer: only material changes
  const materialChanges = changes.filter(c => c.key.startsWith("materials."))
  const hasMaterialChanges = materialChanges.length > 0

  // Graphic designer: direct save (no approval needed)
  const handleSaveMaterials = () => {
    const idx = coursesStore.findIndex(c => c.id === course.id)
    if (idx !== -1) coursesStore[idx].materials = materials
    setSavedMaterials(true)
  }

  // Admin/editor: submit for approval
  const handleSubmitForApproval = () => {
    if (changes.length === 0) { alert("No changes detected."); return }
    pendingEditsStore.push({
      id: Math.random().toString(36).substr(2, 9),
      courseId: course.id, courseTitle: course.title, courseCode: course.code,
      submittedBy: role, submittedAt: new Date().toLocaleString(),
      status: "pending", changes, original: course, edited: editedCourse
    })
    setSubmitted(true)
  }

  // Success screen for admin/editor
  if (submitted) return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="p-12 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-emerald-600" /></div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Changes Submitted!</h2>
        <p className="text-slate-600 mb-1">Your edits to <strong>{course.title}</strong> have been sent for approval.</p>
        <p className="text-slate-500 text-sm mb-8">An admin will review and approve or reject the changes.</p>
        <div className="bg-slate-50 rounded-xl p-4 max-w-md mx-auto mb-6 text-left">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{changes.length} change{changes.length !== 1 ? "s" : ""} submitted</p>
          {changes.map((c, i) => (
            <div key={i} className="flex items-center gap-2 text-sm py-1.5 border-b border-slate-200 last:border-0">
              <span className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0" />
              <span className="font-medium text-slate-700">{c.label}</span>
              <span className="text-slate-400 ml-auto text-xs">modified</span>
            </div>
          ))}
        </div>
        <button onClick={onCancel} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">Back to Courses</button>
      </div>
    </div>
  )

  // Success screen for graphic-designer
  if (savedMaterials) return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="p-12 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-emerald-600" /></div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Materials Saved!</h2>
        <p className="text-slate-600 mb-8">Course materials for <strong>{course.title}</strong> have been updated successfully.</p>
        <button onClick={onCancel} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">Back to Courses</button>
      </div>
    </div>
  )

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 px-8 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onCancel} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{isGraphicDesigner ? "Edit Materials" : "Edit Course"}</h2>
              <p className="text-sm text-slate-500">{course.code} · {course.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isGraphicDesigner && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg">
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-xs font-semibold text-amber-700">Materials only</span>
              </div>
            )}
            {!isGraphicDesigner && changes.length > 0 && (
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
                {changes.length} unsaved change{changes.length !== 1 ? "s" : ""}
              </span>
            )}
            {isGraphicDesigner && hasMaterialChanges && (
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
                {materialChanges.length} material change{materialChanges.length !== 1 ? "s" : ""}
              </span>
            )}
            {!isGraphicDesigner && (
              <button onClick={() => setShowPreview(!showPreview)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${showPreview ? "bg-slate-200 text-slate-700" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                <Eye className="w-4 h-4" /> {showPreview ? "Hide" : "Preview"} Changes
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={`grid ${showPreview && !isGraphicDesigner ? "grid-cols-2" : "grid-cols-1"} divide-x divide-slate-200`}>
        {/* Form */}
        <div className="p-8 overflow-y-auto max-h-[68vh]">
          <div className="max-w-2xl mx-auto space-y-6">

            {/* ── GRAPHIC DESIGNER: read-only info + editable materials only ── */}
            {isGraphicDesigner && (
              <>
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <Lock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-800">Materials access only</p>
                    <p className="text-sm text-amber-700 mt-0.5">As a <strong>graphic-designer</strong>, you can only add or remove course materials. All other fields are read-only.</p>
                  </div>
                </div>

                {/* Read-only course info */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Course Info (Read-only)</span>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-slate-400 text-xs block mb-0.5">Title</span><p className="text-slate-500 font-medium">{course.title}</p></div>
                    <div><span className="text-slate-400 text-xs block mb-0.5">Code</span><p className="text-slate-500 font-medium">{course.code}</p></div>
                    <div><span className="text-slate-400 text-xs block mb-0.5">Curriculum</span><p className="text-slate-500 font-medium">{course.curriculum}</p></div>
                    <div><span className="text-slate-400 text-xs block mb-0.5">Duration</span><p className="text-slate-500 font-medium">{course.duration} hrs</p></div>
                  </div>
                </div>

                {/* ONLY editable section for graphic-designer */}
                <MaterialsSection materials={materials} editable={true} onMaterialsChange={setMaterials} role={role} />
              </>
            )}

            {/* ── ADMIN / EDITOR: all fields ── */}
            {!isGraphicDesigner && (
              <>
                <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-700">Changes will be submitted for admin approval before taking effect.</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Curriculum</label>
                  <div className="grid grid-cols-3 gap-3">
                    {["UPC", "UTC", "URC"].map(c => (
                      <label key={c} className={`flex flex-col items-center p-3 border-2 rounded-xl cursor-pointer transition-all ${formData.curriculum === c ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 hover:border-slate-300"}`}>
                        <input type="radio" name="curriculum" value={c} checked={formData.curriculum === c} onChange={e => setFormData({ ...formData, curriculum: e.target.value, upcSeries: "" })} className="sr-only" />
                        <span className="font-bold">{c}</span>
                        <span className="text-xs text-slate-500 mt-0.5">{c === "UPC" ? "Prevention" : c === "UTC" ? "Treatment" : "Recovery"}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.curriculum === "UPC" && (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">UPC Series</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[{ value: "managers", label: "Managers & Supervisors", icon: Briefcase }, { value: "practitioners", label: "Practitioners", icon: Users }].map(({ value, label, icon: Icon }) => (
                        <label key={value} className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all ${formData.upcSeries === value ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-slate-300"}`}>
                          <input type="radio" name="upcSeries" value={value} checked={formData.upcSeries === value} onChange={e => setFormData({ ...formData, upcSeries: e.target.value })} className="sr-only" />
                          <Icon className={`w-5 h-5 ${formData.upcSeries === value ? "text-blue-600" : "text-slate-400"}`} />
                          <span className={`text-sm font-medium ${formData.upcSeries === value ? "text-blue-700" : "text-slate-700"}`}>{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-bold text-slate-700 mb-1">Course Code</label><input type="text" value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500" /></div>
                  <div><label className="block text-sm font-bold text-slate-700 mb-1">Duration (hours)</label><input type="number" value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500" /></div>
                </div>

                <div><label className="block text-sm font-bold text-slate-700 mb-1">Course Title</label><input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500" /></div>
                <div><label className="block text-sm font-bold text-slate-700 mb-1">Description</label><textarea rows={4} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm resize-none focus:outline-none focus:border-blue-500" /></div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200"><h3 className="font-bold text-slate-900 text-sm">Introduction</h3></div>
                  <div className="p-4 space-y-4">
                    <div><label className="block text-sm font-medium text-slate-700 mb-1">Introduction Text</label><textarea rows={3} value={formData.introduction?.text || ""} onChange={e => setFormData({ ...formData, introduction: { ...formData.introduction, text: e.target.value } })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm resize-none focus:outline-none focus:border-blue-500" /></div>
                    <div><label className="block text-sm font-medium text-slate-700 mb-1">Video URL</label><input type="text" value={formData.introduction?.videoUrl || ""} onChange={e => setFormData({ ...formData, introduction: { ...formData.introduction, videoUrl: e.target.value } })} placeholder="YouTube or Vimeo URL" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500" /></div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Learning Objectives</label>
                      <div className="space-y-2">
                        {objectives.map((obj, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                            <input type="text" value={obj} onChange={e => { const n = [...objectives]; n[i] = e.target.value; setObjectives(n) }} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                            {objectives.length > 1 && <button onClick={() => setObjectives(objectives.filter((_, j) => j !== i))} className="p-1.5 text-red-400 hover:bg-red-50 rounded"><X className="w-4 h-4" /></button>}
                          </div>
                        ))}
                        <button onClick={() => setObjectives([...objectives, ""])} className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-sm font-medium mt-1"><Plus className="w-4 h-4" /> Add Objective</button>
                      </div>
                    </div>
                    <div><label className="block text-sm font-medium text-slate-700 mb-1">Estimated Time (hours)</label><input type="number" value={formData.introduction?.estimatedTime || ""} onChange={e => setFormData({ ...formData, introduction: { ...formData.introduction, estimatedTime: e.target.value } })} className="w-24 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500" /></div>
                  </div>
                </div>

                <MaterialsSection materials={materials} editable={true} onMaterialsChange={setMaterials} role={role} />
              </>
            )}

          </div>
        </div>

        {/* Changes preview panel (admin/editor only) */}
        {showPreview && !isGraphicDesigner && (
          <div className="p-8 bg-slate-50 overflow-y-auto max-h-[68vh]">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><History className="w-5 h-5 text-amber-500" /> Pending Changes</h3>
            {changes.length === 0 ? (
              <div className="text-center py-12"><CheckCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" /><p className="text-slate-500 text-sm">No changes yet</p></div>
            ) : (
              <div className="space-y-4">
                {changes.map((c, i) => (
                  <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="px-4 py-2 bg-amber-50 border-b border-amber-100"><span className="text-xs font-bold text-amber-700 uppercase tracking-wide">{c.label}</span></div>
                    <div className="p-4 space-y-2 text-sm">
                      {c.from !== null && <div><span className="text-xs text-slate-400 font-medium block mb-1">Before</span><p className="text-red-700 bg-red-50 rounded px-3 py-2 line-through text-xs">{Array.isArray(c.from) ? c.from.join(", ") : (c.from || "—")}</p></div>}
                      {c.to !== null && <div><span className="text-xs text-slate-400 font-medium block mb-1">After</span><p className="text-emerald-700 bg-emerald-50 rounded px-3 py-2 text-xs">{Array.isArray(c.to) ? c.to.join(", ") : (c.to || "—")}</p></div>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-slate-50 border-t border-slate-200 px-8 py-4 flex items-center justify-between">
        <button onClick={onCancel} className="flex items-center gap-2 px-5 py-2 border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-white transition-colors">
          <X className="w-4 h-4" /> Cancel
        </button>

        {/* Graphic designer: Save Materials directly */}
        {isGraphicDesigner && (
          <button onClick={handleSaveMaterials} disabled={!hasMaterialChanges}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-colors ${hasMaterialChanges ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}>
            <Save className="w-4 h-4" /> Save Materials
          </button>
        )}

        {/* Admin/editor: Submit for approval */}
        {!isGraphicDesigner && (
          <div className="flex items-center gap-3">
            {changes.length > 0 && <span className="text-xs text-slate-500">{changes.length} change{changes.length !== 1 ? "s" : ""} ready to submit</span>}
            <button onClick={handleSubmitForApproval} disabled={changes.length === 0}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-colors ${changes.length > 0 ? "bg-amber-500 hover:bg-amber-600 text-white shadow" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}>
              <Send className="w-4 h-4" /> Submit for Approval
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ALL COURSES TAB
// ══════════════════════════════════════════════════════════════════════════════
export function AllCoursesTab({ onCreateClick }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [filterCurriculum, setFilterCurriculum] = useState("All")
  const [view, setView] = useState("list")
  const [selectedCourse, setSelectedCourse] = useState(null)
  const role = getUserRole()
  const isGraphicDesigner = role === "graphic-designer"

  const filtered = coursesStore.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.code.toLowerCase().includes(searchQuery.toLowerCase())
    const matchStatus = filterStatus === "All" || c.status === filterStatus
    const matchCurriculum = filterCurriculum === "All" || c.curriculum === filterCurriculum
    return matchSearch && matchStatus && matchCurriculum
  })

  if (view === "details" && selectedCourse) return <CourseDetailsView course={selectedCourse} onBack={() => { setView("list"); setSelectedCourse(null) }} onEdit={() => setView("edit")} />
  if (view === "edit" && selectedCourse) return <EditCourseForm course={selectedCourse} onCancel={() => { setView("list"); setSelectedCourse(null) }} />

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search courses..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg w-full sm:w-64 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" value={filterCurriculum} onChange={e => setFilterCurriculum(e.target.value)}>
              <option value="All">All Curricula</option><option value="UPC">UPC</option><option value="UTC">UTC</option><option value="URC">URC</option>
            </select>
            <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="All">All Status</option><option value="published">Published</option><option value="draft">Draft</option><option value="pending">Pending</option><option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        {!isGraphicDesigner && (
          <button onClick={onCreateClick} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
            <Plus className="w-4 h-4" /> Create New Course
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(course => (
          <div key={course.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100">
              <div className="flex justify-between items-start mb-3">
                <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${curriculumColor(course.curriculum)}`}>{course.curriculum}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${statusColor(course.status)}`}>{course.status}</span>
              </div>
              <div className="text-sm text-slate-500 mb-1 font-mono">{course.code}</div>
              <h3 className="text-lg font-bold text-slate-900 line-clamp-2 mb-2">{course.title}</h3>
              <p className="text-sm text-slate-600 line-clamp-2">{course.description}</p>
            </div>
            <div className="px-5 py-4 bg-slate-50 grid grid-cols-2 gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400" /><span>{course.stats.hours} hours</span></div>
              <div className="flex items-center gap-2"><Users className="w-4 h-4 text-slate-400" /><span>{course.stats.students} students</span></div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-slate-400" /><span>{course.stats.completion}% completion</span></div>
              <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-slate-400" /><span>{course.materials?.length || 0} materials</span></div>
            </div>
            <div className="p-4 mt-auto border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title={isGraphicDesigner ? "Edit Materials" : "Edit"} onClick={() => { setSelectedCourse(course); setView("edit") }}>
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors" title="View Details" onClick={() => { setSelectedCourse(course); setView("details") }}>
                  <Eye className="w-4 h-4" />
                </button>
                {!isGraphicDesigner && (
                  <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                )}
              </div>
              {isGraphicDesigner ? (
                <span className="flex items-center gap-1 text-xs text-amber-600 font-semibold"><Lock className="w-3 h-3" /> Materials only</span>
              ) : (
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium ${course.status === "published" ? "text-green-600" : "text-slate-400"}`}>{course.status === "published" ? "Visible" : "Hidden"}</span>
                  <div className={`w-8 h-4 rounded-full relative cursor-pointer ${course.status === "published" ? "bg-green-500" : "bg-slate-300"}`}>
                    <div className="absolute top-0.5 w-3 h-3 bg-white rounded-full" style={{ left: course.status === "published" ? "18px" : "2px" }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// PENDING EDITS TAB
// ══════════════════════════════════════════════════════════════════════════════
export function PendingEditsTab() {
  const [edits, setEdits] = useState(pendingEditsStore)
  const [expandedId, setExpandedId] = useState(null)
  const refresh = () => setEdits([...pendingEditsStore])
  const handle = (id, status) => { const idx = pendingEditsStore.findIndex(e => e.id === id); if (idx !== -1) pendingEditsStore[idx].status = status; refresh() }
  const pending = edits.filter(e => e.status === "pending")
  const resolved = edits.filter(e => e.status !== "pending")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-xl font-bold text-slate-900">Pending Edits</h2><p className="text-slate-500 text-sm mt-0.5">Review and approve course edit requests</p></div>
        {pending.length > 0 && <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-bold">{pending.length} pending</span>}
      </div>
      {pending.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <CheckCircle className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No pending edits</p>
          <p className="text-slate-400 text-sm mt-1">Submit some edits from the courses tab to see them here.</p>
        </div>
      )}
      {pending.map(edit => (
        <div key={edit.id} className="bg-white rounded-2xl border border-amber-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-amber-50 border-b border-amber-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center"><Edit className="w-5 h-5 text-amber-600" /></div>
              <div>
                <div className="font-bold text-slate-900">{edit.courseTitle}</div>
                <div className="text-sm text-slate-500">{edit.courseCode} · {edit.changes.length} change{edit.changes.length !== 1 ? "s" : ""} · by <span className="font-semibold text-slate-700">{edit.submittedBy}</span> · {edit.submittedAt}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setExpandedId(expandedId === edit.id ? null : edit.id)} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg">{expandedId === edit.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}</button>
              <button onClick={() => handle(edit.id, "rejected")} className="flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-600 rounded-xl font-medium text-sm hover:bg-red-50 transition-colors"><X className="w-4 h-4" /> Reject</button>
              <button onClick={() => handle(edit.id, "approved")} className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl font-medium text-sm hover:bg-emerald-700 transition-colors"><Check className="w-4 h-4" /> Approve</button>
            </div>
          </div>
          {expandedId === edit.id && (
            <div className="p-6 space-y-4">
              {edit.changes.map((c, i) => (
                <div key={i} className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200">
                  <div className="px-4 py-2 border-b border-slate-200 bg-white"><span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{c.label}</span></div>
                  <div className={`grid divide-x divide-slate-200 ${c.from !== null && c.to !== null ? "grid-cols-2" : "grid-cols-1"}`}>
                    {c.from !== null && <div className="p-4"><span className="text-xs text-slate-400 font-medium block mb-1">Current</span><p className="text-sm text-slate-700">{Array.isArray(c.from) ? c.from.join(", ") : (c.from || "—")}</p></div>}
                    {c.to !== null && <div className="p-4"><span className="text-xs text-slate-400 font-medium block mb-1">Proposed</span><p className="text-sm text-emerald-700 font-medium">{Array.isArray(c.to) ? c.to.join(", ") : (c.to || "—")}</p></div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      {resolved.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Recently Resolved</h3>
          {resolved.map(edit => (
            <div key={edit.id} className="bg-white rounded-xl border border-slate-200 px-5 py-4 flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${edit.status === "approved" ? "bg-emerald-100" : "bg-red-100"}`}>{edit.status === "approved" ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-red-600" />}</div>
                <div><span className="font-medium text-slate-900 text-sm">{edit.courseTitle}</span><span className="text-slate-400 text-xs ml-2">{edit.changes.length} change{edit.changes.length !== 1 ? "s" : ""}</span></div>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${edit.status === "approved" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>{edit.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// DEMO APP
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [activeTab, setActiveTab] = useState("courses")
  const [demoRole, setDemoRole] = useState(() => { try { return localStorage.getItem("userRole") || "admin" } catch { return "admin" } })

  const setRole = (role) => {
    try { localStorage.setItem("userRole", role) } catch {}
    setDemoRole(role)
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="bg-white rounded-xl border border-slate-200 px-5 py-3 flex items-center gap-4 shadow-sm flex-wrap">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Demo Role</span>
          <div className="flex gap-2">
            {["admin", "editor", "graphic-designer"].map(role => (
              <button key={role} onClick={() => setRole(role)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${demoRole === role ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                {role}
              </button>
            ))}
          </div>
          <span className="text-xs ml-1">
            {demoRole === "graphic-designer"
              ? <span className="text-amber-600 font-semibold flex items-center gap-1"><Lock className="w-3 h-3" /> Can only add/remove materials. Save is instant, no approval needed.</span>
              : <span className="text-slate-500">Can edit all course fields. Changes go to pending approval.</span>}
          </span>
        </div>

        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm border border-slate-200 w-fit">
          {[{ id: "courses", label: "All Courses" }, { id: "pending", label: "Pending Edits" }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === tab.id ? "bg-blue-600 text-white shadow" : "text-slate-600 hover:text-slate-900"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "courses" && <AllCoursesTab key={demoRole} onCreateClick={() => alert("Open create wizard")} />}
        {activeTab === "pending" && <PendingEditsTab />}
      </div>
    </div>
  )
}
