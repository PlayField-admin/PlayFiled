function getUpcomingDays(today ) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    const result = [];
    
    // Start from today
    // const today = new Date();
    
    for (let i = 0; i < 5; i++) {
      const futureDate = new Date(today); // Clone the current date
      futureDate.setDate(today.getDate() + i); // Add i days to today
      
      const day = futureDate.getDate(); // Day of the month
      const month = monthsOfYear[futureDate.getMonth()]; // Month name
      const weekday = daysOfWeek[futureDate.getDay()]; // Day of the week
      
      result.push({
        month,
        date: day,
        day: weekday,
        dateFormat:futureDate
      });
    }
    
    return result;
  }
  function formatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    // Convert 24-hour time to 12-hour format and determine AM/PM
    const period = hours >= 12 ? 'PM' : 'AM';
    const hourIn12Format = hours % 12 || 12; // Convert 0 to 12 for midnight
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Pad minutes with leading zero if needed
  
    // Format time as hh:mm AM/PM
    return `${hourIn12Format.toString().padStart(2, '0')}:${formattedMinutes} ${period}`;
  }
  
  
export {
    getUpcomingDays,
    formatTime
}