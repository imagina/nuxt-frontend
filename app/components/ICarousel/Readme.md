# ICarousel Component

## Props

- `items`: array of items to display in the carousel.
- `carouselProps`: additional props for `UCarousel` [https://ui.nuxt.com/components/carousel#props].
- `dotsPosition`: position of the navigation dots (default: `inside-bottom-middle`).
- `arrowsPosition`: position of the navigation arrows (default: `inside-between-middle`).

## Slots

- `item`: slot to customize the rendering of each carousel item.
  - `item`: the current item.
  - `index`: index of the current item.

## Example

```vue
<ICarousel 
  :items="myItems"
  :carousel-props="{
    dots: true,
    arrows: true,
  }"
>
  <template #item="{ item, index }">
    <div>{{ index }} - {{ item.name }}</div>
  </template>
</ICarousel>
