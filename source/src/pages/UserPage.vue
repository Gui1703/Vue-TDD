<script>
import { getUserById } from "../api/apiCalls";
import ProfileCard from "../components/ProfileCard.vue";

export default {
  name: "User Page",
  components: { ProfileCard },
  data() {
    return { user: {} };
  },
  async mounted() {
    const { data } = await getUserById(this.$route.params.id);
    this.user = data;
  },
};
</script>

<template>
  <div data-testid="user-page">
    <ProfileCard :user="user" />
  </div>
</template>

<style scoped></style>
