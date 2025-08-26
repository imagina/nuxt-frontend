<script lang="ts" setup>
import CardCustom from "~/components/CardCustom.vue";
import ICard from "~/components/ICard.vue";

// definePageMeta({
//   layout: "master",
// });

const apiBase = useRuntimeConfig().public.apiBase;

const { data, status, error, pending } = await useAsyncData("cars", () =>
  $fetch(`${apiBase}/irentcar/v1/gammas`, {
    method: 'GET',
    include: 'translations',
  })
);

const breadcrumb = {
  media: {
    isImage: true,
    url: "/images/bannerBreadcrumbCarsImg.jpg",
  },
  title: "Viaja a tu ritmo con Rent Cars, y haz del camino tu momento feliz",
};

const filters = [
  {
    key: "filters",
    label: "Filtros",
    type: "checkbox",
    options: [
      {
        id: 1,
        title: "Kia",
      },
      {
        id: 2,
        title: "Renault",
      },
      {
        id: 3,
        title: "Suzuki",
      },
      {
        id: 4,
        title: "Nissan",
      },
      {
        id: 5,
        title: "Hyundai",
      },
      {
        id: 6,
        title: "Ford",
      },
    ],
  },
  {
    key: "passengers",
    label: "Pasajeros",
    type: "select",
    options: [
      { value: 1, label: "1 Pasajero" },
      { value: 2, label: "2 Pasajeros" },
      { value: 3, label: "3 Pasajeros" },
      { value: 4, label: "4 Pasajeros" },
      { value: 5, label: "5 Pasajeros" },
    ],
  },
  {
    key: "city",
    label: "Ciudad",
    type: "select",
    options: [
      { value: 1, label: "Ciudad 1" },
      { value: 2, label: "Ciudad 2" },
      { value: 3, label: "Ciudad 3" },
      { value: 4, label: "Ciudad 4" },
      { value: 5, label: "Ciudad 5" },
    ],
  },
] as const;

const selectFilter = ref<{
  filters: number[];
  passengers: number;
  city: number;
}>({
  filters: [],
  passengers: 1,
  city: 1,
});

const toggleFilter = (filterId: number) => {
  const index = selectFilter.value.filters.indexOf(filterId);
  if (index > -1) {
    selectFilter.value.filters.splice(index, 1);
  } else {
    selectFilter.value.filters.push(filterId);
  }
};

const isFilterSelected = (filterId: number) => {
  return selectFilter.value.filters.includes(filterId);
};


</script>
<template >
  <div class="bg-white">dw
    <i data-lucide="screen-share" />
    <!-- Atención al cliente -->
    <div class="relative h-[260px] md:h-[350px]">
      <IMediaRender :media="breadcrumb.media" :alt="breadcrumb.title" aspect-ratio="auto" :ui="{
        wrapper: '',
        container: '',
        media: 'absolute inset-0 w-full h-full object-cover',
      }" />
      <div class="absolute inset-0 overlay-slide" />

      <div class="relative h-full flex items-center justify-center max-w-[700px] mx-auto">
        <h2 class="text-white text-center font-bold text-1xl sm:text-2xl md:text-3xl lg:text-[45px]">
          {{ breadcrumb.title }}
        </h2>
      </div>
    </div>
    <IBreadcrumb :title="'Atención al cliente'" :ui="{ link: 'font-bold text-gray-3' }" />

    <section class="container mx-auto py-10 px-4 sm:px-6 lg:px-10">
      <div class="grid gap-10 grid-cols-1 md:grid-cols-3">
        <!-- Columna izquierda: Filtros -->
        <div class="md:col-span-1 filters">
          <UCard class="shadow-md">
            <UAccordion :items="filters as any">
              <template #body="{ item }">
                <!-- Si es checkbox -->
                <template v-if="item.type === 'checkbox'">
                  <div class="space-y-2">
                    <template v-for="option in item.options" :key="option.id">
                      <UCheckbox :model-value="isFilterSelected(option.id)" :label="option.title"
                        @update:model-value="() => toggleFilter(option.id)" />
                    </template>
                  </div>
                </template>

                <!-- Si es select -->
                <template v-if="item.type === 'select'">
                  <USelect v-model="selectFilter[item.key]" arrow :items="item.options" value-attribute="id"
                    text-attribute="label" class="w-full" />
                </template>
              </template>
            </UAccordion>
          </UCard>
        </div>

        <div class="md:col-span-2 items">
          <div v-if="pending">cargando Vehiculos</div>

          <div v-else-if="error">Error: {{ error.message }}</div>

          <div v-else>
            <IList title="Vehículos Disponibles" description="Encuentra el vehículo perfecto para tu viaje"
              :items="data?.data" :item-component="CardCustom" grid-cols="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style></style>
