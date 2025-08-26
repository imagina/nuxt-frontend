# IsliderCarousel Component

A wrapper around [`ICarousel`] that automatically fetches slides from the `isliderSliderRepository` and optionally renders them using a themed item component.

---

## Props

- `systemName` **(string)**: Identifier of the slider to fetch from the API.
- `itemTheme` **(ItemTheme, optional)**: Name of the item theme component located in `./items/`.
  - Example: `"ItemTheme1"`, `"HeroBanner"`.
  - If not provided, defaults to `"ItemTheme1"`.
- Inherits all props from [`ICarousel`], **except**:
  - `items`: Not required since slides are fetched internally.

---

## Slots

- `#item="{ item }"`: Custom slot to render a slide item.
  - Overrides the default themed item.
  - Receives an object:
    - `item`: The current slide (`Slide`).

---

## Emits

- Inherits all events from [`ICarousel`].

---

## Theming

- The component can dynamically load item components from the `./items/` folder.
- You can create a new theme by adding a Vue file (e.g. `./items/PromoCard.vue`) and using it via the `itemTheme` prop.

```vue
<ItemTheme1 :item="item" />
<HeroBanner :item="item" />
```

---

## Examples


### Default Themed Carousel
```vue
<IsliderCarousel system-name="home_banner" item-theme="ItemTheme1" />
```

### Custom Slot Override
```vue
<IsliderCarousel system-name="promo_slider">
  <template #item="{ item }">
    <div class="p-4 bg-gray-100 rounded-xl">
      <h3 class="text-lg font-bold">{{ item.?.title }}</h3>
      <p>{{ item.description }}</p>
    </div>
  </template>
</IsliderCarousel>
```
