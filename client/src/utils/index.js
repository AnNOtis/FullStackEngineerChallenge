import { format } from 'date-fns'

export function formatDate(dateString) {
  return format(new Date(dateString), 'yyyy-MM-dd')
}

export function getIsoByDate(date) {
  if (!date) return date

  return new Date(date).toISOString()
}
