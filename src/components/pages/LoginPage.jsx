import React, { useState } from "react"
import { ArrowLeft, Globe } from "lucide-react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = e => {
    e.preventDefault()

    // Define user credentials with roles
    const users = [
      {
        email: "admin@gmail.com",
        password: "1234",
        role: "admin",
        redirect: "/admin/dashboard"
      },
      {
        email: "programmanager@gmail.com",
        password: "1234",
        role: "program-manager",
        redirect: "/admin/dashboard"
      },
      {
        email: "programofficer@gmail.com",
        password: "1234",
        role: "program-officer",
        redirect: "/admin/dashboard"
      },
      {
        email: "designer@gmail.com",
        password: "1234",
        role: "graphic-designer",
        redirect: "/admin/dashboard"
      },
      {
        email: "learner@gmail.com",
        password: "1234",
        role: "user",
        redirect: "/"
      }
    ]

    // Find matching user
    const user = users.find(u => u.email === email && u.password === password)

    if (user) {
      toast.success(`Login successful! Redirecting to ${user.role === 'user' ? 'home page' : 'admin panel'}...`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })

      // Save to localStorage
      localStorage.setItem("email", email)
      localStorage.setItem("password", password)
      localStorage.setItem("logged", "true")
      localStorage.setItem("role", user.role)

      // Redirect after short delay
      setTimeout(() => {
        window.location.href = user.redirect
      }, 2000)
    } else {
      toast.error("Invalid email or password. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }

    console.log("Login attempt:", { email, password })
  }

  const handleGoogleSignIn = () => {
    console.log("Google Sign In")
    // Implement Google OAuth
  }

  // Floating image configs using percentage-based positioning
  // This ensures they scale correctly on all screen sizes (laptop & monitor)
  const floatingImages = [
    {
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=200&fit=crop",
      alt: "Students collaborating",
      style: { top: '8%', left: '6%', width: '80px', height: '80px' },
      delay: '0s',
      duration: '6s',
      borderRadius: '0.75rem',
    },
    {
      src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&h=200&fit=crop",
      alt: "Learning materials",
      style: { top: '12%', right: '8%', width: '64px', height: '64px' },
      delay: '1s',
      duration: '5s',
      borderRadius: '0.5rem',
    },
    {
      src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=200&h=200&fit=crop",
      alt: "Group study",
      style: { top: '44%', left: '4%', width: '56px', height: '56px' },
      delay: '2s',
      duration: '7s',
      borderRadius: '0.5rem',
    },
    {
      src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=200&h=200&fit=crop",
      alt: "Classroom",
      style: { bottom: '18%', right: '6%', width: '72px', height: '72px' },
      delay: '0.5s',
      duration: '6s',
      borderRadius: '0.75rem',
    },
    {
      src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=200&h=200&fit=crop",
      alt: "Workshop",
      style: { bottom: '10%', left: '8%', width: '56px', height: '56px' },
      delay: '1.5s',
      duration: '5.5s',
      borderRadius: '0.5rem',
    },
    {
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=200&fit=crop",
      alt: "Team meeting",
      style: { top: '10%', left: '42%', width: '56px', height: '56px' },
      delay: '2.5s',
      duration: '6.5s',
      borderRadius: '0.5rem',
    },
  ]

  return (
    <div className="min-h-screen flex">
      <ToastContainer />

      {/* ── Left Side ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-50/50 relative overflow-hidden items-center justify-center p-12">

        {/* Decorative grid background */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.2" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        {/* ── Floating Images (percentage-based positioning) ── */}
        {/*
          FIX: Changed from Tailwind fixed-pixel classes (top-16, left-16, etc.)
          to inline percentage styles so images reposition proportionally on
          all screen sizes — laptops, monitors, and everything in between.
        */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-12px); }
          }
          .animate-float {
            animation-name: float;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
          }
        `}</style>

        {floatingImages.map((img, i) => (
          <div
            key={i}
            className="absolute overflow-hidden shadow-lg animate-float"
            style={{
              ...img.style,
              animationDelay: img.delay,
              animationDuration: img.duration,
              borderRadius: img.borderRadius,
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        ))}

        {/* Centre content */}
        <div className="relative z-10 max-w-lg text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Build Your Skills With Universal Curricula
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Pursue real career paths through instructor-led courses taught by
            experts. Train others in evidence-based prevention, treatment, and
            recovery support.
          </p>

          {/* Logo circle */}
          <div className="mt-12">
            <div className="w-64 h-64 mx-auto bg-white rounded-full border-8 border-slate-200 flex items-center justify-center shadow-xl">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => (window.location.href = "/")}
              >
                <img
                  src="/logo2.png"
                  alt="TrainHub Logo"
                  className="w-56 h-56"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Side – Login Form ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">

          {/* Language selector */}
          <div className="flex justify-end mb-8">
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <Globe className="w-4 h-4" />
              English (English)
            </button>
          </div>

          {/* Go back */}
          <button
            onClick={() => (window.location.href = "/")}
            className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go back
          </button>

          {/* Welcome */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome!</h2>
            <p className="text-slate-600">Please login to your account.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg outline-none transition-all"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                forgot Password
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-sm"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">Or continue with</span>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-slate-300 rounded-lg hover:bg-slate-50 transition-all duration-300 font-medium text-slate-700"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>

          {/* Sign Up */}
          <p className="mt-8 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <a href="/register" className="font-semibold text-slate-900 hover:text-slate-700 transition-colors">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
