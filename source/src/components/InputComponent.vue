<script>
export default {
  emits: ["update:modelValue"],
  props: {
    label: String,
    id: String,
    help: String,
    type: String,
    modelValue: String,
  },
};
</script>

<template>
  <div class="mb-3">
    <label class="form-label" :for="id">{{ label }}</label>
    <input
      :class="help ? 'is-invalid form-control' : 'form-control'"
      :id="id"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span v-if="help" class="invalid-feedback">{{ help }}</span>
  </div>
</template>
