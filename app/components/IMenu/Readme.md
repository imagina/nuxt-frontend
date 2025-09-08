# IMenu Component

## Props

- `items` **(NavigationMenuItem[])**:  
  Array of menu items, following the [`NavigationMenuItem` type](https://ui.nuxt.com/components/navigation-menu).  
  Each item can include:
  - `label`: text of the menu item.
  - `icon`: optional icon.
  - `to`: link destination (Nuxt route or external URL).
  - `children`: optional submenu items.

- `drawerDirection` **("left" | "right", default: `"right"`)**:  
  Direction where the mobile drawer will appear.

- `desktopNavProps` **(Record<string, unknown>**, default: `{ class: 'hidden lg:flex' }`)**  Props/attributes passed **directly** to desktop `<UNavigationMenu>` via `v-bind`.


## Behavior

- On desktop (`md+` breakpoints):  
  Renders a horizontal `UNavigationMenu`.

- On mobile (`< md` breakpoints):  
  Displays a `UDrawer` that opens from the configured direction.  
  Inside the drawer, the menu is rendered vertically.

## Slots

- `#header`: Drawer header slot.  
  By default it shows a title (`DialogTitle`) and description (`DialogDescription`), plus a close button.

- `#body`: Drawer body slot.  
  By default it renders the vertical `UNavigationMenu`.

## Example — Basic Usage

```vue
<script setup lang="ts">
import IMenu from '~/components/IMenu/IMenu.vue'
import type { NavigationMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  {
    label: 'Services',
    children: [
      { label: 'Consulting', to: '/services/consulting' },
      { label: 'Development', to: '/services/development' }
    ]
  },
  { label: 'Contact', to: '/contact' }
]
</script>

<template>
  <IMenu :items="items" drawer-direction="left" />
</template>
