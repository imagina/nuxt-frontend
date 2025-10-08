const layout = 'default'
const pages = [
  {
    name: 'ipage.dynamic',
    path: '/:slug(.*)',
    page: 'runtime/pages/default-page.vue',
    meta: {layout},
  }
]

export default pages
