// src/components/Modal.vue
<template>
  <Transition name="modal">
    <div
      v-if="modelValue"
      class="modal-overlay"
      @click.self="$emit('update:modelValue', false)"
    >
      <div class="modal-container">
        <div class="modal-header">
          <h3 class="modal-title">
            {{ title }}
          </h3>
          <button
            class="modal-close"
            @click="$emit('update:modelValue', false)"
          >
            ×
          </button>
        </div>

        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean;
  title: string;
}>();

defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
</script>

<style lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  max-width: 90%;
  width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.modal-header {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  color: #666;

  &:hover {
    color: #333;
  }
}

.modal-content {
  padding: 1rem;
}

// Анимации
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;

  .modal-container {
    transition: transform 0.3s ease;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .modal-container {
    transform: translateY(-50px);
  }
}

@media (max-width: 480px) {
  .modal-container {
    width: 95%;
    margin: 0 10px;
  }
}
</style>
