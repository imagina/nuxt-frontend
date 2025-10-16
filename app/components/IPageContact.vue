<script setup lang="ts">
const props = defineProps({
  page: { type: Object, default: {} },
  link: { type: String, default: '' }
});

const buttonProps = {
  size: 'xl',
  class: 'px-5 py-3 bg-tertiary rounded-full text-[18px] leading-[18px] transition'
}
const ui = {
  root: '',
  actions: 'col-span-12 mt-2',
  title: 'hidden',
  description: 'hidden',
}
</script>

<template>
  <div>
    <!-- Contacto -->
     <IBreadcrumb
      :homeLink="link"
      :title="page.title ?? '...'"
      :ui="{ link: 'font-bold text-gray-3' }">
    </IBreadcrumb>
    <UContainer :class="`page-${page?.id}`" class="py-10 contacto">
      <h1 class="page-title hidden">{{ page.title }}</h1>
      <div class="page-body mb-10" v-html="page.body"></div>
      <div class="flex flex-col gap-10 lg:flex-row">
        <div class="min-w-0 lg:basis-1/2">
          <IformForm
            :button-props="buttonProps"
            :ui="ui" system-name="formulario-pqrsf" />
        </div>
        <div class="min-w-0 lg:basis-1/2">
          <IMediaRender
            :media="page.files.mainimage"
            :alt="page.title"
            aspect-ratio="aspect-1/1"
            :ui="{
              wrapper: '',
              media: 'w-full h-full object-cover rounded-2xl',
            }"
          />
        </div>
      </div>
    </UContainer>
  </div>
</template>
<style scoped>
@reference "~/assets/css/main.css";
.contacto .page-body {
  /* Énfasis y enlaces */
  & :deep(:is(strong,a)) { @apply text-primary; }
}

:deep(input), :deep(textarea) {
  min-height: 40px;
  width: 100%;
  font-size: 16px;
  border: 1px solid rgba(0, 0, 0, 0.15);
}
</style>
