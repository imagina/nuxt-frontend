<script setup>

const props = defineProps({
  email: { type: Array,  required: true },
  showEmail: { type: Boolean, default: true },
  showIcons: { type: Boolean, default: true },
  emailWithIcon: { type: Boolean, default: true },
  emailIcon: { type: String, default: 'fa-regular fa-envelope' },
  emailWithTitle: { type: Boolean, default: true },
  classIcons: { type: String, default: 'self-center mr-2 text-white' },
  classTitle: { type: String, default: 'font-bold' },
  classLinkEmail: { type: String, default: 'inline-block' },
  withHyphenEmail: { type: Boolean, default: true },
})
</script>

<template>
    <!-- Email -->
    <div v-if="showEmail && email" class="component-email">
        <div class="flex">
        <i v-if="showIcons"  :class="[emailIcon,classIcons]" />
        <div class="content-email">
            <template v-for="(email, index) in email" :key="index">
            <span v-if="withHyphenEmail && index>0">&nbsp;-&nbsp;</span>
            <a :href="`mailto:${email}`" target="_blank" class="wrap-anywhere" :class="classLinkEmail">
                <span :class="classTitle">{{email.title}}</span> {{ email.value }}
            </a>
            </template>
        </div>
        </div>
    </div>
</template>
