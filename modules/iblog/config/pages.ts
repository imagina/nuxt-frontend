const layout = 'master'
const pages = [
  {
    name: 'blog.category',
    path: '/iblog/:category',
    page: 'index',
    meta: { layout },
  },
  {
    name: 'blog.post',
    path: '/iblog/:category/:post',
    page: 'show',
    meta: { layout },
  },
]

export default pages
