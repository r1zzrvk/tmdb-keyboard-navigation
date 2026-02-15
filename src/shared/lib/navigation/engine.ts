import type { NavigationEngineConfig, NavigationState, ZoneId, NavigationItem, NavigationItemId, NavigationArrowKey } from './model/types'

/**
 * Create navigation engine
 * @param config - Configuration of the engine: number of columns in zones and onZoneEscape handler
 * @returns Object with methods for managing navigation and current state
 */

// eslint-disable-next-line max-lines-per-function
export function createNavEngine(config: NavigationEngineConfig) {
  const itemsByZone = new Map<ZoneId, NavigationItem<HTMLElement>[]>()
  const lastActiveByZone = new Map<ZoneId, NavigationItemId>()

  const state: NavigationState = {
    activeZoneId: 'grid',
    activeItemId: undefined,
  }

  /**
   * Check if navigation item is enabled
   * @param item - Navigation item to check
   * @returns true if item is enabled, false if disabled
   */
  function isItemEnabled(item: NavigationItem<HTMLElement>): boolean {
    const element = item.ref.current
    if (!element) return false

    // Check disabled attribute for button and input elements
    if (element instanceof HTMLButtonElement || element instanceof HTMLInputElement) {
      return !element.disabled
    }

    // For other elements, check aria-disabled or disabled attribute
    return !element.hasAttribute('disabled') && element.getAttribute('aria-disabled') !== 'true'
  }

  /**
   * Filter out disabled items from a list
   * @param items - List of navigation items
   * @returns List of enabled items only
   */
  function getEnabledItems(items: NavigationItem<HTMLElement>[]): NavigationItem<HTMLElement>[] {
    return items.filter(isItemEnabled)
  }

  /**
   * Register new navigation item or update existing one
   * Items are automatically sorted by order field
   * @param item - Navigation item with zone, order and ref to DOM element
   */
  function register<T extends HTMLElement>(item: NavigationItem<T>) {
    const list = itemsByZone.get(item.zoneId) ?? []

    const next = [...list
      .filter((existingItem) => existingItem.id !== item.id), item]
      .sort((a, b) => a.order - b.order)

    itemsByZone.set(item.zoneId, next)
  }

  /**
   * Unregister navigation item
   * If the deleted item was active, reset the active item
   * @param zoneId - ID of the zone from which the item is being removed
   * @param id - ID of the item being removed
   */
  function unregister(zoneId: ZoneId, id: NavigationItemId) {
    const list = itemsByZone.get(zoneId) ?? []

    itemsByZone.set(
      zoneId,
      list.filter((item) => item.id !== id),
    )

    if (state.activeItemId === id) {
      return state.activeItemId = undefined
    }
  }

  /**
   * Focus on the specified zone and item inside it
   * @param zoneId - ID of the zone to focus on
   * @param itemId - Optional ID of the item to focus on
   */
  function focus(zoneId: ZoneId, itemId?: NavigationItemId) {
    state.activeZoneId = zoneId

    const list = itemsByZone.get(zoneId) ?? []
    const enabledList = getEnabledItems(list)

    if (!enabledList.length) {
      return
    }

    const targetId = itemId ?? lastActiveByZone.get(zoneId)
    let target: NavigationItem<HTMLElement> | undefined

    if (targetId) {
      target = enabledList.find((item) => item.id === targetId)
    }

    if (!target) {
      target = enabledList[0]
    }

    state.activeItemId = target.id
    lastActiveByZone.set(zoneId, target.id)

    // Focus and scroll the target element into view
    if (target.ref.current) {
      target.ref.current.focus()
      target.ref.current.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    }
  }

  /**
   * Get the current active navigation item
   * @returns Active item or undefined if there is no active item
   */
  function getActiveItem() {
    const list = itemsByZone.get(state.activeZoneId) ?? []
    const item = list.find((item) => item.id === state.activeItemId)

    // If active item is disabled, try to find first enabled item
    if (item && !isItemEnabled(item)) {
      const enabledList = getEnabledItems(list)
      return enabledList[0]
    }

    return item
  }

  /**
   * Move the focus by the specified number of positions relative to the current item
   * @param delta - Offset: positive number - right/down, negative number - left/up
   * @returns true if movement was successful, false if we should switch zones
   */
  function moveDelta(delta: number): boolean {
    const list = itemsByZone.get(state.activeZoneId) ?? []
    const enabledList = getEnabledItems(list)

    if (!enabledList.length) {
      return false
    }

    // Find current item index in enabled list, or use 0 if not found
    let index = enabledList.findIndex((item) => item.id === state.activeItemId)
    if (index === -1) {
      index = 0
      state.activeItemId = enabledList[0].id
    }

    const nextIndex = index + delta

    // If we're trying to move beyond boundaries, return false to allow zone switching
    if (nextIndex < 0 || nextIndex >= enabledList.length) {
      return false
    }

    const nextItem = enabledList[nextIndex]

    state.activeItemId = nextItem.id
    lastActiveByZone.set(state.activeZoneId, nextItem.id)

    // Focus and scroll the next item into view
    if (nextItem.ref.current) {
      nextItem.ref.current.focus()
      nextItem.ref.current.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    }

    return true
  }

  /**
   * Get next zone in vertical order
   */
  function getNextZone(direction: 'up' | 'down'): ZoneId | null {
    const zoneOrder: ZoneId[] = ['search', 'filters', 'grid', 'pagination']
    const currentIndex = zoneOrder.indexOf(state.activeZoneId)

    if (currentIndex === -1) return null

    if (direction === 'down') {
      return zoneOrder[currentIndex + 1] ?? null
    }
    return zoneOrder[currentIndex - 1] ?? null
  }

  /**
   * Handle arrow key presses for moving between items
   * For vertical arrows considers the number of columns in the zone
   * to move line by line, and switches zones when at boundaries
   * @param key - Pressed arrow key
   */
  function moveArrow(key: NavigationArrowKey) {
    const cols = config.columnsByZone?.[state.activeZoneId] ?? 1

    // Move left: 1 position back
    if (key === 'ArrowLeft') {
      const moved = moveDelta(-1)
      if (!moved) {
        // At the beginning, try to switch to previous zone
        const prevZone = getNextZone('up')
        if (prevZone) {
          const list = itemsByZone.get(prevZone) ?? []
          const enabledList = getEnabledItems(list)
          if (enabledList.length > 0) {
            // Move to last item in previous zone
            const lastItem = enabledList[enabledList.length - 1]
            focus(prevZone, lastItem.id)
          }
        }
      }
      return
    }

    // Move right: 1 position forward
    if (key === 'ArrowRight') {
      const moved = moveDelta(1)
      if (!moved) {
        // At the end, try to switch to next zone
        const nextZone = getNextZone('down')
        if (nextZone) {
          focus(nextZone)
        }
      }
      return
    }

    // Move up: number of columns back (previous line)
    if (key === 'ArrowUp') {
      const moved = moveDelta(-cols)
      if (!moved) {
        // At the top, switch to previous zone
        const prevZone = getNextZone('up')
        if (prevZone) {
          focus(prevZone)
        }
      }
      return
    }

    // Move down: number of columns forward (next line)
    if (key === 'ArrowDown') {
      const moved = moveDelta(cols)
      if (!moved) {
        // At the bottom, switch to next zone
        const nextZone = getNextZone('down')
        if (nextZone) {
          focus(nextZone)
        }
      }
      return
    }
  }

  /**
   * Handle Enter key press on the active item
   */
  function enter() {
    const item = getActiveItem()

    // Don't execute onEnter if item is disabled
    if (item && isItemEnabled(item)) {
      item.onEnter?.()
    }
  }

  /**
   * Handle Escape key press
   * @returns Result of onEscape item execution, if it was called
   */
  function escape() {
    const item = getActiveItem()

    if (item?.onEscape) {
      return item.onEscape()
    }

    return config.onZoneEscape?.(state.activeZoneId)
  }

  return { register, unregister, focus, moveArrow, enter, escape, state }
}
