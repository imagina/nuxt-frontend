// Thumbnail sizes for images
interface Thumbnails {
  smallThumb: string;
  mediumThumb: string;
  largeThumb: string;
  extraLargeThumb: string;
}

// File metadata for slide images
interface SlideFile {
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

// Translated/localized slide info
interface LocalizedSlide {
  title: string;
  uri: string;
  url: string;
  active: number;
  customHtml: string;
  summary: string;
  codeAds: string;
}

// A single slide
interface Slide {
  id: number;
  active: number;
  caption: string | null;
  codeAds: string;
  createdAt: string;
  createdBy: number | null;
  customHtml: string;
  deletedAt: string | null;
  deletedBy: number | null;
  es: LocalizedSlide;
  externalImageUrl: string;
  files: {
    slideimage: SlideFile;
  };
  options: {
    animation: string;
  };
  pageId: number | null;
  position: number;
  responsive: number;
  sliderId: number;
  summary: string;
  target: string;
  title: string;
  type: string;
  updatedAt: string;
  updatedBy: number | null;
  uri: string;
  url: string;
}

// Root slider object
export interface Slider {
  id: number;
  active: number;
  createdAt: string;
  createdBy: number;
  deletedAt: string | null;
  deletedBy: number | null;
  options: unknown[];
  slides: Slide[];
  systemName: string;
  title: string;
  updatedAt: string;
  updatedBy: number;
}
