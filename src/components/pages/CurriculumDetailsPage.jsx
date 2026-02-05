import React, { useState, useEffect } from "react"
import {
  ArrowLeft,
  ChevronRight,
  Home,
  Clock,
  Award,
  Globe,
  BookOpen,
  Beaker,
  Brain,
  BarChart3,
  Users,
  School,
  Building,
  Leaf,
  Radio,
  UserPlus,
  Download,
  ChevronDown,
  ChevronUp,
  Check,
  FileText,
  Heart,
  Shield,
  LogIn
} from "lucide-react"
import { Header } from "../Header"
import { Footer } from "../Footer"
import { ScrollToTop } from "../ScrollToTop"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom"

// UTC Courses
const utcCourses = [
  {
    code: "UTC 1",
    title: "Introduction to the Science of Addiction",
    hours: 20,
    description:
      "This course provides the foundation for understanding the science of addiction. It gives an overview of the physiology of addiction as a brain disease and pharmacology of psychoactive substances.",
    icon: Brain
  },
  {
    code: "UTC 2",
    title: "Treatment for Substance Use Disorders–The Continuum of Care",
    hours: 33,
    description:
      "The course provides the foundation for learning about substance use disorder (SUD) treatment. It gives an overview of recovery and recovery management, stages of change, principles of effective treatment, components of treatment and evidence-based practices.",
    icon: Heart
  },
  {
    code: "UTC 3",
    title: "Common Co-occurring Mental and Medical Disorders",
    hours: 20,
    description:
      "This course offers an overview of the relationship between co-occurring mental and SUD-related treatment issues.",
    icon: BarChart3
  },
  {
    code: "UTC 4",
    title: "Basic Counselling Skills for Addiction Professionals",
    hours: 33,
    description:
      "This course focusses on an overview of the helping relationship and the opportunity to practice core counselling including basic skills in motivational interviewing, group counselling and implementation of psychoeducation sessions.",
    icon: Users
  },
  {
    code: "UTC 5",
    title:
      "Intake, Screening, Assessment, Treatment Planning and Documentation",
    hours: 33,
    description:
      "This is a skills-based course that teaches effective and integrated intake, screening, assessment, treatment planning and documentation procedures to addiction professionals.",
    icon: FileText
  },
  {
    code: "UTC 6",
    title: "Case Management for Addiction Professionals",
    hours: 20,
    description:
      "This is a skills-based course that provides an overview of case management in the treatment of substance use disorders and provides skills in case management.",
    icon: Building
  },
  {
    code: "UTC 7",
    title: "Crisis Intervention for Addiction Professionals",
    hours: 20,
    description:
      "This course addresses the concept of crisis as a part of life and provides guidelines for crisis intervention, including managing suicide risk. It also addresses ways counsellors can avoid personal crisis situations by providing information and exercises about counsellor self-care.",
    icon: Shield
  },
  {
    code: "UTC 8",
    title: "Ethics for Addiction Professionals",
    hours: 20,
    description:
      "This course addresses professional conduct and ethical behavior in SUD treatment that covers confidentiality, ethical principles and professional code of ethics. It provides the opportunity to learn and practice the use of an ethical decision making model through case study analyses.",
    icon: Award
  }
]

