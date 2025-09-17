// modules/isetting/plugins/fetch-setting.ts
export default defineNuxtPlugin({
  name: "icontact-fetch-global-contacts",
  dependsOn: ["api-fetch"],
  async setup ()
  {
    const store = useIcontactStore()
    await store.fetchGlobalContacts()
  }
})
