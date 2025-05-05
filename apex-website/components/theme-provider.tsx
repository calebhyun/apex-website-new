"use client"

import type React from "react"

import { createContext, useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Create a simplified version that doesn't rely on the imported type
export function ThemeProvider({
  children,
  attribute = "data-theme",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
  ...props
}: {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  [key: string]: any
}) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

// Add a fallback implementation in case next-themes still doesn't work
export function FallbackThemeProvider({
  children,
  defaultTheme = "light",
}: {
  children: React.ReactNode
  defaultTheme?: string
}) {
  const [theme, setTheme] = useState(defaultTheme)

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  const ThemeContext = createContext({
    theme,
    setTheme: (newTheme: string) => setTheme(newTheme),
  })

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

// If you're still having issues, replace ThemeProvider with FallbackThemeProvider in your layout.tsx
