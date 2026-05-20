'use client'

import { useActionState, useState } from 'react'
import { loginAction, FormState } from './action'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const initialState: FormState = {}

interface FormValues {
    email: string
    initialState?: FormState
}

export default function LoginForm() {
    const [state, formAction] = useActionState(loginAction, initialState)
    const [isRegisterOpen, setIsRegisterOpen] = useState(false)

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md text-gray-900">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={(values) => {
                        const errors: Record<string, string> = {}
                        if (!values.email) {
                            errors.email = 'Required'
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address'
                        }

                        if (!values.password) {
                            errors.password = 'Required'
                        }
                        return errors
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        const formData = new FormData()
                        formData.append('email', values.email)
                        formData.append('password', values.password)

                        formAction(formData)
                        setSubmitting(false)
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4" noValidate>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-xs mt-1 font-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-red-500 text-xs mt-1 font-medium"
                                />
                            </div>

                            {/* Displays database or authentication errors returned from loginAction server side */}
                            {state?.error && (
                                <p className="text-red-600 bg-red-50 border border-red-200 text-sm font-medium rounded p-2.5">
                                    {state.error}
                                </p>
                            )}

                            <p>
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    className="underline text-blue-600 hover:text-blue-800"
                                    onClick={() => setIsRegisterOpen(true)}
                                >
                                    Register here
                                </button>
                            </p>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded disabled:bg-gray-400 transition-colors"
                            >
                                {isSubmitting ? 'Logging in...' : 'Sign In'}
                            </button>
                        </Form>
                    )}
                </Formik>

                {isRegisterOpen && (
                    <RegisterModal onClose={() => setIsRegisterOpen(false)} />
                )}
            </div>
        </div>
    )
}

function RegisterModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl border border-gray-100 relative animate-in fade-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 font-bold text-lg"
                    type="button"
                >
                    ✕
                </button>

                <h3 className="text-xl font-bold mb-4 text-gray-900">Create an Account</h3>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Full Name</label>
                        <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white" placeholder="John Doe" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
                        <input type="email" className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white" placeholder="you@example.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Password</label>
                        <input type="password" className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white" placeholder="••••••••" />
                    </div>

                    <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded transition-colors mt-2">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    )
}