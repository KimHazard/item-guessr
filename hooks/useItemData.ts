"use client"

import { useState, useEffect, useCallback } from "react"
import type { Item, ItemsData } from "@/types"

export function useItemData() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [version, setVersion] = useState("")
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the latest version
        const versionsResponse = await fetch("https://ddragon.leagueoflegends.com/api/versions.json")
        const versions = await versionsResponse.json()
        const latestVersion = versions[0]
        setVersion(latestVersion)

        // Get the items data
        const itemsResponse = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/item.json`,
        )
        const itemsData: ItemsData = await itemsResponse.json()

        // Convert items object to array and filter out non-purchasable items
        const itemsArray = Object.values(itemsData.data).filter(
          (item) =>
            item.gold.purchasable &&
            item.gold.total >= 1000 &&
            !item.description.includes("Consumable") &&
            !item.tags.includes("Consumable") &&
            !item.tags.includes("Trinket"),
        )
        setItems(itemsArray)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setError(error instanceof Error ? error : new Error("Unknown error occurred"))
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Use useCallback to ensure stable function reference
  const getRandomItem = useCallback((): Item | null => {
    if (items.length === 0) return null
    return items[Math.floor(Math.random() * items.length)]
  }, [items])

  return {
    items,
    loading,
    version,
    error,
    getRandomItem,
  }
}
