<script setup>
const props = defineProps({
  classIcons: { type: String, default: "" },
  classSocial: { type: String, default: "" },
  classLinkSocial: { type: String, default: "inline-block" },
});
const icontactStore = useIcontactStore();
const items = computed(() => [
  ...(icontactStore.getItems("FACEBOOK") ?? []),
  ...(icontactStore.getItems("TWITTER") ?? []),
  ...(icontactStore.getItems("INSTAGRAM") ?? []),
  ...(icontactStore.getItems("TIKTOK") ?? []),
  ...(icontactStore.getItems("YOUTUBE") ?? []),
  ...(icontactStore.getItems("LINKEDIN") ?? []),
  ...(icontactStore.getItems("GOOGLE") ?? []),
  ...(icontactStore.getItems("PINTEREST") ?? []),
  ...(icontactStore.getItems("FLICKR") ?? []),
]);
</script>

<template>
  <!-- Social -->
  <div v-if="items.length" class="component-social" :class="classSocial">
    <template v-for="(item, index) in items" :key="index">
      <a v-if="item.isEnable==1"
        :href="item.value"
        :title="item.title"
        target="_blank"
        class="wrap-anywhere"
        :class="classLinkSocial"
        :aria-label="`social ${item.type.icon}`"
      >
        <i :class="[item.type.icon,classIcons]" />
      </a>
    </template>
  </div>
</template>
<style scoped>
.fa-facebook { color: #3B5998; }
.fa-x-twitter { color: #0f1419; }
.fa-instagram { color: #E4405F }
.fa-telegram {  color: rgb(80,162,233); }
.fa-youtube { color: #ff0000; }
.fa-tiktok { color: black; }
.fa-linkedin { color: #0a66c2; }
.fa-flickr { color: #f70080; }
.fa-pinterest { color: #d72f3b; }
</style>
