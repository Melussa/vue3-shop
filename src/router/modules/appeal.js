export default [
    {
        path: '/order/appeal',
        name: 'appeal',
        meta: {
          index: 3
        },
        component: () => import('@/views/order/appeal.vue')
    },
    {
        path: '/myShop/appeal',
        name: 'uploadProduct',
        meta: {
          index: 42
        },
        component: () => import('@/views/myShop/appeal.vue')
    },
    {
        path: '/myShop/index',
        name: 'myShop',
        meta: {
          index: 422
        },
        component: () => import('@/views/myShop/index.vue')
    },
]
