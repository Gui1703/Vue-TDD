<script>
import { activate } from "../api/apiCalls";
export default {
  data() {
    return {
      success: false,
      fail: false,
      apiProgress: false,
    };
  },
  async mounted() {
    try {
      this.success = true;
      this.apiProgress = true;
      await activate(this.$route.params.token);
    } catch (e) {
      this.fail = true;
    } finally {
      this.apiProgress = false;
    }
  },
};
</script>

<template>
  <div data-testid="activation-page">
    <div class="alert alert-success mt-3" v-if="success">
      Account is activated
    </div>
    <div class="alert alert-danger mt-3" v-if="fail">Activation failure</div>

    <span v-if="apiProgress" class="spinner-border" role="status" />
  </div>
</template>

<style scoped></style>
