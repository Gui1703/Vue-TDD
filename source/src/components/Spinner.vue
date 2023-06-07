<script>
export default {
  props: { size: { type: String, default: "small" } },
};
</script>

<template>
  <span
    class="spinner-border"
    :class="{ 'spinner-border-sm': size === 'small' }"
    role="status"
  />
</template>
