"use client"

import { useState } from "react"
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { formatTimer } from "@/utils/formatters"

interface TimeSelectorProps {
  currentTime: number
  onTimeChange: (newTime: number) => void
}

export function TimeSelector({ currentTime, onTimeChange }: TimeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Convert milliseconds to seconds for the slider
  const timeInSeconds = currentTime / 1000

  const handleTimeChange = (value: number[]) => {
    // Convert seconds back to milliseconds
    onTimeChange(value[0] * 1000)
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="text-zinc-100 border-blue-700 bg-blue-900/30 hover:bg-blue-800/50 transition-all duration-300 flex items-center gap-2"
      >
        <Clock className="h-4 w-4" />
        <span>{formatTimer(currentTime)}s</span>
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-10 z-50 w-64 p-4 bg-zinc-800 border-zinc-700 text-zinc-100 shadow-lg">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Time Limit</span>
              <span className="text-sm font-mono">{formatTimer(currentTime)}s</span>
            </div>

            <Slider
              defaultValue={[timeInSeconds]}
              min={5}
              max={60}
              step={1}
              onValueChange={handleTimeChange}
              className="w-full"
            />

            <div className="flex justify-between text-xs text-zinc-400">
              <span>5s</span>
              <span>30s</span>
              <span>60s</span>
            </div>

            <div className="pt-2 text-xs text-zinc-400">Adjust the time limit for each item guess</div>
          </div>
        </Card>
      )}
    </div>
  )
}
