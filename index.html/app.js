const apiKey = " d9e6aeeec7c3bc8f420c00513a7e06a8 ";

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon");
const getWeatherBtn = document.querySelector(".get-weather-button");
const clickSound = new Audio('click-sound.mp3');
const weatherSounds = {
    "Clear": new Audio('sounds/clear-sound.mp3'),
    "Clouds": new Audio('sounds/clouds-sound.mp3'),
    "Rain": new Audio('sounds/rain-sound.mp3'),
    "Drizzle": new Audio('sounds/drizzle-sound.mp3'),
    "Mist": new Audio('sounds/mist-sound.mp3'),
    "Snow": new Audio('sounds/snow-sound.mp3'),
    "Fog": new Audio('sounds/fog-sound.mp3')
};
async function checkWeather(city) {

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();
    console.log(data);


    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
        document.querySelector(".w-name").innerHTML = data.weather[0].main;
    
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png"
        } 
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png"
        } 
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.png"
        } 
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png"
        } 
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png"
        } 
        else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "images/snow.png"
        }
        else if(data.weather[0].main == "Fog"){
            weatherIcon.src = "fog.svg"
        }
    
    
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    }



}

searchBtn.addEventListener("click", ()=>{
    clickSound.play();
    checkWeather(searchBox.value);
});
getWeatherBtn.addEventListener("click", () => {
    clickSound.play();
    checkWeather(searchBox.value);
});
checkWeather()