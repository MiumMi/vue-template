// eslint-disable-next-line
Vue.use(VueRouter)
const test = () => import('@/views/test/test')

// eslint-disable-next-line
export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/test'
    },
    {
      path: '/test',
      component: test
    }
  ]
})
