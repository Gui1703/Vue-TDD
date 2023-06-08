<script>
import { getUserById } from "../api/apiCalls";
import ProfileCard from "../components/ProfileCard.vue";
import Spinner from "../components/Spinner.vue";

export default {
  name: "User Page",
  components: { Spinner, ProfileCard },
  data() {
    return { user: {}, pendingApiCall: true, failResponse: undefined };
  },
  async mounted() {
    try {
      const { data } = await getUserById(this.$route.params.id);
      this.user = data;
    } catch (error) {
      this.failResponse = error.response.data.message;
    } finally {
      this.pendingApiCall = false;
    }
  },
};
</script>

<template>
  <div data-testid="user-page">
    <ProfileCard :user="user" v-if="!pendingApiCall && !failResponse" />
    <div class="alert alert-secondary text-center" v-if="pendingApiCall">
      <Spinner size="normal" />
    </div>
    <div class="alert alert-danger text-center" v-if="failResponse">
      {{ failResponse }}
    </div>
  </div>
</template>

<style scoped></style>
