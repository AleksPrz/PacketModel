import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import FormPage from '@/components/FormPage.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/quotation',
        name: 'Form',
        component: FormPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router