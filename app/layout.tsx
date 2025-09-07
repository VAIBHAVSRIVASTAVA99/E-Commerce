import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/hooks/use-auth"
import { CartProvider } from "@/hooks/use-cart"
import dynamic from 'next/dynamic'
import { ThemeProvider } from "@/components/theme-provider-client"
import { Suspense } from "react"
import "./globals.css"

// Import the client-only Toaster component
const Toaster = dynamic(() => import('@/components/client-only-toaster'), {
  ssr: false,
  loading: () => null,
})

export const metadata: Metadata = {
  title: "ShopHub - Your Premium E-commerce Destination",
  description: "Discover amazing products with a seamless shopping experience",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>
            <AuthProvider>
              <CartProvider>
                {children}
                <Toaster />
              </CartProvider>
            </AuthProvider>
          </Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
