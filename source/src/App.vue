<script>
import LanguageSelector from "./components/LanguageSelector.vue";
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: { NavBar, LanguageSelector },
  data() {
    return { path: window.location.pathname };
  },
};
</script>

<template>
  <NavBar />

  <div class="container">
    <router-view />
    <LanguageSelector />
  </div>
</template>
