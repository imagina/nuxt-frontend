export interface Translation {
  title: string
  status?: number
  uri?: string
  url?: string
  description?: string
}

export interface Menu {
  id: number
  systemName: string
  createdAt: string
  createdBy: string | null
  deletedAt: string | null
  deletedBy: string | null
  updatedAt: string
  updatedBy: string | null
  isRoot: number
  primary: number
  menuItems?: MenuItem[]
  title?: string
  status?: number
  locales?: Record<string, Translation>
}

export interface MenuItem {
  id: number
  menuId: number
  parentId: number
  position: number
  systemName: string
  title: string
  description: string
  icon: string | null
  class: string | null
  target: '_self' | '_blank' | string
  linkType: 'internal' | 'external' | string
  status: number
  uri: string
  url: string
  createdAt: string
  createdBy: string | null
  updatedAt: string
  updatedBy: string | null
  deletedAt: string | null
  deletedBy: string | null
  isRoot: number | null
  depth: number | null
  lft: number | null
  rgt: number | null
  children?: MenuItem[]
  es?: Translation
  en?: Translation
  locales?: Record<string, Translation>
}
