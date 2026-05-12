function calculateAge(){

    const dobInput = document.getElementById("dob").value;
  
    if(dobInput === ""){
      alert("Please select your date of birth");
      return;
    }
  
    const dob = new Date(dobInput);
    const today = new Date();
  
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();
  
    if(days < 0){
      months--;
      const prevMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();
  
      days += prevMonth;
    }
  
    if(months < 0){
      years--;
      months += 12;
    }
  
    // DISPLAY AGE
  
    document.getElementById("years").innerText = years;
    document.getElementById("months").innerText = months;
    document.getElementById("days").innerText = days;
  
    // DAY BORN
  
    const daysArray = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
    document.getElementById("bornDay").innerText =
    daysArray[dob.getDay()];
  
    // ZODIAC
  
    const zodiac = getZodiac(
      dob.getDate(),
      dob.getMonth() + 1
    );
  
    document.getElementById("zodiac").innerText = zodiac;
  
    // NEXT BIRTHDAY
  
    let nextBirthday = new Date(
      today.getFullYear(),
      dob.getMonth(),
      dob.getDate()
    );
  
    if(nextBirthday < today){
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
  
    const diff = nextBirthday - today;
  
    const remainingDays =
    Math.ceil(diff / (1000 * 60 * 60 * 24));
  
    document.getElementById("birthday").innerText =
    remainingDays + " days left";
  
    // SHOW RESULT
  
    document
    .getElementById("resultCard")
    .classList.add("active");
  
  }
  
  // ZODIAC FUNCTION
  
  function getZodiac(day, month){
  
    if((month == 1 && day >= 20) || (month == 2 && day <= 18))
      return "Aquarius";
  
    if((month == 2 && day >= 19) || (month == 3 && day <= 20))
      return "Pisces";
  
    if((month == 3 && day >= 21) || (month == 4 && day <= 19))
      return "Aries";
  
    if((month == 4 && day >= 20) || (month == 5 && day <= 20))
      return "Taurus";
  
    if((month == 5 && day >= 21) || (month == 6 && day <= 20))
      return "Gemini";
  
    if((month == 6 && day >= 21) || (month == 7 && day <= 22))
      return "Cancer";
  
    if((month == 7 && day >= 23) || (month == 8 && day <= 22))
      return "Leo";
  
    if((month == 8 && day >= 23) || (month == 9 && day <= 22))
      return "Virgo";
  
    if((month == 9 && day >= 23) || (month == 10 && day <= 22))
      return "Libra";
  
    if((month == 10 && day >= 23) || (month == 11 && day <= 21))
      return "Scorpio";
  
    if((month == 11 && day >= 22) || (month == 12 && day <= 21))
      return "Sagittarius";
  
    return "Capricorn";
  
  }