// iblog/types/pages.d.ts

// Utilidades
type Maybe<T> = T | null | undefined

export interface IblogImageThumbs {
  smallThumb?: string
  mediumThumb?: string
  largeThumb?: string
  extraLargeThumb?: string
}

export interface IblogImage {
  url?: string | null
  path?: string | null
  isImage?: boolean
  isVideo?: boolean
  thumbnails?: IblogImageThumbs
  [key: string]: any
}

export interface IblogFileSet {
  mainimage?: IblogImage
  secondaryimage?: IblogImage
  iconimage?: IblogImage
  breadcrumbimage?: IblogImage
  gallery?: IblogImage[]
  [key: string]: any
}

/* =========================
   CATEGORY
   ========================= */
export interface BlogCategoryLocale {
  title: string
  slug: string
  description?: string
  metaTitle?: string | null
  metaDescription?: string | null
  metaKeywords?: string | null
  status?: number
  translatableOptions?: any
}

export interface BlogCategory {
  id: number
  slug: string
  title: string
  description?: string | null
  status?: number
  parentId?: number
  featured?: number | boolean
  options?: Record<string, any>
  files?: IblogFileSet
  createdAt?: string
  updatedAt?: string
  createdBy?: number | null
  updatedBy?: number | null
  deletedAt?: string | null
  deletedBy?: number | null

  // Locales
  es?: BlogCategoryLocale
  [locale: string]: any
}

/* =========================
   POST
   ========================= */
export interface BlogPostLocale {
  title: string
  slug: string
  description?: string
  summary?: string
  metaTitle?: string | null
  metaDescription?: string | null
  metaKeywords?: string | null
  statusId?: number
  translatableOptions?: any
}

export interface BlogPostStatus {
  id: number
  title: string
}

export interface BlogPost {
  id: number
  slug: string
  title: string
  summary?: string | null
  description?: string | null         // HTML
  body?: string | null                // por si otro endpoint usa body
  content?: string | null
  categoryId: number
  statusId?: number
  status?: BlogPostStatus
  featured?: number | boolean
  files?: IblogFileSet
  options?: Record<string, any>
  dateAvailable?: string | null
  createdAt?: string
  updatedAt?: string
  createdBy?: number | null
  updatedBy?: number | null
  deletedAt?: string | null
  deletedBy?: number | null

  // Locales
  es?: BlogPostLocale
  [locale: string]: any
}

/* =========================
   Paginación (si tu backend la usa en algún listado)
   ========================= */
export interface PaginationMeta {
  current_page: number
  last_page: number
  per_page?: number
  total?: number
  prev_page?: number | null
  next_page?: number | null
}

export interface Paginated<T> {
  items: T[]
  meta?: PaginationMeta
}

/* Compat para repository genérico (si lo necesitas en algún lado) */
export type PageData = any
