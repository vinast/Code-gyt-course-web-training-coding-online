<template>
      <div class="p-5 bg-gray-100 sm:h-screen text-black">
    <h1 class="text-3xl mb-6 font-bold">Kelas Saya</h1>
    <hr>
    <br>
    <h2>Silahkan Selesaikan Kelas Anda</h2>
    <br><br>
    <div class="flex flex-col items-center sm:content-center sm:flex-row gap-5 sm:flex-wrap" v-if="getLangganan.length">
        <class-card @click="router.push({
          path:`/class/${langganan.kela.id}`
        })" v-for="langganan in getLangganan" :thumb="langganan.kela.thumbnail_url" :title="langganan.kela.name" :alter="langganan.kela.name"
            :desc="langganan.kela.deskripsi_kelas.substr(0, 15)"/>
    </div>
    <div class="empty rounded-md h-auto w-full px-6 py-5 bg-slate-200" v-else>
      <div class="text text-md sm:text-xl font-normal">
        <span>Anda Belum Mempunyai Kelas, Silahkan Akses Kelas </span><router-link to="/list-class" class="underline underline-offset-4 font-bold tracking-wider hover:text-blue-900 hover:decoration-blue-900">Disini</router-link> 
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from "vuex"
import {onMounted, computed} from "vue"
import {useRoute, useRouter} from "vue-router"
import ClassCard from '../../components/Card/ClassCard.vue';

const store = useStore()
const route = useRoute()
const router = useRouter()

const langganan = computed(()=>store.state.langganan)
const getLangganan = computed(()=>store.getters.getLangganan)
const me = computed(()=>store.getters.getMe)
onMounted(() => {
  store.dispatch("FETCH_LANGGANAN_KELAS", me.value.id)
})
</script>

<style lang="scss" scoped>

</style>