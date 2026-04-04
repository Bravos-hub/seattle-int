export function formatDate(dateString: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString))
}

export function formatShortDate(dateString: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString))
}

export function formatDateTimeRange(start: string, end?: string) {
  const startDate = new Date(start)
  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })

  const dateLabel = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(startDate)

  if (!end) {
    return `${dateLabel} • ${timeFormatter.format(startDate)}`
  }

  return `${dateLabel} • ${timeFormatter.format(startDate)} - ${timeFormatter.format(
    new Date(end),
  )}`
}

export function normalizeSearchValue(value: string) {
  return value.trim().toLowerCase()
}
