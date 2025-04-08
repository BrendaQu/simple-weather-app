import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createBootstrap} from 'bootstrap-vue-next'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

const app = createApp(App);

app.use(createBootstrap); // Use the plugin

app.mount('#app');
