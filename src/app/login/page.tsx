'use client'

import { useActionState, useState } from 'react'
import { loginAction, FormState } from './action'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'
import { ArrowLeft, Eye, EyeOff, X, UserPlus, LogIn } from 'lucide-react'
import Silk from '../../components/Silk'

const initialState: FormState = {}

const emailRegexWithoutDomainNumbers = /^[A-Z0-9._%+-]+@[A-Z.-]+\.[A-Z]{2,}$/i;

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .required('Required')
        .email('Invalid email address')
        .matches(emailRegexWithoutDomainNumbers, 'Email domain cannot contain numbers'),
    password: Yup.string()
        .required('Required')
        .min(8, 'Password must be at least 8 characters long')
})

const RegisterSchema = Yup.object().shape({
    name: Yup.string()
        .required('Required')
        .trim()
        .min(2, 'Name must be at least 2 characters long')
        .max(30, 'Name must not exceed 30 characters')
        .matches(/^[^\d]*$/, 'Name cannot contain numbers'),
    email: Yup.string()
        .required('Required')
        .email('Invalid email address')
        .matches(emailRegexWithoutDomainNumbers, 'Email domain cannot contain numbers'),
    password: Yup.string()
        .required('Required')
        .min(8, 'Password must be at least 8 characters long')
})

const TrelloIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19.03 3A4.97 4.97 0 0 1 24 7.97v8.06A4.97 4.97 0 0 1 19.03 21H4.97A4.97 4.97 0 0 1 0 16.03V7.97A4.97 4.97 0 0 1 4.97 3h14.06zM9.03 6H4.97A.97.97 0 0 0 4 6.97v6.06c0 .54.43.97.97.97h4.06a.97.97 0 0 0 .97-.97V6.97A.97.97 0 0 0 9.03 6zm10 0h-4.06a.97.97 0 0 0-.97.97v10.06c0 .54.43.97.97.97h4.06a.97.97 0 0 0 .97-.97V6.97a.97.97 0 0 0-.97-.97z" />
    </svg>
)

