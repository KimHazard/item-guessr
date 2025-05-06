import { HelpCircle } from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import type { Item } from "@/types"
import { cleanDescription } from "@/utils/formatters"

interface ItemDisplayProps {
  loading: boolean
  targetItem: Item | null
  revealAnswer: boolean
  version: string
}

export function ItemDisplay({ loading, targetItem, revealAnswer, version }: ItemDisplayProps) {
  return (
    <Card className="bg-zinc-800 border-zinc-700 text-zinc-100 h-full shadow-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
      <CardHeader className="pb-2">
        <CardTitle>Mystery Item</CardTitle>
        <CardDescription className="text-zinc-400">Guess the name of this item</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-40 bg-zinc-700" />
            <Skeleton className="h-24 w-full bg-zinc-700" />
          </div>
        ) : targetItem ? (
          <div className="space-y-6">
            {/* Item Icon and Tags */}
            <div className="flex gap-4 items-start">
              <div className="relative">
                {revealAnswer ? (
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${targetItem.image.full}`}
                    alt={targetItem.name}
                    width={64}
                    height={64}
                    className="rounded border-2 border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.3)] transition-all duration-500"
                  />
                ) : (
                  <div className="w-16 h-16 rounded flex items-center justify-center bg-zinc-900 border-2 border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.3)] transition-all duration-300">
                    <HelpCircle className="w-10 h-10 text-yellow-500/70" />
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-1.5 py-0.5 rounded shadow-md">
                  {targetItem.gold.total}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  {targetItem.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-700 transition-colors duration-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Item Description */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-zinc-400 mb-2">Description</h4>
              <div className="bg-zinc-900 p-3 rounded-md border border-zinc-700 shadow-inner transition-all duration-300 hover:shadow-[0_0_5px_rgba(124,58,237,0.1)]">
                <p className="text-zinc-300 whitespace-pre-line text-sm">{cleanDescription(targetItem.description)}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 text-zinc-400">
            <p>Loading item data...</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
