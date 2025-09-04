# Icore Module

### [feature] Nuxt reCAPTCHA v3 Composable

This module integrates **Google reCAPTCHA v3** into your Nuxt 4 project using [`vue-recaptcha-v3`](https://www.npmjs.com/package/vue-recaptcha-v3).  
It provides a simple composable `useIcoreRecaptcha` that makes it easy to generate and attach reCAPTCHA tokens to your API requests for spam/bot protection.

---

#### Usage Example

You need setup the site key in .env as NUXT_PUBLIC_RECAPTCHA_SITE_KEY

```bash
<script setup lang="ts">
const { executeRecaptcha } = useIcoreRecaptcha()

const onSubmit = async () => {
  const { token, headerOptions } = await executeRecaptcha('submit')
  // Put it in request...
}
</script>

<template>
  <button @click="onSubmit">Submit</button>
</template>
```
