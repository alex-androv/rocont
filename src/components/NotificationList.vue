<template>
  <div class="notifications-container">
    <TransitionGroup name="notification">
      <div
        v-for="notification in store.notifications"
        :key="notification.id"
        class="notification"
      >
        <span class="message">{{ notification.message }}</span>
        <button
          class="close-button"
          @click="store.removeNotification(notification.id)"
        >
          ×
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useBookStore } from "@/stores/bookStore";

const store = useBookStore();
</script>

<style lang="scss">
.notifications-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 400px;
}

.notification {
  padding: 1rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;

  .message {
    margin-right: 1rem;
    font-size: 0.875rem;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 1.25rem;
    cursor: pointer;
    padding: 0 0.5rem;
    opacity: 0.7;
    color: currentColor;

    &:hover {
      opacity: 1;
    }
  }
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@media (max-width: 480px) {
  .notifications-container {
    left: 1rem;
    right: 1rem;

    .notification {
      width: 100%;
    }
  }
}
</style>
