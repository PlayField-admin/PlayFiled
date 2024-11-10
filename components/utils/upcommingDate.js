function getUpcomingDays() {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    const result = [];
    
    // Start from today
    const today = new Date();
    
    for (let i = 0; i < 5; i++) {
      const futureDate = new Date(today); // Clone the current date
      futureDate.setDate(today.getDate() + i); // Add i days to today
      
      const day = futureDate.getDate(); // Day of the month
      const month = monthsOfYear[futureDate.getMonth()]; // Month name
      const weekday = daysOfWeek[futureDate.getDay()]; // Day of the week
      
      result.push({
        month,
        date: day,
        day: weekday
      });
    }
    
    return result;
  }
  
export {
    getUpcomingDays
}