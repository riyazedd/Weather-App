const API_KEY="1d108b3759aeb93d267635d8798d09fd";
const cityInput=document.querySelector('.cityName');
const searchButton=$('.search-button');
const currentWeatherDiv=document.querySelector('.display');
const weatherCardsDiv=document.querySelector('.weather-cards');
const userLocationButton=$('.current-location') ;



const createWeatherCard=(cityName,weatherItem,index)=>{
    if(index===0){
        return `
        <div class="citySection">
        <h1 id="city">${cityName}</h1>
        <h2 id="currentDate">${weatherItem.dt_txt.split(" ")[0]}</h2>
        <p>${(weatherItem.weather[0].description).charAt(0).toUpperCase()+(weatherItem.weather[0].description).slice(1)}</p>
        <div class="details">
            <h3>Feels Like: ${Math.floor(weatherItem.main.feels_like - 273.15)}&deg;C</h3>
            <h3>Wind: ${weatherItem.wind.speed} M/S</h3>
            <h3>Humdity: ${weatherItem.main.humidity} %</h3>
        </div>
    </div>
    <div class="tempSection">
        <h1 id="temp">${Math.floor(weatherItem.main.temp - 273.15)}&deg;C</h1>
    </div>`
    }else{
        return `
        <li class="card">
        <h3>${weatherItem.dt_txt.split(" ")[0]}</h3>
        <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
        <p>${(weatherItem.weather[0].description).charAt(0).toUpperCase()+(weatherItem.weather[0].description).slice(1)}</p>
        <h3>Temp: ${Math.floor(weatherItem.main.temp - 273.15)}&deg;C</h3>
        <h3>Wind: ${weatherItem.wind.speed}M/S</h3>
        <h3>Humidity: ${weatherItem.main.humidity}%</h3>
    </li>`
    }
}


const getWeather=(cityName,lat,lon)=>{
    const WEATHER_API_URL=`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL).then(res=>res.json()).then(data=>{
        const uniqueForecastDays=[];
        const fiveDaysForecast=data.list.filter(forecast=>{
            const forecastDate=new Date(forecast.dt_txt).getDate();
            if(!uniqueForecastDays.includes(forecastDate)){
                return uniqueForecastDays.push(forecastDate);
            }
        });

        cityInput.value='';
        currentWeatherDiv.innerHTML='';
        weatherCardsDiv.innerHTML=''

        fiveDaysForecast.forEach((weatherItem, index)=>{
            const html= createWeatherCard(cityName, weatherItem, index);
            if(index===0){
                currentWeatherDiv.insertAdjacentHTML("beforeend",html);
            }else{
                weatherCardsDiv.insertAdjacentHTML("beforeend",html);
            }
        })
    })

}


//Getting Coordinates of searched city
const getCityCoordinates= ()=>{
    const cityName=cityInput.value.trim();
    if(!cityName) return;
    const GEOCODING_API_URL=`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`;
    fetch(GEOCODING_API_URL).then(res=>res.json()).then(data=>{
        const {name, lat, lon}=data[0];
        getWeather(name,lat,lon);
    }).catch(()=>{
        alert("Error Occured");
    })
}

const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords; // Get coordinates of user location
            // Get city name from coordinates using reverse geocoding API
            const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
            fetch(API_URL).then(response => response.json()).then(data => {
                const  {name}  = data.name;
                getWeatherDetails(name, latitude, longitude);
            }).catch(() => {
                alert("An error occurred while fetching the city name!");
            });
        },
        error => { // Show alert if user denied the location permission
            if (error.code === error.PERMISSION_DENIED) {
                alert("Geolocation request denied. Please reset location permission to grant access again.");
            } else {
                alert("Geolocation request error. Please reset location permission.");
            }
        });
}


searchButton.click(function(){
    getCityCoordinates();
})

userLocationButton.click(function(){
    getUserCoordinates();
})

$(document).keypress(function(e){
    if(e.key==="Enter"){
        getCityCoordinates();
    }
})
