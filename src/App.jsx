import { useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  const api = {
    key: '2528995f917d17934bf983d5035ed613',
    base: 'https://api.openweathermap.org/data/2.5/',
  }

  const search = async (e) => {
    if(e.key === "Enter") {
      // fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
      // .then(res => res.json())
      // .then(result => {
      //   setWeather(result);
      //   setCity("");
      //   console.log(result);
      // })
      try {
        const response = await axios.get(`${api.base}weather`, {
          params : {
            q: city,
            units: 'metric',
            appid: api.key
          }
        });
        setWeather(response.data);
        setCity('');
        console.log(response.data);
      }
      catch(error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <div>Weather App</div>
      <input 
        type='text' 
        value={city} 
        className='border-1'
        placeholder='Enter the city...'
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={search}>
      </input>

      {weather.main && (
        <div>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Temperature: {weather.main.temp} degree celcius</p>
          <p>Conditions: {weather.weather[0].main}</p>  
        </div>
      )}
    </>
  )
}

export default App
