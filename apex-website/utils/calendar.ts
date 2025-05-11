/**
 * Utility function to generate Google Calendar event links
 */
export function generateGoogleCalendarLink(event: {
  title: string
  startDate: string
  endDate?: string
  startTime?: string
  endTime?: string
  location?: string
  description?: string
  isAllDay?: boolean
}): string {
  // Format the dates and times for Google Calendar
  const formattedStartDate = formatDateForGoogleCalendar(event.startDate)
  let formattedEndDate = event.endDate ? formatDateForGoogleCalendar(event.endDate) : formattedStartDate

  // For all-day events, we need to add 1 day to the end date
  if (event.isAllDay && !event.endDate) {
    // Create a date from the formatted date string
    const endDate = new Date(
      Number.parseInt(formattedEndDate.substring(0, 4)),
      Number.parseInt(formattedEndDate.substring(4, 6)) - 1,
      Number.parseInt(formattedEndDate.substring(6, 8)) + 1,
    )
    formattedEndDate = formatDateToString(endDate)
  }

  // Build the dates string for Google Calendar
  let dateTimeString = ""

  // If it's an all-day event, use date-only format
  if (event.isAllDay) {
    dateTimeString = `${formattedStartDate}/${formattedEndDate}`
  } else {
    // Format times if provided
    let formattedStartTime = ""
    let formattedEndTime = ""

    if (event.startTime && event.startTime !== "Various Times") {
      formattedStartTime = formatTimeForGoogleCalendar(event.startTime)
    }

    if (event.endTime && event.endTime !== "Various Times") {
      formattedEndTime = formatTimeForGoogleCalendar(event.endTime)
    } else if (event.startTime && !event.endTime && event.startTime !== "Various Times") {
      // If only start time is provided, set end time to 1 hour later
      const startTimeDate = parseTimeToDate(event.startTime)
      startTimeDate.setHours(startTimeDate.getHours() + 1)
      formattedEndTime = formatTimeToString(startTimeDate)
    }

    // If we have times, include them in the format
    if (formattedStartTime && formattedEndTime) {
      dateTimeString = `${formattedStartDate}T${formattedStartTime}/${formattedEndDate}T${formattedEndTime}`
    } else {
      // All-day event format
      dateTimeString = `${formattedStartDate}/${formattedEndDate}`
    }
  }

  // Build the Google Calendar URL
  let googleCalendarUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE"

  // Add event title
  googleCalendarUrl += `&text=${encodeURIComponent(event.title)}`

  // Add dates
  googleCalendarUrl += `&dates=${encodeURIComponent(dateTimeString)}`

  // Add location if provided
  if (event.location) {
    googleCalendarUrl += `&location=${encodeURIComponent(event.location)}`
  }

  // Add description if provided
  if (event.description) {
    googleCalendarUrl += `&details=${encodeURIComponent(event.description)}`
  }

  return googleCalendarUrl
}

/**
 * Format date string to YYYYMMDD format for Google Calendar
 */
function formatDateForGoogleCalendar(dateString: string): string {
  // Handle date ranges like "September 15-17, 2023"
  if (dateString.includes("-") && !dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return parseComplexDate(dateString)
  }

  // If it's already in YYYY-MM-DD format
  if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return dateString.replace(/-/g, "")
  }

  // Parse dates like "Thursday January 16, 2025" or "Monday January 27, 2025"
  const date = new Date(dateString)
  if (!isNaN(date.getTime())) {
    return formatDateToString(date)
  }

  // Try to parse with more specific handling
  return parseComplexDate(dateString)
}

/**
 * Parse complex date formats like "Thursday January 16, 2025" or date ranges
 */
function parseComplexDate(dateString: string): string {
  // For date ranges like "Friday, January 31, 2025 - Sunday, February 2, 2025"
  if (dateString.includes(" - ")) {
    const [startDateStr] = dateString.split(" - ")
    const date = new Date(startDateStr)
    if (!isNaN(date.getTime())) {
      return formatDateToString(date)
    }
  }

  // For dates like "Thursday January 16, 2025"
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ]

  // Remove day of week if present
  const cleanDateString = dateString.replace(/^(monday|tuesday|wednesday|thursday|friday|saturday|sunday),?\s+/i, "")

  // Extract month, day, and year
  let month = -1
  let day = -1
  let year = new Date().getFullYear()

  // Find the month
  for (let i = 0; i < months.length; i++) {
    if (cleanDateString.toLowerCase().includes(months[i])) {
      month = i + 1
      break
    }
  }

  // Extract day and year using regex
  const dayMatch = cleanDateString.match(/\b(\d{1,2})(st|nd|rd|th)?,?\s+/i)
  if (dayMatch) {
    day = Number.parseInt(dayMatch[1])
  }

  const yearMatch = cleanDateString.match(/\b(20\d{2})\b/)
  if (yearMatch) {
    year = Number.parseInt(yearMatch[1])
  }

  if (month > 0 && day > 0) {
    return `${year}${month.toString().padStart(2, "0")}${day.toString().padStart(2, "0")}`
  }

  // Fallback to current date if parsing fails
  const today = new Date()
  return formatDateToString(today)
}

