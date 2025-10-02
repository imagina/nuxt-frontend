<script setup lang="ts">

const logo = {
  isImage: true,
  url: '/images/Logo-colbitumen.png',
}
const posts = [{},{},{},{}]
const soluciones = [
  {
    id: 1,
    title: "Normalizados",
    summary:
      "Asfaltos de alta calidad, fabricados bajo normas técnicas nacionales e internacionales. Brindan estabilidad y desempeño confiable en proyectos viales urbanos y carreteras de alto tránsito.",
    image: { isImage: true, url: "/images/requisitos.jpg" },
    href: "/soluciones/normalizados",
  },
  {
    id: 2,
    title: "Asfalto Modificado con Polímeros",
    summary:
      "Diseñado para mayor resistencia y durabilidad, mejora la elasticidad y reduce costos de mantenimiento en condiciones de tráfico y clima exigentes.",
    image: { isImage: true, url: "/images/requisitos.jpg" },
    href: "/soluciones/asfalto-modificado-con-polimeros",
  },
  {
    id: 3,
    title: "Asfaltos Modificados con GCR y Plásticos Posconsumo",
    summary:
      "Una solución sostenible que reutiliza caucho y plásticos reciclados, ofreciendo pavimentos más resistentes y responsables con el medio ambiente.",
    image: { isImage: true, url: "/images/requisitos.jpg" },
    href: "/soluciones/asfaltos-modificados-gcr-plasticos-posconsumo",
  },
  {
    id: 4,
    title: "Asfaltos Modificados con GCR y Plásticos Posconsumo",
    summary:
      "Una solución sostenible que reutiliza caucho y plásticos reciclados, ofreciendo pavimentos más resistentes y responsables con el medio ambiente.",
    image: { isImage: true, url: "/images/requisitos.jpg" },
    href: "/soluciones/asfaltos-modificados-gcr-plasticos-posconsumo",
  },
    {
    id: 5,
    title: "Asfaltos Modificados con GCR y Plásticos Posconsumo",
    summary:
      "Una solución sostenible que reutiliza caucho y plásticos reciclados, ofreciendo pavimentos más resistentes y responsables con el medio ambiente.",
    image: { isImage: true, url: "/images/requisitos.jpg" },
    href: "/soluciones/asfaltos-modificados-gcr-plasticos-posconsumo",
  },
    {
    id: 6,
    title: "Asfaltos Modificados con GCR y Plásticos Posconsumo",
    summary:
      "Una solución sostenible que reutiliza caucho y plásticos reciclados, ofreciendo pavimentos más resistentes y responsables con el medio ambiente.",
    image: { isImage: true, url: "/images/requisitos.jpg" },
    href: "/soluciones/asfaltos-modificados-gcr-plasticos-posconsumo",
  },
    {
    id: 7,
    title: "Asfaltos Modificados con GCR y Plásticos Posconsumo",
    summary:
      "Una solución sostenible que reutiliza caucho y plásticos reciclados, ofreciendo pavimentos más resistentes y responsables con el medio ambiente.",
    image: { isImage: true, url: "/images/requisitos.jpg" },
    href: "/soluciones/asfaltos-modificados-gcr-plasticos-posconsumo",
  },
];
</script>

<template>
  <!-- Asfalcargo -->
<CSliderMain>
     <template #curve>
      <svg
      class="pointer-events-none absolute left-0 bottom-[-1px] block w-full h-20 text-white"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,0 C360,120 1080,120 1440,0 L1440,120 L0,120 Z"
        fill="currentColor"
      />
    </svg>
     </template>
  </CSliderMain>

  <CListPost :posts="posts"></CListPost>

  <!-- Carousel Clientes -->
  <CClients :items-c="soluciones"></CClients>
</template>