// UPC Courses
const upcManagerCourses = [
  {
    code: "UPC 1",
    title: "Introduction to Prevention Science",
    hours: 40,
    description:
      "Overview of the science that underlies evidence-based prevention interventions and strategies, and the application of these effective approaches in prevention practice.",
    icon: Beaker
  },
  {
    code: "UPC 2",
    title: "Physiology and Pharmacology for Prevention Professionals",
    hours: 24,
    description:
      "Overview of the physiology and pharmacology of psychoactive substances and their effects on the brain to affect mood, cognition, and behaviour.",
    icon: Brain
  },
  {
    code: "UPC 3",
    title: "Monitoring and Evaluation of Prevention Interventions and Policies",
    hours: 40,
    description:
      "Overview of primary evaluation methods used to measure evidence-based prevention interventions and guidance in applying them to real-world prevention settings.",
    icon: BarChart3
  },
  {
    code: "UPC 4",
    title: "Family Based Prevention Interventions",
    hours: 32,
    description:
      "Explores the family as the primary socialization agent of children, the science behind family-based prevention interventions.",
    icon: Users
  },
  {
    code: "UPC 5",
    title: "School-based Prevention Interventions",
    hours: 40,
    description:
      "Overview of the school in society, the science behind school-based prevention interventions, and application in school settings.",
    icon: School
  },
  {
    code: "UPC 6",
    title: "Workplace-based Prevention Interventions",
    hours: 24,
    description:
      "Overview of the role of work and workplace in society, how stresses affect people's risk of substance use.",
    icon: Building
  },
  {
    code: "UPC 7",
    title: "Environment-based Prevention Interventions",
    hours: 24,
    description:
      "Reviews the science underlying evidence-based substance use prevention environmental interventions, involving policy and community-wide strategies.",
    icon: Leaf
  },
  {
    code: "UPC 8",
    title: "Media-based Prevention Interventions",
    hours: 24,
    description:
      "Presents the science underlying the use of media for substance use prevention interventions.",
    icon: Radio
  },
  {
    code: "UPC 9",
    title: "Community-based Prevention Implementation Systems",
    hours: 40,
    description:
      "Introduces the science underlying the systems approach to prevention interventions and guidance on developing such approaches.",
    icon: UserPlus
  }
]

const upcPractitionerTracks = [
  {
    title: "Family-based Prevention",
    hours: 87,
    courses: 7,
    description:
      "Overview of science in family-based prevention interventions and methods to prevent substance use in children and adolescents."
  },
  {
    title: "School-Based Prevention",
    hours: 84,
    courses: 8,
    description:
      "Science behind school-based prevention interventions, methods to improve school climate, strengthen policies.",
    subTracks: ["Administrators track", "Teachers track"]
  },
  {
    title: "Workplace-Based Prevention",
    hours: 85,
    courses: 7,
    description:
      "Science underlying workplace-based prevention, methods to improve workplace environment and culture."
  },
  {
    title: "Environment-Based Prevention",
    hours: 69,
    courses: 7,
    description:
      "Science behind effective environment-based prevention interventions focusing on community-wide strategies."
  },
  {
    title: "Media-Based Prevention",
    hours: 86,
    courses: 6,
    description:
      "Science in effective media-based substance use prevention with focus on developing persuasive communications."
  },
  {
    title: "Community-Based Prevention",
    hours: 89,
    courses: 7,
    description:
      "Science underlying systems approaches to prevention interventions and methods for planning community-wide implementation."
  },
  {
    title: "Monitoring and Evaluation",
    hours: 63,
    courses: 8,
    description:
      "Primary evaluation methods with focus on monitoring and process evaluation for measuring outcomes."
  }
]

// URC Courses
const urcCourses = [
  {
    code: "URC 1",
    title: "Delivering Recovery Support Services: The PEER Model",
    subtitle: "Peer Experiences Empower Recovery",
    description:
      "This course does not require prerequisite training and is designed to be a stand-alone course so that recovery support professionals can be trained quickly in the field. This course provides a brief foundation that defines substance use disorders and recovery, and then provides the needed information about competencies and skills, including awareness of trauma-informed care, self-care, and boundary setting, to work successfully as a recovery support professional.",
    note:
      "This course is created for those who already are working or want to work as a peer support professional and who are in sustained recovery for a minimum of two years from a substance use disorder.",
    icon: Users
  },
  {
    code: "URC 2",
    title: "Delivering Recovery Support Services: The Recovery Allies Model",
    subtitle: "Allies Link and Lend Inventive Engaging Support",
    description:
      "Like the PEER course, the Allies course does not require prerequisite training and is designed to be a stand-alone course so that recovery support professionals can be trained quickly in the field. The Recovery Allies course orients participants through a brief foundation that defines substance use disorders and recovery, and then provides the needed information about competencies and skills, including awareness of trauma-informed care, self-care, and boundary setting, to work successfully as a recovery support professional.",
    note:
      "This course is created for those with interest in working as a recovery support professional and who do NOT identify as being in recovery from a substance use disorder.",
    icon: Heart
  }
]

