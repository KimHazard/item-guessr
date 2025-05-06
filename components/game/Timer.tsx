import { Clock } from "lucide-react"
import { formatTimer, getTimerColor } from "@/utils/formatters"

interface TimerProps {
  timeLeft: number
}

export function Timer({ timeLeft }: TimerProps) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <Clock className="h-4 w-4 text-zinc-400" />
      <span className="text-sm text-zinc-400">Time:</span>
      <span className={`font-mono font-bold text-lg ${getTimerColor(timeLeft)} transition-colors duration-300`}>
        {formatTimer(timeLeft)}
      </span>
    </div>
  )
}
