<template>
      <div class="flex flex-col">
        <div class="relative">
              <div class="absolute right-0 z-10">
                <DangerAlert :msg="msg.err" />
              </div>
        </div>
        <h1 class="text-2xl font-bold capitalize mb-8">
            Manage Kelas
        </h1>
    
        <div class="wrapper">
            <h1 class="text-lg font-bold capitalize">
            Delete Kelas
        </h1>
        <p class="text-sm text-gray-500 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat dolore accusantium sint animi qui</p>
        <tw-button type="danger" round @click="toggleModal">Delete Kelas</tw-button>
        </div>
        <vue-final-modal
          v-model="GET_DISMODAL"
          classes="flex justify-center items-center"
          content-class="relative flex p-4 flex-col rounded-lg bg-white"
        >
          <span class="font-bold text-xl mb-3">Hapus Kelas?</span>
          <div class="modal__content w-96">
            <DangerAlert :msg="msg.err" />
            <div class="flex">
              <tw-button type="primary" round class="w-full" @click="deleteKelas "
                >Hapus</tw-button
              >
              <tw-button round class="w-full" @click="toggleModal">Cancel</tw-button>
            </div>
          </div>
        </vue-final-modal>
    </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import {useStore} from "vuex"
import {useRoute, useRouter} from "vue-router"
import axios from "../api/axios"
import DangerAlertVue from "@/components/DangerAlert.vue";
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";
const route = useRoute()
const router = useRouter()
const store = useStore()
const GET_DISMODAL = computed(()=>store.getters.GET_DISMODAL)

const msg = reactive({
    err:''
})
async function deleteKelas(params) {
   await axios.delete(`/kelas/${route.params.id}`)
        .then(response =>{
            router.push({
                name:"kelas"
            })
        })
        .catch(err=>{
            msg.err = err.response.data.message;
        })
}

async function toggleModal() {
  await store.dispatch("TOGGLE_DELETE_MODAL") 
}
</script>