const curriculumData = {
  upc: {
    title: "Universal Prevention Curriculum",
    acronym: "UPC",
    description:
      "Evidence-based training for prevention professionals working to address substance use at the community level",
    overview: `The Universal Prevention Curriculum for Substance Use aims to address the need for knowledgeable and competent professionals working in the prevention field. This training series is designed to meet the current demand for an evidence-based curriculum for substance use prevention that would complement the existing Universal Treatment Curriculum.

It has been developed for managers and supervisors of government programs and community-based organizations as well as prevention practitioners for working in evidence-based prevention at the grassroots level.

The development of the UPC is in accordance with science-based information and skills-based prevention training, and founded on the International Standards on Drug Use Prevention developed by the United Nations Office on Drugs and Crime (UNODC).`,
    hasTabs: true,
    courses: upcManagerCourses,
    tracks: upcPractitionerTracks
  },
  utc: {
    title: "Universal Treatment Curriculum",
    acronym: "UTC",
    description:
      "Comprehensive training for treatment professionals in substance use disorder treatment",
    overview: `The Universal Treatment Curriculum (UTC) has been developed by several teams of curriculum developers, including JBS International, SME Consulting, and TTK, with overall coordination by the International Centre for Credentialing and Education of Addiction Professionals (ICCE). It provides a series of training materials for knowledge and skill development of treatment professionals. The aim of the training series is to reduce the significant health, social and economic problems associated with substance use disorders by building international treatment capacity through training, and so expanding the professional global treatment workforce.

UTC is available through the basic and advanced series as well as with several specialist series that focus on populations with special needs, such as women, children, and persons in recovery.`,
    hasTabs: false,
    courses: utcCourses,
    sectionTitle: "UTC Basic Level",
    sectionDescription:
      "The Basic Level UTC consists of eight courses that cover the broad spectrum of treatment for substance use disorders."
  },
  urc: {
    title: "Universal Recovery Curriculum",
    acronym: "URC",
    description:
      "Training for recovery support professionals to provide compassionate, effective recovery services",
    overview: `Recovery from substance use disorders is more than just not using alcohol or other substances. It is more than just going through substance use disorder treatment. It is a long-term process of learning to live life and solve problems without alcohol or other drugs. Long-term support is often necessary for individuals with substance use disorders to achieve and sustain recovery.

Both of the URC courses focus on equipping participants with core competencies and skills to work as a recovery support professional. One course is designed for those individuals who themselves are in recovery from a substance use disorder and the other is for those individuals who do not identify as being in recovery. Successful completion of either one of the recovery-focused courses will allow participants to become eligible to sit for an exam through the Global Centre for Credentialing and Certification (GCCC) to qualify to work as a recovery support professional in the field.`,
    hasTabs: false,
    courses: urcCourses,
    sectionTitle: "URC: Delivering Recovery Support Services",
    sectionDescription:
      "Both of the URC courses focus on equipping participants with core competencies and skills to work as a recovery support professional."
  }
}

