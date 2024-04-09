<template>
  <div id="app">
    <left-side-bar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import LeftSideBar from "./components/Layouts/LeftSideBar.vue";

export default {
  name: 'App',
  components: {
    LeftSideBar
  }
}
</script>
<style scoped>
#app {
  display: flex;
  flex-direction: column;
}

.main-content {
  margin-left: 280px;
  margin-right: 75px;
  margin-top: 40px;
}
</style>