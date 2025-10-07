const layout = 'master'
const pages = [
  {
    name: 'blog.category',
    path: '/iblog/:slugCategory',
    page: 'runtime/pages/category',
    meta: {layout},
  },
  {
    name: 'blog.post',
    path: '/iblog/:slugCategory/:slugPost',
    page: 'runtime/pages/post',
    meta: {layout},
  },
]

export default pages
