export interface Setting
{
  dataConfig: DataConfig;
  systemName: string;
  isTranslatable: boolean;

  // values
  plainValue?: SettingValue;
  value?: SettingValue;

  // Dynamic locales (es, en, etc.)
  [locale: string]: unknown;

  // Optional media files if isMedia is true
  files?: Record<string, MediaFile>;
}

// -----------------
// SettingValue
// -----------------
export type SettingValue = string | number | boolean | null | Record<string, SettingValue>;

// -----------------
// DataConfig
// -----------------
export interface DataConfig
{
  name: string;
  default: SettingValue;
  isMedia?: "media_single" | "media_multiple" | string;
  dynamicField: DynamicField;
}

export interface DynamicField
{
  fakeFieldName?: string;
  type: string;
  groupName?: string;
  groupTitle?: string;
  columns?: string;
  quickSetting?: boolean;
  props: DynamicFieldProps;
}

export interface DynamicFieldProps
{
  label: string;
  zone?: string;
  entity?: string;
  entityId?: number | null;
}

// -----------------
// Media file structure
// -----------------
export interface MediaFile
{
  disk: string | null;
  extension: string | null;
  filename: string | null;
  filesize: number | null;
  folderId: number | null;
  hasThumbnails: boolean | null;
  hasWatermark: boolean | null;
  isFolder: number;
  isImage: boolean;
  isVideo: boolean;
  mimetype: string | null;
  path: string;
  thumbnails: {
    smallThumb: string;
    mediumThumb: string;
    largeThumb: string;
    extraLargeThumb: string;
  };
  url: string;
  visibility: string | null;
}
