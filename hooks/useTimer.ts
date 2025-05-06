"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface UseTimerProps {
  initialTime: number
  onTimeout: () => void
  isActive: boolean
}

export function useTimer({ initialTime, onTimeout, isActive }: UseTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const onTimeoutRef = useRef(onTimeout)
  const initialTimeRef = useRef(initialTime)

  // Update the ref when onTimeout changes
  useEffect(() => {
    onTimeoutRef.current = onTimeout
  }, [onTimeout])

  // Update initialTimeRef when initialTime changes
  useEffect(() => {
    initialTimeRef.current = initialTime
    // Reset the timer when initialTime changes
    setTimeLeft(initialTime)
  }, [initialTime])

  // Reset timer to initial value
  const resetTimer = useCallback(() => {
    setTimeLeft(initialTimeRef.current)
  }, [])

  // Timer effect
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => {
          const newTime = Math.max(0, prev - 100) // Decrease by 100ms for smoother updates
          return newTime
        })
      }, 100) // Update every 100ms for smoother countdown
    } else if (timeLeft <= 0 && isActive) {
      onTimeoutRef.current()
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [timeLeft, isActive])

  return {
    timeLeft,
    resetTimer,
  }
}
