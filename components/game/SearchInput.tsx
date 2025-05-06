"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { X, ArrowRight, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Item } from "@/types"

interface SearchInputProps {
  items: Item[]
  version: string
  onSubmit: (item: Item) => void
  onSkip: () => void
}

export function SearchInput({ items, version, onSubmit, onSkip }: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredItems, setFilteredItems] = useState<Item[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Filter items based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredItems([])
      return
    }

    // Convert search term to lowercase and remove duplicates
    const searchChars = Array.from(new Set(searchTerm.toLowerCase().split("")))

    // Filter items that contain all the characters in the search term
    const filtered = items
      .filter((item) => {
        const itemNameLower = item.name.toLowerCase()
        return searchChars.every((char) => itemNameLower.includes(char))
      })
      .slice(0, 8) // Limit to 8 results for better UX

    setFilteredItems(filtered)
  }, [searchTerm, items])

  // Handle click outside of search dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setShowDropdown(true)
  }

  // Handle item selection from dropdown
  const handleSelectItem = (item: Item) => {
    setSearchTerm(item.name)
    setShowDropdown(false)
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Try to find the item by name
    const foundItem = items.find((item) => item.name.toLowerCase() === searchTerm.toLowerCase())

    if (foundItem) {
      onSubmit(foundItem)
      setSearchTerm("")
    } else {
      // Error handling is done in the parent component
    }
  }

  return (
    <Card className="bg-zinc-800 border-zinc-700 text-zinc-100 h-full shadow-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)]">
      <CardHeader className="pb-2">
        <CardTitle>Guess the Item</CardTitle>
        <CardDescription className="text-zinc-400">Type or select the name of the item</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div ref={searchRef} className="relative">
            <div className="flex">
              <Input
                type="text"
                placeholder="Type item name..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setShowDropdown(true)}
                className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
              />
              {searchTerm && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-10 top-0 text-zinc-400 hover:text-zinc-200 transition-colors duration-300"
                  onClick={() => {
                    setSearchTerm("")
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              <Button
                type="submit"
                size="icon"
                className="ml-2 bg-purple-700 hover:bg-purple-600 transition-colors duration-300 shadow-md hover:shadow-[0_0_10px_rgba(124,58,237,0.3)]"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {showDropdown && filteredItems.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-zinc-900 border border-zinc-700 rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 p-2 hover:bg-purple-900/30 cursor-pointer transition-colors duration-200"
                    onClick={() => handleSelectItem(item)}
                  >
                    {version && (
                      <Image
                        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`}
                        alt={item.name}
                        width={24}
                        height={24}
                        className="rounded"
                      />
                    )}
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              type="submit"
              className="bg-green-700 hover:bg-green-600 transition-colors duration-300 shadow-md hover:shadow-[0_0_10px_rgba(34,197,94,0.3)]"
            >
              Submit
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-orange-700 text-orange-300 bg-orange-900/30 hover:bg-orange-800/50 transition-colors duration-300"
              onClick={onSkip}
            >
              <SkipForward className="h-4 w-4 mr-2" />
              Skip
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="text-xs text-zinc-500 pt-0">
        You have 15 seconds to guess each item. Skipping or incorrect answers will reset your streak.
      </CardFooter>
    </Card>
  )
}
