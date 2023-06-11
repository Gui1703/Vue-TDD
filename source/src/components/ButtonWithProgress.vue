<script>
import Spinner from "./Spinner.vue";

export default {
  components: { Spinner },
  props: {
    disabled: Boolean,
    apiProgress: Boolean,
    onClick: Function,
  },
};
</script>

<template>
  <button
    class="btn btn-primary"
    :disabled="disabled || apiProgress"
    @click.prevent="onClick"
  >
    <Spinner v-if="apiProgress" />
    <slot>Button</slot>
  </button>
</template>

<style scoped></style>
