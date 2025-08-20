// modules/isetting/plugins/fetch-setting.ts
export default defineNuxtPlugin({
  name: "isetting-fetch-settings",
  dependsOn: ["api-fetch"],
  async setup ()
  {
    const isettingStore = useIsettingStore()
    await isettingStore.fetchSettings()
  }
})
