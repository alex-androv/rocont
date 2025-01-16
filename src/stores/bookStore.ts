import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Book } from "@/types/book";

export const useBookStore = defineStore("books", () => {
  const books = ref<Book[]>([]);
  const searchQuery = ref("");
  const sortField = ref("title");

  const loadBooks = () => {
    const savedBooks = localStorage.getItem("books");
    if (savedBooks) {
      books.value = JSON.parse(savedBooks) as Book[];
    }
  };

  const saveBooks = () => {
    localStorage.setItem("books", JSON.stringify(books.value));
  };

  const addBook = (book: Omit<Book, "id">) => {
    const newBook: Book = {
      ...book,
      id: crypto.randomUUID(),
    };
    books.value.push(newBook);
    saveBooks();
  };

  const editBook = (updatedBook: Book) => {
    const index = books.value.findIndex((book) => book.id === updatedBook.id);
    if (index !== -1) {
      books.value[index] = updatedBook;
      saveBooks();
    }
  };

  const deleteBook = (id: string) => {
    books.value = books.value.filter((book) => book.id !== id);
    saveBooks();
  };

  const setSearchQuery = (query: string) => {
    searchQuery.value = query;
  };

  const filteredAndSortedBooks = computed(() => {
    let result = [...books.value];

    if (searchQuery.value) {
      result = result.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }

    result.sort((a, b) => {
      if (sortField.value === "year") {
        return b.year - a.year;
      }
      const aValue = a[sortField.value].toLowerCase();
      const bValue = b[sortField.value].toLowerCase();
      return aValue.localeCompare(bValue);
    });

    return result;
  });

  const notifications = ref([]);

  const addNotification = (message: string) => {
    const id = crypto.randomUUID();
    notifications.value.push({ id, message });

    setTimeout(() => {
      removeNotification(id);
    }, 3000);
  };

  const removeNotification = (id: string) => {
    notifications.value = notifications.value.filter((n) => n.id !== id);
  };

  return {
    books,
    searchQuery,
    sortField,
    filteredAndSortedBooks,
    addBook,
    editBook,
    deleteBook,
    loadBooks,
    setSearchQuery,
    notifications,
    addNotification,
    removeNotification,
  };
});
