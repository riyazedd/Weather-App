

const getWeather = (city) => {
  const url =
    "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city="+city;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "070de65839msh633de5a33bab720p1696b3jsn2fc282377119",
      "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
  };

  cityName.innerHTML = city
  fetch(url, options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      feels_like.innerHTML = response.feels_like;
      humidity.innerHTML = response.humidity;
      humidity2.innerHTML = response.humidity;
      max_temp.innerHTML = response.max_temp;
      min_temp.innerHTML = response.min_temp;
      sunrise.innerHTML = response.sunrise;
      sunset.innerHTML = response.sunset;
      temp.innerHTML = response.temp;
      temp2.innerHTML = response.temp;
      wind_degree.innerHTML = response.wind_degree;
      wind_speed.innerHTML = response.wind_speed;
      wind2_speed.innerHTML = response.wind_speed;
    })
    .catch((err) => console.error(err));
}

submit.addEventListener("click",(e)=>{
  e.preventDefault;
  getWeather(city.value);
})


getWeather("Kathmandu");


let cityList=[];

function saveCity(){
  let city=$('#cityName').text();
  cityList.push(city);
  let savedCity=$('.save');
  savedCity.empty();
  cityList.forEach(city=>{
    // savedCity.append(`<h1 class="savedCity">${city}</h1>`);
    var new_city=document.createElement('h1');
    new_city.innerHTML=city;
    new_city.onclick=function(e){
      e.preventDefault;
      getWeather(city)
    }
    savedCity.append(new_city)
  })

}