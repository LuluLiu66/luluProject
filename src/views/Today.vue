<template>
  <main>
    <div class="container">
      <div>
        <div v-for="(item, index) in todayList" :key="index" style="margin-bottom: 16px">
          <div>{{ item.year }} / {{ item.month }} / {{ item.day }}</div>
          <b>{{ item.title }}</b>
          <div>{{ item.details }}</div>
          <el-image style="width: 200px; height: 200px" :src="item?.picUrl" :fit="fit" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'

const APP_ID = 'eoereeqkjitpirjn'
const APP_SECRET = 'xibyk77a7vFMbD7fIuPV0dm08fZiaGwk'

export default {
  name: 'TodayView',
  data() {
    return {
      todayList: []
    }
  },
  methods: {
    async fetchToday() {
      try {
        const res = await axios.get(
          `https://www.mxnzp.com/api/history/today?type=1&app_id=${APP_ID}&app_secret=${APP_SECRET}`,
          { type: 1 }
        )
        if (res.status === 200) {
          this.todayList = res?.data?.data || []
        }
      } catch (error) {
        console.error(error)
      }
    }
  },
  created() {
    this.fetchToday()
  }
}
</script>

<style scoped>
.container {
  color: #000;
  width: 1000px;
  max-width: 100%;
  height: 100vh;
  font-family: Arial, sans-serif;
}
</style>
