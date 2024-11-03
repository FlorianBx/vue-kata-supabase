export const useFormatDate = (date?: string) => {
  if (!date) return { formatedDate: '' }

  const dateObject = new Date(date)
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }

  const formatedDate = new Intl.DateTimeFormat('fr-FR', options).format(dateObject)

  return { formatedDate }
}
