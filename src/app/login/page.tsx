'use client'

import { useActionState, useState } from 'react'
import { loginAction, FormState } from './action'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const initialState: FormState = {}

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
                        } else if (values.password.length < 8) {
                            errors.password = 'Password must be at least 8 characters long'
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
                                <label htmlFor="login-email" className="block text-sm font-medium mb-1 text-gray-700">Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    id="login-email"
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
                                <label htmlFor="login-password" className="block text-sm font-medium mb-1 text-gray-700">Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    id="login-password"
                                    placeholder="••••••••"
                                    className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-red-500 text-xs mt-1 font-medium"
                                />
                            </div>

                            {state?.error && (
                                <p className="text-red-600 bg-red-50 border border-red-200 text-sm font-medium rounded p-2.5">
                                    {state.error}
                                </p>
                            )}

                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    className="underline text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md cursor-pointer" onClick={(e) => {
            if (e.target === e.currentTarget) {
                onClose();
            }
        }}>
            <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl border border-gray-100 relative animate-in fade-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 font-bold text-lg focus:outline-none"
                    type="button"
                    aria-label="Close modal"
                >
                    ✕
                </button>

                <h3 className="text-xl font-bold mb-4 text-gray-900">Create an Account</h3>

                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: ''
                    }}
                    validate={values => {
                        const errors: Record<string, string> = {};

                        if (!values.name) {
                            errors.name = 'Required';
                        } else if (values.name.trim().length < 2) {
                            errors.name = "Name must be at least 2 characters long"
                        } else if (values.name.trim().length > 30) {
                            errors.name = "Name must not exceed 30 characters"
                        } else if (/\d/.test(values.name)) {
                            errors.name = 'Name cannot contain numbers';
                        }

                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                            errors.email = 'Invalid email address'
                        }

                        if (!values.password) {
                            errors.password = 'Required'
                        } else if (values.password.length < 8) {
                            errors.password = 'Password must be at least 8 characters long'
                        }

                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                            onClose();
                        }, 400);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4" noValidate>
                            <div>
                                <label htmlFor="register-name" className="block text-sm font-medium mb-1 text-gray-700">Name</label>
                                <Field
                                    type="text"
                                    name="name"
                                    id="register-name"
                                    placeholder="Full Name"
                                    className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-red-500 text-xs mt-1 font-medium"
                                />
                            </div>
                            <div>
                                <label htmlFor="register-email" className="block text-sm font-medium mb-1 text-gray-700">Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    id="register-email"
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
                                <label htmlFor="register-password" className="block text-sm font-medium mb-1 text-gray-700">Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    id="register-password"
                                    placeholder="••••••••"
                                    className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-red-500 text-xs mt-1 font-medium"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded disabled:bg-gray-400 transition-colors"
                            >
                                {isSubmitting ? 'Creating...' : 'Create Account'}
                            </button>
                        </Form>
                    )}
                </Formik>

            </div>
        </div>
    )
}