export default function LoginForm() {
    const [state, formAction] = useActionState(loginAction, initialState)
    const [isRegisterOpen, setIsRegisterOpen] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 text-slate-100 font-sans overflow-hidden selection:bg-violet-500/30 selection:text-white">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-45">
                <Silk speed={3} scale={1.2} color="#6d28d9" noiseIntensity={1.0} rotation={0.4} />
            </div>

            {/* Back to home link */}
            <div className="absolute top-6 left-6 z-20">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 group"
                >
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
                    Back to home
                </Link>
            </div>

            {/* Logo */}
            <div className="relative z-10 mb-8 flex flex-col items-center gap-3 animate-[fadeInDown_0.5s_ease-out]">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-200">
                        <TrelloIcon className="h-6 w-6" />
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                        trello<span className="text-indigo-500 font-extrabold">.</span>
                    </span>
                </Link>
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md mx-4 animate-[fadeInUp_0.6s_ease-out]">
                <div className="relative rounded-2xl border border-slate-800/60 bg-slate-900/50 p-8 backdrop-blur-xl shadow-2xl shadow-black/20 overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-12 -mr-12 h-32 w-32 rounded-full bg-violet-600/10 blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-32 w-32 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400 mb-4 backdrop-blur-sm">
                                <LogIn className="h-3 w-3" />
                                <span>Welcome back</span>
                            </div>
                            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent tracking-tight">
                                Sign in to your account
                            </h2>
                            <p className="mt-2 text-sm text-slate-400">
                                Enter your credentials to access your boards
                            </p>
                        </div>

                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={LoginSchema}
                            onSubmit={async (values, { setSubmitting }) => {
                                try {
                                    const formData = new FormData()
                                    formData.append('email', values.email)
                                    formData.append('password', values.password)

                                    // Await the form action directly so Formik can accurately manage isSubmitting
                                    await formAction(formData)
                                } catch (err) {
                                    console.error(err)
                                } finally {
                                    setSubmitting(false)
                                }
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className="space-y-5" noValidate>
                                    <div>
                                        <label htmlFor="login-email" className="block text-sm font-medium mb-2 text-slate-300">
                                            Email
                                        </label>
                                        <Field
                                            type="email"
                                            name="email"
                                            id="login-email"
                                            placeholder="you@example.com"
                                            className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="text-red-400 text-xs mt-1.5 font-medium"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="login-password" className="block text-sm font-medium mb-2 text-slate-300">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <Field
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                id="login-password"
                                                placeholder="••••••••"
                                                className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 pr-11 text-sm text-white placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors duration-200"
                                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                            >
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="text-red-400 text-xs mt-1.5 font-medium"
                                        />
                                    </div>

                                    {state?.error && (
                                        <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-400 text-sm font-medium">
                                            <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                                            </svg>
                                            {state.error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 shadow-lg shadow-violet-600/25 hover:shadow-violet-600/35 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                                Signing in...
                                            </>
                                        ) : (
                                            'Sign In'
                                        )}
                                    </button>

                                    <div className="relative flex items-center justify-center my-2">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-slate-800"></div>
                                        </div>
                                        <span className="relative bg-slate-900/50 backdrop-blur-sm px-4 text-xs text-slate-500 font-medium">
                                            or
                                        </span>
                                    </div>

                                    <p className="text-center text-sm text-slate-400">
                                        Don&apos;t have an account?{' '}
                                        <button
                                            type="button"
                                            className="text-violet-400 hover:text-violet-300 font-semibold transition-colors duration-200 focus:outline-none"
                                            onClick={() => setIsRegisterOpen(true)}
                                        >
                                            Create one
                                        </button>
                                    </p>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>

            {/* Footer text */}
            <p className="relative z-10 mt-8 text-xs text-slate-600 animate-[fadeInUp_0.8s_ease-out]">
                © 2026 Trello Clone. Built with modern web technologies.
            </p>

            {isRegisterOpen && (
                <RegisterModal onClose={() => setIsRegisterOpen(false)} />
            )}

            <style jsx>{`
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-16px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes modalIn {
                    from { opacity: 0; transform: scale(0.95) translateY(8px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}</style>
        </div>
    )
}

function RegisterModal({ onClose }: { onClose: () => void }) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md cursor-pointer"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                className="relative rounded-2xl border border-slate-800/60 bg-slate-900/80 p-8 max-w-md w-full mx-4 shadow-2xl shadow-black/30 backdrop-blur-xl overflow-hidden cursor-auto"
                style={{ animation: 'modalIn 0.3s ease-out' }}
            >
                <div className="absolute top-0 left-0 -mt-12 -ml-12 h-32 w-32 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 -mb-12 -mr-12 h-32 w-32 rounded-full bg-violet-600/10 blur-3xl pointer-events-none"></div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors duration-200 rounded-lg hover:bg-slate-800/60 p-1.5 focus:outline-none z-20"
                    type="button"
                    aria-label="Close modal"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="relative z-10">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400 mb-4 backdrop-blur-sm">
                            <UserPlus className="h-3 w-3" />
                            <span>Join us</span>
                        </div>
                        <h3 className="text-2xl font-extrabold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent tracking-tight">
                            Create an Account
                        </h3>
                        <p className="mt-2 text-sm text-slate-400">
                            Start organizing your projects today
                        </p>
                    </div>

                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            password: ''
                        }}
                        validationSchema={RegisterSchema}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                            try {
                                const response = await fetch("/api/register", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    credentials: "include",
                                    body: JSON.stringify({
                                        username: values.name,
                                        email: values.email,
                                        password: values.password
                                    })
                                })

                                const data = await response.json();

                                if (!response.ok) {
                                    alert(data.message || "An error occurred during registration.")
                                } else {
                                    alert("Account created successfully!")
                                    resetForm();
                                    onClose();
                                }
                            } catch (error) {
                                alert("Network error. Please try again.")
                                console.error(error)
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-5" noValidate>
                                <div>
                                    <label htmlFor="register-name" className="block text-sm font-medium mb-2 text-slate-300">
                                        Full Name
                                    </label>
                                    <Field
                                        type="text"
                                        name="name"
                                        id="register-name"
                                        placeholder="John Doe"
                                        className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="text-red-400 text-xs mt-1.5 font-medium"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="register-email" className="block text-sm font-medium mb-2 text-slate-300">
                                        Email
                                    </label>
                                    <Field
                                        type="email"
                                        name="email"
                                        id="register-email"
                                        placeholder="you@example.com"
                                        className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-red-400 text-xs mt-1.5 font-medium"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="register-password" className="block text-sm font-medium mb-2 text-slate-300">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Field
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            id="register-password"
                                            placeholder="••••••••"
                                            className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 pr-11 text-sm text-white placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors duration-200"
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="text-red-400 text-xs mt-1.5 font-medium"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 shadow-lg shadow-violet-600/25 hover:shadow-violet-600/35 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Creating account...
                                        </>
                                    ) : (
                                        'Create Account'
                                    )}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}