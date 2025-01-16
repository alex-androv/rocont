<template>
  <div class="book-list">
    <div class="controls">
      <div class="sort-controls">
        <select
          v-model="store.sortField"
          class="sort-select"
        >
          <option value="title">По названию</option>
          <option value="author">По автору</option>
          <option value="year">По году</option>
        </select>
      </div>
      <button
        @click="openAddBookModal"
        class="add-button"
      >
        Добавить книгу
      </button>
    </div>

    <div class="books-container">
      <BookItem
        v-for="book in store.filteredAndSortedBooks"
        :key="book.id"
        :book="book"
        @edit="openEditModal(book)"
        @delete="confirmDelete(book)"
      />

      <div
        v-if="store.filteredAndSortedBooks.length === 0"
        class="no-books"
      >
        <p>Книги не найдены</p>
      </div>
    </div>

    <Modal
      v-model="showModal"
      :title="selectedBook ? 'Редактирование книги' : 'Добавить книгу'"
    >
      <BookForm
        :book="selectedBook"
        @submit="handleSubmit"
        @cancel="closeModal"
      />
    </Modal>

    <Modal
      v-model="showDeleteModal"
      title="Подтвердите удаление"
    >
      <div class="delete-confirmation">
        <p>Вы уверены, что хотите удалить книгу "{{ selectedBook?.title }}"?</p>
        <div class="modal-actions">
          <button
            @click="handleDelete"
            class="confirm-button"
          >
            Удалить
          </button>
          <button
            @click="closeDeleteModal"
            class="cancel-button"
          >
            Отмена
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useBookStore } from "@/stores/bookStore";
import type { Book } from "@/types/book";
import Modal from "./Modal.vue";
import BookForm from "./BookForm.vue";
import BookItem from "./BookItem.vue";

const store = useBookStore();
const showModal = ref(false);
const showDeleteModal = ref(false);
const selectedBook = ref<Book | null>(null);

onMounted(() => {
  store.loadBooks();
});

const openAddBookModal = () => {
  selectedBook.value = null;
  showModal.value = true;
};

const openEditModal = (book: Book) => {
  selectedBook.value = { ...book };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedBook.value = null;
};

const handleSubmit = (book: Omit<Book, "id">) => {
  if (selectedBook.value) {
    store.editBook({ ...book, id: selectedBook.value.id });
    store.addNotification("Книга успешно отредактирована");
  } else {
    store.addBook(book);
    store.addNotification("Книга успешно добавлена");
  }
  closeModal();
};

const confirmDelete = (book: Book) => {
  selectedBook.value = book;
  showDeleteModal.value = true;
};

const handleDelete = () => {
  if (selectedBook.value) {
    store.deleteBook(selectedBook.value.id);
    store.addNotification("Книга успешно удалена");
    closeDeleteModal();
  }
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  selectedBook.value = null;
};
</script>

<style lang="scss">
.book-list {
  max-width: 1200px;
  margin: 0 auto;

  .controls {
    margin-bottom: 2rem;
    display: flex;
    gap: 1rem;
    justify-content: flex-end;

    > * {
      flex-shrink: 0;
    }
  }

  .sort-select {
    padding: 0.75rem;
    min-width: 140px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background-color: white;
    font-size: 1rem;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
    }
  }

  .add-button {
    padding: 0.75rem 1.5rem;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;

    &:hover {
      background-color: var(--primary-hover);
    }
  }

  .no-books {
    grid-column: 1 / -1;
    text-align: center;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    color: #666;
  }

  .delete-confirmation {
    text-align: center;

    p {
      margin-bottom: 1.5rem;
    }

    .modal-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;

      button {
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;

        &.confirm-button {
          background-color: var(--error-color);
          color: white;
          border: none;

          &:hover {
            background-color: darken(#dc3545, 5%);
          }
        }

        &.cancel-button {
          background-color: #f8f9fa;
          border: 1px solid var(--border-color);

          &:hover {
            background-color: #e9ecef;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .book-list {
    .controls {
      flex-wrap: wrap;
      justify-content: stretch;

      > * {
        flex: 1;
      }
    }
  }
  .sort-select {
    width: 100%;
  }
}
@media (max-width: 480px) {
  .controls {
    flex-direction: column;
  }
}
</style>
