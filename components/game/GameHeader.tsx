"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Timer } from "@/components/game/Timer"
import { GameMessage } from "@/components/game/GameMessage"
import type { MessageType } from "@/types"

interface GameHeaderProps {
  currentStreak: number
  longestStreak: number
  timeLeft: number
  message: string
  messageType: MessageType
  revealAnswer: boolean
  targetItemName?: string
  targetItemImage?: string
  version: string
  onReset: () => void
}

export function GameHeader({
  currentStreak,
  longestStreak,
  timeLeft,
  message,
  messageType,
  revealAnswer,
  targetItemName,
  targetItemImage,
  version,
  onReset,
}: GameHeaderProps) {
  return (
    <Card className="md:col-span-3 bg-zinc-800 border-zinc-700 text-zinc-100 shadow-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-zinc-400">Current Streak</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                {currentStreak}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-zinc-400">Longest Streak</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">
                {longestStreak}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="text-zinc-100 border-red-700 bg-red-900/30 hover:bg-red-800/50 transition-all duration-300"
            >
              Reset Game
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Timer timeLeft={timeLeft} />
        <GameMessage
          message={message}
          messageType={messageType}
          revealAnswer={revealAnswer}
          targetItemName={targetItemName}
          targetItemImage={targetItemImage}
          version={version}
        />
      </CardContent>
    </Card>
  )
}
