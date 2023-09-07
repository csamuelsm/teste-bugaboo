"use client"
import type { Metadata } from 'next'

import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { SessionProvider } from "next-auth/react"

import 'dotenv/config'

export const metadata: Metadata = {
  title: 'Teste Bugaboo',
  description: 'Projeto criado para o Teste de Dev Full-Stack da Bugaboo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body style={{
        padding: 5
      }}>
        <Theme accentColor='violet' appearance='dark'>
          <SessionProvider>
            {children}
          </SessionProvider>
        </Theme>
      </body>
    </html>
  )
}
