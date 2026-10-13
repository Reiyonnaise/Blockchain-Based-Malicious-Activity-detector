import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BlockSecure | Blockchain-Based Malicious Activity Detector",
  description:
    "Production-grade cybersecurity platform detecting SQL injections, malicious file uploads, and brute force intrusions with tamper-proof Ethereum blockchain audit logging and instant admin alerts.",
  keywords: [
    "blockchain",
    "cybersecurity",
    "malicious activity detector",
    "smart contract",
    "ethereum",
    "audit trail",
    "sql injection",
    "brute force protection",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
