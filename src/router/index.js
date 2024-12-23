import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import CreateView from '../views/CreateView.vue'
import ProductTypeIndexView from '../views/ProductTypeIndexView.vue'
import ProductTypeCreateView from '../views/ProductTypeCreateView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Dashboard',
            component: DashboardView
        },
        {
            path: '/Product',
            name: 'Product',
            component: HomeView
        },
        {
            path: '/create',
            name: 'create',
            component: CreateView
        },
        {
            path: '/edit/:productId',
            name: 'edit',
            component: CreateView
        },
        {
            path: '/productType',
            name: 'productType',
            component: ProductTypeIndexView
        },
        {
            path: '/productType/create',
            name: 'productTypeCreate',
            component: ProductTypeCreateView
        },
        {
            path: '/productType/edit/:productId',
            name: 'productTypeEdit',
            component: ProductTypeCreateView
        }
    ]
})

export default router