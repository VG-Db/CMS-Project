import React, { useState } from "react"
import {
  Search,
  Check,
  X,
  Eye,
  FileText,
  Clock,
  AlertCircle,
  BookOpen,
  HelpCircle,
  Award,
  Users,
  Briefcase,
  Video,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Target,
  Settings,
  Globe,
  Lock,
  UserCheck
} from "lucide-react"
const mockPendingCourses = [
  {
    id: "p1",
    code: "UPC 10",
    title: "Advanced Prevention Strategies",
    description:
      "This comprehensive course covers advanced strategies for prevention professionals, including evidence-based interventions, community engagement techniques, and program evaluation methods. Learners will gain practical skills to implement effective prevention programs in diverse settings.",
    curriculum: "UPC",
    upcSeries: "managers",
    duration: "40",
    submittedBy: {
      name: "Elena Rodriguez",
      avatar: "ER",
      role: "Program Officer",
      email: "elena.rodriguez@issup.org"
    },
    submittedDate: "2 days ago",
    stats: {
      modules: 4,
      questions: 25,
      materials: 8
    },
    introduction: {
      text:
        "Welcome to Advanced Prevention Strategies. This course is designed for prevention professionals who want to deepen their understanding of evidence-based prevention approaches. Throughout this course, you will explore cutting-edge research, practical implementation strategies, and evaluation techniques that will enhance your effectiveness as a prevention practitioner.",
      videoUrl: "https://youtube.com/watch?v=example123",
      objectives: [
        "Understand the theoretical foundations of advanced prevention strategies",
        "Apply evidence-based interventions in community settings",
        "Evaluate prevention program effectiveness using appropriate metrics",
        "Develop comprehensive prevention plans for diverse populations",
        "Implement quality improvement processes in prevention programs"
      ],
      estimatedTime: "40"
    },
    modules: [
      {
        id: "m1",
        title: "Foundations of Advanced Prevention",
        description: "Core concepts and theoretical frameworks",
        pdfCount: 3,
        videoCount: 2
      },
      {
        id: "m2",
        title: "Evidence-Based Interventions",
        description: "Implementing proven prevention strategies",
        pdfCount: 4,
        videoCount: 1
      },
      {
        id: "m3",
        title: "Community Engagement",
        description: "Building partnerships and stakeholder involvement",
        pdfCount: 2,
        videoCount: 2
      },
      {
        id: "m4",
        title: "Program Evaluation",
        description: "Measuring outcomes and continuous improvement",
        pdfCount: 3,
        videoCount: 1
      }
    ],
    preTest: {
      passingScore: 70,
      timeLimit: 30,
      attempts: 3,
      questions: [
        {
          id: "q1",
          type: "single",
          text: "What is the primary goal of prevention science?",
          options: [
            "Treatment",
            "Early intervention",
            "Reducing risk factors",
            "Rehabilitation"
          ],
          correctAnswers: [2]
        },
        {
          id: "q2",
          type: "multiple",
          text:
            "Which of the following are evidence-based prevention approaches?",
          options: [
            "Life Skills Training",
            "Random interventions",
            "Communities That Care",
            "Strengthening Families"
          ],
          correctAnswers: [0, 2, 3]
        },
        {
          id: "q3",
          type: "truefalse",
          text:
            "Prevention programs should be implemented without community input.",
          options: ["True", "False"],
          correctAnswers: [1]
        },
        {
          id: "q4",
          type: "single",
          text: "What does SAMHSA stand for?",
          options: [
            "Substance Abuse and Mental Health Services Administration",
            "Social And Mental Health Support Agency",
            "Substance Addiction Management and Health Services Act",
            "None of the above"
          ],
          correctAnswers: [0]
        },
        {
          id: "q5",
          type: "single",
          text: "Which factor is NOT typically considered a risk factor?",
          options: [
            "Family conflict",
            "Community involvement",
            "Peer substance use",
            "Academic failure"
          ],
          correctAnswers: [1]
        },
        {
          id: "q6",
          type: "multiple",
          text: "Select all protective factors:",
          options: [
            "Strong family bonds",
            "School engagement",
            "Social isolation",
            "Community support"
          ],
          correctAnswers: [0, 1, 3]
        },
        {
          id: "q7",
          type: "truefalse",
          text: "Universal prevention targets the entire population.",
          options: ["True", "False"],
          correctAnswers: [0]
        },
        {
          id: "q8",
          type: "single",
          text:
            "What is the recommended duration for most prevention programs?",
          options: ["1 session", "3-6 months", "5+ years", "One-time event"],
          correctAnswers: [1]
        },
        {
          id: "q9",
          type: "single",
          text: "Which evaluation type measures immediate program effects?",
          options: [
            "Process evaluation",
            "Outcome evaluation",
            "Impact evaluation",
            "Formative evaluation"
          ],
          correctAnswers: [1]
        },
        {
          id: "q10",
          type: "truefalse",
          text:
            "Fidelity refers to how closely a program follows its original design.",
          options: ["True", "False"],
          correctAnswers: [0]
        }
      ]
    },
    exam: {
      passingScore: 70,
      timeLimit: 60,
      attempts: 3,
      questions: [
        {
          id: "e1",
          type: "single",
          text:
            "According to the Strategic Prevention Framework, what is the first step?",
          options: [
            "Assessment",
            "Capacity building",
            "Planning",
            "Implementation"
          ],
          correctAnswers: [0]
        },
        {
          id: "e2",
          type: "multiple",
          text: "Which components are essential for program sustainability?",
          options: [
            "Funding diversification",
            "Community ownership",
            "Political support",
            "All of the above"
          ],
          correctAnswers: [0, 1, 2]
        },
        {
          id: "e3",
          type: "truefalse",
          text: "Cultural adaptation of programs always reduces effectiveness.",
          options: ["True", "False"],
          correctAnswers: [1]
        },
        {
          id: "e4",
          type: "single",
          text: "What is the primary purpose of a logic model?",
          options: [
            "Budget planning",
            "Staff training",
            "Program theory visualization",
            "Marketing"
          ],
          correctAnswers: [2]
        },
        {
          id: "e5",
          type: "single",
          text:
            "Which data collection method is most appropriate for measuring attitudes?",
          options: [
            "Observation",
            "Surveys",
            "Document review",
            "Focus groups"
          ],
          correctAnswers: [1]
        },
        {
          id: "e6",
          type: "multiple",
          text: "Select all that apply to selective prevention:",
          options: [
            "Targets at-risk groups",
            "Universal approach",
            "Based on risk factors",
            "Most intensive level"
          ],
          correctAnswers: [0, 2]
        },
        {
          id: "e7",
          type: "truefalse",
          text:
            "Stakeholder engagement should begin after program implementation.",
          options: ["True", "False"],
          correctAnswers: [1]
        },
        {
          id: "e8",
          type: "single",
          text:
            "What percentage of prevention programs are considered evidence-based?",
          options: ["Less than 10%", "About 25%", "Over 50%", "Nearly 100%"],
          correctAnswers: [1]
        },
        {
          id: "e9",
          type: "single",
          text: "Which framework emphasizes risk and protective factors?",
          options: [
            "Social Development Model",
            "Health Belief Model",
            "Theory of Planned Behavior",
            "Ecological Model"
          ],
          correctAnswers: [0]
        },
        {
          id: "e10",
          type: "truefalse",
          text: "Cost-benefit analysis is important for program justification.",
          options: ["True", "False"],
          correctAnswers: [0]
        },
        {
          id: "e11",
          type: "single",
          text:
            "What is the recommended facilitator-to-participant ratio for group sessions?",
          options: ["1:50", "1:25", "1:15", "1:5"],
          correctAnswers: [2]
        },
        {
          id: "e12",
          type: "multiple",
          text: "Which are key components of implementation quality?",
          options: ["Dosage", "Reach", "Fidelity", "Adaptation"],
          correctAnswers: [0, 1, 2, 3]
        }
      ]
    },
    certificate: {
      template: "professional",
      visibility: "public",
      enrollment: "open",
      requirements: {
        preTest: true,
        modules: true,
        exam: true,
        feedback: true
      }
    }
  },
  {
    id: "p2",
    code: "UTC 5",
    title: "Trauma-Informed Care",
    description:
      "Learn the principles and practices of trauma-informed care in treatment settings. This course covers understanding trauma, its effects on individuals, and how to create safe, supportive environments for recovery.",
    curriculum: "UTC",
    duration: "35",
    submittedBy: {
      name: "James Smith",
      avatar: "JS",
      role: "Content Developer",
      email: "james.smith@issup.org"
    },
    submittedDate: "5 hours ago",
    stats: {
      modules: 6,
      questions: 40,
      materials: 12
    },
    introduction: {
      text:
        "Welcome to Trauma-Informed Care. This course will equip you with the knowledge and skills to provide compassionate, effective care to individuals who have experienced trauma.",
      videoUrl: "",
      objectives: [
        "Define trauma and its impact on brain development",
        "Recognize signs and symptoms of trauma in clients",
        "Apply trauma-informed principles in treatment settings"
      ],
      estimatedTime: "35"
    },
    modules: [
      {
        id: "m1",
        title: "Understanding Trauma",
        description: "Types and effects of trauma",
        pdfCount: 2,
        videoCount: 1
      },
      {
        id: "m2",
        title: "Neurobiology of Trauma",
        description: "Brain science and trauma responses",
        pdfCount: 3,
        videoCount: 2
      },
      {
        id: "m3",
        title: "Trauma-Informed Principles",
        description: "Core principles and practices",
        pdfCount: 2,
        videoCount: 1
      },
      {
        id: "m4",
        title: "Creating Safe Environments",
        description: "Physical and emotional safety",
        pdfCount: 2,
        videoCount: 2
      },
      {
        id: "m5",
        title: "Assessment and Screening",
        description: "Tools and techniques",
        pdfCount: 2,
        videoCount: 1
      },
      {
        id: "m6",
        title: "Self-Care for Providers",
        description: "Preventing secondary trauma",
        pdfCount: 1,
        videoCount: 1
      }
    ],
    preTest: {
      passingScore: 70,
      timeLimit: 25,
      attempts: 3,
      questions: [
        {
          id: "q1",
          type: "single",
          text: "What is the definition of trauma?",
          options: [
            "Minor stress",
            "Overwhelming experience",
            "Daily challenges",
            "Physical injury only"
          ],
          correctAnswers: [1]
        },
        {
          id: "q2",
          type: "truefalse",
          text: "Trauma only affects adults.",
          options: ["True", "False"],
          correctAnswers: [1]
        }
      ]
    },
    exam: {
      passingScore: 70,
      timeLimit: 45,
      attempts: 3,
      questions: [
        {
          id: "e1",
          type: "single",
          text: "Which is NOT a core principle of trauma-informed care?",
          options: ["Safety", "Punishment", "Trustworthiness", "Empowerment"],
          correctAnswers: [1]
        },
        {
          id: "e2",
          type: "multiple",
          text: "Select all trauma responses:",
          options: ["Fight", "Flight", "Freeze", "Fawn"],
          correctAnswers: [0, 1, 2, 3]
        }
      ]
    },
    certificate: {
      template: "standard",
      visibility: "registered",
      enrollment: "approval",
      requirements: {
        preTest: true,
        modules: true,
        exam: true,
        feedback: true
      }
    }
  },
  {
    id: "p3",
    code: "URC 3",
    title: "Recovery Capital Building",
    description:
      "Explore strategies for building and measuring recovery capital. Learn how to help individuals strengthen their resources for sustained recovery.",
    curriculum: "URC",
    duration: "25",
    submittedBy: {
      name: "Sarah Chen",
      avatar: "SC",
      role: "Program Manager",
      email: "sarah.chen@issup.org"
    },
    submittedDate: "1 day ago",
    stats: {
      modules: 3,
      questions: 15,
      materials: 5
    },
    introduction: {
      text:
        "Welcome to Recovery Capital Building. This course focuses on understanding and developing the resources that support long-term recovery.",
      videoUrl: "https://vimeo.com/example456",
      objectives: [
        "Define recovery capital and its components",
        "Assess individual recovery capital",
        "Develop strategies to build recovery capital"
      ],
      estimatedTime: "25"
    },
    modules: [
      {
        id: "m1",
        title: "Introduction to Recovery Capital",
        description: "Concepts and frameworks",
        pdfCount: 2,
        videoCount: 1
      },
      {
        id: "m2",
        title: "Assessment Tools",
        description: "Measuring recovery capital",
        pdfCount: 2,
        videoCount: 1
      },
      {
        id: "m3",
        title: "Building Strategies",
        description: "Practical approaches",
        pdfCount: 1,
        videoCount: 1
      }
    ],
    preTest: {
      passingScore: 70,
      timeLimit: 20,
      attempts: 3,
      questions: [
        {
          id: "q1",
          type: "single",
          text: "What is recovery capital?",
          options: [
            "Money for treatment",
            "Resources supporting recovery",
            "Medical insurance",
            "Job skills"
          ],
          correctAnswers: [1]
        }
      ]
    },
    exam: {
      passingScore: 70,
      timeLimit: 30,
      attempts: 3,
      questions: [
        {
          id: "e1",
          type: "multiple",
          text: "Which are types of recovery capital?",
          options: ["Social", "Physical", "Human", "Cultural"],
          correctAnswers: [0, 1, 2, 3]
        }
      ]
    },
    certificate: {
      template: "premium",
      visibility: "public",
      enrollment: "open",
      requirements: {
        preTest: false,
        modules: true,
        exam: true,
        feedback: false
      }
    }
  }
]
export function PendingApprovalsTab() {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    introduction: true,
    modules: true,
    pretest: false,
    exam: false,
    certificate: true
  })
  const toggleSection = section => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
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
  const getVisibilityLabel = visibility => {
    switch (visibility) {
      case "public":
        return "Public"
      case "registered":
        return "Registered Users Only"
      case "private":
        return "Private (Invite Only)"
      default:
        return visibility
    }
  }
  const getEnrollmentLabel = enrollment => {
    switch (enrollment) {
      case "open":
        return "Open Enrollment"
      case "approval":
        return "Approval Required"
      case "closed":
        return "Closed (Invitation Only)"
      default:
        return enrollment
    }
  }
  return (
    <div className="">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-5">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search pending courses..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500">
          <option>All Curricula</option>
          <option>UPC</option>
          <option>UTC</option>
          <option>URC</option>
        </select>
      </div>

      {/* Pending List */}
      <div className="grid grid-cols-1 gap-4">
        {mockPendingCourses.map(course => (
          <div
            key={course.id}
            className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col md:flex-row items-start md:items-center gap-6 hover:shadow-md transition-shadow"
          >
            {/* Status Icon */}
            <div className="hidden md:flex w-12 h-12 bg-orange-100 rounded-full items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`px-2.5 py-0.5 rounded text-xs font-bold border ${getCurriculumColor(
                    course.curriculum
                  )}`}
                >
                  {course.curriculum}
                </span>
                <span className="text-sm font-mono text-slate-500">
                  {course.code}
                </span>
                <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                  Pending Approval
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {course.title}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-700">
                    {course.submittedBy.avatar}
                  </div>
                  <span>{course.submittedBy.name}</span>
                </div>
                <span>•</span>
                <span>{course.submittedDate}</span>
                <span>•</span>
                <div className="flex gap-3">
                  <span>{course.stats.modules} modules</span>
                  <span>{course.stats.questions} questions</span>
                  <span>{course.stats.materials} files</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
              <button
                className="flex-1 md:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center justify-center gap-2"
                onClick={() => setSelectedCourse(course)}
              >
                <Eye className="w-4 h-4" />
                Review
              </button>
              <button
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg border border-slate-200 hover:border-green-200 transition-colors"
                title="Quick Approve"
              >
                <Check className="w-5 h-5" />
              </button>
              <button
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg border border-slate-200 hover:border-red-200 transition-colors"
                title="Quick Reject"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Review Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-8 py-6 border-b border-slate-200 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-bold border ${getCurriculumColor(
                      selectedCourse.curriculum
                    )}`}
                  >
                    {selectedCourse.curriculum}
                  </span>
                  <span className="text-sm font-mono text-slate-500">
                    {selectedCourse.code}
                  </span>
                  <span className="px-2.5 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Pending Review
                  </span>
                </div>
                <h2 className="font-bold text-2xl text-slate-900">
                  {selectedCourse.title}
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Submitted by {selectedCourse.submittedBy.name} •{" "}
                  {selectedCourse.submittedDate}
                </p>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {/* Review Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-900">Review Required</h4>
                  <p className="text-blue-800 text-sm">
                    Please review all course materials, assessments, and
                    settings before approving. Once approved, the course will be
                    published to the catalog.
                  </p>
                </div>
              </div>

              {/* Basic Information Section */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection("basic")}
                  className="w-full bg-slate-50 px-5 py-4 border-b border-slate-200 flex items-center justify-between hover:bg-slate-100 transition-colors"
                >
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    Basic Information
                  </h3>
                  {expandedSections.basic ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>
                {expandedSections.basic && (
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <span className="text-xs text-slate-500 block mb-1">
                          Curriculum
                        </span>
                        <span className="font-bold text-slate-900">
                          {selectedCourse.curriculum}
                        </span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <span className="text-xs text-slate-500 block mb-1">
                          Course Code
                        </span>
                        <span className="font-bold text-slate-900">
                          {selectedCourse.code}
                        </span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <span className="text-xs text-slate-500 block mb-1">
                          Duration
                        </span>
                        <span className="font-bold text-slate-900">
                          {selectedCourse.duration} hours
                        </span>
                      </div>
                      {selectedCourse.curriculum === "UPC" &&
                        selectedCourse.upcSeries && (
                          <div className="bg-slate-50 p-3 rounded-lg">
                            <span className="text-xs text-slate-500 block mb-1">
                              UPC Series
                            </span>
                            <span className="font-bold text-slate-900 flex items-center gap-1">
                              {selectedCourse.upcSeries === "managers" ? (
                                <>
                                  <Briefcase className="w-4 h-4" /> Managers &
                                  Supervisors
                                </>
                              ) : (
                                <>
                                  <Users className="w-4 h-4" /> Practitioners
                                </>
                              )}
                            </span>
                          </div>
                        )}
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block mb-1">
                        Description
                      </span>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        {selectedCourse.description}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <span className="text-xs text-slate-500 block mb-2">
                        Submitted By
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-700">
                          {selectedCourse.submittedBy.avatar}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block">
                            {selectedCourse.submittedBy.name}
                          </span>
                          <span className="text-xs text-slate-500">
                            {selectedCourse.submittedBy.role} •{" "}
                            {selectedCourse.submittedBy.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Introduction Section */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection("introduction")}
                  className="w-full bg-slate-50 px-5 py-4 border-b border-slate-200 flex items-center justify-between hover:bg-slate-100 transition-colors"
                >
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-600" />
                    Introduction Content
                  </h3>
                  {expandedSections.introduction ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>
                {expandedSections.introduction && (
                  <div className="p-5 space-y-4">
                    <div>
                      <span className="text-xs text-slate-500 block mb-2">
                        Introduction Text
                      </span>
                      <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-700 leading-relaxed">
                        {selectedCourse.introduction.text}
                      </div>
                    </div>
                    {selectedCourse.introduction.videoUrl && (
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <Video className="w-5 h-5 text-blue-600" />
                        <div>
                          <span className="text-xs text-slate-500 block">
                            Introduction Video
                          </span>
                          <a
                            href={selectedCourse.introduction.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm hover:underline"
                          >
                            {selectedCourse.introduction.videoUrl}
                          </a>
                        </div>
                      </div>
                    )}
                    <div>
                      <span className="text-xs text-slate-500 mb-2 flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        Learning Objectives (
                        {selectedCourse.introduction.objectives.length})
                      </span>
                      <ul className="space-y-2">
                        {selectedCourse.introduction.objectives.map(
                          (obj, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm"
                            >
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-700">{obj}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Learning Modules Section */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection("modules")}
                  className="w-full bg-slate-50 px-5 py-4 border-b border-slate-200 flex items-center justify-between hover:bg-slate-100 transition-colors"
                >
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                    Learning Modules ({selectedCourse.modules.length})
                  </h3>
                  {expandedSections.modules ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>
                {expandedSections.modules && (
                  <div className="p-5">
                    <div className="space-y-3">
                      {selectedCourse.modules.map((module, index) => (
                        <div
                          key={module.id}
                          className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg"
                        >
                          <span className="w-10 h-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {index + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <span className="font-bold text-slate-900 block">
                              {module.title}
                            </span>
                            <span className="text-xs text-slate-500">
                              {module.description}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              {module.pdfCount} PDFs
                            </span>
                            <span className="flex items-center gap-1">
                              <Video className="w-4 h-4" />
                              {module.videoCount} Videos
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Knowledge Check Section */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection("pretest")}
                  className="w-full bg-slate-50 px-5 py-4 border-b border-slate-200 flex items-center justify-between hover:bg-slate-100 transition-colors"
                >
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-orange-600" />
                    Knowledge Check ({
                      selectedCourse.preTest.questions.length
                    }{" "}
                    questions)
                  </h3>
                  {expandedSections.pretest ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>
                {expandedSections.pretest && (
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-orange-50 p-3 rounded-lg text-center">
                        <span className="text-xs text-orange-600 block mb-1">
                          Passing Score
                        </span>
                        <span className="font-bold text-orange-900 text-lg">
                          {selectedCourse.preTest.passingScore}%
                        </span>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg text-center">
                        <span className="text-xs text-orange-600 block mb-1">
                          Time Limit
                        </span>
                        <span className="font-bold text-orange-900 text-lg">
                          {selectedCourse.preTest.timeLimit} min
                        </span>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg text-center">
                        <span className="text-xs text-orange-600 block mb-1">
                          Attempts
                        </span>
                        <span className="font-bold text-orange-900 text-lg">
                          {selectedCourse.preTest.attempts}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {selectedCourse.preTest.questions.map((q, i) => (
                        <div
                          key={q.id}
                          className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg"
                        >
                          <span className="w-6 h-6 bg-orange-100 text-orange-700 rounded text-xs flex items-center justify-center font-bold flex-shrink-0">
                            {i + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-slate-700">{q.text}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs px-2 py-0.5 bg-slate-200 text-slate-600 rounded capitalize">
                                {q.type}
                              </span>
                              <span className="text-xs text-slate-400">
                                {q.options.length} options
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Module Exam Section */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection("exam")}
                  className="w-full bg-slate-50 px-5 py-4 border-b border-slate-200 flex items-center justify-between hover:bg-slate-100 transition-colors"
                >
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-red-600" />
                    Module Exam ({selectedCourse.exam.questions.length}{" "}
                    questions)
                  </h3>
                  {expandedSections.exam ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>
                {expandedSections.exam && (
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-red-50 p-3 rounded-lg text-center">
                        <span className="text-xs text-red-600 block mb-1">
                          Passing Score
                        </span>
                        <span className="font-bold text-red-900 text-lg">
                          {selectedCourse.exam.passingScore}%
                        </span>
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg text-center">
                        <span className="text-xs text-red-600 block mb-1">
                          Time Limit
                        </span>
                        <span className="font-bold text-red-900 text-lg">
                          {selectedCourse.exam.timeLimit} min
                        </span>
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg text-center">
                        <span className="text-xs text-red-600 block mb-1">
                          Attempts
                        </span>
                        <span className="font-bold text-red-900 text-lg">
                          {selectedCourse.exam.attempts}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {selectedCourse.exam.questions.map((q, i) => (
                        <div
                          key={q.id}
                          className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg"
                        >
                          <span className="w-6 h-6 bg-red-100 text-red-700 rounded text-xs flex items-center justify-center font-bold flex-shrink-0">
                            {i + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-slate-700">{q.text}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs px-2 py-0.5 bg-slate-200 text-slate-600 rounded capitalize">
                                {q.type}
                              </span>
                              <span className="text-xs text-slate-400">
                                {q.options.length} options
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Certificate & Settings Section */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection("certificate")}
                  className="w-full bg-slate-50 px-5 py-4 border-b border-slate-200 flex items-center justify-between hover:bg-slate-100 transition-colors"
                >
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-slate-600" />
                    Certificate & Settings
                  </h3>
                  {expandedSections.certificate ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>
                {expandedSections.certificate && (
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <span className="text-xs text-slate-500  mb-1 flex items-center gap-1">
                          <Award className="w-3 h-3" /> Certificate Template
                        </span>
                        <span className="font-bold text-slate-900 capitalize">
                          {selectedCourse.certificate.template}
                        </span>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <span className="text-xs text-slate-500  mb-1 flex items-center gap-1">
                          {selectedCourse.certificate.visibility ===
                          "public" ? (
                            <Globe className="w-3 h-3" />
                          ) : (
                            <Lock className="w-3 h-3" />
                          )}
                          Visibility
                        </span>
                        <span className="font-bold text-slate-900">
                          {getVisibilityLabel(
                            selectedCourse.certificate.visibility
                          )}
                        </span>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <span className="text-xs text-slate-500  mb-1 flex items-center gap-1">
                          <UserCheck className="w-3 h-3" /> Enrollment
                        </span>
                        <span className="font-bold text-slate-900">
                          {getEnrollmentLabel(
                            selectedCourse.certificate.enrollment
                          )}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block mb-2">
                        Completion Requirements
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          {
                            key: "preTest",
                            label: "Complete Knowledge Check",
                            enabled:
                              selectedCourse.certificate.requirements.preTest
                          },
                          {
                            key: "modules",
                            label: "View all Learning Modules",
                            enabled:
                              selectedCourse.certificate.requirements.modules
                          },
                          {
                            key: "exam",
                            label: "Pass Module Exam",
                            enabled:
                              selectedCourse.certificate.requirements.exam
                          },
                          {
                            key: "feedback",
                            label: "Submit Feedback Survey",
                            enabled:
                              selectedCourse.certificate.requirements.feedback
                          }
                        ].map(req => (
                          <div
                            key={req.key}
                            className={`flex items-center gap-2 p-2 rounded text-sm ${
                              req.enabled
                                ? "bg-green-50 text-green-700"
                                : "bg-slate-50 text-slate-400"
                            }`}
                          >
                            {req.enabled ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <X className="w-4 h-4" />
                            )}
                            {req.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-8 py-5 border-t border-slate-200 flex justify-between items-center">
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-6 py-2.5 text-slate-600 font-bold hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <div className="flex gap-3">
                <button className="px-6 py-2.5 border-2 border-red-200 text-red-600 font-bold rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2">
                  <X className="w-4 h-4" />
                  Reject
                </button>
                <button className="px-6 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Approve & Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
