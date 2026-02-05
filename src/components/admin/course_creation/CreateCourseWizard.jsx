import React, { useState } from 'react'
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Save,
  Upload,
  Plus,
  Trash2,
  FileText,
  Video,
  Image as ImageIcon,
  HelpCircle,
  AlertCircle,
  GripVertical,
  ChevronDown,
  ChevronUp,
  Copy,
  Play,
  Clock,
  Award,
  Settings,
  Eye,
  BookOpen,
  CheckCircle,
  X,
  Users,
  Briefcase,
} from 'lucide-react'

const steps = [
  'Basic Information',
  'Knowledge Check',
  'Introduction',
  'Learning Modules',
  'Module Exam',
  'Certificate',
  'Review',
]

const createEmptyQuestion = () => ({
  id: Math.random().toString(36).substr(2, 9),
  type: 'single',
  text: '',
  options: ['', '', '', ''],
  correctAnswers: [],
  explanation: '',
})

const createEmptyModule = () => ({
  id: Math.random().toString(36).substr(2, 9),
  title: '',
  description: '',
  pdfs: [],
  videos: [],
  isExpanded: true,
})

export function CreateCourseWizard({ onCancel }) {
  const [currentStep, setCurrentStep] = useState(1)
  
  // Step 1: Basic Info
  const [formData, setFormData] = useState({
    curriculum: '',
    upcSeries: '',
    code: '',
    title: '',
    description: '',
    duration: '',
    level: 'Beginner',
  })
  
  // Step 2: Knowledge Check (Pre-test)
  const [preTestSettings, setPreTestSettings] = useState({
    passingScore: 70,
    timeLimit: 30,
    attempts: 3,
    randomize: true,
  })
  const [preTestQuestions, setPreTestQuestions] = useState([
    createEmptyQuestion(),
  ])
  
  // Step 3: Introduction
  const [introduction, setIntroduction] = useState({
    text: '',
    videoUrl: '',
    objectives: ['', '', ''],
    estimatedTime: '',
  })
  
  // Step 4: Learning Modules
  const [modules, setModules] = useState([createEmptyModule()])
  
  // Step 5: Module Exam
  const [examSettings, setExamSettings] = useState({
    passingScore: 70,
    timeLimit: 60,
    attempts: 3,
    randomize: true,
    showAnswers: true,
  })
  const [examQuestions, setExamQuestions] = useState([
    createEmptyQuestion(),
  ])
  
  // Step 6: Certificate
  const [certificateSettings, setCertificateSettings] = useState({
    template: 'standard',
    requirements: {
      preTest: true,
      modules: true,
      exam: true,
      feedback: true,
    },
    visibility: 'public',
    enrollment: 'open',
  })
  
  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1)
  }
  
  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }
  
  // Question management functions
  const addQuestion = (isExam) => {
    if (isExam) {
      setExamQuestions([...examQuestions, createEmptyQuestion()])
    } else {
      setPreTestQuestions([...preTestQuestions, createEmptyQuestion()])
    }
  }
  
  const updateQuestion = (id, updates, isExam) => {
    const questions = isExam ? examQuestions : preTestQuestions
    const setQuestions = isExam ? setExamQuestions : setPreTestQuestions
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? {
              ...q,
              ...updates,
            }
          : q,
      ),
    )
  }
  
  const deleteQuestion = (id, isExam) => {
    const questions = isExam ? examQuestions : preTestQuestions
    const setQuestions = isExam ? setExamQuestions : setPreTestQuestions
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id))
    }
  }
  
  const duplicateQuestion = (id, isExam) => {
    const questions = isExam ? examQuestions : preTestQuestions
    const setQuestions = isExam ? setExamQuestions : setPreTestQuestions
    const question = questions.find((q) => q.id === id)
    if (question) {
      const newQuestion = {
        ...question,
        id: Math.random().toString(36).substr(2, 9),
      }
      const index = questions.findIndex((q) => q.id === id)
      const newQuestions = [...questions]
      newQuestions.splice(index + 1, 0, newQuestion)
      setQuestions(newQuestions)
    }
  }
  
  // Module management functions
  const addModule = () => {
    setModules([...modules, createEmptyModule()])
  }
  
  const updateModule = (id, updates) => {
    setModules(
      modules.map((m) =>
        m.id === id
          ? {
              ...m,
              ...updates,
            }
          : m,
      ),
    )
  }
  
  const deleteModule = (id) => {
    if (modules.length > 1) {
      setModules(modules.filter((m) => m.id !== id))
    }
  }
  
  const toggleModuleExpand = (id) => {
    setModules(
      modules.map((m) =>
        m.id === id
          ? {
              ...m,
              isExpanded: !m.isExpanded,
            }
          : m,
      ),
    )
  }
  
  // Render question builder (without points)
  const renderQuestionBuilder = (questions, isExam, minQuestions) => (
    <div className="space-y-6">
      {/* Settings */}
      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Assessment Settings
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Passing Score (%)
            </label>
            <input
              type="number"
              min="50"
              max="100"
              value={
                isExam
                  ? examSettings.passingScore
                  : preTestSettings.passingScore
              }
              onChange={(e) =>
                isExam
                  ? setExamSettings({
                      ...examSettings,
                      passingScore: parseInt(e.target.value),
                    })
                  : setPreTestSettings({
                      ...preTestSettings,
                      passingScore: parseInt(e.target.value),
                    })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Time Limit (min)
            </label>
            <input
              type="number"
              min="0"
              value={
                isExam ? examSettings.timeLimit : preTestSettings.timeLimit
              }
              onChange={(e) =>
                isExam
                  ? setExamSettings({
                      ...examSettings,
                      timeLimit: parseInt(e.target.value),
                    })
                  : setPreTestSettings({
                      ...preTestSettings,
                      timeLimit: parseInt(e.target.value),
                    })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Attempts Allowed
            </label>
            <input
              type="number"
              min="1"
              value={isExam ? examSettings.attempts : preTestSettings.attempts}
              onChange={(e) =>
                isExam
                  ? setExamSettings({
                      ...examSettings,
                      attempts: parseInt(e.target.value),
                    })
                  : setPreTestSettings({
                      ...preTestSettings,
                      attempts: parseInt(e.target.value),
                    })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={
                  isExam ? examSettings.randomize : preTestSettings.randomize
                }
                onChange={(e) =>
                  isExam
                    ? setExamSettings({
                        ...examSettings,
                        randomize: e.target.checked,
                      })
                    : setPreTestSettings({
                        ...preTestSettings,
                        randomize: e.target.checked,
                      })
                }
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-sm font-medium text-slate-700">
                Randomize Questions
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-slate-900">
            Questions ({questions.length}/{minQuestions} minimum)
          </h4>
          <button
            onClick={() => addQuestion(isExam)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Question
          </button>
        </div>

        {questions.length < minQuestions && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-center gap-2 text-orange-800 text-sm">
            <AlertCircle className="w-4 h-4" />
            Add at least {minQuestions} questions to proceed
          </div>
        )}

        {questions.map((question, index) => (
          <div
            key={question.id}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden"
          >
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-slate-400 cursor-grab" />
                <span className="font-bold text-slate-900">
                  Question {index + 1}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={question.type}
                  onChange={(e) =>
                    updateQuestion(
                      question.id,
                      {
                        type: e.target.value,
                      },
                      isExam,
                    )
                  }
                  className="px-3 py-1 border border-slate-300 rounded-lg text-sm"
                >
                  <option value="single">Multiple Choice (Single)</option>
                  <option value="multiple">Multiple Choice (Multiple)</option>
                  <option value="truefalse">True/False</option>
                </select>
                <button
                  onClick={() => duplicateQuestion(question.id, isExam)}
                  className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                  title="Duplicate"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteQuestion(question.id, isExam)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                  title="Delete"
                  disabled={questions.length === 1}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Question Text
                </label>
                <textarea
                  rows={2}
                  value={question.text}
                  onChange={(e) =>
                    updateQuestion(
                      question.id,
                      {
                        text: e.target.value,
                      },
                      isExam,
                    )
                  }
                  placeholder="Enter your question here..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm resize-none"
                />
              </div>

              {question.type === 'truefalse' ? (
                <div className="flex gap-4">
                  {['True', 'False'].map((option, i) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`correct-${question.id}`}
                        checked={question.correctAnswers.includes(i)}
                        onChange={() =>
                          updateQuestion(
                            question.id,
                            {
                              correctAnswers: [i],
                            },
                            isExam,
                          )
                        }
                        className="w-4 h-4 text-green-600"
                      />
                      <span className="text-sm font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Answer Options (mark correct answer
                    {question.type === 'multiple' ? 's' : ''})
                  </label>
                  {question.options.map((option, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <input
                        type={
                          question.type === 'multiple' ? 'checkbox' : 'radio'
                        }
                        name={`correct-${question.id}`}
                        checked={question.correctAnswers.includes(i)}
                        onChange={() => {
                          if (question.type === 'multiple') {
                            const newCorrect = question.correctAnswers.includes(
                              i,
                            )
                              ? question.correctAnswers.filter((a) => a !== i)
                              : [...question.correctAnswers, i]
                            updateQuestion(
                              question.id,
                              {
                                correctAnswers: newCorrect,
                              },
                              isExam,
                            )
                          } else {
                            updateQuestion(
                              question.id,
                              {
                                correctAnswers: [i],
                              },
                              isExam,
                            )
                          }
                        }}
                        className="w-4 h-4 text-green-600"
                      />
                      <span className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center text-xs font-bold text-slate-600">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...question.options]
                          newOptions[i] = e.target.value
                          updateQuestion(
                            question.id,
                            {
                              options: newOptions,
                            },
                            isExam,
                          )
                        }}
                        placeholder={`Option ${String.fromCharCode(65 + i)}`}
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Explanation (Optional)
                </label>
                <textarea
                  rows={2}
                  value={question.explanation}
                  onChange={(e) =>
                    updateQuestion(
                      question.id,
                      {
                        explanation: e.target.value,
                      },
                      isExam,
                    )
                  }
                  placeholder="Explain why this answer is correct..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm resize-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
  
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Wizard Header */}
      <div className="bg-slate-50 border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Create New Course
          </h2>
          <div className="text-sm text-slate-500">
            Step {currentStep} of {steps.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-slate-200">
            <div
              style={{
                width: `${(currentStep / steps.length) * 100}%`,
              }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500"
            />
          </div>
          <div className="flex justify-between text-xs font-medium text-slate-500">
            {steps.map((step, index) => (
              <span
                key={index}
                className={`hidden sm:block ${index + 1 === currentStep ? 'text-blue-600 font-bold' : ''} ${index + 1 < currentStep ? 'text-green-600' : ''}`}
              >
                {step}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="p-8 min-h-[500px] max-h-[60vh] overflow-y-auto">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Basic Information
            </h3>
            <div className="space-y-4">
              {/* Curriculum Selection */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Curriculum <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {['UPC', 'UTC', 'URC'].map((curr) => (
                    <label
                      key={curr}
                      className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.curriculum === curr ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-slate-300'}`}
                    >
                      <input
                        type="radio"
                        name="curriculum"
                        value={curr}
                        checked={formData.curriculum === curr}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            curriculum: e.target.value,
                            upcSeries: '',
                          })
                        }
                        className="sr-only"
                      />
                      <span className="font-bold text-lg">{curr}</span>
                      <span className="text-xs text-center mt-1 text-slate-500">
                        {curr === 'UPC' && 'Prevention'}
                        {curr === 'UTC' && 'Treatment'}
                        {curr === 'URC' && 'Recovery'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* UPC Sub-series Selection - Only shown when UPC is selected */}
              {formData.curriculum === 'UPC' && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    UPC Series <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-slate-500 mb-3">
                    Select which UPC series this course belongs to
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <label
                      className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.upcSeries === 'managers' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}
                    >
                      <input
                        type="radio"
                        name="upcSeries"
                        value="managers"
                        checked={formData.upcSeries === 'managers'}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            upcSeries: e.target.value,
                          })
                        }
                        className="sr-only"
                      />
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${formData.upcSeries === 'managers' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                      >
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <span
                          className={`font-bold block ${formData.upcSeries === 'managers' ? 'text-blue-700' : 'text-slate-900'}`}
                        >
                          Managers & Supervisors Series
                        </span>
                        <span className="text-xs text-slate-500 mt-1 block">
                          For prevention managers and supervisors who manage
                          implementation of prevention interventions
                        </span>
                      </div>
                    </label>
                    <label
                      className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.upcSeries === 'practitioners' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}
                    >
                      <input
                        type="radio"
                        name="upcSeries"
                        value="practitioners"
                        checked={formData.upcSeries === 'practitioners'}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            upcSeries: e.target.value,
                          })
                        }
                        className="sr-only"
                      />
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${formData.upcSeries === 'practitioners' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                      >
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <span
                          className={`font-bold block ${formData.upcSeries === 'practitioners' ? 'text-blue-700' : 'text-slate-900'}`}
                        >
                          Practitioners Series
                        </span>
                        <span className="text-xs text-slate-500 mt-1 block">
                          For prevention practitioners working in evidence-based
                          prevention at the grassroots level
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Course Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. UPC 1"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        code: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Total Duration (Hours){' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="40"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        duration: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Course Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Introduction to Prevention Science"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe what students will learn..."
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Course Thumbnail
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer bg-slate-50">
                  <ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Recommended size: 800x600px
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Knowledge Check (Pre-test) */}
        {currentStep === 2 && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">
                Knowledge Check (Pre-Test)
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Add questions to assess learner's baseline understanding
              </p>
            </div>
            {renderQuestionBuilder(preTestQuestions, false, 10)}
          </div>
        )}

        {/* Step 3: Introduction */}
        {currentStep === 3 && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">
                Module Introduction
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Content shown to learners before starting modules
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Introduction Text <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={6}
                value={introduction.text}
                onChange={(e) =>
                  setIntroduction({
                    ...introduction,
                    text: e.target.value,
                  })
                }
                placeholder="Welcome to this course. In this module you will learn..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Introduction Video (Optional)
              </label>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={introduction.videoUrl}
                  onChange={(e) =>
                    setIntroduction({
                      ...introduction,
                      videoUrl: e.target.value,
                    })
                  }
                  placeholder="YouTube or Vimeo URL"
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium">
                  <Upload className="w-4 h-4" />
                  Upload
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Learning Objectives <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-slate-500 mb-3">
                What will learners achieve? (minimum 3)
              </p>
              <div className="space-y-2">
                {introduction.objectives.map((obj, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <input
                      type="text"
                      value={obj}
                      onChange={(e) => {
                        const newObjectives = [...introduction.objectives]
                        newObjectives[index] = e.target.value
                        setIntroduction({
                          ...introduction,
                          objectives: newObjectives,
                        })
                      }}
                      placeholder={`Learning objective ${index + 1}`}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                    {introduction.objectives.length > 3 && (
                      <button
                        onClick={() => {
                          const newObjectives = introduction.objectives.filter(
                            (_, i) => i !== index,
                          )
                          setIntroduction({
                            ...introduction,
                            objectives: newObjectives,
                          })
                        }}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() =>
                    setIntroduction({
                      ...introduction,
                      objectives: [...introduction.objectives, ''],
                    })
                  }
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Objective
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Estimated Completion Time
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={introduction.estimatedTime}
                  onChange={(e) =>
                    setIntroduction({
                      ...introduction,
                      estimatedTime: e.target.value,
                    })
                  }
                  placeholder="5"
                  className="w-24 px-3 py-2 border border-slate-300 rounded-lg"
                />
                <span className="text-slate-600">hours</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Learning Modules */}
        {currentStep === 4 && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Learning Modules
                </h3>
                <p className="text-slate-600 text-sm mt-1">
                  Add course content (PDFs, videos, presentations)
                </p>
              </div>
              <button
                onClick={addModule}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Module
              </button>
            </div>

            {modules.length < 1 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-center gap-2 text-orange-800 text-sm">
                <AlertCircle className="w-4 h-4" />
                Add at least 1 module with content to proceed
              </div>
            )}

            <div className="space-y-4">
              {modules.map((module, index) => (
                <div
                  key={module.id}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden"
                >
                  <div
                    className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between cursor-pointer"
                    onClick={() => toggleModuleExpand(module.id)}
                  >
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-4 h-4 text-slate-400 cursor-grab" />
                      <span className="font-bold text-slate-900">
                        Module {index + 1}
                      </span>
                      {module.title && (
                        <span className="text-slate-500">- {module.title}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteModule(module.id)
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                        disabled={modules.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {module.isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {module.isExpanded && (
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Module Title <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={module.title}
                            onChange={(e) =>
                              updateModule(module.id, {
                                title: e.target.value,
                              })
                            }
                            placeholder="e.g. Understanding Risk Factors"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Description
                          </label>
                          <input
                            type="text"
                            value={module.description}
                            onChange={(e) =>
                              updateModule(module.id, {
                                description: e.target.value,
                              })
                            }
                            placeholder="Brief description of this module"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Upload PDF Files
                        </label>
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer bg-slate-50">
                          <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                          <p className="text-sm text-slate-600 font-medium">
                            Click to upload or drag and drop PDFs
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            PDF files only
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Upload Videos (Optional)
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="YouTube or Vimeo URL"
                            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm"
                          />
                          <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm font-medium">
                            Add Video
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Module Exam */}
        {currentStep === 5 && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">
                Module Exam (Final Assessment)
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Final assessment to evaluate learning
              </p>
            </div>
            {renderQuestionBuilder(examQuestions, true, 20)}
          </div>
        )}

        {/* Step 6: Certificate & Settings */}
        {currentStep === 6 && (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">
                Certificate & Completion Settings
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Configure certificate template and completion requirements
              </p>
            </div>

            {/* Certificate Template */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">
                Select Certificate Template
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    id: 'standard',
                    name: 'Standard',
                    color: 'blue',
                  },
                  {
                    id: 'professional',
                    name: 'Professional',
                    color: 'emerald',
                  },
                  {
                    id: 'premium',
                    name: 'Premium',
                    color: 'purple',
                  },
                ].map((template) => (
                  <label
                    key={template.id}
                    className={`relative cursor-pointer rounded-xl border-2 overflow-hidden transition-all ${certificateSettings.template === template.id ? 'border-blue-600 ring-2 ring-blue-200' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <input
                      type="radio"
                      name="template"
                      value={template.id}
                      checked={certificateSettings.template === template.id}
                      onChange={(e) =>
                        setCertificateSettings({
                          ...certificateSettings,
                          template: e.target.value,
                        })
                      }
                      className="sr-only"
                    />
                    <div
                      className={`h-24 bg-${template.color}-50 flex items-center justify-center`}
                    >
                      <Award
                        className={`w-10 h-10 text-${template.color}-600`}
                      />
                    </div>
                    <div className="p-3 text-center">
                      <span className="font-medium text-slate-900">
                        {template.name}
                      </span>
                    </div>
                    {certificateSettings.template === template.id && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Completion Requirements */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">
                Completion Requirements
              </label>
              <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                {[
                  {
                    key: 'preTest',
                    label: 'Complete Knowledge Check (≥70%)',
                  },
                  {
                    key: 'modules',
                    label: 'View all Learning Modules',
                  },
                  {
                    key: 'exam',
                    label: 'Pass Module Exam (≥70%)',
                  },
                  {
                    key: 'feedback',
                    label: 'Submit Feedback Survey',
                  },
                ].map((req) => (
                  <label
                    key={req.key}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={certificateSettings.requirements[req.key]}
                      onChange={(e) =>
                        setCertificateSettings({
                          ...certificateSettings,
                          requirements: {
                            ...certificateSettings.requirements,
                            [req.key]: e.target.checked,
                          },
                        })
                      }
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                    <span className="text-slate-700">{req.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Course Visibility - Updated labels */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">
                Course Visibility
              </label>
              <div className="space-y-2">
                {[
                  {
                    value: 'public',
                    label: 'Public',
                    desc: 'Anyone can see course intro, login required to enroll',
                  },
                  {
                    value: 'registered',
                    label: 'Registered Users Only',
                    desc: 'Only logged-in users can view the course',
                  },
                  {
                    value: 'private',
                    label: 'Private',
                    desc: 'Invite only - course is hidden from catalog',
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${certificateSettings.visibility === option.value ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <input
                      type="radio"
                      name="visibility"
                      value={option.value}
                      checked={certificateSettings.visibility === option.value}
                      onChange={(e) =>
                        setCertificateSettings({
                          ...certificateSettings,
                          visibility: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                    <div>
                      <span className="font-medium text-slate-900">
                        {option.label}
                      </span>
                      <p className="text-xs text-slate-500">{option.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Enrollment Method */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">
                Enrollment Method
              </label>
              <div className="space-y-2">
                {[
                  {
                    value: 'open',
                    label: 'Open Enrollment',
                    desc: 'Anyone can enroll directly',
                  },
                  {
                    value: 'approval',
                    label: 'Approval Required',
                    desc: 'Admin approval needed before enrollment',
                  },
                  {
                    value: 'closed',
                    label: 'Closed',
                    desc: 'Invitation only - no self-enrollment',
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${certificateSettings.enrollment === option.value ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <input
                      type="radio"
                      name="enrollment"
                      value={option.value}
                      checked={certificateSettings.enrollment === option.value}
                      onChange={(e) =>
                        setCertificateSettings({
                          ...certificateSettings,
                          enrollment: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                    <div>
                      <span className="font-medium text-slate-900">
                        {option.label}
                      </span>
                      <p className="text-xs text-slate-500">{option.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Review & Publish - Expanded with detailed content */}
        {currentStep === 7 && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">
                Review Course
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Review all details before publishing
              </p>
            </div>

            {/* Basic Information Card */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Basic Information
                </h4>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Edit
                </button>
              </div>
              <div className="p-5 space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Curriculum:</span>{' '}
                    <span className="font-medium ml-2">
                      {formData.curriculum || 'Not set'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Code:</span>{' '}
                    <span className="font-medium ml-2">
                      {formData.code || 'Not set'}
                    </span>
                  </div>
                  {formData.curriculum === 'UPC' && (
                    <div className="col-span-2">
                      <span className="text-slate-500">UPC Series:</span>
                      <span className="font-medium ml-2">
                        {formData.upcSeries === 'managers'
                          ? 'Managers & Supervisors Series'
                          : formData.upcSeries === 'practitioners'
                            ? 'Practitioners Series'
                            : 'Not selected'}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="text-slate-500">Duration:</span>{' '}
                    <span className="font-medium ml-2">
                      {formData.duration
                        ? `${formData.duration} hours`
                        : 'Not set'}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 text-sm">Title:</span>
                  <p className="font-medium mt-1">
                    {formData.title || 'Not set'}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500 text-sm">Description:</span>
                  <p className="text-sm mt-1 text-slate-700">
                    {formData.description || 'Not set'}
                  </p>
                </div>
              </div>
            </div>

            {/* Introduction Card */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  Introduction Content
                </h4>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Edit
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <span className="text-slate-500 text-sm">
                    Introduction Text:
                  </span>
                  <p className="text-sm mt-1 text-slate-700 bg-slate-50 p-3 rounded-lg">
                    {introduction.text
                      ? introduction.text.length > 200
                        ? introduction.text.substring(0, 200) + '...'
                        : introduction.text
                      : 'Not added'}
                  </p>
                </div>
                {introduction.videoUrl && (
                  <div>
                    <span className="text-slate-500 text-sm">Video URL:</span>
                    <p className="text-sm mt-1 text-blue-600">
                      {introduction.videoUrl}
                    </p>
                  </div>
                )}
                <div>
                  <span className="text-slate-500 text-sm">
                    Learning Objectives (
                    {introduction.objectives.filter((o) => o).length}):
                  </span>
                  <ul className="mt-2 space-y-1">
                    {introduction.objectives
                      .filter((o) => o)
                      .map((obj, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    {introduction.objectives.filter((o) => o).length === 0 && (
                      <li className="text-sm text-orange-600">
                        No objectives added
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Learning Modules Card */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  Learning Modules ({modules.length})
                </h4>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Edit
                </button>
              </div>
              <div className="p-5">
                <div className="space-y-2">
                  {modules.map((module, index) => (
                    <div
                      key={module.id}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                    >
                      <span className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <span className="font-medium text-slate-900">
                          {module.title || `Module ${index + 1} (Untitled)`}
                        </span>
                        {module.description && (
                          <p className="text-xs text-slate-500 mt-0.5">
                            {module.description}
                          </p>
                        )}
                      </div>
                      <div className="text-xs text-slate-500">
                        {module.pdfs.length} PDFs, {module.videos.length} Videos
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Knowledge Check Questions Card */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-orange-600" />
                  Knowledge Check ({preTestQuestions.length} questions)
                </h4>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Edit
                </button>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <span className="text-slate-500">Passing Score:</span>
                    <span className="font-bold text-slate-900 ml-2">
                      {preTestSettings.passingScore}%
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <span className="text-slate-500">Time Limit:</span>
                    <span className="font-bold text-slate-900 ml-2">
                      {preTestSettings.timeLimit} min
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <span className="text-slate-500">Attempts:</span>
                    <span className="font-bold text-slate-900 ml-2">
                      {preTestSettings.attempts}
                    </span>
                  </div>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {preTestQuestions.slice(0, 5).map((q, i) => (
                    <div
                      key={q.id}
                      className="flex items-start gap-2 text-sm p-2 bg-slate-50 rounded"
                    >
                      <span className="w-5 h-5 bg-orange-100 text-orange-700 rounded text-xs flex items-center justify-center font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-slate-700 line-clamp-1">
                        {q.text || '(Empty question)'}
                      </span>
                      <span className="text-xs text-slate-400 ml-auto flex-shrink-0 capitalize">
                        {q.type}
                      </span>
                    </div>
                  ))}
                  {preTestQuestions.length > 5 && (
                    <p className="text-xs text-slate-500 text-center py-2">
                      + {preTestQuestions.length - 5} more questions
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Module Exam Questions Card */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-red-600" />
                  Module Exam ({examQuestions.length} questions)
                </h4>
                <button
                  onClick={() => setCurrentStep(5)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Edit
                </button>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <span className="text-slate-500">Passing Score:</span>
                    <span className="font-bold text-slate-900 ml-2">
                      {examSettings.passingScore}%
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <span className="text-slate-500">Time Limit:</span>
                    <span className="font-bold text-slate-900 ml-2">
                      {examSettings.timeLimit} min
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <span className="text-slate-500">Attempts:</span>
                    <span className="font-bold text-slate-900 ml-2">
                      {examSettings.attempts}
                    </span>
                  </div>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {examQuestions.slice(0, 5).map((q, i) => (
                    <div
                      key={q.id}
                      className="flex items-start gap-2 text-sm p-2 bg-slate-50 rounded"
                    >
                      <span className="w-5 h-5 bg-red-100 text-red-700 rounded text-xs flex items-center justify-center font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-slate-700 line-clamp-1">
                        {q.text || '(Empty question)'}
                      </span>
                      <span className="text-xs text-slate-400 ml-auto flex-shrink-0 capitalize">
                        {q.type}
                      </span>
                    </div>
                  ))}
                  {examQuestions.length > 5 && (
                    <p className="text-xs text-slate-500 text-center py-2">
                      + {examQuestions.length - 5} more questions
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Certificate Settings Card */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  Certificate & Settings
                </h4>
                <button
                  onClick={() => setCurrentStep(6)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Edit
                </button>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Template:</span>
                    <span className="font-medium text-slate-900 ml-2 capitalize">
                      {certificateSettings.template}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Visibility:</span>
                    <span className="font-medium text-slate-900 ml-2 capitalize">
                      {certificateSettings.visibility}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Enrollment:</span>
                    <span className="font-medium text-slate-900 ml-2 capitalize">
                      {certificateSettings.enrollment}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Validation Checklist */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-4">
                Validation Checklist
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    check:
                      !!formData.curriculum &&
                      !!formData.code &&
                      !!formData.title,
                    label: 'Basic information complete',
                  },
                  {
                    check:
                      formData.curriculum !== 'UPC' || !!formData.upcSeries,
                    label: 'UPC series selected (if applicable)',
                  },
                  {
                    check: preTestQuestions.length >= 10,
                    label: 'Minimum 10 pre-test questions',
                  },
                  {
                    check: !!introduction.text,
                    label: 'Introduction content added',
                  },
                  {
                    check: introduction.objectives.filter((o) => o).length >= 3,
                    label: 'At least 3 learning objectives',
                  },
                  {
                    check: modules.length >= 1 && modules.some((m) => m.title),
                    label: 'At least 1 learning module',
                  },
                  {
                    check: examQuestions.length >= 20,
                    label: 'Minimum 20 exam questions',
                  },
                  {
                    check: !!certificateSettings.template,
                    label: 'Certificate template selected',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 text-sm ${item.check ? 'text-green-700' : 'text-orange-700'}`}
                  >
                    {item.check ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="bg-slate-50 border-t border-slate-200 px-8 py-4 flex justify-between items-center">
        <button
          onClick={currentStep === 1 ? onCancel : handleBack}
          className="flex items-center gap-2 px-6 py-2 border border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-white transition-colors"
        >
          {currentStep > 1 && <ChevronLeft className="w-4 h-4" />}
          {currentStep === 1 ? 'Cancel' : 'Previous'}
        </button>

        <div className="flex gap-3">
          <button className="px-6 py-2 text-slate-600 font-bold hover:text-slate-900 flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save as Draft
          </button>
          {currentStep === steps.length ? (
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors">
                Submit for Approval
              </button>
              <button className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                <Check className="w-4 h-4" />
                Publish Course
              </button>
            </div>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next Step
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
