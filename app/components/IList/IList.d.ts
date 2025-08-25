import type {Component} from "vue";

export interface IPaginate {
  page: number
  itemsPerPage: number
  total: number
  sync?: boolean
}

export interface IListProps {
  title?: string
  description?: string
  items: unknown[]
  itemComponent: Component
  gridCols?: string
  ui?: {
    wrapper?: string
    header?: string
    title?: string
    description?: string
    grid?: string
    pagination?: string
    loader?: string
  }
  paginate?: IPaginate
  loading?: boolean
}
