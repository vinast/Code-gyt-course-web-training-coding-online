<template>
      <div class="flex flex-col">
        <h1 class="text-3xl font-bold capitalize mb-8">
            Kelas
        </h1>


        <div v-if="getKelas.length" class="wrapper" v-for="kelas in getKelas">
           
                <CardsKelas class="mb-5"  :img="kelas.thumbnail_url" :desc="kelas.deskripsi_kelas.slice(0, 75)" :title="kelas.name" :date="kelas.createdAt.substr(0, 10)" @click="router.push({
                    path:`/kelas/${kelas.id}`
                })" />
            
        </div>
        <section v-else class="h-80 max-h-80 rounded-xl flex flex-col items-center justify-center bg-purple-50 ">
            <div class="bg-purple-200 p-4 rounded-full">
            <tw-icon name="heroicons-outline:library" class="w-10 h-10 text-purple-500 " />
        </div>
            <h1 class="capitalize text-2xl font-semibold">Buat Kelas pertama</h1>
            <p class="text-gray-500">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
            <tw-button class="mt-5" type="primary" round @click="toNewClassPage">Buat Kelas</tw-button>
        </section>
        <div v-if="getKelas.length" class="wrapper w-28">
            <tw-button class="mt-5" type="primary" size="md" round @click="toNewClassPage">Buat Kelas</tw-button>
        </div>
    </div>
</template>

<script setup>
import {  onMounted, computed } from "vue"
import { useRouter, useRoute } from 'vue-router'
import CardsKelas from "../components/CardsKelas.vue"
import {useStore} from "vuex"
const store = useStore();
const router = useRouter();
const route = useRoute();



function toNewClassPage(params) {
    console.log("test");
    router.push({
        name: 'new'
})
}

const getKelas = computed(()=>{
    return store.getters.getKelas
})

const kelas = computed(()=>{
    return store.state.kelas
})

onMounted(() => {
    store.dispatch("FETCHKELAS");
})

</script>
