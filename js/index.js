// ! HTML Elements
// TODAY
let links = document.querySelectorAll("nav ul li a")
let todayName = document.getElementById("today-date-name")
let todayNum = document.getElementById("today-date-num")
let todayMonth = document.getElementById("today-date-month")
let todayLocation = document.getElementById("location-name")
let todayTemp = document.getElementById("today-temp")
let todayConditionImg = document.getElementById("today-condition-img")
let todayConditionTxt = document.getElementById("today-condition-txt")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDirection = document.getElementById("wind-direction")
// TOMORROW
let tomorrowName =document.getElementsByClassName("next-date-name")
let tomorrowMaxTemp =document.getElementsByClassName("tomorrow-max-temp")
let tomorrowMinTemp =document.getElementsByClassName("tomorrow-min-temp")
let tomorrowConditionImg =document.getElementsByClassName("tomorrow-condition-img")
let tomorrowConditionTxt =document.getElementsByClassName("tomorrow-condition-txt")
// search
let search = document.getElementById("search")


// ! App variables
// ! Function
async function getWeather(cityName){
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=0e6347869a92421e835183502240510&q=${cityName}&days=3`);
    let data = await response.json();
    return data
    
}
// display today weather
function displayTodayweather(weatherdata){
    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString("en-US",{weekday:"long"})
    todayNum.innerHTML = todayDate.getDay()
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-US" , {month:"long"})
    todayLocation.innerHTML= weatherdata.location.name
    todayTemp.innerHTML =weatherdata.current.temp_c
    todayConditionImg.setAttribute("src" , weatherdata.current.condition.icon)
    todayConditionTxt.innerHTML=weatherdata.current.condition.text
    humidity.innerHTML=weatherdata.current.humidity + "%"
    wind.innerHTML=weatherdata.current.wind_kph + " km/h"
    windDirection.innerHTML=weatherdata.current.wind_dir
}
// display tomorrow weather
function displayTomorrowWeather(weatherdata)
{
for(let i=0 ; i<2;i++){
    let tomorrowDate = new Date(weatherdata.forecast.forecastday[i+1].date)
    tomorrowDate.innerHTML = tomorrowDate.toLocaleDateString("en-US",{weekday:"long"})
    
    
    tomorrowMaxTemp[i].innerHTML = weatherdata.forecast.forecastday[i+1].day.maxtemp_c
    tomorrowMinTemp[i].innerHTML = weatherdata.forecast.forecastday[i+1].day.mintemp_c
    tomorrowConditionImg[i].setAttribute("src" ,  weatherdata.forecast.forecastday[i+1].day.condition.icon)
    tomorrowConditionTxt[i].innerHTML = weatherdata.forecast.forecastday[i+1].day.condition.text

}
}
// call all functions
 async function start(cityName="cairo"){
   let data = await getWeather(cityName)
   console.log(data)
   displayTodayweather(data);
   displayTomorrowWeather(data)
    
}
start()
// ! Events
for(let i=0;i<links.length;i++){
    links[i].addEventListener("click",function(e){
        let activeElement = document.querySelector("nav ul li a.active")
        activeElement.classList.remove("active");
        e.target.classList.add("active");
    })
}

search.addEventListener("input",function(){
    start(search.value)
    
})