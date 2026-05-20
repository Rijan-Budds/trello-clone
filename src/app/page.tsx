'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Play,
  ArrowRight,
  Mail,
  CheckCircle2,
  Calendar,
  Users,
  Layers,
  Sparkles,
  Plus
} from 'lucide-react'
import Silk from '../components/Silk'
import Header from '../components/home/header/page'
import Footer from '../components/home/footer/page'

// Custom Trello SVG Icon to avoid dependency version issues
const TrelloIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.03 3A4.97 4.97 0 0 1 24 7.97v8.06A4.97 4.97 0 0 1 19.03 21H4.97A4.97 4.97 0 0 1 0 16.03V7.97A4.97 4.97 0 0 1 4.97 3h14.06zM9.03 6H4.97A.97.97 0 0 0 4 6.97v6.06c0 .54.43.97.97.97h4.06a.97.97 0 0 0 .97-.97V6.97A.97.97 0 0 0 9.03 6zm10 0h-4.06a.97.97 0 0 0-.97.97v10.06c0 .54.43.97.97.97h4.06a.97.97 0 0 0 .97-.97V6.97a.97.97 0 0 0-.97-.97z" />
  </svg>
)

export default function App() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setErrorMsg('Please enter a valid email address.')
      return
    }
    // Simulate API call
    setErrorMsg('')
    setSubscribed(true)
    setEmail('')
  }

  return (
    <div className='relative min-h-screen w-full flex flex-col bg-slate-950 text-slate-100 font-sans overflow-x-hidden selection:bg-violet-500/30 selection:text-white'>
      {/* Background Silk Canvas */}
      <div className='fixed inset-0 z-0 pointer-events-none opacity-45'>
        <Silk
          speed={3}
          scale={1.2}
          color="#6d28d9"
          noiseIntensity={1.0}
          rotation={0.4}
        />
      </div>

      {/* Header Navigation */}
      <Header />

      {/* Main Content Area */}
      <main className='relative z-10 flex-1 flex flex-col items-center w-full'>

        {/* HERO SECTION */}
        <section className="relative w-full max-w-7xl mx-auto px-4 pt-20 pb-24 md:pt-32 md:pb-36 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs md:text-sm font-medium text-violet-400 mb-8 backdrop-blur-sm animate-pulse">
            <span>Modern Project Management Tool</span>
          </div>

          <h1 className='text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight md:leading-none flex flex-col gap-y-5'>
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">Trello Clone</span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">What is Trello?</span>
          </h1>

          <p className='mt-6 text-lg md:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed'>
            Trello clone is the visual collaboration tool that enables teams to organize cards, manage custom lists, and coordinate tasks seamlessly.
          </p>

          <div className='mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md px-4'>
            <Link href="/login">
              <span className='inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl px-8 py-4 text-white font-semibold cursor-pointer transition-all duration-200 shadow-xl shadow-violet-600/25 hover:shadow-violet-600/35 scale-100 hover:scale-[1.03] active:scale-[0.98]'>
                Get started for free
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>

            <Link href="#demo">
              <span className='inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 rounded-xl px-8 py-4 text-slate-300 hover:text-white font-semibold cursor-pointer transition-all duration-200 backdrop-blur-md scale-100 hover:scale-[1.03] active:scale-[0.98]'>
                Watch Demo
                <Play className="h-4 w-4 fill-slate-300 group-hover:fill-white" />
              </span>
            </Link>
          </div>
        </section>

        {/* FEATURES GRID SECTION */}
        <section id="features" className="w-full max-w-7xl mx-auto px-4 py-20 border-t border-slate-900/60 scroll-mt-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              A productivity powerhouse
            </h2>
            <p className="mt-4 text-slate-400 text-base md:text-lg">
              Simple, flexible, and powerful. Only three main building blocks stand between you and your next big breakthrough.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Boards */}
            <div className="group relative rounded-2xl border border-slate-800/60 bg-slate-900/40 p-8 backdrop-blur-md transition-all duration-300 hover:border-violet-500/40 hover:bg-slate-900/60 hover:shadow-lg hover:shadow-violet-500/5 hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/10 text-violet-400 border border-violet-500/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Trello Boards</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Keep tasks organized and work moving forward. See your entire project status at a single glance with custom dashboard boards.
              </p>
            </div>

            {/* Lists */}
            <div className="group relative rounded-2xl border border-slate-800/60 bg-slate-900/40 p-8 backdrop-blur-md transition-all duration-300 hover:border-violet-500/40 hover:bg-slate-900/60 hover:shadow-lg hover:shadow-violet-500/5 hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/10 text-violet-400 border border-violet-500/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrelloIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Custom Lists</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Map out different stages of a task or task flows. Categorize items into columns such as "To Do", "In Progress", or "Completed".
              </p>
            </div>

            {/* Cards */}
            <div className="group relative rounded-2xl border border-slate-800/60 bg-slate-900/40 p-8 backdrop-blur-md transition-all duration-300 hover:border-violet-500/40 hover:bg-slate-900/60 hover:shadow-lg hover:shadow-violet-500/5 hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/10 text-violet-400 border border-violet-500/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Detailed Cards</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                The building blocks of work. Store descriptions, configure due dates, list sub-tasks, assign members, and comment directly.
              </p>
            </div>
          </div>
        </section>

        {/* INTERACTIVE MOCK BOARD SECTION */}
        <section id="demo" className="w-full max-w-7xl mx-auto px-4 py-20 border-t border-slate-900/60 scroll-mt-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Designed for visual workflows
            </h2>
            <p className="mt-4 text-slate-400 text-base md:text-lg">
              Manage your tasks visually. Create columns, add cards, drag them around, and see team progress update in real time.
            </p>
          </div>

          {/* Simulated Kanban Board */}
          <div className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 backdrop-blur-md p-6 overflow-x-auto shadow-2xl">
            <div className="flex items-center justify-between pb-6 border-b border-slate-900">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-ping"></span>
                <h3 className="font-bold text-white text-lg">Marketing Launch Board</h3>
                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Public</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="h-7 w-7 rounded-full bg-violet-500 border-2 border-slate-950 flex items-center justify-center text-[10px] font-bold text-white">JD</div>
                  <div className="h-7 w-7 rounded-full bg-indigo-500 border-2 border-slate-950 flex items-center justify-center text-[10px] font-bold text-white">SK</div>
                  <div className="h-7 w-7 rounded-full bg-pink-500 border-2 border-slate-950 flex items-center justify-center text-[10px] font-bold text-white">AM</div>
                </div>
                <button className="h-7 w-7 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 min-w-[760px]">

              {/* Column 1: To Do */}
              <div className="bg-slate-900/50 rounded-xl border border-slate-800/40 p-4 flex flex-col gap-3 min-h-[350px]">
                <div className="flex items-center justify-between pb-2">
                  <span className="font-semibold text-sm text-slate-200">To Do</span>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-bold">2</span>
                </div>

                {/* Card 1 */}
                <div className="group bg-slate-950/80 border border-slate-800/80 rounded-lg p-3 shadow-md hover:border-violet-500/30 transition-all duration-200 cursor-pointer">
                  <div className="flex gap-1.5 mb-2">
                    <span className="text-[10px] font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20 px-2 py-0.5 rounded">Design</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">Refine header & footer design</h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">Incorporate modern glassmorphism styles and ensure responsive grids.</p>
                  <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-900 text-[10px] text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>May 25</span>
                    </div>
                    <div className="h-5 w-5 rounded-full bg-pink-500 flex items-center justify-center text-[8px] font-bold text-white">AM</div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="group bg-slate-950/80 border border-slate-800/80 rounded-lg p-3 shadow-md hover:border-violet-500/30 transition-all duration-200 cursor-pointer">
                  <div className="flex gap-1.5 mb-2">
                    <span className="text-[10px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded">Security</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">Setup login auth middleware</h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">Validate user credentials and setup OAuth integration pathways.</p>
                  <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-900 text-[10px] text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>June 2</span>
                    </div>
                    <div className="h-5 w-5 rounded-full bg-violet-500 flex items-center justify-center text-[8px] font-bold text-white">JD</div>
                  </div>
                </div>
              </div>

              {/* Column 2: In Progress */}
              <div className="bg-slate-900/50 rounded-xl border border-slate-800/40 p-4 flex flex-col gap-3 min-h-[350px]">
                <div className="flex items-center justify-between pb-2">
                  <span className="font-semibold text-sm text-slate-200">In Progress</span>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-bold">1</span>
                </div>

                {/* Card 1 */}
                <div className="group bg-slate-950/80 border border-slate-800/80 rounded-lg p-3 shadow-md hover:border-violet-500/30 transition-all duration-200 cursor-pointer">
                  <div className="flex gap-1.5 mb-2">
                    <span className="text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded">Feature</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">Build interactive Silk canvas</h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">Add WebGL shaders to create high-performance interactive backgrounds.</p>
                  <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-900 text-[10px] text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>May 22</span>
                    </div>
                    <div className="h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center text-[8px] font-bold text-white">SK</div>
                  </div>
                </div>
              </div>

              {/* Column 3: Completed */}
              <div className="bg-slate-900/50 rounded-xl border border-slate-800/40 p-4 flex flex-col gap-3 min-h-[350px]">
                <div className="flex items-center justify-between pb-2">
                  <span className="font-semibold text-sm text-slate-200">Completed</span>
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-bold">2</span>
                </div>

                {/* Card 1 */}
                <div className="group bg-slate-950/80 border border-slate-800/80 rounded-lg p-3 shadow-md opacity-80 hover:opacity-100 hover:border-violet-500/30 transition-all duration-200 cursor-pointer">
                  <div className="flex gap-1.5 mb-2">
                    <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">Setup</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200 line-through">Establish project repository</h4>
                  <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-900 text-[10px] text-slate-400">
                    <div className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Done</span>
                    </div>
                    <div className="h-5 w-5 rounded-full bg-violet-500 flex items-center justify-center text-[8px] font-bold text-white">JD</div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="group bg-slate-950/80 border border-slate-800/80 rounded-lg p-3 shadow-md opacity-80 hover:opacity-100 hover:border-violet-500/30 transition-all duration-200 cursor-pointer">
                  <div className="flex gap-1.5 mb-2">
                    <span className="text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded">Dev</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200 line-through">Configure Tailwind & PostCSS</h4>
                  <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-900 text-[10px] text-slate-400">
                    <div className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Done</span>
                    </div>
                    <div className="h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center text-[8px] font-bold text-white">SK</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* EMAIL NEWSLETTER SECTION */}
        <section id="newsletter" className="w-full max-w-4xl mx-auto px-4 py-20 scroll-mt-16">
          <div className="relative rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/60 to-slate-950/60 p-8 md:p-12 backdrop-blur-md overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-violet-600/10 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/15 text-violet-400 border border-violet-500/20 mb-6">
                <Mail className="h-6 w-6 animate-bounce" />
              </div>

              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Stay updated with trello.
              </h2>
              <p className="mt-4 text-slate-400 text-sm md:text-base leading-relaxed">
                Subscribe to our newsletter and receive workflow tips, template releases, and modern collaborative insights straight to your inbox.
              </p>

              {subscribed ? (
                <div className="mt-8 flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-6 py-4 text-emerald-400 animate-fadeIn">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm font-semibold">Thanks for subscribing! Check your inbox for updates.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-md">
                  <div className="flex-1 flex flex-col items-start gap-1">
                    <label htmlFor="email-address" className="sr-only">Email address</label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
                    />
                    {errorMsg && <p className="text-red-400 text-xs mt-1 text-left">{errorMsg}</p>}
                  </div>
                  <button
                    type="submit"
                    className="flex items-center justify-center bg-violet-600 hover:bg-violet-500 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 focus:outline-none shadow-md shadow-violet-500/10 hover:shadow-violet-500/20"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

      </main>

      {/* Footer Navigation */}
      <Footer />
    </div>
  )
}