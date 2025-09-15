<script setup lang="ts">
import type {PageData} from "#ipage/types/pages";
import CardGamma from '~/components/CardGamma.vue'
import {irentcarGammaRepository} from "#irentcar/utils/repository";

const {data: gammas} = await useAsyncData(
  'irent::homePage', () => irentcarGammaRepository.index({
    include: 'files', take: 12, page: 1
  })
)
const gammasData = computed(() => gammas.value?.data ?? [])
const titlesCart = {title: 'Gamas de Vehículos', subtitle: 'Reserva el tuyo'};
  const settingStore = useIsettingStore();
  defineProps<{ page: PageData }>();


const buttonProps = {
  size: 'xl',
  block: true,
  class: 'justify-center bg-secondary h-[45px] text-white hover:bg-primary hover:text-white transition'
}

const uiImage = {
  wrapper: '',
  container: '',
  media: 'rounded-2xl lg:aspect-4/5 aspect-16/9 shadow-lg object-cover'
}


</script>
<template>
  <div>
    <IsliderCarousel
      system-name="slider_home"
      dots-position="inside-left-middle"
      :carousel-props="{
      dots: true,
      autoplay: true,
      loop: true,
      ui: {
        item: 'h-[260px] sm:h-[360px] md:h-[400px]',
        dot: 'w-[16px] h-[16px] rounded-full bg-[#FFFFFF80] data-[state=active]:bg-secondary'
      }
    }"
    />

    <!-- H1 -->
    <section class="home bg-quaternary py-5">
      <div class="container mx-auto  px-4 sm:px-6 lg:px-10 mb-5">
        <div class="page-body-h1" v-html="page.body"></div>
        <irent-car-form />
      </div>
    </section>
    <!-- List Gamas -->
    <section class="container mx-auto py-10 px-4 sm:px-6 lg:px-10 mb-10">
      <div class="text-center">
        <div class="text-secondary text-[16px] lg:text-[20px]  font-bold uppercase mb-0 ">{{ titlesCart.subtitle }}
        </div>
        <div class="text-primary text-[30px] lg:text-[45px] font-semibold mb-10 ">{{ titlesCart.title }}</div>

        <ICarousel
          :items="gammasData"
          :carousel-props="{
            dots: true,
            loop: true,
            autoplay: true,
            ui: {
              item: 'basis-1/2 md:basis-1/3',
              dot: 'w-[13px] h-[13px] rounded-full data-[state=active]:bg-primary'
            }
          }"
          dots-position="outside-bottom-middle"
          arrows-position="inside-between-middle"
        >
          <template #item="{ item, index }">
            <div class="car-card h-full rounded-xl mb-4">
              <NuxtLink to="/rent-car/stepper">
                <IMediaRender
                  :media="item.files.mainimage" :alt="item.title"
                  aspect-ratio="aspect-4/3"
                  :ui="{
                    wrapper: '',
                    container: 'rounded-xl px-1 bg-quaternary border-1 border-gray-300',
                    media: 'w-full object-contain rounded-xl' }"/>
              </NuxtLink>
              <div class="text-center text-primary leading-[16px] text-[16px] lg:leading-[18px] lg:text-[18px] font-bold mt-4">
                {{ item.summary }}
              </div>
              <div class="text-center text-secondary text-[14px] lg:text-[16px] uppercase my-2 font-bold">
                {{ item.title }}
              </div>
              <div class="text-center">
                <UButton to="/rent-car/stepper" size="xs" color="secondary" class="px-3" loading-auto label="Reserva ahora" />
              </div>
            </div>
          </template>
        </ICarousel>


      </div>
    </section>
    <!-- Info -->
    <IsliderCarousel
      system-name="info-home"
      dots-position="inside-left-middle"
      :carousel-props="{
      dots: false,
      autoplay: true,
      loop: false,
      active: false,
    }">
      <template #item="{ item }">
        <section class="relative py-15 mb-15">
          <div class="absolute inset-0 lg:inset-y-0 lg:left-0 lg:w-1/3 bg-secondary rounded-e-2xl"></div>
          <div
            class="relative max-w-7xl mx-auto px-4 flex flex-col-reverse lg:flex-row justify-end items-center gap-20 lg:gap-50">
            <!-- Image column -->
            <div class="w-full lg:w-2/5 lg:-mr-[140px]">
              <IMediaRender
                :media="item.files.slideimage"
                :alt="item.title"
                aspect-ratio="auto"
                :ui="uiImage"
                />
            </div>
            <!-- Text column -->
            <div class="w-full lg:w-1/2 space-y-6">
              <p
                class="text-white lg:text-secondary text-[16px] lg:text-[20px] font-bold uppercase mb-0 text-center lg:text-left">
                {{ item.summary }}
              </p>
              <h2
                class="text-white lg:text-primary text-[30px] lg:text-[45px]  font-semibold mb-5 text-center lg:text-left">
                {{ item.title }}
              </h2>
              <div class="space-y-2 text-white lg:text-dark-3 text-[16px] lg:text-[20px] text-justify custom-html" v-html="item.customHtml"></div>
              <div class="text-center lg:text-left">
                <UButton :label="item.caption" :to="item.uri ?? item.url"
                        class="bg-white lg:bg-secondary text-secondary lg:text-white hover:bg-primary hover:text-white px-6 py-4 rounded-lg transition text-[18px] font-semibold leading-[20px]">
                </UButton>
              </div>
            </div>
          </div>
        </section>
      </template>
    </IsliderCarousel>
    <!-- Form Contacto -->
    <FormContact />
  </div>
</template>

<style scoped>
@reference "~/assets/css/main.css";
  :deep(.page-body-h1 h1 ){
    @apply text-center text-[18px] tracking-[1.8px] uppercase mb-10;
  }
  :deep(.home .form-rent-car) {
    @apply bg-white;
  }
  :deep(.custom-html ol) {
    list-style: decimal !important;
    padding-left: 1.25rem;
  }
  :deep(.custom-html li) {
    display: list-item;
    margin-bottom: .5rem;
  }
</style>
