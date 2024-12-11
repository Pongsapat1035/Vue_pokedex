import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: HomeView
        },
        {
            path: '/detail',
            component: DetailView
        },
    ]

})

export default router

