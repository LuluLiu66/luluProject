<template>
  <main>
    <h2>{{ time }}</h2>
    <h3>{{ info?.symbol }}</h3>
    <div>{{ filter0 }} : {{ maxPrice }}</div>
    <div>{{ filter1 }} : {{ maxQty1 }}</div>
    <div>{{ filter3 }} : {{ maxQty3 }}</div>
  </main>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'

export default {
  name: 'HomeView',
  data() {
    return {
      info: null,
      time: null
    }
  },

  computed: {
    filter0() {
      return this.info?.filters[0]?.filterType;
    },
    maxPrice() {
      return this.info?.filters[0]?.maxPrice;
    },
    filter1() {
      return this.info?.filters[1]?.filterType;
    },
    maxQty1() {
      return this.info?.filters[1]?.maxQty;
    },
    filter3() {
      return this.info?.filters[3]?.filterType;
    },
    maxQty3() {
      return this.info?.filters[3]?.maxQty;
    }
  },

  async mounted() {
    try {
      const response = await axios.get('https://api.binance.com/api/v3/exchangeInfo');
      const { symbols, serverTime } = response.data;
      this.info = symbols[0];
      this.time = dayjs(serverTime, 'x').format('YYYY-MM-DD HH:mm:ss');
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<style scss scoped>
</style>