<template>
  <main class="container">
    <p class="time">Current Date and Time: {{ currentDate }}</p>
    <p class="price">BTCUSDT Price: {{ btcusdtPrice }}</p>
    <p class="price">BNBUSDT Price: {{ bnbusdtPrice }}</p>
    <button @click="fetchPrices">Refresh</button>
  </main>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'

export default {
  name: 'HomeView',
  data() {
    return {
      btcusdtPrice: null,
      bnbusdtPrice: null,
      currentDate: null,
    }
  },
  methods: {
    async fetchPrice(symbol) {
      try {
        const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
        return response.data.price;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchPrices() {
      this.btcusdtPrice = await this.fetchPrice('BTCUSDT');
      this.bnbusdtPrice = await this.fetchPrice('BNBUSDT');
      this.currentDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    }
  },
  mounted() {
    this.fetchPrices();
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.time, .price {
  font-size: 18px;
  color: #ff4500;
}

.price {
  margin-top: 20px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  color: #fff;
  background-color: #ff4500;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #ff5500;
}
</style>