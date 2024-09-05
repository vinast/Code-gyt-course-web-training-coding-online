<template>
  <div class="flex flex-col">
    <h1 class="capitalize text-lg font-semibold">Kelas Details</h1>
    
    <div class="form mt-5">
      <FormKit type="form" submit-label="Simpan Kelas" @submit="updateKelas">
          <FormKit
            v-model="dataKelas.name"
            type="text"
            label="Nama Kelas"
            outer-class="mb-3"
            validation="required"
            label-class="block mb-1 font-bold text-sm"
            inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-purple-500"
            input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
            help-class="text-xs text-gray-500"
          />

          <label for="category" class="block mb-1 text-sm font-bold"
            >Kategori</label
          >
          <select
            id="category"
            v-model="dataKelas.category"
            class="max-w-md mb-3 bg-gray-50 border border-gray-400 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
          >
            <option>Pilih category</option>
            <option v-for="category in getCategory" :value="category.id">
              {{ category.name }}
            </option>
          </select>

          <FormKit
            type="textarea"
            v-model="dataKelas.deskripsi_kelas"
            label="Deskripsi Kelas"
            outer-class="mb-3"
            validation="required"
            label-class="block mb-1 font-bold text-sm"
            inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-purple-500"
            input-class="w-full h-24 px-3 border-none text-base text-gray-700 placeholder-gray-400"
            help-class="text-xs text-gray-500"
          />
          <!-- <WYSIWYG v-model="dataKelas.deskripsi_kelas"></WYSIWYG> -->
          <FormKit
            type="number"
            v-model="dataKelas.harga"
            label="Harga Kelas"
            outer-class="mb-3"
            validation="required|number"
            label-class="block mb-1 font-bold text-sm"
            inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-purple-500"
            input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
            help-class="text-xs text-gray-500"
          />
          <h1 class="block mb-1 font-bold text-sm">Thumbnail saat ini</h1>
          <img class="h-24 rounded-lg mb-3" :src="dataKelas.file" alt="" srcset="">
          <FormKit
            type="file"
            name="file"
            @change="imgUpload"
            label="Thumbnail Kelas"
            accept=".jpg,.png,.jpeg"
            validation="?required"
            outer-class="mb-3"
            label-class="block mb-1 font-bold text-sm"
            inner-class="max-w-md bg-white border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-purple-500"
            input-class="block w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
            help-class="text-xs text-red-500"
          />

          <div class="relative">
              <div class="absolute right-0 z-10">
                <DangerAlert :msg="msg.err" />
                <SuccessAlert :msg="msg.succ"/>
              </div>
        </div>
      </FormKit>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, computed } from 'vue';
import axios from "../api/axios"
import {useRoute, useRouter} from "vue-router"
import {useStore} from "vuex"
import SuccessAlert from '@/components/SuccessAlert.vue';
import DangerAlertVue from '@/components/DangerAlert.vue';

const store = useStore()
const router = useRouter();
const route = useRoute();
const msg = reactive({
  err:'',
  succ:''
})
const dataKelas = reactive({
  name:'',
  category:'',
  deskripsi_kelas:'',
  harga:'',
  file:null
})

function imgUpload(event) {
  dataKelas.file = event.target.files[0];
}

const category = computed(() => {
  return store.state.category;
});

const getCategory = computed(() => {
  return store.getters.getCategory;
});

async function getKelasById(params) {
  await axios.get(`/kelas/${route.params.id}`)
    .then(res =>{
      dataKelas.name = res.data.name;
      dataKelas.deskripsi_kelas = res.data.deskripsi_kelas;
      dataKelas.harga = res.data.harga;
      dataKelas.category = res.data.categoryId
      dataKelas.file = res.data.thumbnail_url

    })
    .catch(err=>{
      console.log(err);
    })
}

async function updateKelas() {
    try {
                await axios.patch(`/kelas/${route.params.id}`, dataKelas,{
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response=>{
                     msg.succ = response.data.message;
                   getKelasById()
                })
            } catch (error) {
              msg.err = error.response.data.message;
                
            }
  
}

onMounted(()=>{
  getKelasById();
  store.dispatch("GETCATEGORY");
})
</script>

<style>
 [data-type="submit"] .formkit-input {
    @apply text-white bg-purple-400 border border-purple-400 hover:opacity-90 text-sm px-5 py-2 rounded-3xl ml-1.5
  }</style>
