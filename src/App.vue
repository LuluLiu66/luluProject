<template>
  <div class="app-container">
    <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <!-- <RouterLink to="/finance">Finance</RouterLink> -->
        <RouterLink to="/weather">Weather</RouterLink>
        <RouterLink to="/news">News</RouterLink>
        <RouterLink to="/today">Today</RouterLink>
        <RouterLink to="/jokes">Jokes</RouterLink>
        <RouterLink to="/ip">IP</RouterLink>
      </nav>
    </header>

    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.app-container {
  display: flex;
  font-family: Arial, sans-serif;
}

header {
  width: 200px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #f5f5f5;
  color: #333;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 20px;
}

nav a {
  color: #333;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #007bff;
}

nav a.router-link-exact-active {
  color: #007bff;
}

.content {
  flex-grow: 1;
  margin-left: 200px;
  padding: 20px;
  background-color: #fff;
  height: 100vh;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .app-container {
    display: block;
  }

  header {
    width: 100%;
    height: auto;
    position: relative;
  }

  .content {
    margin-left: 0;
    padding: 20px;
  }
}
</style>
