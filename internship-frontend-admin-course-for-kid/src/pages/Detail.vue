<template>
  <div class="flex flex-col">
    <h1 class="text-3xl font-bold capitalize mb-8">{{ title }}</h1>

    <div class="flex flex-col sm:flex-row sm:space-x-5">
      <div class="flex flex-row sm:flex-col sm:w-56">
        <menu-item text="Kelas Details"  :route="{ name: 'update' }" />
        <menu-item text="Materi Kelas"  :route="{ name: 'materi' }" />
        <menu-item text="Manage Kelas"  :route="{ name: 'delete' }" />
      </div>
      <div class="flex-1 bg-purple-50 rounded-xl p-10 -mt-3 sm:mt-0 ">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import MenuItem from "../components/layouts/TheSidebarMenuItem.vue";
import {useRoute, useRouter} from "vue-router"
import { onMounted, ref, computed } from "vue";
import {useStore} from "vuex"

const router = useRouter()
const route = useRoute()

const store = useStore()
// async function getKelasbyID() {
//   await axios.get("/kelas/"+route.params.id)
//   .then(res=>{
//     console.log(res.data.name);
//     title.value = res.data.name
//   })
//   .catch(err=>{
//     console.log(err);
//   })
// }
const title = computed(()=>{
  return store.getters.getTitle
})
onMounted(()=>{
  store.dispatch("GETKELASBYID")
})

</script>
