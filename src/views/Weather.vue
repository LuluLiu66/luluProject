<template>
  <div class="weather-view">
    <el-row class="mb-4">
      <el-input v-model="city" placeholder="Enter city name"></el-input>
      <el-button @click="getWeatherInfo(city)">Get Weather</el-button>
    </el-row>
    <div v-if="weatherData" class="weather-info">
      <h2>Weather in {{ weatherData.name }}</h2>
      <div class="weather-detail">
        <p><strong>Temperature:</strong> {{ (weatherData.main.temp - 273.15).toFixed(2) }} °C</p>
        <p><strong>Humidity:</strong> {{ weatherData.main.humidity }}%</p>
        <p><strong>Wind Speed:</strong> {{ weatherData.wind.speed }} m/s</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const apikey = 'bd79b88f223254c2ac009f65eec629b6'

export default {
  name: 'WeatherView',
  data() {
    return {
      weatherData: null,
      city: ''
    }
  },
  methods: {
    getWeatherInfo(city) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
      axios
        .get(url)
        .then((response) => {
          this.weatherData = response.data
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.weather-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.weather-info {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  color: #333;
}

.weather-detail {
  margin-top: 20px;
}
</style>
