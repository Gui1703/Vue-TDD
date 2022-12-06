<script>
import LanguageSelector from "./components/LanguageSelector.vue";
import SignUpPage from "./pages/SignUpPage.vue";

export default {
  name: "App",
  components: {
    SignUpPage,
    LanguageSelector,
  },
};
</script>

<template>
  <div class="container">
    <SignUpPage />
    <LanguageSelector />
  </div>
</template>
