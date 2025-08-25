import type {NavigationMenuItem} from '@nuxt/ui'

export interface IMenuProps {
  items: NavigationMenuItem[],
  drawerDirection?: 'left' | 'right'
}
