import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import DataView from "primevue/dataview";
import Tag from 'primevue/tag';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true });
    nuxtApp.vueApp.component("DataView", DataView);
    nuxtApp.vueApp.component("Tag", Tag);
});