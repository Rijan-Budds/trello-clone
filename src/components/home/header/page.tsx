'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

// Custom Trello SVG Icon to avoid dependency version issues
const TrelloIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19.03 3A4.97 4.97 0 0 1 24 7.97v8.06A4.97 4.97 0 0 1 19.03 21H4.97A4.97 4.97 0 0 1 0 16.03V7.97A4.97 4.97 0 0 1 4.97 3h14.06zM9.03 6H4.97A.97.97 0 0 0 4 6.97v6.06c0 .54.43.97.97.97h4.06a.97.97 0 0 0 .97-.97V6.97A.97.97 0 0 0 9.03 6zm10 0h-4.06a.97.97 0 0 0-.97.97v10.06c0 .54.43.97.97.97h4.06a.97.97 0 0 0 .97-.97V6.97a.97.97 0 0 0-.97-.97z" />
    </svg>
)

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-800/60 bg-slate-950/75 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-200">
                        <TrelloIcon className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                        trello<span className="text-indigo-500 font-extrabold">.</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200">
                        Features
                    </Link>
                    <Link href="#newsletter" className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200">
                        Newsletter
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200">
                        About Us
                    </Link>
                </nav>

                {/* Action Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/login"
                        className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 px-3 py-2"
                    >
                        Log In
                    </Link>
                    <Link
                        href="/login"
                        className="inline-flex h-9 items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 text-sm font-semibold text-white shadow-md shadow-violet-500/20 hover:shadow-violet-500/30 hover:from-violet-500 hover:to-indigo-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                    >
                        Get started
                    </Link>
                </div>

                {/* Mobile menu button */}
                <div className="flex md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-900 hover:text-white focus:outline-none"
                        aria-controls="mobile-menu"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        {isOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-lg transition-all duration-200" id="mobile-menu">
                    <div className="space-y-1 px-4 py-4 pb-6">
                        <Link
                            href="#features"
                            onClick={() => setIsOpen(false)}
                            className="block rounded-md px-3 py-2 text-base font-medium text-slate-400 hover:bg-slate-900 hover:text-white transition-colors"
                        >
                            Features
                        </Link>
                        <Link
                            href="#demo"
                            onClick={() => setIsOpen(false)}
                            className="block rounded-md px-3 py-2 text-base font-medium text-slate-400 hover:bg-slate-900 hover:text-white transition-colors"
                        >
                            Demo
                        </Link>
                        <Link
                            href="#newsletter"
                            onClick={() => setIsOpen(false)}
                            className="block rounded-md px-3 py-2 text-base font-medium text-slate-400 hover:bg-slate-900 hover:text-white transition-colors"
                        >
                            Newsletter
                        </Link>
                        <Link
                            href="/about"
                            onClick={() => setIsOpen(false)}
                            className="block rounded-md px-3 py-2 text-base font-medium text-slate-400 hover:bg-slate-900 hover:text-white transition-colors"
                        >
                            About Us
                        </Link>
                        <div className="border-t border-slate-800 my-4 pt-4 flex flex-col gap-2">
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="flex w-full items-center justify-center rounded-md border border-slate-800 px-4 py-2.5 text-base font-medium text-slate-400 hover:bg-slate-900 hover:text-white"
                            >
                                Log In
                            </Link>
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-base font-semibold text-white hover:from-violet-500 hover:to-indigo-500"
                            >
                                Get started
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}