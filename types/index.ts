// Types for League of Legends items
export interface ItemStats {
  FlatMovementSpeedMod?: number
  FlatHPPoolMod?: number
  FlatMPPoolMod?: number
  PercentAttackSpeedMod?: number
  FlatArmorMod?: number
  FlatPhysicalDamageMod?: number
  FlatMagicDamageMod?: number
  FlatSpellBlockMod?: number
  PercentLifeStealMod?: number
  [key: string]: number | undefined
}

export interface Item {
  id: string
  name: string
  description: string
  plaintext: string
  gold: {
    base: number
    total: number
    sell: number
    purchasable: boolean
  }
  image: {
    full: string
  }
  stats: ItemStats
  tags: string[]
}

export interface ItemsData {
  data: {
    [key: string]: Item
  }
}

export interface GuessRecord {
  itemName: string
  itemId: string
  correct: boolean
  timeSpent: number
}

export type MessageType = "success" | "error" | ""
