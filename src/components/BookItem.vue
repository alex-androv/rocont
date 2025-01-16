<template>
  <div class="book-item">
    <div class="book-info">
      <h3>{{ book.title }}</h3>
      <p class="book-details">
        <span class="book-author">{{ book.author }}</span>
        <span class="year">{{ book.year }}</span>
        <span
          v-if="book.genre"
          class="genre"
          >{{ book.genre }}</span
        >
      </p>
    </div>
    <div class="book-actions">
      <button
        @click="$emit('edit')"
        class="edit-button"
      >
        Редактировать
      </button>
      <button
        @click="$emit('delete')"
        class="delete-button"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Book } from "@/types/book";

defineProps<{
  book: Book;
}>();

defineEmits<{
  (e: "edit"): void;
  (e: "delete"): void;
}>();
</script>

<style lang="scss">
.book-item {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .book-info {
    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.25rem;
      color: var(--text-color);
    }

    .book-author {
      color: #666;
      margin-bottom: 0.5rem;
    }

    .book-details {
      display: flex;
      gap: 1rem;
      font-size: 0.875rem;

      .year {
        color: #666;
      }

      .genre {
        color: var(--primary-color);
      }
    }
  }

  .book-actions {
    display: flex;
    gap: 0.5rem;

    button {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      background: white;
      cursor: pointer;
      transition: all 0.2s;

      &.edit-button:hover {
        background-color: #f8f9fa;
        border-color: #666;
      }

      &.delete-button {
        color: var(--error-color);
        border-color: var(--error-color);

        &:hover {
          background-color: var(--error-color);
          color: white;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .book-item {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
