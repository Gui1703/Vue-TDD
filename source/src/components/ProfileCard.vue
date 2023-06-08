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
  <div class="card text-center">
    <div class="card-header">
      <img
        :src="getImage"
        alt="profile"
        width="200"
        class="rounded-circle shadow"
      />
    </div>
    <div class="card-body">
      <h3>{{ user.username }}</h3>
    </div>
  </div>
</template>
