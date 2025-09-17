export default defineNuxtPlugin({
  name: "ilocation-fetch-global-locatables",
  dependsOn: ["api-fetch"],
  async setup ()
  {
    const store = useIlocationStore()
    await store.fetchGlobalLocatables()
  }
})
