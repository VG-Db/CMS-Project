import {
  Home,
  Users,
  GraduationCap,
  UserPlus,
  Award,
  Newspaper,
  Settings,
  CheckCircle,
  FileEdit,
  UserCheck
} from "lucide-react"

// Define menu items for each role
export const roleMenuItems = {
  admin: [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      badge: null
    },
    {
      id: "users",
      label: "User Management",
      icon: Users,
      badge: 4
    },
    {
      id: "courses",
      label: "Courses",
      icon: GraduationCap,
      badge: 3
    },
    {
      id: "enrollments",
      label: "Enrollments",
      icon: UserPlus,
      badge: null
    },
    {
      id: "certifications",
      label: "Certifications",
      icon: Award,
      badge: 4
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      badge: null
    }
  ],
  
  "program-manager": [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      badge: null
    },
    {
      id: "users",
      label: "User Management",
      icon: UserCheck,
      badge: 5,
      description: "Registration approvals/rejections"
    },
    {
      id: "courses",
      label: "Course Approvals",
      icon: CheckCircle,
      badge: 3,
      description: "Review and approve courses"
    },
    {
      id: "enrollments",
      label: "Course Enrollment",
      icon: UserPlus,
      badge: null
    },
    {
      id: "certifications",
      label: "Certifications",
      icon: Award,
      badge: 4,
      description: "Approve and manage certifications"
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      badge: null
    }
  ],
  
  "program-officer": [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      badge: null
    },
    {
      id: "courses",
      label: "Course Creation",
      icon: GraduationCap,
      badge: null,
      description: "Create new courses"
    },
    {
      id: "content",
      label: "Content Editing",
      icon: FileEdit,
      badge: null,
      description: "Edit course content (no deletion)"
    },
    {
      id: "enrollments",
      label: "User Enrollments",
      icon: UserPlus,
      badge: null
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      badge: null
    }
  ],
  
  "graphic-designer": [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      badge: null
    },
    {
      id: "courses",
      label: "Course Creation",
      icon: GraduationCap,
      badge: null,
      description: "Create course graphics and materials"
    },
    {
      id: "content",
      label: "Content Library",
      icon: Newspaper,
      badge: null,
      description: "Manage visual content"
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      badge: null
    }
  ]
}

// Helper function to get menu items based on role
export const getMenuItemsForRole = (role) => {
  // Default to empty array if role not found
  return roleMenuItems[role] || []
}

// Helper function to check if user has access to a specific menu item
export const hasAccess = (role, menuId) => {
  const items = getMenuItemsForRole(role)
  return items.some(item => item.id === menuId)
}
