/**
 * Creates a rate limiter with a sliding window algorithm.
 * Limits the number of requests to max within a time window of perMs.
 *
 * @param max - Maximum number of requests in the window
 * @param perMs - Size of the time window in milliseconds
 * @returns A function waitTurn(), which blocks execution until a slot becomes available
 */
export function createSlidingWindowRateLimiter(max: number, perMs: number) {

  const timestamps: number[] = []

  return async function waitTurn() {
    const now = Date.now()

    // Сleanup
    while (timestamps.length && timestamps[0] <= now - perMs) timestamps.shift()

    // If there are free slots in the window, add the current request and allow execution
    if (timestamps.length < max) {
      timestamps.push(now)
      return
    }

    // Limit reached: calculate the time until the oldest slot is released
    const oldest = timestamps[0]
    // Waiting time = when the oldest slot is released - current time
    const waitMs = Math.max(0, oldest + perMs - now)

    // Wait for the slot to be released
    await new Promise(r => setTimeout(r, waitMs))

    // Check availability again
    return waitTurn()
  }
}
