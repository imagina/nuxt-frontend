import type {CarouselProps, CarouselItem} from '#ui/types'
import type {ArrayPositionsKeys, DotsPositionsKeys} from './config'

export interface IcarouselProps
{
  items: CarouselItem[]
  carouselProps?: CarouselProps
  dotsPosition?: DotsPositionsKeys;
  arrowsPosition?: ArrayPositionsKeys;
}
