/* eslint-disable @typescript-eslint/strict-boolean-expressions */

export function capitalize (entry?: string): string {
  if (!entry) return ''
  const firstLetter = entry.charAt(0)
  const firstLetterUpperCase = firstLetter.toUpperCase()
  return firstLetterUpperCase + entry.slice(1)
}
