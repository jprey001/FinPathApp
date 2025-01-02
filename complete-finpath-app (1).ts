// File: src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FinPath - Financial Literacy App',
  description: 'Learn financial literacy through interactive lessons and quizzes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

// File: src/app/page.tsx
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Welcome to FinPath</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/lessons">
            <div className="p-6 bg-blue-100 rounded-lg hover:bg-blue-200 transition">
              <h2 className="text-2xl font-semibold mb-2">Start Learning</h2>
              <p>Begin your journey to financial literacy</p>
            </div>
          </Link>
          <Link href="/quiz">
            <div className="p-6 bg-green-100 rounded-lg hover:bg-green-200 transition">
              <h2 className="text-2xl font-semibold mb-2">Test Your Knowledge</h2>
              <p>Take quizzes to track your progress</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  )
}

// File: src/app/lessons/page.tsx
export default function Lessons() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Financial Lessons</h1>
        <div className="space-y-4">
          {financialModules.map((module) => (
            <div key={module.id} className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-2">{module.title}</h2>
              <p className="text-gray-600 mb-4">{module.description}</p>
              <div className="space-y-2">
                {module.lessons.map((lesson) => (
                  <div key={lesson.id} className="p-4 bg-gray-50 rounded">
                    <h3 className="font-medium">{lesson.title}</h3>
                    <p className="text-sm text-gray-500">{lesson.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// File: src/app/quiz/page.tsx
'use client'

import { useState } from 'react'

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore(score + 1)
    
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        {!showResults ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <p className="text-lg mb-6">{questions[currentQuestion].question}</p>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.isCorrect)}
                  className="w-full p-4 text-left rounded bg-gray-50 hover:bg-gray-100"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-lg">
              Your score: {score} out of {questions.length}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// File: src/data/modules.ts
export const financialModules = [
  {
    id: 'budgeting',
    title: 'Budgeting Basics',
    description: 'Learn how to create and maintain a budget',
    lessons: [
      {
        id: 'income',
        title: 'Understanding Income',
        description: 'Learn about different types of income and how to track them',
      },
      {
        id: 'expenses',
        title: 'Managing Expenses',
        description: 'Categorize and track your expenses effectively',
      },
    ],
  },
  {
    id: 'saving',
    title: 'Saving Strategies',
    description: 'Discover effective ways to save money',
    lessons: [
      {
        id: 'emergency-fund',
        title: 'Building an Emergency Fund',
        description: 'Learn why and how to build an emergency fund',
      },
      {
        id: 'saving-goals',
        title: 'Setting Saving Goals',
        description: 'Create and achieve your saving goals',
      },
    ],
  },
]

// File: src/data/questions.ts
export const questions = [
  {
    question: 'What is a budget?',
    options: [
      {
        text: 'A plan for how to spend and save money',
        isCorrect: true,
      },
      {
        text: 'A type of bank account',
        isCorrect: false,
      },
      {
        text: 'A kind of investment',
        isCorrect: false,
      },
      {
        text: 'A credit card limit',
        isCorrect: false,
      },
    ],
  },
  {
    question: 'What is an emergency fund?',
    options: [
      {
        text: 'Money saved for unexpected expenses',
        isCorrect: true,
      },
      {
        text: 'A type of insurance',
        isCorrect: false,
      },
      {
        text: 'A retirement account',
        isCorrect: false,
      },
      {
        text: 'A government benefit',
        isCorrect: false,
      },
    ],
  },
]

// File: package.json
{
  "name": "finpath-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.4",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.0.4",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  }
}

// File: tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config

// File: next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

// File: src/app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;
