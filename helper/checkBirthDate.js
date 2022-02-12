
function checkUpcomingBirthDay(user){
  if(user.dob){
    const actual_birthdate_array = user.dob.split("-")
    actual_birthdate_array[0] = new Date().getFullYear();
    const this_year_birthdate = actual_birthdate_array.join("-")
    var unixtime = Date.parse(this_year_birthdate);
    
    const time_differance_in_ms = unixtime - Date.now()
    const time_difference_in_day = time_differance_in_ms/(1000*60*60*24)
    
    return ( time_difference_in_day < 3 && time_difference_in_day >0 ) ? true : false;
  }
}

module.exports= checkUpcomingBirthDay