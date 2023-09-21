<template>
  <main>
    <TheWelcome />
    <h2>{{ this.time }}</h2>
    <h3>{{ this.info?.symbol }}</h3>
    <div>{{ this.info?.filters[0].filterType }} : {{ this.info?.filters[0].maxPrice }}</div>
    <div>{{ this.info?.filters[1].filterType }} : {{ this.info?.filters[1].maxQty }}</div>
    <div>{{ this.info?.filters[3].filterType }} : {{ this.info?.filters[3].maxQty }}</div>
  </main>
</template>

<script>
import TheWelcome from '../components/TheWelcome.vue'
import axios from 'axios'
import dayjs from 'dayjs'

export default {
  data() {
    return {
      info: null,
      time: null
    }
  },

  mounted() {
    console.log(dayjs(1693540946710, 'x').format('YYYY-MM-DD HH:mm:ss'))
    axios.get('https://api.binance.com/api/v3/exchangeInfo').then((response) => {
      console.log(response.data.symbols[0])
      this.info = response.data.symbols[0]
      this.time = dayjs(response.data.serverTime, 'x').format('YYYY-MM-DD HH:mm:ss')
    })
  }
}
</script>

<style scss scoped>
h3 {
  font-weight: 500;
  color: red;
}
</style>
