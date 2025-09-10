import type {Office} from './office'
import type {Gamma} from './gamma'

export interface Status
{
  id: number
  title: string
}

export interface Extra
{
  id: number
  title: string
  description: string
  createdAt: string
  createdBy: string | null
  updatedAt: string
  updatedBy: string | null
  deletedAt: string | null
  deletedBy: string | null
  pivot: {
    id: number
    extraId: number
    gammaOfficeId: number
    price: string
    createdAt: string
    updatedAt: string
  }
}


export interface GammaOffice
{
  createdAt: string // ISO date string
  createdBy: string | null
  deletedAt: string | null
  deletedBy: string | null
  gammaId: number
  gamma: Gamma
  id: number
  officeId: number
  office: Office
  price: string // si siempre viene como string (ej: "100000.00")
  quantity: number
  status: Status
  statusId: number
  tax: string // también string en el JSON ("0.00")
  updatedAt: string
  updatedBy: string | null
  extras?: Extra[]
}
