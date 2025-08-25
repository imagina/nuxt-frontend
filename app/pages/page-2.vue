<script setup lang="ts">
  import type { PageData } from '#ipage/types/pages'
  defineProps<{ page: PageData }>()


const impBody = "<div class=\"btgrid\">\n<div class=\"grid grid-cols-12 gap-10 items-center\">\n<div class=\"col-span-12 lg:col-span-6\">\n<div class=\"content\">\n<p><img alt=\"\" src=\"/images/img-quienes-somos.jpg\" style=\"width: 100%; height: 450px; border-radius: 30px;     object-fit: cover;\" /></p>\n</div>\n</div>\n\n<div class=\"col-span-12 lg:col-span-6\">\n<div class=\"content\">\n<p><span style=\"color:#980027;\">Rent Cars</span></p>\n\n<h1>Sobre nosotros</h1>\n\n<p>Ready Rent Cars somos una empresa Colombiana con enfoque internacional que ofrece el mejor servicio, la mejor tarifa; facilit&aacute;ndote el alquiler de autos y consiguiendo que tengas una estad&iacute;a, viaje de negocio o familiar placentero. Contamos con veh&iacute;culos de caracter&iacute;sticas y tama&ntilde;os distintos, compactos, autom&aacute;ticos y mec&aacute;nicos.</p>\n</div>\n</div>\n</div>\n</div>\n\n<div class=\"btgrid\">\n<div class=\"grid grid-cols-12 gap-10\">\n<div class=\"col-span-12 lg:col-span-6\">\n<div class=\"content\">\n<h2>Misi&oacute;n</h2>\n\n<p>Ofrecer nuestros servicios de alquiler de autos y servicios complementarios con una alta calidad y servicio personalizado comprometidos con cada uno de nuestros clientes para que su experiencia en nuestro pa&iacute;s sea agradable y placentera, dispuestos en cada momento a brindar apoyo log&iacute;stico en cualquier situaci&oacute;n.</p>\n</div>\n</div>\n\n<div class=\"col-span-12 lg:col-span-6\">\n<div class=\"content\">\n<h2>Visi&oacute;n</h2>\n\n<p>Ready Rent Cars, desea consolidar su marca principalmente a nivel nacional con un enfoque internacional para situarnos en el primer lugar de servicio al cliente en todos los aspectos de alquiler de veh&iacute;culos y servicios de turismo.</p>\n</div>\n</div>\n</div>\n</div>\n\n<p>&nbsp;</p>\n\n<hr />\n<p>&nbsp;</p>\n\n<div class=\"btgrid\">\n<div class=\"grid grid-cols-12 gap-10\">\n<div class=\"col-span-12 lg:col-span-6\">\n<div class=\"content\">\n<h2>Importante</h2>\n\n<ul>\n\t<li>El veh&iacute;culo se entrega limpio y full de combustible y se debe retornar en las mismas condiciones&nbsp;</li>\n\t<li>Nos reservamos el derecho de aceptaci&oacute;n.</li>\n\t<li>(Debe cumplir los requisitos establecidos por Ready Rent Cars)</li>\n</ul>\n</div>\n</div>\n\n<div class=\"col-span-12 lg:col-span-6\">\n<div class=\"content\">\n<h2>M&eacute;todos de pago</h2>\n\n<p><img alt=\"\" src=\"https://dev-surtiplate.ozonohosting.com/assets/media/paymente-methods.png?u=1755719818\" style=\"width: 100%; height: 50px; object-fit: contain;\" /></p>\n</div>\n</div>\n</div>\n</div>\n\n<p>&nbsp;</p>";

const titles = {
  title: "Contáctanos",
  subtitle: "Te responderemos tan pronto como nos sea posible, ¡Gracias!",
};

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

  & hr {
    border-top: 1px solid #00000026;
  }
  & .col-span-12 {
    margin-bottom: 30px;
  }
}

</style>
<template>
  <div>
    <!-- Nosotros -->
    <IBreadcrumb
      :title="page.title ?? '...'"
      :ui="{ link: 'font-bold text-gray-3' }"
    />
    <section class="container mx-auto py-10 px-4 sm:px-6 lg:px-10">
      <h1 class="page-title hidden">{{ page.title }}</h1>
      <div class="page-body" v-html="impBody"></div>
    </section>
    <!-- Form Contacto -->
    <section class="pt-20 form-contact pb-20 px-4">
    <UCard class="shadow-md rounded-3xl lg:max-w-3/4 xl:max-w-1/2 mx-auto">
      <h2 class="text-primary text-center text-[30px] lg:text-[45px] font-semibold mb-2  ">
        {{ titles.title }}
      </h2>
      <p class="text-center text-[16px] lg:text-[18px]  mb-10 ">
        {{ titles.subtitle }}
      </p>
      <FormContact />
    </UCard>
  </section>
  </div>
</template>
