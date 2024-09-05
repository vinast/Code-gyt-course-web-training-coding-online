<template>
    <div class="detail bg-gray-100 sm:h-screen text-black">
        <header class="flex flex-row flex-nowrap p-5">
            <div class="flex-1">
                <h1 class="text-3xl mb-2 font-bold capitalize">
                {{ getKelas.name }}
            </h1>
            </div>
        </header>
        <main class="px-5"> 
            <main>
                {{ getKelas.deskripsi_kelas }}
            </main>
        </main>
    </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue"
import {useStore} from "vuex"
import { useRoute, useRouter} from "vue-router"

const router = useRouter()
const route = useRoute()
const store = useStore()

const getKelas = computed(()=> store.getters.getKelas)

onMounted(() => {
    store.dispatch("GET_KELAS_BY_ID", route.params.id)
})


</script>

<style lang="scss" scoped>

</style>