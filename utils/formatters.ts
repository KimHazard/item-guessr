/**
 * Formats the timer display with 2 decimal places and a comma separator
 * @param timeInMs Time in milliseconds
 * @returns Formatted time string (e.g., "14,62")
 */
export function formatTimer(timeInMs: number): string {
  const seconds = timeInMs / 1000
  return seconds.toFixed(2).replace(".", ",")
}

/**
 * Returns the appropriate color class for the timer based on time left
 * @param timeInMs Time in milliseconds
 * @returns Tailwind color class
 */
export function getTimerColor(timeInMs: number): string {
  const seconds = timeInMs / 1000
  if (seconds > 10) return "text-green-400"
  if (seconds > 7) return "text-yellow-400"
  if (seconds > 4) return "text-orange-400"
  if (seconds > 2) return "text-red-400"
  return "text-red-600"
}

/**
 * Cleans HTML tags from item descriptions
 * @param description Raw description with HTML tags
 * @returns Cleaned description
 */
export function cleanDescription(description: string): string {
  return description
    .replace(/<br>/g, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
}
