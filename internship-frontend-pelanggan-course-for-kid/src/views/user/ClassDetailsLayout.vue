<template>
  <div class="flex flex-col sm:flex-row h-screen">
    <div class="video__player w-full sm:w-3/4 text-black">
      <router-view ></router-view>

    </div>
    <div class="list__video flex-1 bg-white h-3/4">
        <h3 class="text-black font-bold text-xl text-center py-3">Materi Kelas</h3>
      <ul class="menu w-full text-black"  >
        <li class=" hover:bg-secondary capitalize" v-for="(content, index) in getContents" >
          <router-link :to="{
            path:`/details/${content.id}`
          }"> {{ index+1 }}. {{ content.name }}</router-link>
        </li>
        <h3 class="mx-auto capitalize text-lg tracking-wide font-semibold " v-if="getContents === null">Materi Belum tersedia</h3>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, onUpdated, reactive, ref} from "vue"
import {useStore} from "vuex"
import { useRoute, useRouter} from "vue-router"

const router = useRouter()
const route = useRoute()
const store = useStore()
const index = ref(1)

const contents = computed(()=>{
    return store.state.contents
})
const getContents = computed(()=>{
    return store.getters.getContents
})



onMounted(()=>{
    store.dispatch("GET_CONTENTS",route.params.id,
    )
  


})






</script>

<style lang="scss" scoped></style>
