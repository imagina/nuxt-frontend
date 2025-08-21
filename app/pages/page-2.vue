<script setup lang="ts">
  import type { PageData } from '#ipage/types/pages'
  defineProps<{ page: PageData }>()


const impBody = "<div class=\"btgrid\">\n<div class=\"row row-1\">\n<div class=\"col-xs-12 col-md-6\">\n<div class=\"content\">\n<p><img alt=\"\" src=\"https://dev-surtiplate.ozonohosting.com/assets/media/ai.png?u=1727815422\" style=\"width: 166px; height: 100%;\" /></p>\n</div>\n</div>\n\n<div class=\"col-xs-12 col-md-6\">\n<div class=\"content\">\n<p><span style=\"color:#980027;\">Rent Cars</span></p>\n\n<h1>Sobre nosotros</h1>\n\n<p>Ready Rent Cars somos una empresa Colombiana con enfoque internacional que ofrece el mejor servicio, la mejor tarifa; facilit&aacute;ndote el alquiler de autos y consiguiendo que tengas una estad&iacute;a, viaje de negocio o familiar placentero. Contamos con veh&iacute;culos de caracter&iacute;sticas y tama&ntilde;os distintos, compactos, autom&aacute;ticos y mec&aacute;nicos.</p>\n</div>\n</div>\n</div>\n</div>\n\n<div class=\"btgrid\">\n<div class=\"row row-1\">\n<div class=\"col-xs-12 col-md-6\">\n<div class=\"content\">\n<h2>Misi&oacute;n</h2>\n\n<p>Ofrecer nuestros servicios de alquiler de autos y servicios complementarios con una alta calidad y servicio personalizado comprometidos con cada uno de nuestros clientes para que su experiencia en nuestro pa&iacute;s sea agradable y placentera, dispuestos en cada momento a brindar apoyo log&iacute;stico en cualquier situaci&oacute;n.</p>\n</div>\n</div>\n\n<div class=\"col-xs-12 col-md-6\">\n<div class=\"content\">\n<h2>Visi&oacute;n</h2>\n\n<p>Ready Rent Cars, desea consolidar su marca principalmente a nivel nacional con un enfoque internacional para situarnos en el primer lugar de servicio al cliente en todos los aspectos de alquiler de veh&iacute;culos y servicios de turismo.</p>\n</div>\n</div>\n</div>\n</div>\n\n<p>&nbsp;</p>\n\n<hr />\n<p>&nbsp;</p>\n\n<div class=\"btgrid\">\n<div class=\"row row-1\">\n<div class=\"col-xs-12 col-md-6\">\n<div class=\"content\">\n<h2>Importante</h2>\n\n<ul>\n\t<li>El veh&iacute;culo se entrega limpio y full de combustible y se debe retornar en las mismas condiciones&nbsp;</li>\n\t<li>Nos reservamos el derecho de aceptaci&oacute;n.</li>\n\t<li>(Debe cumplir los requisitos establecidos por Ready Rent Cars)</li>\n</ul>\n</div>\n</div>\n\n<div class=\"col-xs-12 col-md-6\">\n<div class=\"content\">\n<h2>M&eacute;todos de pago</h2>\n\n<p><img alt=\"\" src=\"https://dev-surtiplate.ozonohosting.com/assets/media/paymente-methods.png?u=1755719818\" style=\"width: 100%; height: 10px;\" /></p>\n</div>\n</div>\n</div>\n</div>\n\n<p>&nbsp;</p>";

</script>

<template>
  <div>
    <!-- Nosotros -->
    <IBreadcrumb
      :title="page.title ?? '...'"
      :ui="{ link: 'font-bold text-gray-3' }"
    />
    <section class="container mx-auto py-10 px-4">
      <h1 class="page-title">{{ page.title }}</h1>
      <div class="page-body" v-html="impBody"></div>
    </section>
  </div>
</template>
