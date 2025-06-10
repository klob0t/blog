export const formatDate = (dateString: string) => {
   const date = new Date(dateString)

   const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
   ]
   const dayOfWeek = days[date.getDay()]

   const dayOfMonth = date.getDate()

   const year = date.getFullYear()

   let ordinal = 'th'
   if (dayOfMonth % 10 === 1 && dayOfMonth !== 11) {
      ordinal = 'st'
   } else if (dayOfMonth % 10 === 2 && dayOfMonth !== 12) {
      ordinal = 'nd'
   } else if (dayOfMonth % 10 === 3 && dayOfMonth !== 13) {
      ordinal = 'rd'
   }

   const month = date.toLocaleDateString('en-US', { month: 'long' })

   return {
      dayOfWeek,
      month, 
      dayOfMonth,
      ordinal,
      year,
   }
}