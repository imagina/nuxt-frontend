export default defineNuxtPlugin({

  setup() {
    const settingStore = useIsettingStore()

    const primaryColor = settingStore.get("isite::brandPrimary")
    const primaryContrast = settingStore.get("isite::primaryContrast")
    const secondaryColor = settingStore.get("isite::brandSecondary")
    const secondaryContrast = settingStore.get("isite::secondaryContrast")
    const tertiaryColor = settingStore.get("isite::brandTertiary")
    const tertiaryContrast = settingStore.get("isite::tertiaryContrast")
    const quaternaryColor = settingStore.get("isite::quaternaryColor")
    const quaternaryContrast = settingStore.get("isite::quaternaryContrast")

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