export function CurriculumDetailsPage() {
  const navigate = useNavigate()
  
  // Get curriculum ID from URL
  const path = window.location.pathname
  const curriculumId = path.split("/").pop()
  const curriculum = curriculumData[curriculumId] || curriculumData.upc
  
  const [activeTab, setActiveTab] = useState("managers")
  const [expandedTrack, setExpandedTrack] = useState(null)
  const [selectedCourses, setSelectedCourses] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  // Check login status on component mount
  useEffect(() => {
    const logged = localStorage.getItem("logged") === "true"
    setIsLoggedIn(logged)
  }, [])
  
  const totalHours = curriculum.courses.reduce(
    (sum, course) => sum + (course.hours || 0),
    0
  )
  
  const toggleCourseSelection = courseCode => {
    if (!isLoggedIn) {
      navigate("/login")
      return
    }
    
    setSelectedCourses(prev =>
      prev.includes(courseCode)
        ? prev.filter(c => c !== courseCode)
        : [...prev, courseCode]
    )
  }
  
  const calculateTotalHours = () => {
    return curriculum.courses
      .filter(course => selectedCourses.includes(course.code))
      .reduce((sum, course) => sum + (course.hours || 0), 0)
  }
  
  const handleApplyForCourses = () => {
    if (!isLoggedIn) {
      navigate("/login")
      return
    }
    
    if (selectedCourses.length === 0) {
      toast.warning("Please select at least one course to apply", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      return
    }
    
    // Show success message
    toast.success(
      `Application submitted successfully! You've applied for ${selectedCourses.length} course(s). Please wait for admin approval.`,
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    )
    
    // Optional: Clear selected courses after submission
    setTimeout(() => {
      setSelectedCourses([])
    }, 2000)
    
    // Here you would typically make an API call to submit the application
    console.log("Applied for courses:", selectedCourses)
  }
  
  return (
    <div>
      <ToastContainer />
      <Header />
      <div className="min-h-screen bg-white">
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2 text-sm">
              <a
                href="/"
                className="text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors"
              >
                <Home className="w-4 h-4" />
                Home
              </a>
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <span className="text-slate-500">Universal Curricula</span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <span className="text-slate-900 font-medium">
                {curriculum.title}
              </span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <button
              onClick={() => (window.location.href = "/")}
              className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-semibold mb-4 text-slate-700 uppercase tracking-wide">
                  {curriculum.acronym} Certification
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  {curriculum.title}
                </h1>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {curriculum.description}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-slate-200 rounded-lg p-4">
                    <Clock className="w-5 h-5 text-blue-600 mb-2" />
                    <div className="text-2xl font-bold text-slate-900">
                      {totalHours}+ hrs
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">
                      Total Training
                    </div>
                  </div>
                  <div className="border border-slate-200 rounded-lg p-4">
                    <BookOpen className="w-5 h-5 text-blue-600 mb-2" />
                    <div className="text-2xl font-bold text-slate-900">
                      {curriculum.courses.length}
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">
                      Courses
                    </div>
                  </div>
                  <div className="border border-slate-200 rounded-lg p-4">
                    <Award className="w-5 h-5 text-blue-600 mb-2" />
                    <div className="text-2xl font-bold text-slate-900">
                      International
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">
                      Certification
                    </div>
                  </div>
                  <div className="border border-slate-200 rounded-lg p-4">
                    <Globe className="w-5 h-5 text-blue-600 mb-2" />
                    <div className="text-2xl font-bold text-slate-900">
                      ICCE
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">
                      Accredited
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative h-[500px] rounded-lg overflow-hidden border border-slate-200">
                <img
                  src={
                    curriculumId === "utc"
                      ? "https://plus.unsplash.com/premium_photo-1677717787558-c0c9c2090973?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      : curriculumId === "urc"
                        ? "https://images.unsplash.com/photo-1758599878920-d42cccc4aeca?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        : "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  }
                  alt="Professional training workshop"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              About {curriculum.title}
            </h2>
            <div className="prose prose-lg max-w-none text-slate-600 space-y-4 leading-relaxed">
              {curriculum.overview.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Download Materials */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-5">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Download Materials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {curriculumId === "upc" && (
                <>
                  <button
                    onClick={() => window.open('/pdf/UPC flyer 2020 ISSUP website.pdf', '_self')}
                    className="flex items-center gap-3 px-6 py-2 border-2 border-slate-200 rounded-lg hover:border-slate-300 transition-colors cursor-pointer"
                  >
                    <Download className="w-6 h-6 text-slate-700" />
                    <div className="text-left">
                      <div className="font-semibold text-slate-900">
                        UPC Overview Flyer
                      </div>
                      <div className="text-sm text-slate-500">PDF</div>
                    </div>
                  </button>
                  <button
                    onClick={() => window.open('/pdf/UPC flyer 2020 ISSUP website.pdf', '_self')}
                    className="flex items-center gap-3 px-6 py-2 border-2 border-slate-200 rounded-lg hover:border-slate-300 transition-colors cursor-pointer"
                  >
                    <Download className="w-6 h-6 text-slate-700" />
                    <div className="text-left">
                      <div className="font-semibold text-slate-900">
                        Example Trainer Manual
                      </div>
                      <div className="text-sm text-slate-500">PDF</div>
                    </div>
                  </button>
                </>
              )}
              {curriculumId === "utc" && (
                <>
                  <button
                    onClick={() => window.open('/pdf/Example UTC Trainer Manual.pdf', '_self')}
                    className="flex items-center gap-3 px-6 py-2 border-2 border-slate-200 rounded-lg hover:border-slate-300 transition-colors cursor-pointer"
                  >
                    <Download className="w-6 h-6 text-slate-700" />
                    <div className="text-left">
                      <div className="font-semibold text-slate-900">
                        Example Trainer Manual
                      </div>
                      <div className="text-sm text-slate-500">PDF</div>
                    </div>
                  </button>
                  <a
                    href="/pdf/Module 0 Slides.pptx"
                    download="Module 0 Slides.pptx"
                    className="flex items-center gap-3 px-6 py-2 border-2 border-slate-200 rounded-lg hover:border-slate-300 transition-colors cursor-pointer"
                  >
                    <Download className="w-6 h-6 text-slate-700" />
                    <div className="text-left">
                      <div className="font-semibold text-slate-900">
                        Module Slides
                      </div>
                      <div className="text-sm text-slate-500">PPTX</div>
                    </div>
                  </a>
                </>
              )}
              {curriculumId === "urc" && (
                <button
                  onClick={() => window.open('/pdf/Virtual Participant Manual.pdf', '_self')}
                  className="flex items-center gap-3 px-6 py-2 border-2 border-slate-200 rounded-lg hover:border-slate-300 transition-colors cursor-pointer"
                >
                  <Download className="w-6 h-6 text-slate-700" />
                  <div className="text-left">
                    <div className="font-semibold text-slate-900">
                      Virtual Participant Manual
                    </div>
                    <div className="text-sm text-slate-500">PDF</div>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Professional Images */}
        {curriculumId !== "urc" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative h-[300px] rounded-lg overflow-hidden border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden border border-slate-200">
                <img
                  src="https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Professional training session"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* Learning Path Builder */}
        {isLoggedIn && selectedCourses.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="border-2 border-slate-900 rounded-lg p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Your Learning Path
                  </h3>
                  <p className="text-slate-600">
                    {selectedCourses.length} course{selectedCourses.length > 1 ? 's' : ''} selected • {calculateTotalHours()} total hours
                  </p>
                </div>
                <button 
                  onClick={handleApplyForCourses}
                  className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply For Courses
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Courses Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {curriculum.hasTabs ? (
            // UPC with tabs
            <>
              <div className="border-b border-slate-200 mb-12">
                <div className="flex gap-8">
                  <button
                    onClick={() => setActiveTab("managers")}
                    className={`pb-4 px-2 font-semibold transition-colors relative ${activeTab === "managers"
                        ? "text-slate-900"
                        : "text-slate-400 hover:text-slate-600"
                      }`}
                  >
                    Managers & Supervisors Series
                    <span className="ml-2 px-2 py-0.5 bg-blue-50 text-slate-700 text-xs font-bold rounded-full border border-blue-600">
                      9 courses
                    </span>
                    {activeTab === "managers" && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"></div>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("practitioners")}
                    className={`pb-4 px-2 font-semibold transition-colors relative ${activeTab === "practitioners"
                        ? "text-slate-900"
                        : "text-slate-400 hover:text-slate-600"
                      }`}
                  >
                    Practitioners Series
                    <span className="ml-2 px-2 py-0.5 bg-blue-50 text-slate-700 text-xs font-bold rounded-full border border-blue-600">
                      8 tracks
                    </span>
                    {activeTab === "practitioners" && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"></div>
                    )}
                  </button>
                </div>
              </div>

              {activeTab === "managers" ? (
                <div>
                  <div className="border border-slate-200 rounded-lg p-6 mb-12">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      UPC for Managers and Supervisors Series
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Training programme for prevention managers and supervisors
                      who manage and supervise the implementation of prevention
                      interventions and/or policies.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="font-semibold">9 courses</span>
                      <span>•</span>
                      <span className="font-semibold">
                        {totalHours} total hours
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {curriculum.courses.map((course, index) => (
                      <CourseCard
                        key={index}
                        course={course}
                        selectedCourses={selectedCourses}
                        toggleCourseSelection={toggleCourseSelection}
                        isLoggedIn={isLoggedIn}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <PractitionerSeries
                  tracks={curriculum.tracks || []}
                  expandedTrack={expandedTrack}
                  setExpandedTrack={setExpandedTrack}
                />
              )}
            </>
          ) : (
            // UTC and URC without tabs
            <>
              <div className="border border-slate-200 rounded-lg p-6 mb-12">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {curriculum.sectionTitle}
                </h3>
                <p className="text-slate-600">
                  {curriculum.sectionDescription}
                </p>
              </div>

              <div
                className={`grid grid-cols-1 ${curriculumId === "urc"
                    ? "md:grid-cols-2 gap-8"
                    : "md:grid-cols-2 lg:grid-cols-3 gap-6"
                  }`}
              >
                {curriculum.courses.map((course, index) =>
                  curriculumId === "urc" ? (
                    <URCCourseCard key={index} course={course} isLoggedIn={isLoggedIn} />
                  ) : (
                    <CourseCard
                      key={index}
                      course={course}
                      selectedCourses={selectedCourses}
                      toggleCourseSelection={toggleCourseSelection}
                      isLoggedIn={isLoggedIn}
                    />
                  )
                )}
              </div>
            </>
          )}

          {/* CTA Section */}
          <div className="border-t border-slate-200 pt-16 mt-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Ready to Start Your Certification?
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals making a global impact through
              evidence-based training.
            </p>
            {isLoggedIn ? (
              <button 
                onClick={() => window.location.href = "/register"}
                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all duration-300"
              >
                Begin Enrollment Process
              </button>
            ) : (
              <button 
                onClick={() => navigate("/login")}
                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all duration-300 inline-flex items-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                Sign In to Enroll
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

// Course Card Component
function CourseCard({ course, selectedCourses, toggleCourseSelection, isLoggedIn }) {
  const isSelected = selectedCourses.includes(course.code)
  
  return (
    <div className="bg-white rounded-lg border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 overflow-hidden group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 border border-blue-600 bg-blue-50 rounded-lg flex items-center justify-center">
            <course.icon className="w-6 h-6 text-blue-600" />
          </div>
          <span className="px-2 py-1 border border-yellow-400 bg-yellow-50 rounded text-xs font-bold text-slate-600">
            {course.code}
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 leading-tight mb-3">
          {course.title}
        </h3>

        <div className="flex items-center gap-2 mb-4 text-slate-500">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-semibold">{course.hours} hours</span>
        </div>

        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          {course.description}
        </p>

        <div className="flex gap-2">
          {isLoggedIn ? (
            <button
              onClick={() => toggleCourseSelection(course.code)}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                isSelected
                  ? "bg-slate-900 text-white"
                  : "border-2 border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              {isSelected ? (
                <span className="flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" />
                  Added
                </span>
              ) : (
                "Add to Path"
              )}
            </button>
          ) : (
            <button
              onClick={() => toggleCourseSelection(course.code)}
              className="flex-1 px-4 py-2 rounded-lg font-semibold transition-all text-sm border-2 border-blue-600 text-blue-600 hover:bg-blue-50 inline-flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Sign In for More
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// URC Course Card Component
function URCCourseCard({ course, isLoggedIn }) {
  const navigate = useNavigate()
  
  const handleButtonClick = () => {
    if (!isLoggedIn) {
      navigate("/login")
      return
    }
    
    toast.info("Course details coming soon!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }
  
  return (
    <div className="bg-white rounded-lg border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 overflow-hidden">
      <div className="p-8">
        <div className="flex items-start justify-between mb-4">
          <div className="w-16 h-16 border border-blue-300 bg-blue-50 rounded-lg flex items-center justify-center">
            <course.icon className="w-8 h-8 text-blue-600" />
          </div>
          <span className="px-3 py-1 border border-yellow-400 bg-yellow-50 rounded text-xs font-bold text-slate-600 uppercase tracking-wide">
            {course.code}
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2">
          {course.title}
        </h3>
        <p className="text-sm font-medium text-slate-500 mb-4 italic">
          {course.subtitle}
        </p>

        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
          {course.description}
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
          <p className="text-xs text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-900">Note:</span>{" "}
            {course.note}
          </p>
        </div>

        {isLoggedIn ? (
          <button 
            onClick={handleButtonClick}
            className="w-full px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
          >
            View Course Details
          </button>
        ) : (
          <button 
            onClick={handleButtonClick}
            className="w-full px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            Sign In for More
          </button>
        )}
      </div>
    </div>
  )
}

// Practitioner Series Component (for UPC)
function PractitionerSeries({ tracks, expandedTrack, setExpandedTrack }) {
  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-6 mb-12">
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          UPC for Practitioners Series
        </h3>
        <p className="text-slate-600">
          Designed to provide knowledge, skills, and competencies to prevention
          practitioners for better understanding of key elements of
          evidence-based prevention.
        </p>
      </div>

      {/* Core Course */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 rounded-lg p-8 text-white mb-12">
        <div className="inline-block px-3 py-1 bg-white text-slate-900 rounded-full text-xs font-bold mb-4 uppercase tracking-wide">
          Core Foundation Course
        </div>
        <h3 className="text-2xl font-bold mb-3">
          UPC 10: Introduction to the Universal Prevention Curriculum Series for
          Practitioner
        </h3>
        <p className="text-slate-300 mb-6 leading-relaxed">
          Composed of 10 modules representing different aspects of prevention
          science and its application to practice. Gives participants a
          foundation in knowledge and skills for evidence-based prevention
          programming.
        </p>
        <div className="flex items-center gap-6 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">48 training hours</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            <span>10 modules</span>
          </div>
        </div>
        <button className="px-8 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-100 transition-colors">
          Start Core Course
        </button>
      </div>

      {/* Specialty Tracks */}
      <h3 className="text-2xl font-bold text-slate-900 mb-6">
        Specialty Tracks
      </h3>
      <div className="space-y-4">
        {tracks.map((track, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border-2 border-slate-200 hover:border-slate-300 transition-colors overflow-hidden"
          >
            <button
              onClick={() =>
                setExpandedTrack(expandedTrack === index ? null : index)
              }
              className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start gap-4 flex-1 text-left">
                <div className="w-12 h-12 border border-blue-600 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                    {track.title}
                  </h4>
                  <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                    {track.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1 font-semibold">
                      <Clock className="w-4 h-4" />
                      {track.hours} hours
                    </span>
                    <span>•</span>
                    <span>{track.courses} courses</span>
                    {track.subTracks && (
                      <>
                        <span>•</span>
                        <span>{track.subTracks.length} sub-tracks</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {expandedTrack === index ? (
                <ChevronUp className="w-6 h-6 text-slate-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-6 h-6 text-slate-400 flex-shrink-0" />
              )}
            </button>

            {expandedTrack === index && (
              <div className="px-6 pb-6 border-t border-slate-200">
                <div className="pt-6">
                  {track.subTracks && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-slate-700 mb-2">
                        Available Sub-Tracks:
                      </p>
                      <div className="flex gap-2">
                        {track.subTracks.map((subTrack, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 border border-slate-200 text-slate-700 text-sm font-medium rounded-full"
                          >
                            {subTrack}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end">
                    <button className="w-56 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg transition-colors">
                      View Track Details
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
