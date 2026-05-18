'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { loginAction, FormState } from './action'

const initialState: FormState = {}

export default function LoginForm() {
    const [state, formAction] = useActionState(loginAction, initialState)

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-md text-gray-900">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

            <form action={formAction} className="space-y-4" noValidate>
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="you@example.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="••••••••"
                    />
                </div>

                {state?.error && (
                    <p className="text-red-600 bg-red-50 border border-red-200 text-sm font-medium rounded p-2.5">
                        {state.error}
                    </p>
                )}

                <SubmitButton />
            </form>
        </div>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded disabled:bg-gray-400 transition-colors"
        >
            {pending ? 'Logging in...' : 'Sign In'}
        </button>
    )
}