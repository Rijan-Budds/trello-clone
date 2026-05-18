'use server'

import { redirect } from 'next/navigation'

export type FormState = {
    error?: string;
    success?: boolean;
}

export async function loginAction(prevState: FormState, formData: FormData): Promise<FormState> {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'Please fill in all fields.' }
    }

    // Simple format validation since we're disabling browser default tooltips
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return { error: 'Please enter a valid email address.' }
    }

    try {
        // Mocking database check
        if (email !== "user@example.com" || password !== "password123") {
            return { error: 'Invalid email or password.' }
        }
    } catch (err) {
        return { error: 'Something went wrong. Please try again.' }
    }

    // Safe to redirect out here now that it won't be caught by a generic catch block
    redirect('/page')
}