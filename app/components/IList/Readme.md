# IList Component

A flexible list/grid component with optional pagination and customizable layout.  
Built with **Nuxt UI** and **TailwindCSS**.

---

## Props

- `title?: string`  
  Optional title for the list.

- `description?: string`  
  Optional description below the title.

- `items: unknown[]`  
  The array of items to render. Each item will be passed as a prop to `itemComponent`.

- `itemComponent: Component`  
  The Vue component used to render each item. It must accept a prop `item`.

- `gridCols?: string`  
  TailwindCSS grid class for controlling the number of columns (e.g., `grid-cols-3`, `sm:grid-cols-2 md:grid-cols-4`).

- `ui?: object`  
  Customize styles for different sections of the component.
  - `wrapper?: string` — wrapper div.
  - `header?: string` — container for title + description.
  - `title?: string` — title styles.
  - `description?: string` — description styles.
  - `grid?: string` — grid wrapper for items.
  - `pagination?: string` — pagination wrapper.

- `paginate?: IPaginate`  
  Enables pagination when provided.
  ```ts
  interface IPaginate {
    page: number
    itemsPerPage: number
    total: number
    sync?: boolean // true: local pagination, false: remote pagination (emits event)
  }

## Example

#### Local Pagination
```vue
<script setup lang="ts">
import IList from '~/components/IList/IList.vue'
import CardItem from '~/components/CardItem.vue'

const items = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`
}))

const paginate = {
  page: 1,
  itemsPerPage: 6,
  total: items.length,
  sync: true
}
</script>

<template>
  <IList
    title="Local List"
    description="This list uses local pagination"
    :items="items"
    :itemComponent="CardItem"
    grid-cols="grid-cols-3"
    :paginate="paginate"
  />
</template>
```

#### Remote Pagination (API style)
```vue
<script setup lang="ts">
import { ref } from 'vue'
import IList from '~/components/IList/IList.vue'
import CardItem from '~/components/CardItem.vue'

// Fake API data
const allItems = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Remote Item ${i + 1}`
}))

const items = ref<{ id: number, title: string }[]>([])
const paginate = ref({
  page: 1,
  itemsPerPage: 5,
  total: allItems.length,
  sync: false
})

function fetchPage(page: number) {
  const start = (page - 1) * paginate.value.itemsPerPage
  const end = start + paginate.value.itemsPerPage
  items.value = allItems.slice(start, end)
}

// Initial load
fetchPage(paginate.value.page)

function onPageChange(page: number) {
  paginate.value.page = page
  fetchPage(page)
}
</script>

<template>
  <IList
    title="Remote List"
    description="This list fetches data per page"
    :items="items"
    :itemComponent="CardItem"
    grid-cols="grid-cols-2"
    :paginate="paginate"
    @update:page="onPageChange"
  />
</template>
```
