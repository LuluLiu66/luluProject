<template>
  <main>
    <div class="container">
      <div>finance</div>
      <div v-for="(item, index) in jokes" :key="index" style="margin-bottom: 12px">
        {{ item.content }}
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'FinanceView',
  data() {
    return {
      jokes: []
    }
  },
  methods: {},
  created() {}
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
