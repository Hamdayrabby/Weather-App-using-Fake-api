const emptyInput=document.getElementById("empty-input");
searchBtn=document.getElementById("search-button");

document.getElementById("search-city").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      searchBtn.click();
    }
  });

  const searchButton = () => {
    const searchInput = document.getElementById("search-city");
    const cityName = searchInput.value;
    emptyInput.textContent = "";
    if (cityName === "") {
      emptyInput.innerHTML = `
              <h4 class="text-start text-danger mt-2">Please enter a city name to search...</h4>
          `;
    }
    //clear search
    searchInput.value = "";
    loadSearch(cityName);
  };

//load weather url
async function loadSearch(city) {
    const api = "e7c08a23545a0f20747ab78fd4a06f40";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    displayWeather(data);
}

//display weather
function displayWeather(temperature)
{
    if((temperature.message==="city not found"))
    {
        emptyInput.innerHTML=`<h4 class="text-start text-danger mt-2">No weather data found !</h4>`;
    }


    const container=document.getElementById("container");
    container.textContent="";
    const localDate=convertUnixTimeToLocal(temperature.dt);
    const sunriseTime=convertUnixTimeToLocal(temperature.sys.sunrise);
    const sunsetTime=convertUnixTimeToLocal(temperature.sys.sunset);
    const div=document.createElement("div");

    div.innerHTML=`
        <h4 class="fs-2">${temperature.name},${temperature.sys.country}</h4>
        <h6>${localDate.fullDate}</h6>
        <img src="http://openweathermap.org/img/wn/${temperature.weather[0].icon}@2x.png" alt="">
        <h5 class="fs-1">${temperature.main.temp} &deg;C</h5>
        <h5 class="text-dark fs-2">${temperature.weather[0].main}</h5>
        <h5 class="text-dark">
            <span class="me-3">
                Sunrise: ${sunriseTime.time12h}
            </span>
            <span class="ms-3">
                Sunset: ${sunsetTime.time12h}
            </span>
        </h5>
    `;
    container.appendChild(div);

}

loadSearch("dhaka");

//convert unix time to local format
function convertUnixTimeToLocal(unixTime)
{
    const milliSeconds=unixTime*1000;
    const humanDateFormat= new Date(milliSeconds);
    const convertedTimeObject={
        fullDate:humanDateFormat.toLocaleString("en-US",{
            weekday:"long",
            month:"long",
            day:"numeric",
            year:"numeric",
        }),
        time12h:humanDateFormat.toLocaleString("en-US",{
            hour:"numeric",
            minute:"numeric",
            second:"numeric",
            hour12:true,
        }),
    };
    return convertedTimeObject;
}
