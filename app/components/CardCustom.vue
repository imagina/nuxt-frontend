<script setup lang="ts">
const props = defineProps<{
  item: {
    id: number;
    title?: string;
    name?: string;
    image?: string;
    translations?: Array<{
      name: string;
      locale: string;
    }>;
  }
}>();


const vehicleImage = computed(() => {
  return props.item.image || '/images/default-car.png';
});

// Si quieres validar que la imagen existe antes de usar IMediaRender
const mediaObject = computed(() => ({
  isImage: true,
  url: vehicleImage.value
}));
</script>

<template>
  <div
    class="rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">

    <div class="bg-gray-100 p-6 flex items-center justify-center h-48">
      <IMediaRender :media="mediaObject" :alt="item.summary" aspect-ratio="auto" :ui="{
        wrapper: 'w-full h-full',
        container: 'w-full h-full flex items-center justify-center',
        media: 'max-w-full max-h-full object-contain'
      }" />
    </div>

    <!-- Contenido de la tarjeta -->
    <div class="p-4 text-center">
      <!-- Nombre del vehículo -->
      <h3 class="font-semibold text-gray-900 text-lg mb-1">
        {{ item.summary }}
      </h3>

      <h3 class="font-semibold text-gray-900 text-lg mb-1">
        {{ item.title }}
      </h3>


      <p class="text-gray-500 text-sm mb-4 uppercase tracking-wide">

      </p>


      <div class="flex flex-wrap items-center justify-center gap-2 text-gray-600 text-sm mb-4">
        <!-- Mecánico -->
        <div class="flex items-center gap-1">
          <Icon name="material-symbols-light:auto-transmission-sharp" style="" />
          <span>{{ item.transmissionTypeTitle }}</span>
        </div>


        <div class="flex items-center gap-1">
          <Icon name="fa6-solid:user" style="" />
          <span>{{ item.passengersNumber }}</span>
        </div>


        <div class="flex items-center gap-1">
          <Icon name="fa6-solid:gas-pump" style="" />
          {{ item.fuelTypeTitle }}
        </div>


        <div class="flex items-center gap-1">
          <Icon name="fa6-solid:door-closed" style="" />
          {{ item.doors }}
        </div>


      </div>

      <!-- Botón Ver Detalle -->
      <button class="w-full text-primary font-medium py-2 px-4 rounded-lg transition-colors duration-200">
        VER DETALLE
      </button>
    </div>
  </div>
</template>
