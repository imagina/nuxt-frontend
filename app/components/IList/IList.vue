<script setup lang="ts">
  import type {IListProps} from './IList'

  const props = defineProps<IListProps>()
  const emit = defineEmits<{
    (e: 'update:page', page: number): void
  }>()

  const currentPage = ref(props.paginate?.page ?? 1)

  const paginatedItems = computed(() =>
  {
    if (!props.paginate || props.paginate.sync === false)
    {
      return props.items
    }
    const start = (currentPage.value - 1) * props.paginate.itemsPerPage
    const end = start + props.paginate.itemsPerPage
    return props.items.slice(start, end)
  })

  function onPageChange (page: number)
  {
    currentPage.value = page
    if (props.paginate?.sync === false)
    {
      emit('update:page', page)
    }
  }
</script>

<template>
  <div :class="['flex flex-col gap-6', ui?.wrapper]">
    <!-- Header -->
    <div v-if="title || description" :class="['space-y-1', ui?.header]">
      <h2 v-if="title" :class="['text-xl font-bold', ui?.title]">{{ title }}</h2>
      <p v-if="description" :class="['text-gray-600 dark:text-gray-400', ui?.description]">
        {{ description }}
      </p>
    </div>

    <!-- Grid with overlay loader -->
    <div class="relative">
      <div :class="['grid gap-4', gridCols || 'grid-cols-1', ui?.grid]">
        <template v-for="(item, index) in paginatedItems" :key="item.id || index">
          <component :is="itemComponent" :item="item"/>
        </template>
      </div>

      <!-- Overlay -->
      <div
        v-if="loading"
        :class="[
          'absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-black/50 z-10',
          ui?.loader
        ]"
      >
        <span class="animate-spin rounded-full h-8 w-8 border-4 border-gray-400 border-t-transparent"/>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="paginate" :class="['flex justify-end', ui?.pagination]">
      <UPagination
        v-model="currentPage"
        :total="paginate.total"
        :page-count="paginate.itemsPerPage"
        @update:page="onPageChange"
      />
    </div>
  </div>
</template>
