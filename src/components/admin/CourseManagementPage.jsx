import React, { useState, useEffect } from "react";
import { AllCoursesTab } from "./course_creation/AllCoursesTab";
import { CreateCourseWizard } from "./course_creation/CreateCourseWizard";
import { PendingApprovalsTab } from "./course_creation/PendingApprovalsTab";

export function CourseManagementPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [role, setRole] = useState(() => localStorage.getItem("role")); // ← read synchronously on first render

  const isGraphicDesigner = role === "graphic-designer";
  const canApprove = !isGraphicDesigner;

  // Optional: protect against invalid role changing tab (runs after render)
  useEffect(() => {
    if (activeTab === "pending" && !canApprove) {
      setActiveTab("all");
    }
  }, [activeTab, canApprove]);

  // If still loading role (very rare after the change above), show loader
  // But now it's AFTER all hooks → safe
  if (role === null) {
    return <div className="p-8 text-center text-slate-500">Loading user role...</div>;
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Course Management
        </h1>
        <p className="text-slate-600">
          Create, manage, and {canApprove ? "approve " : ""}courses for the learning platform
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 mb-8">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab("all")}
            className={`pb-4 px-2 font-medium text-sm transition-colors relative ${
              activeTab === "all"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            All Courses
          </button>

          <button
            onClick={() => setActiveTab("create")}
            className={`pb-4 px-2 font-medium text-sm transition-colors relative flex items-center gap-2 ${
              activeTab === "create"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Create New Course
          </button>

          {canApprove && (
            <button
              onClick={() => setActiveTab("pending")}
              className={`pb-4 px-2 font-medium text-sm transition-colors relative flex items-center gap-2 ${
                activeTab === "pending"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Pending Approvals
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                3
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === "all" && (
          <AllCoursesTab onCreateClick={() => setActiveTab("create")} />
        )}

        {activeTab === "create" && (
          <CreateCourseWizard onCancel={() => setActiveTab("all")} />
        )}

        {activeTab === "pending" && canApprove && <PendingApprovalsTab />}
      </div>
    </>
  );
}
