<template>
  <main class="container">
    <p class="time">Current Date and Time: {{ currentDate }}</p>

    <div style="display: flex; margin-bottom: 8px">
      <div
        v-for="item in newsTypes"
        :key="item.typeId"
        @click="fetchNewsList(item.typeId)"
        style="margin-right: 8px; cursor: pointer"
      >
        {{ item.typeName }}
      </div>
    </div>

    <div style="display: flex; gap: 8px">
      <div
        style="
          width: 400px;
          max-height: 500px;
          border: 1px solid black;
          overflow: scroll;
          padding: 12px;
        "
      >
        <div
          v-for="item in newsList"
          :key="item.newsId"
          style="padding-bottom: 12px; border-bottom: 1px solid black; cursor: pointer"
          @click="fetchNewsDetail(item.newsId)"
        >
          <div>title: {{ item.title }}</div>
          <div>source: {{ item.source }}</div>
          <div>postTime: {{ item.postTime }}</div>
          <div>digest: {{ item.digest }}</div>
          <div>
            <el-image
              style="width: 100px; height: 100px; margin-right: 12px"
              :src="itemImg"
              :fit="fit"
              v-for="itemImg in item.imgList"
              :key="itemImg"
            />
          </div>
        </div>
      </div>

      <div
        style="
          width: 600px;
          max-height: 500px;
          border: 1px solid rgb(164, 15, 134);
          overflow: scroll;
          padding: 12px;
        "
      >
        <div v-for="(item, index) in newsDetail" :key="index">
          <el-image
            v-if="item.type === 'img'"
            style="width: 100px; height: 100px"
            :src="item?.imageUrl"
            :fit="fit"
          />
          <div v-if="item.type === 'text'">{{ item.content }}</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'

const APP_ID = 'eoereeqkjitpirjn'
const APP_SECRET = 'xibyk77a7vFMbD7fIuPV0dm08fZiaGwk'

export default {
  name: 'NewsView',
  data() {
    return {
      currentDate: null,
      newsTypes: [],
      newsList: [],
      newsDetail: []
    }
  },
  methods: {
    async fetchNewsTypes() {
      try {
        const res = await axios.get(
          `https://www.mxnzp.com/api/news/types/v2?app_id=${APP_ID}&app_secret=${APP_SECRET}`
        )
        if (res.status === 200) {
          this.newsTypes = res?.data?.data || []
        }
      } catch (error) {
        console.error(error)
      }
    },
    async fetchNewsList(typeId) {
      try {
        const res = await axios.get(
          `https://www.mxnzp.com/api/news/list/v2?typeId=${typeId}&page=1&app_id=${APP_ID}&app_secret=${APP_SECRET}`
        )
        if (res.status === 200) {
          this.newsList = res?.data?.data || []
        }
      } catch (error) {
        console.error(error)
      }
    },
    async fetchNewsDetail(newsId) {
      try {
        const res = await axios.get(
          `https://www.mxnzp.com/api/news/details/v2?newsId=${newsId}&app_id=${APP_ID}&app_secret=${APP_SECRET}`
        )
        if (res.status === 200) {
          this.newsDetail = res?.data?.data?.items || []
        }
      } catch (error) {
        console.error(error)
      }
    }
  },
  created() {
    this.currentDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
    this.fetchNewsTypes()
  }
}
</script>

<style scoped>
.container {
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.time {
  font-size: 18px;
}

.price {
  margin-top: 20px;
  font-size: 18px;
  color: #ff4500;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  color: #fff;
  background-color: #08efdb;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
