export interface MediaFile
{
  youtubeId?: string
  isImage?: boolean
  isVideo?: boolean
  url?: string
  thumbnails?: {
    smallThumb?: string
    mediumThumb?: string
    largeThumb?: string
    extraLargeThumb?: string
  }
}

export interface IMediaRenderProps
{
  media: MediaFile | null
  alt?: string
  title?: string
  fetchPriority?: "high" | "low" | "auto"
  autoplayVideo?: boolean
  loopVideo?: boolean
  mutedVideo?: boolean
  withVideoControls?: boolean
  aspectRatio?: string // "aspect-video", "aspect-square", "aspect-[4/3]"
  ui?: {
    wrapper?: string        // contenedor externo
    container?: string      // div con aspect ratio
    media?: string          // img, video, iframe
  }
}
