<template>
  <div class="fixed z-20 top-0 left-0 lg:left-64 right-0 h-14 bg-white border-b border-gray-200 flex flex-row items-center justify-between px-5">
    <h3 class="text-lg font-medium text-gray-600 capitalize">Welcome Admin, {{ name }}</h3>
    <div class="flex items-center">
      <tw-dropdown 
        class="ml-3" 
        origin="right" 
        body-class="top-8">
        <img 
          src="@/assets/avatar2.png" 
          alt="Avatar" 
          class="w-6 h-6 rounded-full">
        <template #body>
          <ul>
            <li @click="toEditProfile" class="px-4 py-2 cursor-pointer hover:bg-purple-50 hover:text-purple-500">
              Account settings
            </li>
            <li @click="logout" class="px-4 py-2 cursor-pointer hover:bg-purple-50 hover:text-purple-500">
              Sign out
            </li>
          </ul>
        </template>
      </tw-dropdown>
    </div>
  </div>
</template>

<script setup>
import {useStore} from "vuex"
import {onMounted, computed} from "vue"
import {useRoute, useRouter} from "vue-router"

const store = useStore()
const router = useRouter()
const route = useRoute()

const name = computed(()=>{
  return store.getters.getName
})

const Id = computed(()=>store.getters.getId)

async function toEditProfile() {
  router.push({
    path:`/edit-profile/${Id.value}`
  })
}
async function logout(){
  store.dispatch("DisplayModal")
}
</script>