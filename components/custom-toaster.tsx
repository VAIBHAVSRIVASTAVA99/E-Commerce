"use client"

import { Toaster as OriginalToaster } from "@/components/ui/toaster"
import { useEffect, useState } from "react"

export function CustomToaster() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div suppressHydrationWarning>
      <OriginalToaster />
    </div>
  )
}
