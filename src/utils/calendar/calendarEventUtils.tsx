import { uuidv4 } from "@firebase/util"

let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

/**
 * Initial Events
 */
export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr,
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00',
  }
]

/**
 * Random ID Generator
 */
export function createEventId() {
  return uuidv4()
}
