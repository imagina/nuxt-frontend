// Auxiliares
export interface LocalizedInfo
{
  title: string
  value: string
  message: string
}

export type ItemTypes =
  'PHONE'
  | 'WHATSAPP'
  | 'EMAIL'
  | 'FACEBOOK'
  | 'TWITTER'
  | 'INSTAGRAM'
  | 'TIKTOK'
  | 'YOUTUBE'
  | 'LINKEDIN'
  | 'GOOGLE'
  | 'PINTEREST'
  | 'FLICKR'


export interface Type
{
  id: number
  title: string
  icon: string
}

// Principal
export interface Item
{
  countryCode: string
  createdAt: string
  createdBy: number | null
  deletedAt: string | null
  deletedBy: number | null
  entityId: number
  entityType: string
  es: LocalizedInfo
  id: number
  isEnable: 0 | 1
  message: string
  notebookId: number | null
  systemName: string
  title: string
  type: Type
  typeId: number
  updatedAt: string
  updatedBy: number | null
  value: string
}
