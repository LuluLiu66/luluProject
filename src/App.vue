<template>
  <div class="app-container">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/weather">Weather</RouterLink>
        </nav>
      </div>
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

.content {
  flex-grow: 1;
  margin-left: 200px;
  padding: 20px;
  background-color: #fff;
  height: 100vh;
  overflow-y: auto;
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
</style>