export default defineNuxtPlugin({

  setup() {
    const settingStore = useIsettingStore()

    const primaryColor = settingStore.get("icore::brandPrimary")
    const primaryContrast = settingStore.get("icore::primaryContrast")
    const secondaryColor = settingStore.get("icore::brandSecondary")
    const secondaryContrast = settingStore.get("icore::secondaryContrast")
    const tertiaryColor = settingStore.get("icore::brandTertiary")
    const tertiaryContrast = settingStore.get("icore::tertiaryContrast")
    const quaternaryColor = settingStore.get("icore::quaternaryColor")
    const quaternaryContrast = settingStore.get("icore::quaternaryContrast")

    const cssVars = `
      :root {
        ${primaryColor ? `--color-primary: ${primaryColor};` : ""}
        ${primaryContrast ? `--color-primary-contrast: ${primaryContrast};` : ""}
        ${secondaryColor ? `--color-secondary: ${secondaryColor};` : ""}
        ${secondaryContrast ? `--color-secondary-contrast: ${secondaryContrast};` : ""}
        ${tertiaryColor ? `--color-tertiary: ${tertiaryColor};` : ""}
        ${tertiaryContrast ? `--color-tertiary-contrast: ${tertiaryContrast};` : ""}
        ${quaternaryColor ? `--color-quaternary: ${quaternaryColor};` : ""}
        ${quaternaryContrast ? `--color-quaternary-contrast: ${quaternaryContrast};` : ""}
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
