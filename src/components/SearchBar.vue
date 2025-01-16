<template>
  <div class="search-bar">
    <input
      type="text"
      :value="modelValue"
      @input="e => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
      placeholder="Найти ту самую книгу"
      class="search-input"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>

<style lang="scss">
.search-bar {
  flex: 1;
  min-width: 200px;

  .search-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
    }
  }
}
</style>
