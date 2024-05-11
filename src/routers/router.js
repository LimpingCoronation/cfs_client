import {createRouter, createWebHistory} from 'vue-router';

import LoginPage from '@/pages/LoginPage.vue';
import FileManagementPage from '@/pages/FileManagementPage.vue';
import UploadFilePage from '@/pages/UploadFilePage.vue';

const routes = [
    {
        path: '/',
        component: FileManagementPage,
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
    },
    {
        path: '/upload',
        component: UploadFilePage,
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router;
