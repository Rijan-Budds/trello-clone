'use client'

import Link from 'next/link'
import Silk from '../components/Silk.jsx'

export default function App() {
  return (
    <div className='relative w-screen h-screen overflow-hidden bg-white text-black'>

      <div className='absolute inset-0 z-0'>
        <Silk
          speed={5}
          scale={1}
          color="#8002eb"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      <div className='relative z-10 flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center px-4 space-y-4'>
        <h1 className='text-5xl font-bold'>Trello clone</h1>
        <p className='text-xl font-medium text-gray-800'>what is trello?</p>
        <p className='text-gray-600'>
          trello is a visual, web-based project management and collaboration tool that uses a Kanban board system to organize tasks, projects, and workflows
        </p>

        <Link href="/login">
          <span className='inline-block bg-blue-500 hover:bg-blue-600 rounded px-6 py-3 text-white font-semibold cursor-pointer transition-colors shadow-md'>
            Get started
          </span>
        </Link>
      </div>

    </div>
  )
}