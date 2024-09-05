<template>
    <div class="relative min-h-screen flex overflow-hidden bg-gray-200">
    <sidebar class=""/>

    <div class="flex-1 flex flex-col overflow-hidden">
        <app-navbar />
        <main class="flex-1 relative overflow-y-auto focus:outline-none">
            <div class="py-4 px-6 ">
                <router-view />
                <div class="mobile__menu block sm:hidden fixed bottom-4 right-6">
              <div class=" flex flex-col w-12 h-12  justify-center my-auto px-3 py-3 bg-secondary rounded-full cursor-pointer drop-shadow-lg hover:drop-shadow-xl" @click="toggleShowNavbar">
                <span class="h-[4.5px] mb-1 w-full bg-primary"></span>
                <span class="h-[4.5px] mb-1 w-5 bg-primary"></span>
                <span class="h-[4.5px] mb-1 w-3 bg-primary"></span>
              </div>
            </div>
            </div>

            
        </main>

    </div>
    <vue-final-modal
    v-model="show"
    classes="flex justify-center items-center"
    content-class="relative flex flex-col max-h-full mx-4 p-4 border dark:border-white rounded bg-white dark:bg-white"
  >
    <span class="mr-8 text-2xl font-bold text-black">
      Log out dari aplikasi? 
    </span>
    <div class="flex-grow overflow-y-auto my-4">
        <error-alert :msg="err"/>
    </div>
    <div class="flex-shrink-0 flex justify-between items-center pt-4">
      <base-button @click="Logout">confirm</base-button>
      <base-button @click="toggleModal" design="outline-primary">cancel</base-button>
    </div>
  </vue-final-modal>

  <vue-final-modal
    v-model="getShowNav"
    classes="flex justify-center items-center mx-5"
    content-class="relative flex flex-col min-w-full  max-h-full mx-4 p-4 border dark:border-white rounded bg-white dark:bg-white"
  >
  <span class="mr-8 text-black text-2xl font-bold">
      Menu
    </span>
  <div class="mt-2">
    <menu-items/>
  </div>

      <base-button design="secondary"  class="absolute top-0 right-0 mt-2 mr-2 rounded-full w-12" @click="toggleShowNavbar">
       <font-awesome-icon icon="fa-solid fa-xmark" class="text-primary cursor-pointer" size="2x"/>

    </base-button>
    
  </vue-final-modal>
</div>
</template>

<script setup>
import{ref } from 'vue'
import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal'
import Sidebar from '../Sidebar/Sidebar.vue';
import AppNavbar from '../Navbar/AppNavbar.vue';
import {useStore } from "vuex"
import {onMounted, computed } from 'vue';


// ult
const showMobileMenu = ref(false)
const store = useStore();
const show = computed(()=>store.getters.getShowModal)
const showNav = computed(()=>{
    store.state.showmobilenav
})

const getShowNav = computed(() => store.getters.getShowMobileNav)
function toggleShowNavbar(){
    store.dispatch('toggleNav')
}
const err = computed(()=>store.getters.getErrMsg)



function toggleModal(){
    store.dispatch("toggleModal")
}
onMounted(()=>{
        store.dispatch("GETME")
        
})

function Logout(params) {
  try {
    store.dispatch("LOGOUT").then((res) => {
    });
  } catch (error) {
    
  }
}


</script>

<style lang="scss" scoped>

</style>