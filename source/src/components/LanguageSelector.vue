<script lang="js"></script>

<template>
  <img
    src="https://flagcdn.com/24x18/br.png"
    srcset="
      https://flagcdn.com/48x36/br.png 2x,
      https://flagcdn.com/72x54/br.png 3x
    "
    width="24"
    height="18"
    alt="Brazil"
    title="Portuguese"
    id="Portuguese"
    @click="$i18n.locale = 'pt'"
  />
  <img
    src="https://flagcdn.com/24x18/us.png"
    srcset="
      https://flagcdn.com/48x36/us.png 2x,
      https://flagcdn.com/72x54/us.png 3x
    "
    width="24"
    height="18"
    alt="United States"
    title="English"
    id="English"
    @click="$i18n.locale = 'en'"
  />
</template>

<style scoped>
img {
  cursor: pointer;
  margin-right: 5px;
}
</style>
