export function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

export function formatTime(time: Date): string {
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

export function formatDateForFullCalendar(date: string): string {
    const [day, month, year] = date.split('/')
    const formattedDate = new Date(`${year}-${month}-${day}`)
    return formattedDate.toISOString().split('T')[0]
}

export function formatTimeForFullCalendar(time: string): string {
    return `${time}:00`
}
  