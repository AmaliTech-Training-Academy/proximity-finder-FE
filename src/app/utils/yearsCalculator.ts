export const getBusinessYears = (inceptionDateString: string) => {
    const inceptionDate = new Date(inceptionDateString)
    const currentDate = new Date()
  
    const years = currentDate.getFullYear() - inceptionDate.getFullYear()
    const months = currentDate.getMonth() - inceptionDate.getMonth() + (years * 12)
    
    const monthsInBusiness = months % 12
    const totalYears = Math.floor(months / 12)
  
    if (totalYears === 0) {
      return `${monthsInBusiness} month${monthsInBusiness !== 1 ? 's' : ''} in business`;
    }
    
    if (totalYears === 1 && monthsInBusiness === 0) {
      return `1 year in business`;
    }
  
    return `${totalYears} year${totalYears > 1 ? 's' : ''}${monthsInBusiness > 0 ? `, ${monthsInBusiness} month${monthsInBusiness !== 1 ? 's' : ''}` : ''} in business`;
  }