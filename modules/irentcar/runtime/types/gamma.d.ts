import type {Thumbnails} from "#islider/types/slider";

export interface FuelType
{
  id: number;
  title: string;
}

export interface TransmissionType
{
  id: number;
  title: string;
}

export interface VehicleType
{
  id: number;
  title: string;
}

interface GammaFile
{
  disk: string | null;
  extension: string | null;
  filename: string | null;
  filesize: number | null;
  folderId: number | null;
  hasThumbnails: boolean | null;
  hasWatermark: boolean | null;
  isFolder: number; // 0 = false, 1 = true
  isImage: boolean;
  isVideo: boolean;
  mimetype: string | null;
  path: string;
  thumbnails: Thumbnails;
  url: string;
  visibility: string | null;
}

export interface Gamma
{
  id: number;
  title: string;
  summary: string;
  description: string; // contains HTML string
  doors: number;
  luggage: number;
  passengersNumber: number;
  nextGammaId: number;
  options: string | null; // adjust if it's an array or object in real API
  files: { mainimage: GammaFile };

  fuelTypeId: number;
  fuelType: FuelType;

  transmissionTypeId: number;
  transmissionType: TransmissionType;

  vehicleTypeId: number;
  vehicleType: VehicleType;

  createdAt: string; // ISO datetime
  createdBy: string | null;
  updatedAt: string; // ISO datetime
  updatedBy: string | null;
  deletedAt: string | null;
  deletedBy: string | null;
}
