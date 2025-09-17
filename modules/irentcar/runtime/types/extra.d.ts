import type {GammaOffice} from "#irentcar/types/gammaOffice";
import type {PriceConversion} from "#irentcar/types/priceConversion";

export interface ExtraPivot
{
  id: number
  extraId: number
  gammaOfficeId: number
  price: string
  createdAt: string
  updatedAt: string
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
  pivot?: ExtraPivot
}

export interface GammaOfficeExtra
{
  id: number
  extraId: number
  gammaOfficeId: number
  price: string
  createdAt: string
  updatedAt: string
  extra: Extra,
  priceConversions?: PriceConversion
}
