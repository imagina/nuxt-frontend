export interface Status
{
  id: number;
  title: string;
}

export interface Locatable
{
  id: number;
  address: string;
  cityId: number;
  provinceId: number;
  countryId: number;
  entityId: number;
  entityType: string;
  lat: string;
  lng: string;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string;
  updatedBy: string | null;
  deletedAt: string | null;
  deletedBy: string | null;
}

export interface Office
{
  id: number;
  title: string;
  description: string;
  statusId: number;
  status: Status;
  locatable: Locatable;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string;
  updatedBy: string | null;
  deletedAt: string | null;
  deletedBy: string | null;
}
