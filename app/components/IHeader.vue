<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { NavigationMenuItem } from '@nuxt/ui'
import { imenuMenusRepository } from '#imenu/utils/repository'
import type { Menu, Translation, MenuItem } from '#imenu/types/menus'

const itemsOld = ref<NavigationMenuItem[]>([
  {
    label: 'Guide',
    icon: 'i-lucide-book-open',
    to: '/getting-started',
    children: [
      {
        label: 'Introduction',
        description: 'Fully styled and customizable components for Nuxt.',
        icon: 'i-lucide-house'
      },
      {
        label: 'Installation',
        description: 'Learn how to install and configure Nuxt UI in your application.',
        icon: 'i-lucide-cloud-download'
      },
      {
        label: 'Icons',
        icon: 'i-lucide-smile',
        description: 'You have nothing to do, @nuxt/icon will handle it automatically.'
      },
      {
        label: 'Colors',
        icon: 'i-lucide-swatch-book',
        description: 'Choose a primary and a neutral color from your Tailwind CSS theme.'
      },
      {
        label: 'Theme',
        icon: 'i-lucide-cog',
        description: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.'
      }
    ]
  },
  {
    label: 'Composables',
    icon: 'i-lucide-database',
    to: '/composables',
    children: [
      {
        label: 'defineShortcuts',
        icon: 'i-lucide-file-text',
        description: 'Define shortcuts for your application.',
        to: '/composables/define-shortcuts'
      },
      {
        label: 'useOverlay',
        icon: 'i-lucide-file-text',
        description: 'Display a modal/slideover within your application.',
        to: '/composables/use-overlay'
      },
      {
        label: 'useToast',
        icon: 'i-lucide-file-text',
        description: 'Display a toast within your application.',
        to: '/composables/use-toast'
      }
    ]
  },
  {
    label: 'Components',
    icon: 'i-lucide-box',
    to: '/components',
    active: true,
    children: [
      {
        label: 'Link',
        icon: 'i-lucide-file-text',
        description: 'Use NuxtLink with superpowers.',
        to: '/components/link'
      },
      {
        label: 'Modal',
        icon: 'i-lucide-file-text',
        description: 'Display a modal within your application.',
        to: '/components/modal'
      },
      {
        label: 'NavigationMenu',
        icon: 'i-lucide-file-text',
        description: 'Display a list of links.',
        to: '/components/navigation-menu'
      },
      {
        label: 'Pagination',
        icon: 'i-lucide-file-text',
        description: 'Display a list of pages.',
        to: '/components/pagination'
      },
      {
        label: 'Popover',
        icon: 'i-lucide-file-text',
        description: 'Display a non-modal dialog that floats around a trigger element.',
        to: '/components/popover'
      },
      {
        label: 'Progress',
        icon: 'i-lucide-file-text',
        description: 'Show a horizontal bar to indicate task progression.',
        to: '/components/progress'
      }
    ]
  },
  {
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    badge: '3.8k',
    to: 'https://github.com/nuxt/ui',
    target: '_blank'
  },
  {
    label: 'Help',
    icon: 'i-lucide-circle-help',
    disabled: true
  }
])



const menuId = 1
const logoColor = ref('https://components.ozonohosting.com/assets/media/logo-8-horizontal-letra-roja-negra-ready-rent-cars.png?u=1753882751')

// carga menu
const { data, pending, error } = await useAsyncData(
  `menu:${menuId}`,
  () => imenuMenusRepository.show(menuId),
  { server: false }
)
const { locale } = useI18n()
const code = computed(() => (locale.value || 'es').split('-')[0]) // es, en, ...

function mapNode(m: MenuItem): NavigationMenuItem {

  const t = (m as Record<string, any>)[code.value] ?? { title: m.title, url: m.url }

  return {
    label: t.title ?? m.title,
    to: t.url ?? m.url,
    target: m.target,
    disabled: m.status !== 1,
    icon: m.icon || undefined,
    children: (m as any).children?.map(mapNode) // falta probar con hijos
  }
}

const items = computed<NavigationMenuItem[]>(() => {
  const menu: Menu | undefined = data.value?.data
  const list = menu?.menuItems ?? []
  return list.map(mapNode)
})
</script>


<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="logo">
          <img :src="logoColor" style="width:144px; height:33px; object-fit: contain; " alt="Rent Cars">
          <!--<IMedia
            alt="Rent Cars"
            :base-src="logoColor"
            width="w-[144px]"
            height="h-[33px]"
            object="contain"
            link-href="/"
          />-->
        </div>

        <div class="menu">
          <ClientOnly>
            <div v-if="pending">Cargando menú…</div>
            <div v-else-if="error">No se pudo cargar el menú</div>
            <IMenu v-else :items="items" />
          </ClientOnly>
        </div>

      </div>
    </div>
  </header>
</template>
