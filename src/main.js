import { createApp } from 'vue';
import App from './App.vue';
import router from '@/routers/router.js';
import store from '@/store/store.js'
import './index.css';

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
