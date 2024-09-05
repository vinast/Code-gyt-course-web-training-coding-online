<template>
    <div class="flex flex-col sm:flex-row h-screen">
      <div class="video__player w-full sm:w-3/4 text-black">
        <router-view ></router-view>
      </div>
      <div class="list__video flex-1 bg-white h-3/4">
          <h3 class="text-black font-bold text-xl text-center py-3">Materi Kelas</h3>

        <ol class="menu w-full text-black "  >
          <li class=" hover:bg-secondary capitalize mx-5 mb-3" v-for="(content, index) in getContents" >
            <router-link class="no-underline " :to="{
              path:`/free-content-details/${content.id}`
            }">{{ index+1 }}. {{ content.name }}</router-link>
          </li>
          <li class="mx-3">
            <base-button design="secondary" @click="router.push({
              path: `/checkout/${getKelas.id}`,
            })">Gabung Kelas</base-button>
          </li>
          <h3 class="mx-auto capitalize text-lg tracking-wide font-semibold " v-if="getContents === null">Materi Belum tersedia</h3>
        </ol>
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


  
  const contents = computed(()=>{
      return store.state.contentsfree
  })
  const getContents = computed(()=>{
      return store.getters.getFreeContents
  })

  const getKelas = computed(()=>{
      return store.getters.getKelas
  })

  
  
  
  onMounted(()=>{
      store.dispatch("GET_FREECONTENTS",route.params.id,
      )

    
  
  
  })
  
  
  
  
  
  
  </script>
  
  <style lang="scss" scoped></style>
  