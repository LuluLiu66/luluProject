<template>
  <main class="container">
    <div>
      <div v-for="(item, index) in jokes" :key="index" style="margin-bottom: 12px">
        {{ item.content }}
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'

const APP_ID = 'eoereeqkjitpirjn'
const APP_SECRET = 'xibyk77a7vFMbD7fIuPV0dm08fZiaGwk'

export default {
  name: 'JokesView',
  data() {
    return {
      jokes: []
    }
  },
  methods: {
    async fetchJokes() {
      try {
        const res = await axios.get(
          `https://www.mxnzp.com/api/jokes/list/random?app_id=${APP_ID}&app_secret=${APP_SECRET}`
        )
        if (res.status === 200) {
          this.jokes = res?.data?.data || []
        }
      } catch (error) {
        console.error(error)
      }
    }
  },
  created() {
    this.fetchJokes()
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
