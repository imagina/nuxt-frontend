<script setup lang="ts">


definePageMeta({
  layout: 'master'
})

const impBody = "<div class=\"btgrid\">\n<div class=\"grid grid-cols-12 gap-10 items-center\">\n<div class=\"col-span-12 lg:col-span-6\">\n<div class=\"content\">\n<p><img alt=\"\" src=\"https://dev-surtiplate.ozonohosting.com/assets/media/ai.png?u=1727815422\" style=\"width: 100%; height: 450px; border-radius: 30px; object-fit: cover;\" /></p>\n</div>\n</div>\n\n<div class=\"col-span-12 lg:col-span-6\">\n<div class=\"content\">\n<h2>Requisitos</h2>\n\n<p>En caso que la persona que vaya a conducir no sea el due&ntilde;o de la tarjeta de cr&eacute;dito, este ser&aacute; llamado Conductor Adicional y necesitar&aacute; tener una licencia de conducci&oacute;n v&aacute;lida y vigente.</p>\n</div>\n</div>\n</div>\n</div>\n\n<div class=\"btgrid\">\n<div class=\"grid grid-cols-12 gap-10\">\n<div class=\"col-span-12 lg:col-span-6\">\n<div class=\"content\">\n<h2>Persona Natural</h2>\n\n<p>El conductor principal es quien firma el contrato y deber&aacute; presentar los siguientes documentos a su nombre:</p>\n\n<ul>\n\t<li>C&eacute;dula de ciudadania / Pasaporte vigente</li>\n\t<li>Licencia de conducir nacional o extranjera</li>\n\t<li>Tarjeta de cr&eacute;dito con relieve y fondos para deposito de garantia entre $1.600.000 y $2.600.000</li>\n\t<li>Edad del conductor m&iacute;nimo 23 a&ntilde;os</li>\n</ul>\n</div>\n</div>\n\n<div class=\"col-span-12 lg:col-span-6\">\n<div class=\"content\">\n<h2>Persona Jur&iacute;dica</h2>\n\n<p>El representante legal de la compa&ntilde;&iacute;a es quien firma el contrato, deber&aacute; presentar los siguientes documentos a nombre propio o de la compa&ntilde;&iacute;a:</p>\n\n<ul>\n\t<li>C&aacute;mara de comercio no mayor a 15 d&iacute;as</li>\n\t<li>Registro &Uacute;nico Tributario (RUT) actualizado</li>\n\t<li>Carta de intenci&oacute;n firmada por el representante legal solicitando el servicio y aceptando los T&eacute;rminos y Condiciones</li>\n\t<li>C&eacute;dula de ciudadan&iacute;a / Pasaporte vigente</li>\n\t<li>Licencia de conducci&oacute;n nacional o extranjera</li>\n\t<li>Tarjeta de cr&eacute;dito con relieve y fondos para deposito de garant&iacute;a entre $1.600.000 y $2.600.000</li>\n</ul>\n</div>\n</div>\n</div>\n</div>\n\n<p>&nbsp;</p>"



</script>
<style>
.page-body {
  font-family: DM Sans;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  text-align: justify;

  & h1, & h2, & h3, & h4 {
  font-weight: 600;
  margin-bottom: 15px;
  }
  & h1, h2 {
    font-size: 40px;
    line-height: 50px;
  }
  & h3, & h4 {
    font-size: 20px;
    line-height: 30px;
  }

  & ul {
    list-style: disc !important;
    padding-left: 1.25rem;
    margin-top: 15px;
    & li {
    display: list-item;
    margin-bottom: .5rem;
    }
  }

  & ol {
    list-style: decimal !important;
    padding-left: 1.25rem;
    margin-top: 15px;
    & li {
    display: list-item;
    margin-bottom: .5rem;
    }
  }

  @media (max-width: 767.98px) {
  font-size: 18px;
    & h1, h2 {
    font-size: 30px;
    line-height: 40px;
    }

    & h3, & h4 {
    font-size: 20px;
    line-height: 25px;
    }
  }

  & strong, & a {
  color: var(--primary);
  }

}
</style>

<template>
  <div>
    <!-- Requisitos -->
    <IBreadcrumb
      :title="'Requisitos'"
      :ui="{ link: 'font-bold text-gray-3' }"
    />
    <section class="container mx-auto py-10 px-4 sm:px-6 lg:px-10">
      <h1 class="page-title hidden">{{ page?.title ?? 'Requisitos' }}</h1>
      <div class="page-body" v-html="impBody"></div>



    </section>
  </div>
</template>
