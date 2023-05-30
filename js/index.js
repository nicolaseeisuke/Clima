// variaveis e  seleção de eventos
const apiKey = "a0a4546822c83a6576a602aee18f014b";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const body = document.querySelector("body")

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data")

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

const toggleLoader = () => {
  loader.classList.toggle("hide");
};

// funções
const getWeatherData = async(city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
  toggleLoader();

  const res = await fetch(apiWeatherURL)
  const data = await res.json()

  toggleLoader();

  return data
 
}

// Tratamento de erro
const showErrorMessage = () => {
  errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
  errorMessageContainer.classList.add("hide");
  weatherContainer.classList.add("hide");

  suggestionContainer.classList.add("hide");
};


const showWeatherData =  async(city) =>{
  const data = await getWeatherData(city)

  if (data.cod === "404") {
    showErrorMessage();
    return;
  }

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description
  weatherIconElement.setAttribute("src",`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
  countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`)
  humidityElement.innerText = `${data.main.humidity}%`
  windElement.innerText = `${data.wind.speed}km/hr`

  body.style.backgroundImage= `url("${apiUnsplash + city}")`
  body.style.backgroundSize = "cover"
  weatherContainer.classList.remove("hide")
}


//eventos 
searchBtn.addEventListener("click", (e) => {

    e.preventDefault()
      
       const city = cityInput.value
       
       showWeatherData(city)
})

cityInput.addEventListener("keyup", (e) => {
   if(e.code === 'Enter'){
    const city = e.target.value
    
    showWeatherData(city)
  }

})

