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
    },
    container: {
      base: 'w-full max-w-[94rem] mx-auto px-4 sm:px-6 lg:px-8'
    }
  }
})
