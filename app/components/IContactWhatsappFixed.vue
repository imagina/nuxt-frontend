<script setup lang="ts">
import { toRefs } from "vue";

const open = defineModel<boolean>("open", { default: false });

const props = withDefaults(
  defineProps<{
    side?: "left" | "right";
    title?: string;
  }>(),
  {
    side: "left",
    title: "WhatsApp",
  }
);
const { side, title } = toRefs(props);

const cardUI = {
  header: "bg-primary text-white",
  root: "rounded-none md:rounded-xl shadow-none md:shadow-xl",
  body: "p-0 sm:p-0 ",
};

const items = [
  {
    label: "",
    callingCode: "+57",
    number: "3118060834",
  }
]
</script>
<template>
  <div>
    <div class="pre-window" :class="side">
      <div @click="open = true" class="icon" >
        <i class="fa fa-whatsapp"></i>
      </div>
      <div class="text hidden lg:inline-flex">¿Hablamos?</div>
    </div>

    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-6"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-6"
    >
      <section
        v-if="open"
        role="dialog"
        aria-modal="false"
        class="fixed bottom-0 md:bottom-4 z-[1500] h-full md:h-auto  w-screen md:w-[350px] bg-[#f6f6f6] rounded-none md:rounded-xl"
        :class="side === 'right' ? 'right-0 md:right-4' : 'left-0 md:left-4'"
      >
        <UCard :ui="cardUI">
          <template #header>
            <div
              @click="open = false"
              class="header-close rounded px-3 py-1 md:p-1 float-right cursor-pointer"
            >
              <i class="fa fa-close"></i>
            </div>
            <div class="header-title text-lg">
              <i class="fa fa-whatsapp"></i> WhatsApp
            </div>
            <div class="header-text text-sm">
              Hola, ¿En que podemos ayudarte?
            </div>
          </template>

          <div class="content h-auto md:h-[268px] bg-[#f6f6f6] p-0 overflow-y-auto">
            <div class="scroll overflow-auto h-full mr-[3px] [scrollbar-width:thin] [scrollbar-color:rgba(0,0,0,0.5)_rgba(0,0,0,0)]">
              <a
                class="border-b border-1 border-zinc-200 flex items-center gap-4 px-3 py-4"
                v-for="(it, i) in items"
                :key="i"
                :href="`https://wa.me/${it.callingCode}${it.number}?text=${it.message}`"
                target="_blank"
                rel="noopener"
              >
                <div class="list-image">
                  <div
                    class="icon h-[55px] w-[55px] bg-primary rounded-full text-white flex justify-center items-center"
                  >
                    <i
                      class="text-[30px]"
                      :class="it.icon ?? 'fa fa-whatsapp'"
                    ></i>
                  </div>
                </div>
                <div class="list-info">
                  <div class="title font-semibold">{{ it.label }}</div>
                  <p class="subtitle text-sm">
                    ({{ it.callingCode }}) {{ it.number }}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </UCard>
      </section>
    </Transition>
  </div>
</template>

<style scoped>
.pre-window {
  display: flex;
  align-items: center;
  z-index: 1000;
  bottom: 40px;
  left: 40px;
  right: unset;
  position: fixed;
}
.pre-window .icon {
  width: 54px;
  height: 54px;
  background-color: #22ce5a;
  color: #ffffff;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 33px;
  cursor: pointer;
}
.pre-window .text {
  background-color: #f6f6f6;
  padding: 8px 20px;
  margin-left: 25px;
  border-radius: 10px;
  color: var(--color-primary);
  font-weight: 600;
  border: 2px solid #e9e9e9;
  position: relative;
}
.pre-window .text:before {
  position: absolute;
  content: "";
  left: -16px;
  top: 50%;
  transform: translateY(-50%);
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 16px solid #e9e9e9;
}
.pre-window .text:after {
  position: absolute;
  content: "";
  left: -11px;
  top: 50%;
  transform: translateY(-50%);
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 14px solid #f6f6f6;
}
.pre-window.right {
  bottom: 40px;
  left: unset;
  right: 40px;
}
.pre-window.right .icon {
    order: 1;
}
.pre-window.right .text {
    margin-right: 25px;
}
.pre-window.no-text .text {
    display: none;
}
.pre-window.right .text:before {
    left: unset;
    right: -16px;
    border-left: 16px solid #E9E9E9;
    border-right: 0;
}
.pre-window.right .text:after {
    left: unset;
    right: -11px;
    border-left: 14px solid #f6f6f6;
    border-right: 0;
}

/*
.scroll {
  overflow: auto;
  height: 100%;
  scrollbar-color: rgba(0, 0, 0, 0.5) rgba(0, 0, 0, 0);
  scrollbar-width: thin;
  margin-right: 3px;
}*/
</style>


