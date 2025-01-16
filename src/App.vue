<template>
  <div class="app">
    <div class="search-container">
      <SearchBar v-model="store.searchQuery" />
    </div>

    <header class="header">
      <div class="header-wrap">
        <h1>Книги в каталоге</h1>
        <div class="header-counter">
          {{ store.filteredAndSortedBooks.length }}
        </div>
      </div>
    </header>

    <main class="main">
      <BookList />
    </main>

    <NotificationList />
  </div>
</template>

<script setup lang="ts">
import { useBookStore } from "@/stores/bookStore";
import BookList from "@/components/BookList.vue";
import NotificationList from "@/components/NotificationList.vue";
import SearchBar from "@/components/SearchBar.vue";

const store = useBookStore();
</script>

<style lang="scss">
:root {
  --primary-color: #4caf50;
  --primary-hover: #45a049;
  --error-color: #dc3545;
  --text-color: #333;
  --border-color: #ddd;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  line-height: 1.5;
  color: var(--text-color);
}

.app {
  min-height: 100vh;
}

.search-container {
  background-color: white;
  padding: 1rem;

  > div {
    max-width: 1200px;
    margin: 0 auto;
  }
}

.header {
  background-color: white;
  padding: 1rem;
  margin: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;

  &-wrap {
    display: flex;
    align-items: center;
  }
  &-counter {
    font-size: 1.5rem;
    font-weight: 600;
    color: grey;
  }

  h1 {
    max-width: 1200px;
    // margin: 0 auto;
    font-size: 1.5rem;
    font-weight: 600;
    margin-right: 8px;
  }
}

.main {
  padding: 2rem 1rem;
}

@media (max-width: 768px) {
  .search-container {
    padding: 0.75rem;
  }

  .header {
    padding: 1rem;

    h1 {
      font-size: 1.25rem;
    }
  }

  .main {
    padding: 1rem;
  }
}
</style>
