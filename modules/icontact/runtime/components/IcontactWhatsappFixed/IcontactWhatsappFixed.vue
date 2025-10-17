<script setup lang="ts">
import {toRefs} from "vue";

const icontactStore = useIcontactStore();
const open = defineModel<boolean>("open", {default: false});

const props = withDefaults(
  defineProps<{
    side?: "left" | "right";
    title?: string;
    filterText?: string;
  }>(),
  {
    side: "left",
    title: "WhatsApp",
    filterText: "",
  }
);
const {side, title} = toRefs(props);

// lista base desde el store
const allItems = computed(() => icontactStore.getItems("WHATSAPP") ?? []);

// normaliza para comparar sin acentos ni mayúsculas
const normalize = (s: unknown): string =>
  (s ?? "")
    .toString()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

// items filtrados por systemName (substring match)
const items = computed(() => {
  const list = (allItems.value || []).filter((it) => it?.isEnable == 1)
  const q = normalize(props.filterText?.trim())
  if (!q) return list
  return list.filter((it) => normalize(it?.systemName).includes(q))
})

</script>
<template>
  <div>
    <div class="pre-window" :class="side">
      <div @click="open = true" class="icon">
        <i class="fa fa-whatsapp"></i>
      </div>
      <div class="text">¿Hablamos?</div>
    </div>

    <Transition
      enter-active-class="transition-enter-active"
      enter-from-class="transition-enter-form"
      enter-to-class="transition-enter-to"
      leave-active-class="transition-leave-active"
      leave-from-class="transition-leave-form"
      leave-to-class="transition-leave-to"
    >
      <section
        v-if="open"
        role="dialog"
        aria-modal="false"
        class="window"
        :class="side"
      >
      <div class="card-root-ui">
          <div class="card-header-ui">
            <div @click="open = false" class="header-close">
              <i class="fa fa-close"></i>
            </div>
            <div class="header-title">
              <i class="fa fa-whatsapp"></i> WhatsApp
            </div>
            <div class="header-text"> Hola, ¿En que podemos ayudarte? </div>
          </div>

          <div class="content">
            <div class="scroll">
              <a
                class="item-scroll"
                v-for="(it, i) in items"
                :key="i"
                :href="`https://wa.me/+${it.countryCode}${it.value}?text=${it.message}`"
                target="_blank"
                rel="noopener"
              >
                <div class="list-image">
                  <div class="icon"> <i :class="it.icon || 'fa fa-whatsapp'"></i>
                  </div>
                </div>
                <div class="list-info">
                  <div class="title">{{ it.title }}</div>
                  <p class="subtitle">
                    (+{{ it.countryCode }}) {{ it.value }}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Transition>
  </div>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.pre-window {
  @apply fixed bottom-10 left-10 right-auto z-[1000] flex items-center;
}
.pre-window .icon {
  @apply inline-flex h-[54px] w-[54px] items-center justify-center rounded-full
         bg-[#22ce5a] text-white text-[33px] cursor-pointer;
}
.pre-window .text {
  @apply hidden lg:inline-flex relative ml-[25px] rounded-[10px] border-2 border-[#e9e9e9]
         bg-[#f6f6f6] px-5 py-2 font-semibold text-[var(--color-primary)];
}
/* Triángulo del bocadillo (borde exterior gris) */
.pre-window .text::before {
  @apply absolute content-[''] left-[-16px] top-1/2 -translate-y-1/2 transform
         border-y-[8px] border-y-transparent
         border-r-[16px] border-r-[#e9e9e9];
}
/* Triángulo interior (relleno del fondo) */
.pre-window .text::after {
  @apply absolute content-[''] left-[-11px] top-1/2 -translate-y-1/2 transform
         border-y-[8px] border-y-transparent
         border-r-[14px] border-r-[#f6f6f6];
}
/* Variante a la derecha */
.pre-window.right {
  @apply bottom-10 left-auto right-10;
}
.pre-window.right .icon {
  @apply order-1;
}
.pre-window.right .text {
  @apply mr-[25px];
}
/* Triángulos volteados para el lado derecho */
.pre-window.right .text::before {
  @apply right-[-16px] left-auto border-r-0 border-l-[16px] border-l-[#e9e9e9];
}
.pre-window.right .text::after {
  @apply right-[-11px] left-auto border-r-0 border-l-[14px] border-l-[#f6f6f6];
}
/* Ventana de items */
.window {
  @apply fixed bottom-0 md:bottom-4 z-[1500] h-full md:h-auto  w-screen md:w-[350px] bg-[#f6f6f6] rounded-none md:rounded-xl;
}
.window.right {
 @apply  right-0 md:right-4;
}
.window.left {
 @apply  left-0 md:left-4 ;
}
.window .content {
  @apply h-auto md:h-[268px] bg-[#f6f6f6] p-0 overflow-y-auto rounded-none md:rounded-xl;
}
.window .scroll {
  @apply overflow-auto h-full mr-[3px] [scrollbar-width:thin] [scrollbar-color:rgba(0,0,0,0.5)_rgba(0,0,0,0)];
}
.window .header-close {
  @apply rounded px-3 py-1 md:p-1 float-right cursor-pointer;
}
.window .item-scroll {
  @apply border-b border-1 border-zinc-200 flex items-center gap-4 px-3 py-4;
}
.window .item-scroll .icon {
  @apply h-[55px] w-[55px] bg-primary rounded-full text-white flex justify-center items-center;
}
.window .item-scroll .icon i {
  @apply text-[30px];
}
.window .item-scroll .title {
  @apply text-base font-semibold overflow-hidden text-ellipsis;
}
.window .item-scroll .subtitle {
  @apply text-sm;
}

.window .card-header-ui {
  @apply bg-primary text-white p-5 rounded-none md:rounded-t-xl;
}
.window .card-header-ui .header-title {
  @apply text-xl;
}
.window .card-header-ui .header-text {
  @apply text-base;
}
.window .card-root-ui {
  @apply rounded-none md:rounded-xl shadow-none md:shadow-xl;
}
.window .card-body-ui {
  @apply p-0 sm:p-0 rounded-none md:rounded-b-xl;
}
/* Animaciones de ventana */
.transition-enter-active {
  @apply transition ease-out duration-200
}
.transition-enter-from {
  @apply opacity-0 translate-y-6
}
.transition-enter-to {
  @apply opacity-100 translate-y-0;
}
.transition-leave-active {
  @apply transition ease-in duration-150;
}
.transition-leave-from {
  @apply opacity-100 translate-y-0;
}
.transition-leave-to {
  @apply opacity-0 translate-y-6;
}
</style>
