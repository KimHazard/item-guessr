"use client"

import { useState, useEffect, useCallback } from "react"
import { GameHeader } from "@/components/game/GameHeader"
import { ItemDisplay } from "@/components/game/ItemDisplay"
import { SearchInput } from "@/components/game/SearchInput"
import { GuessHistory } from "@/components/game/GuessHistory"
import { Footer } from "@/components/game/Footer"
import { TimeSelector } from "@/components/game/TimeSelector"
import { useItemData } from "@/hooks/useItemData"
import { useTimer } from "@/hooks/useTimer"
import type { Item, GuessRecord, MessageType } from "@/types"

const DEFAULT_TIME = 15000 // 15 seconds in milliseconds

export default function LeagueItemsQuiz() {
  // Game state
  const [targetItem, setTargetItem] = useState<Item | null>(null)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)
  const [guessHistory, setGuessHistory] = useState<GuessRecord[]>([])
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<MessageType>("")
  const [revealAnswer, setRevealAnswer] = useState(false)
  const [timerActive, setTimerActive] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [timeLimit, setTimeLimit] = useState(DEFAULT_TIME)

  // Custom hooks
  const { items, loading, version, getRandomItem } = useItemData()

  // Handle timer timeout - wrapped in useCallback to maintain stable reference
  const handleTimeout = useCallback(() => {
    setTimerActive(false)
    setRevealAnswer(true)
    setMessage("Time's up!")
    setMessageType("error")

    // Record the failed guess
    const timeSpent = timeLimit / 1000 // Full time used
    if (targetItem) {
      setGuessHistory((prev) => [
        {
          itemName: targetItem.name,
          itemId: targetItem.id,
          correct: false,
          timeSpent,
        },
        ...prev,
      ])
    }

    // Reset streak
    setCurrentStreak(0)

    // Set a new target item after a delay
    setTimeout(() => {
      const newItem = getRandomItem()
      setTargetItem(newItem)
      setRevealAnswer(false)
      setMessage("")
      setMessageType("")
      if (resetTimer) resetTimer()
      setTimerActive(true)
      setStartTime(Date.now())
    }, 2000)
  }, [getRandomItem, targetItem, timeLimit])

  const { timeLeft, resetTimer } = useTimer({
    initialTime: timeLimit,
    onTimeout: handleTimeout,
    isActive: timerActive,
  })

  // Initialize the game when items are loaded
  useEffect(() => {
    if (!loading && items.length > 0 && !targetItem && getRandomItem) {
      const randomItem = getRandomItem()
      setTargetItem(randomItem)
      setStartTime(Date.now())
      setTimerActive(true)
    }
  }, [loading, items, targetItem, getRandomItem])

  // Handle time limit change
  const handleTimeChange = useCallback(
    (newTime: number) => {
      setTimeLimit(newTime)
      if (resetTimer) resetTimer()
    },
    [resetTimer],
  )

  // Check if the selected item matches the target item
  const checkAnswer = useCallback(
    (item: Item) => {
      setTimerActive(false)
      const timeSpent = (Date.now() - startTime) / 1000

      if (item.id === targetItem?.id) {
        // Correct answer
        const newStreak = currentStreak + 1
        setCurrentStreak(newStreak)
        setLongestStreak((prev) => Math.max(prev, newStreak))

        setMessage("Correct!")
        setMessageType("success")
        setRevealAnswer(true)

        // Record the correct guess
        setGuessHistory((prev) => [
          {
            itemName: item.name,
            itemId: item.id,
            correct: true,
            timeSpent,
          },
          ...prev,
        ])

        // Set a new target item after a delay
        setTimeout(() => {
          if (getRandomItem) {
            const newItem = getRandomItem()
            setTargetItem(newItem)
            setRevealAnswer(false)
            setMessage("")
            setMessageType("")
            if (resetTimer) resetTimer()
            setTimerActive(true)
            setStartTime(Date.now())
          }
        }, 2000)
      } else {
        // Wrong answer
        setCurrentStreak(0)
        setMessage("Wrong!")
        setMessageType("error")
        setRevealAnswer(true)

        // Record the incorrect guess
        setGuessHistory((prev) => [
          {
            itemName: item.name,
            itemId: item.id,
            correct: false,
            timeSpent,
          },
          ...prev,
        ])

        setTimeout(() => {
          if (getRandomItem) {
            const newItem = getRandomItem()
            setTargetItem(newItem)
            setRevealAnswer(false)
            setMessage("")
            setMessageType("")
            if (resetTimer) resetTimer()
            setTimerActive(true)
            setStartTime(Date.now())
          }
        }, 2000)
      }
    },
    [currentStreak, getRandomItem, resetTimer, startTime, targetItem],
  )

  // Handle form submission
  const handleSubmit = useCallback(
    (item: Item) => {
      checkAnswer(item)
    },
    [checkAnswer],
  )

  // Skip current item and get a new one
  const handleSkip = useCallback(() => {
    setTimerActive(false)
    setRevealAnswer(true)
    setMessage("Skipped!")
    setMessageType("error")
    setCurrentStreak(0)

    // Record the skipped item
    const timeSpent = (Date.now() - startTime) / 1000
    if (targetItem) {
      setGuessHistory((prev) => [
        {
          itemName: targetItem.name,
          itemId: targetItem.id,
          correct: false,
          timeSpent,
        },
        ...prev,
      ])
    }

    // Set a new target item after a delay
    setTimeout(() => {
      if (getRandomItem) {
        const newItem = getRandomItem()
        setTargetItem(newItem)
        setRevealAnswer(false)
        setMessage("")
        setMessageType("")
        if (resetTimer) resetTimer()
        setTimerActive(true)
        setStartTime(Date.now())
      }
    }, 2000)
  }, [getRandomItem, resetTimer, startTime, targetItem])

  // Reset the game
  const handleReset = useCallback(() => {
    setCurrentStreak(0)
    setGuessHistory([])
    setRevealAnswer(false)
    setMessage("")
    setMessageType("")

    // Set a new target item
    if (getRandomItem) {
      const randomItem = getRandomItem()
      setTargetItem(randomItem)
      if (resetTimer) resetTimer()
      setTimerActive(true)
      setStartTime(Date.now())
    }
  }, [getRandomItem, resetTimer])

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
            League of Legends Item Quiz
          </h1>
          <p className="text-zinc-400">Guess the item name from its description!</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Game Info */}
          <GameHeader
            currentStreak={currentStreak}
            longestStreak={longestStreak}
            timeLeft={timeLeft}
            message={message}
            messageType={messageType}
            revealAnswer={revealAnswer}
            targetItemName={targetItem?.name}
            targetItemImage={targetItem?.image.full}
            version={version}
            onReset={handleReset}
          />

          {/* Item Display */}
          <div className="md:col-span-2">
            <ItemDisplay loading={loading} targetItem={targetItem} revealAnswer={revealAnswer} version={version} />
          </div>

          {/* Search Section */}
          <div className="md:col-span-1">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-zinc-200">Game Settings</h3>
                <TimeSelector currentTime={timeLimit} onTimeChange={handleTimeChange} />
              </div>
              <SearchInput items={items} version={version} onSubmit={handleSubmit} onSkip={handleSkip} />
            </div>
          </div>
        </div>

        {/* History Section - Always visible at the bottom */}
        <div className="mt-8">
          <GuessHistory guessHistory={guessHistory} version={version} />
        </div>

        <Footer version={version} />
      </div>
    </div>
  )
}
