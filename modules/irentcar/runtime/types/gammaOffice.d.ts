import type {Office} from './office'
import type {Gamma} from './gamma'
import type {Extra} from "#irentcar/types/extra";
import type {PriceConversion} from "#irentcar/types/priceConversion";

export interface Status
{
  id: number
  title: string
}


export interface GammaOffice
{
  createdAt: string
  createdBy: string | null
  deletedAt: string | null
  deletedBy: string | null
  gammaId: number
  gamma: Gamma
  id: number
  officeId: number
  office: Office
  price: string
  quantity: number
  status: Status
  statusId: number
  tax: string
  updatedAt: string
  updatedBy: string | null
  extras?: Extra[]
  priceConversions?: PriceConversion
}
