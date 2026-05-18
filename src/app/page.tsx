'use client'

import Link from 'next/link'
export default function App() {

  return (
    <div className='bg-white text-black'>
      <h1 className='text-5xl'>Trello clone</h1>
      <p>what is trello?</p>
      <p>trello is a a visual, web-based project management and collaboration tool that uses a Kanban board system to organize tasks, projects, and workflows</p>
      <Link href="/login">
        <button className='bg-blue-400 rounded p-2 text-white cursor-pointer'>Get started</button>
      </Link>
    </div>
  )
}