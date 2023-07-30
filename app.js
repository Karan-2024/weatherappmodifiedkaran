// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
// here weatherApi is a object which has apikey and baseurl as its properties .
const weatherApi= {

    key: "bab281d79e5f1e9755a68d754cc313e7" ,  //api key 
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

//here we have taken the input value in input box
const searchInputBox = document.getElementById('input-box');

//Event Listener function on keypress
//keypress is for pressing any key
// here this eventlistener will get executed until enter key is pressed after writing 
   // the full name of city  if enter key is pressed then inside searchInputBox city name is stored.
   // then is else part we will use getWeatherReport to send the city name to get city weather report 

searchInputBox.addEventListener('keypress', (event) => {
     
    if(event.keyCode == 13){    // event.keycode ==13 means if event is enter key. 
    console.log(searchInputBox.value);
    //calling getweather report by sending the city name to it .
    getWeatherReport(searchInputBox.value);
    document.querySelector('.weather-body').style.display = "block";
    //once city name is entered then weather body gets displayed .
    }

});

//a function from where we can Get weather reports
// here we are use fetch function to get weather reports from weather website .
// so we  will base url and api key inside fetch function
function getWeatherReport(city)
{
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    // here we used &units=metric so  it means by default in weather object temperature is 
       //in kelvin so to convert into celcius we have written this .
    // weatherApi.baseUrl is the base url and weatherApi.key is the api key 
    // appid is the api key 
    // this statement for api calling  so will pass url to this fetch function.
    .then(weather => {
        return weather.json();
        // returing weather in json format .
        //then call the showWeatherReport to show weather report.
        // we recieve data in the form json format
    }).then(showWeatherReport);
}

// a function to show weather reports in html after getting the reports from getweather reports.
// weather is the object which has all the values like pressure , min  and max temperature etc .
function showWeatherReport(weather){
    // weather is a json object 
   console.log(weather);
   // for city 
   // this Intl.DisplayNames means that we can convert the country code into country name. 
   const regionNames = new Intl.DisplayNames(
    ['en'], {type: 'region'}
  );
   let city =document.getElementById('city');
   let country=document.getElementById('country');
   city.innerHTML =`${weather.name}, ${regionNames.of(weather.sys.country)}`;
   
   
 
    // for temperature
   let temperature =document.getElementById('temp');
   temperature.innerHTML =`${Math.round(weather.main.temp)}&deg;C`;

    // for calculating min and max temperature 
   let minMaxTemp =document.getElementById('min-max');
   minMaxTemp.innerHTML =`${Math.floor(weather.main.temp_min)}&deg;C (min)  /  ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

   // for calculating weather type like clouds or sunny or haze etc
   let weatherType =document.getElementById('weather');
   weatherType.innerHTML =`${weather.weather[0].main}`;

      // for calculating humidity percentage
   let humiditydetails= document.getElementById('humidity');
   humiditydetails.innerHTML =`Humidity : ${weather.main.humidity} %`;

    //   for calculating wind details in km/hr 
   let winddetails=document.getElementById('wind');
   winddetails.innerHTML =`Wind : ${weather.wind.speed} Km/hr`;

     
    let date =document.getElementById('date');
    let todayDate =new Date(); // This line will provide us everything like date , time , month and year .
    date.innerHTML =dateManage(todayDate); // sending whole value to dateManage function so that we can separately fill the values in different variables like month, year , day 
    // etc 

    
    if(weatherType.innerHTML == 'Clear')
    {
        document.body.style.backgroundImage = "url('clear1.jpg')";

    }
    
    else if(weatherType.innerHTML == 'Clouds')
    {
        document.body.style.backgroundImage = "url('cloudy.jpg')";

    }
    
    else if(weatherType.innerHTML == 'Sunny')
    {
        document.body.style.backgroundImage = "url('sunny.jpg')";

    }
    
    else if(weatherType.innerHTML == 'Haze')
    {
        document.body.style.backgroundImage = "url('hazenew1.jpg')";

    }

    else if(weatherType.innerHTML == 'Thunderstorm')
    {
        document.body.style.backgroundImage = "url('thunderstorm.jpg')";

    }
    
    else if(weatherType.innerHTML == 'Rain')
    {
        document.body.style.backgroundImage = "url('rain.jpg')";

    }
    
    else if(weatherType.innerHTML == 'Snow')
    {
        document.body.style.backgroundImage = "url('snow.jpg')";

    }
    
    else if(weatherType.innerHTML == 'Drizzle')
    {
        document.body.style.backgroundImage = "url('drizzle.jpg')";

    }

    else if(weatherType.innerHTML == 'Mist')
    {
        document.body.style.backgroundImage = "url('mist3.avif')";

    }
    


}


// function to  manage  date  , day, month and year 
function dateManage(dateArg)
{
  let days =["Sunday", "Monday" , "Tuesday" , "Wednesday", "Thrusday", "Friday","Saturday"];
  let months = ["January", "February", "March" , "April" ,"May", "June", "July","August",
               "September", "October","November", "December"];

               let year=dateArg.getFullYear();// to get full year
               let month=months[dateArg.getMonth()];   // here getMonth() give values in number thatswahy taken an array
               let date= dateArg.getDate();         // It will provide date 
               let day =days[dateArg.getDay()];     //here getDay() give values in number thatswahy taken an array
 
               return `${date}   ${month}   (${day}),   ${year}`;  // display current date , day , month , year 
}




