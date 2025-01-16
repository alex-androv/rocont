<template>
  <form
    @submit.prevent="handleSubmit"
    class="book-form"
  >
    <div class="form-group">
      <label for="title">Название</label>
      <input
        id="title"
        v-model="formData.title"
        type="text"
        :class="{ error: errors.title }"
        placeholder="Название произведения"
        @input="validateField('title')"
      />
      <span
        v-if="errors.title"
        class="error-message"
        >{{ errors.title }}</span
      >
      <div
        v-if="!errors.title"
        class="empty-block"
      ></div>
    </div>

    <div class="form-group">
      <label for="author">Автор</label>
      <input
        id="author"
        v-model="formData.author"
        type="text"
        :class="{ error: errors.author }"
        placeholder="Имя и фамилия автора"
        @input="validateField('author')"
      />
      <span
        v-if="errors.author"
        class="error-message"
        >{{ errors.author }}</span
      >
      <div
        v-if="!errors.author"
        class="empty-block"
      ></div>
    </div>

    <div class="form-group">
      <label for="year">Год</label>
      <input
        id="year"
        v-model="formData.year"
        type="number"
        :class="{ error: errors.year }"
        placeholder="Год выпуска"
        @input="validateField('year')"
      />
      <span
        v-if="errors.year"
        class="error-message"
        >{{ errors.year }}</span
      >
      <div
        v-if="!errors.year"
        class="empty-block"
      ></div>
    </div>

    <div class="form-group">
      <label for="genre">Жанр</label>
      <input
        id="genre"
        v-model="formData.genre"
        type="text"
        placeholder="Добавьте жанр произведения"
      />
    </div>

    <div class="form-actions">
      <button
        type="submit"
        class="submit-button"
      >
        {{ isEditing ? "Сохранить" : "Добавить" }}
      </button>
      <button
        type="button"
        class="cancel-button"
        @click="$emit('cancel')"
      >
        Отмена
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { Book } from "@/types/book";

const props = defineProps<{
  book?: Book | null;
}>();

const emit = defineEmits<{
  (e: "submit", book: Omit<Book, "id">): void;
  (e: "cancel"): void;
}>();

const isEditing = computed(() => !!props.book);

const formData = ref({
  title: "",
  author: "",
  year: new Date().getFullYear(),
  genre: "",
});

const errors = ref({
  title: "",
  author: "",
  year: "",
});

onMounted(() => {
  if (props.book) {
    formData.value = { ...props.book };
  }
});

const validateField = (field: "title" | "author" | "year") => {
  if (field === "title") {
    errors.value.title = formData.value.title.trim()
      ? ""
      : "Название обязательно для заполнения";
  } else if (field === "author") {
    errors.value.author = formData.value.author.trim()
      ? ""
      : "Автор обязателен для заполнения";
  } else if (field === "year") {
    const currentYear = new Date().getFullYear();
    const yearValue = formData.value.year;

    if (!yearValue) {
      errors.value.year = "Год обязателен для заполнения";
    } else if (yearValue > currentYear) {
      errors.value.year = `Год не может быть больше ${currentYear}`;
    } else {
      errors.value.year = "";
    }
  }
};

const validate = (): boolean => {
  validateField("title");
  validateField("author");
  validateField("year");

  return !errors.value.title && !errors.value.author && !errors.value.year;
};

const handleSubmit = () => {
  if (validate()) {
    emit("submit", {
      title: formData.value.title.trim(),
      author: formData.value.author.trim(),
      year: Number(formData.value.year),
      genre: formData.value.genre.trim(),
    });
  }
};
</script>

<style lang="scss">
.book-form {
  .form-group {
    margin-bottom: 0.5rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: var(--text-color);
    }

    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      font-size: 1rem;
      transition: all 0.2s;

      &::placeholder {
        color: #999;
      }

      &:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
      }

      &.error {
        border-color: var(--error-color);

        &:focus {
          box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2);
        }
      }
    }

    .error-message {
      display: block;
      margin-top: 0.5rem;
      color: var(--error-color);
      font-size: 0.875rem;
    }
    .empty-block {
      height: 30px;
    }
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;

    button {
      flex: 1;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;

      &.submit-button {
        background-color: var(--primary-color);
        color: white;
        border: none;

        &:hover {
          background-color: var(--primary-hover);
        }

        &:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.4);
        }
      }

      &.cancel-button {
        background-color: #f8f9fa;
        border: 1px solid var(--border-color);

        &:hover {
          background-color: #e9ecef;
        }

        &:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
        }
      }
    }
  }

  @media (max-width: 480px) {
    .form-actions {
      flex-direction: column;

      button {
        width: 100%;
      }
    }
  }
}
</style>
