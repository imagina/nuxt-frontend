const layout = 'master'

const pages = [
  {
    name: 'irentcar.page.stepper',
    path: '/rent-car/stepper',
    page: 'runtime/pages/stepper/stepperPage.vue',
    meta: {layout},
  },
  {
    name: 'irentcar.page.offices',
    path: '/rent-car/offices',
    page: 'runtime/pages/offices.vue',
    meta: {layout},
  },
  {
    name: 'irentcar.page.gammas',
    path: '/rent-car/gammas',
    page: 'runtime/pages/gammas.vue',
    meta: {layout},
  },
  {
    name: 'irentcar.page.reservations',
    path: '/rent-car/reservations',
    page: 'runtime/pages/reservations/reservations.vue',
    meta: {layout, auth: true},
  }
]

export default pages
