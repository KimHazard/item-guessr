import Image from "next/image"
import type { MessageType } from "@/types"

interface GameMessageProps {
  message: string
  messageType: MessageType
  revealAnswer: boolean
  targetItemName?: string
  targetItemImage?: string
  version: string
}

export function GameMessage({
  message,
  messageType,
  revealAnswer,
  targetItemName,
  targetItemImage,
  version,
}: GameMessageProps) {
  if (!message) return null

  return (
    <div
      className={`p-2 rounded ${
        messageType === "success"
          ? "bg-green-900/30 border border-green-700/50 shadow-[0_0_10px_rgba(34,197,94,0.2)]"
          : "bg-red-900/30 border border-red-700/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
      } mt-2 transition-all duration-300`}
    >
      {message}
      {revealAnswer && targetItemName && targetItemImage && (
        <div className="flex items-center gap-2 mt-1">
          {version && (
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${targetItemImage}`}
              alt={targetItemName}
              width={24}
              height={24}
              className="rounded"
            />
          )}
          <span className="font-bold">{targetItemName}</span>
        </div>
      )}
    </div>
  )
}
