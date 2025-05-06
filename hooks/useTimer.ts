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

  useEffect(() => {
    onTimeoutRef.current = onTimeout
  }, [onTimeout])

  useEffect(() => {
    initialTimeRef.current = initialTime
    setTimeLeft(initialTime)
  }, [initialTime])

  const resetTimer = useCallback(() => {
    setTimeLeft(initialTimeRef.current)
  }, [])

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => {
          const newTime = Math.max(0, prev - 10) // Decrease by 10ms
          return newTime
        })
      }, 1) // Update every 10ms
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
