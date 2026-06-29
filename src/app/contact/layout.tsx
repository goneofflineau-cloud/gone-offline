import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Contact | Gone Offline' }

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
