<template>
    <!-- Title -->
    <h1 class="text-center text-3xl text-orange-400">BEER FAMILY</h1>

    <!-- Sectional container -->
    <section id="container" class="max-w-lg m-0 m-auto">

        <!-- PrimeVue DataView component for easy data display -->
        <DataView :value="data">
            <template #list="slotProps">

                <!-- Filtering of hops with Centennial -->
                <div class="col-12" v-if="!slotProps.data.ingredients.hops.filter(e => e.name === 'Centennial').length > 0">
                    <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                        <img class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                            :src="slotProps.data.image_url" :alt="slotProps.data.name" />
                        <div
                            class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div class="">
                                    <span class="flex align-items-center">

                                        <!-- Filtering of dry hops with header highlighting -->
                                        <span
                                            v-if="slotProps.data.ingredients.hops.filter(e => e.add === 'dry hop').length > 0"
                                            class="bg-yellow-200 text-2xl font-bold text-900 ml-1">{{
                                                slotProps.data.name }}</span>
                                        <span v-else class="text-2xl font-bold text-900 ml-1">{{
                                            slotProps.data.name }}</span>
                                    </span>
                                    <span class="flex align-items-center">
                                        <i class="pi pi-tag self-center ml-1.5 mr-2.5"></i>
                                        <span class="">{{ slotProps.data.tagline }}</span>
                                    </span>

                                    <!-- Displays Lactose warning if beer contains lactose -->
                                    <Tag v-if="slotProps.data.ingredients.hops.filter(e => e.name === 'Lactose').length > 0"
                                        value="Lactose" severity="warning"></Tag>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Description, ABV and IBU data displayed -->
                    <div class="flex p-4">
                        <i class="pi pi-book self-start mr-2.5 ml-14 mt-1.5"></i>
                        <span>{{
                            slotProps.data.description }}</span>
                    </div>
                    <div class="flex p-4">
                        <i class="pi pi-bolt self-center mr-2.5 ml-14"></i>
                        <span> ABV: {{
                            slotProps.data.abv }}</span>
                    </div>
                    <div class="flex p-4">
                        <i class="pi pi-hourglass self-center mr-2.5 ml-14"></i>
                        <span> IBU: {{
                            slotProps.data.ibu }}</span>
                    </div>
                </div>
            </template>
        </DataView>
    </section>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            data: []
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        async getData() {
            // Async method to retrieve data using axios
            const dataRetrieve = await axios.get(`https://api.punkapi.com/v2/beers?brewed_after=11-2012`);
            this.data = dataRetrieve.data;

            // Sorting ASC for ABV data
            this.data.sort((a, b) => (a.abv > b.abv) ? 1 : ((b.abv > a.abv) ? -1 : 0));
        }
    }
}

</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Geologica&family=Rubik:wght@300&display=swap');

.text-center {
    font-family: 'Geologica', sans-serif;
    text-shadow: 2px 2px 2px #CE5937;
}

.container {
    font-family: 'Rubik', sans-serif;
}
</style>