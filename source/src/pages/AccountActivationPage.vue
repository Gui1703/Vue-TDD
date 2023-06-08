<script>
import { activate } from "../api/apiCalls";
import Spinner from "../components/Spinner.vue";
export default {
  components: { Spinner },
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

    <Spinner v-if="apiProgress" size="normal" />
  </div>
</template>
