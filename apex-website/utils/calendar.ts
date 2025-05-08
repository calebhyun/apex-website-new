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
  }): string {
    // Format the dates and times for Google Calendar
    let dateTimeString = ""
  
    if (event.startDate) {
      // Format: YYYYMMDD
      const formattedStartDate = event.startDate.replace(/[-/]/g, "")
  
      if (event.startTime) {
        // If we have a start time, format as YYYYMMDDTHHMMSS
        const formattedStartTime = event.startTime.replace(/:/g, "").replace(/\s/g, "").replace(/[APM]/gi, "")
        dateTimeString += `${formattedStartDate}T${formattedStartTime}00`
      } else {
        // If no time, just use the date
        dateTimeString += formattedStartDate
      }
    }
  
    dateTimeString += "/"
  
    if (event.endDate) {
      // Format: YYYYMMDD
      const formattedEndDate = event.endDate.replace(/[-/]/g, "")
  
      if (event.endTime) {
        // If we have an end time, format as YYYYMMDDTHHMMSS
        const formattedEndTime = event.endTime.replace(/:/g, "").replace(/\s/g, "").replace(/[APM]/gi, "")
        dateTimeString += `${formattedEndDate}T${formattedEndTime}00`
      } else {
        // If no time, just use the date
        dateTimeString += formattedEndDate
      }
    } else if (event.startDate && event.endTime && event.startTime) {
      // If no end date but we have start date and both times, use start date with end time
      const formattedStartDate = event.startDate.replace(/[-/]/g, "")
      const formattedEndTime = event.endTime.replace(/:/g, "").replace(/\s/g, "").replace(/[APM]/gi, "")
      dateTimeString += `${formattedStartDate}T${formattedEndTime}00`
    } else if (event.startDate) {
      // If only start date is provided, make the event 1 hour long
      dateTimeString += event.startDate.replace(/[-/]/g, "")
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
   * Helper function to parse date strings in various formats
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
  