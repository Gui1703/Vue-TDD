<script>
import imageDefault from "../assets/profile.png";
export default {
  props: { user: { username: String, image: String } },
  computed: {
    getImage() {
      return typeof this.user.image === "string"
        ? this.user.image
        : imageDefault;
    },
  },
};
</script>

<template>
  <img
    class="rounded-circle shadow-sm"
    :src="getImage"
    width="30"
    alt="profile"
  />
  {{ user.username }}
</template>
