export default defineNuxtPlugin({

  setup() {
    const settingStore = useIsettingStore()

    const primaryColor = settingStore.get("icore::brandPrimary")
    const secondaryColor = settingStore.get("icore::brandSecondary")
    const tertiaryColor = settingStore.get("icore::brandTertiary")

    const cssVars = `
      :root {
        ${primaryColor ? `--color-primary: ${primaryColor};` : ""}
        ${secondaryColor ? `--color-secondary: ${secondaryColor};` : ""}
        ${tertiaryColor ? `--color-tertiary: ${tertiaryColor};` : ""}
      }
    `

    useHead({
      style: [
        {
          innerHTML: cssVars,
        },
      ],
    })
  }
})
