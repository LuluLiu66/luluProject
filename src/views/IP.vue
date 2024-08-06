<template>
  <main class="container">
    <div>My IP: {{ ipInfo.ip }}</div>
    <div>ISP: {{ ipInfo.isp }}</div>
    <div>DESC: {{ ipInfo.desc }}</div>
  </main>
</template>

<script>
import axios from 'axios'

const APP_ID = 'eoereeqkjitpirjn'
const APP_SECRET = 'xibyk77a7vFMbD7fIuPV0dm08fZiaGwk'

export default {
  name: 'IPView',
  data() {
    return {
      ipInfo: []
    }
  },
  methods: {
    async fetchNewsTypes() {
      try {
        const res = await axios.get(
          `https://www.mxnzp.com/api/ip/self?app_id=${APP_ID}&app_secret=${APP_SECRET}`
        )
        if (res.status === 200) {
          this.ipInfo = res?.data?.data || {}
        }
      } catch (error) {
        console.error(error)
      }
    }
  },
  created() {
    this.fetchNewsTypes()
  }
}
</script>

<style scoped>
.container {
  color: #000;
  width: 1000px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
}
</style>
