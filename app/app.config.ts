export default defineAppConfig({
  ui: {
    alert: {
      defaultVariants : {
        variant: 'soft'
      }
    },
    formField: {
      slots:{
        error: 'mt-1 text-xs'
      }
    }
  }
})
