export interface LocalizedInfo
{
  title: string
  description: string
}

export interface Locatable
{
  address: string;
  cityId: number;
  countryId: number;
  createdAt: string;
  createdBy: string | null;
  deletedAt: string | null;
  deletedBy: string | null;
  description: string;
  entityId: number;
  entityType: string;
  es: LocalizedInfo;
  id: number;
  latitude: string;
  longitude: string;
  provinceId: number;
  systemName: string;
  title: string;
  updatedAt: string;
  updatedBy: string | null;
}
