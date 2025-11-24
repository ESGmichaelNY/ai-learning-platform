import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Model Comparison Lab',
  description: 'Learn how different AI models respond to the same prompts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
