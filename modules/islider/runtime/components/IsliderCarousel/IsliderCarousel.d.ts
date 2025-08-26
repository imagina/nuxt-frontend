import type {IcarouselProps} from '~/components/ICarousel/Icarousel'
import type {Slide} from "#islider/types/slider";

export interface IsliderCarouselProps extends Omit<IcarouselProps, 'items'>
{
  systemName: string,
  itemTheme?: string
}

export interface IsliderCarouselItemProps
{
  item: Slide
}
