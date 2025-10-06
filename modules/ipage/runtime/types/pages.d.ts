import type {Thumbnails} from "#islider/types/slider";

interface PageFile
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

export interface PageData
{
  id: number
  title: string | null
  slug: string | null
  body: string | null
  metaTitle: string | null
  metaDescription: string | null
  ogTitle: string | null
  ogDescription: string | null
  ogImage: string | null
  ogType: string | null
  createdAt: string
  updatedAt: string
  createdBy: number
  updatedBy: number
  internal: number
  isHome: boolean | null
  options: Record<string, never> // or specify the keys if known
  systemName: string
  template: string
  type: string
  status: boolean | null
  recordType: string
  files: { mainimage: PageFile }
  // localized content
  es?: PageLocale

  [locale: string]: PageLocale | unknown
}

export interface PageLocale
{
  title: string
  slug: string
  status: boolean
  body: string
  metaTitle: string
  metaDescription: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogType: string
}
