<script setup lang="ts">

const buttonProps = {
  size: 'xl',
  block: true,
  class: 'justify-center bg-secondary h-[45px] text-white hover:bg-primary hover:text-white transition'
}
const ui = {
  root: 'shadow-md rounded-3xl lg:max-w-3/4 xl:max-w-1/2 mx-auto bg-white p-6',
  title: 'text-primary text-center text-[30px] lg:text-[45px] leading-none font-semibold mb-2',
  description: 'text-center text-[16px] lg:text-[18px] mb-10 block',
  form: 'grid grid-cols-12 gap-4',
  actions: 'col-span-12 mt-2'
}
</script>

<template>
  <section class="pt-20 form-contact pb-20 px-4">
    <IformForm
      :button-props="buttonProps"
      title="Contáctanos"
      :ui="ui" system-name="contact_form" />
  </section>
</template>

<style scoped>
:deep(label) {
  display: none;
}
:deep(input), :deep(textarea) {
  min-height: 40px;
  font-size: 16px;
  border: 1px solid rgba(0, 0, 0, 0.15);
}
.form-contact {
  background: linear-gradient(360deg,
  var(--color-dark-1) 50%,
  var(--color-gray-1) 50%);
}
</style>
