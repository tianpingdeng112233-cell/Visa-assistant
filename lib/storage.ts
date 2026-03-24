'use client'

const PREFIX = 'visa_assistant_'

export function getItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (raw === null) return defaultValue
    return JSON.parse(raw) as T
  } catch {
    return defaultValue
  }
}

export function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // ignore
  }
}

export function removeItem(key: string): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(PREFIX + key)
}

// Checklist helpers
export function getCheckedItems(listKey: string): Record<string, boolean> {
  return getItem<Record<string, boolean>>(listKey, {})
}

export function setCheckedItem(listKey: string, itemId: string, checked: boolean): void {
  const current = getCheckedItems(listKey)
  current[itemId] = checked
  setItem(listKey, current)
}

// Step completion helpers
export function getStepDone(stepKey: string): boolean {
  return getItem<boolean>(stepKey, false)
}

export function setStepDone(stepKey: string, done: boolean): void {
  setItem(stepKey, done)
}
