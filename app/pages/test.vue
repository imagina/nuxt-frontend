<script setup lang="ts">

const logo = {
  isImage: true,
  url: "/images/Logo-colbitumen.png",
};

const items = [
  {
    src: { url: "/images/Logo-colbitumen.png" },
    alt: "Colbitumen",
    href: "/colbitumen",
  },
  {
    src: { url: "/images/Logo-laboratorio.png" },
    alt: "Laboratorio Colbitumen",
    href: "/laboratorio",
  },
  {
    src: { url: "/images/Logo-Comercializadora.png" },
    alt: "Comercializadora Internacional",
    href: "/comercializadora",
  },
  {
    src: { url: "/images/Logo-Asfalcargo.png" },
    alt: "Asfalcargo",
    href: "/asfalcargo",
  },
  { outline: true, label: "TRABAJA CON NOSOTROS", href: "/trabaja" },
];
</script>

<template>
  <section class="relative min-h-screen overflow-hidden bg-black bg-imagen">
    <!-- Contenido centrado -->
    <div
      class="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4"
    >
      <!-- Logo / título principal -->
      <div class="mb-5 text-center">
        <IMediaRender
          :media="logo"
          alt="logo"
          aspect-ratio="aspect-16/9"
          :ui="{
            wrapper: '',
            container: 'h-[120px]',
            media: '!h-[120px] object-contain ',
          }"
        />
      </div>

      <!-- Botones con logos -->
      <nav class="w-full space-y-5 max-w-[300px]">
        <template v-for="(item, i) in items" :key="i">
          <NuxtLink
            v-if="item.outline"
            :to="item.href || '#'"
            class="text-[20px] leading-[25px] text-center flex items-center justify-center rounded-full border-2 border-white/80 px-6 py-2 text-white font-semibold tracking-wide shadow-lg backdrop-blur hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            {{ item.label || "TRABAJA CON NOSOTROS" }}
          </NuxtLink>

          <NuxtLink
            v-else
            :to="item.href || '#'"
            class="group flex items-center justify-center rounded-full bg-white/95 shadow-xl ring-1 ring-black/10 backdrop-blur transition hover:translate-y-[-1px] hover:shadow-2xl"
          >
            <IMediaRender
              :media="item.src"
              alt="logo"
              aspect-ratio="aspect-16/9"
              :ui="{
                wrapper: '  ',
                container: ' h-[79px]',
                media: ' object-contain',
              }"
            />
          </NuxtLink>
        </template>
      </nav>
    </div>
  </section>
</template>
<style>
.bg-imagen {
  background-image: url("images/fondo.jpg");
  background-size: cover;
}
</style>
