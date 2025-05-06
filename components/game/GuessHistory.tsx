import { Clock } from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { GuessRecord } from "@/types"

interface GuessHistoryProps {
  guessHistory: GuessRecord[]
  version: string
}

export function GuessHistory({ guessHistory, version }: GuessHistoryProps) {
  return (
    <Card className="bg-zinc-800 border-zinc-700 text-zinc-100 shadow-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
      <CardHeader className="pb-2">
        <CardTitle>Guess History</CardTitle>
        <CardDescription className="text-zinc-400">Your recent guesses</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          {guessHistory.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {guessHistory.map((record, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-md border transition-all duration-300 ${
                    record.correct
                      ? "bg-green-900/20 border-green-800/30 hover:shadow-[0_0_8px_rgba(34,197,94,0.2)]"
                      : "bg-red-900/20 border-red-800/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {version && (
                      <Image
                        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${record.itemId}.png`}
                        alt={record.itemName}
                        width={32}
                        height={32}
                        className="rounded border border-zinc-600"
                      />
                    )}
                    <div className="flex-1">
                      <div className="font-medium">{record.itemName}</div>
                      <div className="text-xs text-zinc-400 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {record.timeSpent.toFixed(2).replace(".", ",")}s
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        record.correct
                          ? "bg-green-900/30 text-green-300 border-green-800"
                          : "bg-red-900/30 text-red-300 border-red-800"
                      }
                    >
                      {record.correct ? "Correct" : "Wrong"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[200px] text-zinc-500">
              <p>No guess history yet. Start guessing items!</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
