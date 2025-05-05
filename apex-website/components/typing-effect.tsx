"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TypingEffectProps {
  texts: string[]
  className?: string
}

export default function TypingEffect({ texts, className }: TypingEffectProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  // Typing effect
  useEffect(() => {
    const text = texts[currentTextIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(text.substring(0, currentText.length + 1))

          if (currentText.length === text.length) {
            // Wait a bit before starting to delete
            setTimeout(() => setIsDeleting(true), 1500)
          }
        } else {
          setCurrentText(text.substring(0, currentText.length - 1))

          if (currentText.length === 0) {
            setIsDeleting(false)
            setCurrentTextIndex((currentTextIndex + 1) % texts.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [currentText, currentTextIndex, isDeleting, texts])

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530) // Blink every 530ms

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <div className={cn("h-8 sm:h-10", className)}>
      <span className="typing-effect inline-block">
        {currentText}
        <span className={`cursor ${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>|</span>
      </span>
    </div>
  )
}