/**
 * Format a Date object to YYYYMMDD string
 */
function formatDateToString(date: Date): string {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  return `${year}${month}${day}`
}

/**
 * Format time string to HHMMSS format for Google Calendar
 */
function formatTimeForGoogleCalendar(timeString: string): string {
  const date = parseTimeToDate(timeString)
  return formatTimeToString(date)
}

/**
 * Parse time string to Date object
 */
function parseTimeToDate(timeString: string): Date {
  const date = new Date()
  date.setHours(0, 0, 0, 0) // Reset to start of day

  // Handle time ranges like "6:00 PM - 8:00 PM"
  if (timeString.includes("-")) {
    timeString = timeString.split("-")[0].trim()
  }

  // Extract hours, minutes, and AM/PM
  const timeMatch = timeString.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i)

  if (timeMatch) {
    let hours = Number.parseInt(timeMatch[1])
    const minutes = Number.parseInt(timeMatch[2])
    const period = timeMatch[3] ? timeMatch[3].toUpperCase() : null

    // Convert to 24-hour format
    if (period === "PM" && hours < 12) {
      hours += 12
    } else if (period === "AM" && hours === 12) {
      hours = 0
    }

    date.setHours(hours, minutes, 0, 0)
  }

  return date
}

/**
 * Format Date object to HHMMSS string
 */
function formatTimeToString(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  return `${hours}${minutes}00`
}

/**
 * Helper function to parse event date strings in various formats
 * This is used by the join page to get a standardized date format
 */
export function parseEventDate(dateString: string): string {
  // Handle date ranges like "September 15-17, 2023"
  if (dateString.includes("-") && !dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const parts = dateString.split("-")
    if (parts.length === 2) {
      // This is a date range within the same month
      const year = dateString.match(/\d{4}/) ? dateString.match(/\d{4}/)![0] : new Date().getFullYear().toString()
      const month = getMonthNumber(parts[0].trim().split(" ")[0])
      const startDay = parts[0].trim().split(" ")[1].replace(",", "")
      const endDay = parts[1].trim().split(" ")[0].replace(",", "")

      // Return the start date
      return `${year}-${month.toString().padStart(2, "0")}-${startDay.padStart(2, "0")}`
    }
  }

  // Handle standard date formats like "September 5, 2023"
  const dateParts = dateString.split(" ")
  if (dateParts.length >= 2) {
    const month = getMonthNumber(dateParts[0])
    const day = dateParts[1].replace(",", "")
    const year = dateParts[2] || new Date().getFullYear().toString()

    return `${year}-${month.toString().padStart(2, "0")}-${day.padStart(2, "0")}`
  }

  // If we can't parse it, return today's date
  const today = new Date()
  return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`
}

/**
 * Helper function to convert month name to number
 */
function getMonthNumber(monthName: string): number {
  const months: Record<string, number> = {
    january: 1,
    february: 2,
    march: 3,
    april: 4,
    may: 5,
    june: 6,
    july: 7,
    august: 8,
    september: 9,
    october: 10,
    november: 11,
    december: 12,
  }

  return months[monthName.toLowerCase()] || 1
}

/**
 * Helper function to parse time strings
 */
export function parseEventTime(timeString: string): { startTime: string; endTime: string } {
  // Handle time ranges like "6:00 PM - 8:00 PM"
  if (timeString.includes("-")) {
    const [start, end] = timeString.split("-").map((t) => t.trim())
    return {
      startTime: start,
      endTime: end,
    }
  }

  // Handle single times like "12:00 PM"
  return {
    startTime: timeString,
    endTime: calculateEndTime(timeString),
  }
}

/**
 * Helper function to calculate an end time (1 hour after start time)
 */
function calculateEndTime(startTimeString: string): string {
  // Parse the time string
  const timeMatch = startTimeString.match(/(\d+):(\d+)\s*([AP]M)?/i)
  if (!timeMatch) return startTimeString

  let hours = Number.parseInt(timeMatch[1])
  const minutes = Number.parseInt(timeMatch[2])
  const period = timeMatch[3] ? timeMatch[3].toUpperCase() : "AM"

  // Convert to 24-hour format
  if (period === "PM" && hours < 12) hours += 12
  if (period === "AM" && hours === 12) hours = 0

  // Add 1 hour
  hours = (hours + 1) % 24

  // Convert back to 12-hour format
  const newPeriod = hours >= 12 ? "PM" : "AM"
  const newHours = hours % 12 || 12

  return `${newHours}:${minutes.toString().padStart(2, "0")} ${newPeriod}`
}
