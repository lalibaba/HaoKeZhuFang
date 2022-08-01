<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      username: "",
      password: "",
      currentCity: "北京",
    };
  },
};
</script>

<style></style>
