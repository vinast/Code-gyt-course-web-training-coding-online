<template>
  <div class="flex flex-col">
    <h1 class="text-3xl font-bold capitalize mb-8">Kelas Baru</h1>

    <section class="rounded-xl flex flex-col bg-purple-50 px-5 py-3">
      <div class="relative">
          <div class="absolute right-0 z-10">
            <DangerAlert :msg="getErrMsg" />
          </div>
        </div>
      <h1 class="capitalize text-lg font-semibold">Kelas Details</h1>
      <div class="form mt-5">
        <FormKit type="form" submit-label="Simpan Kelas" @submit="createKelas">
          <FormKit
            v-model="dataKelas.name"
            type="text"
            label="Nama Kelas"
            validation="required|text"
            outer-class="mb-3"
            label-class="block mb-1 font-bold text-sm"
            inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-purple-500"
            input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
            help-class="text-xs text-red-500"
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
            label-class="block mb-1 font-bold text-sm"
            inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-purple-500"
            input-class="w-full h-24 px-3 border-none text-base text-gray-700 placeholder-gray-400"
            help-class="text-xs text-red-500"
            validation="required|text"
          />
          <!-- <WYSIWYG v-model="dataKelas.deskripsi_kelas"></WYSIWYG>
          {{ dataKelas.deskripsi_kelas }} -->
          <FormKit
            type="number"
            v-model="dataKelas.harga"
            label="Harga Kelas"
            outer-class="mb-3"
            validation="required|number"
            label-class="block mb-1 font-bold text-sm"
            inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-purple-500"
            input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
            help-class="text-xs text-red-500"
          />
          <FormKit
            type="file"
            @change="imgUpload"
            label="Thumbnail Kelas"
            accept=".jpg,.png,.jpeg"
            validation="required"
            outer-class="mb-3"
            label-class="block mb-1 font-bold text-sm"
            inner-class="max-w-md bg-white border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-purple-500"
            input-class="block w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
          />

        </FormKit>

      </div>

    </section>
  </div>
</template>

<script setup>
import DangerAlert from "@/components/DangerAlert.vue";
// import WYSIWYG from "@/components/WYSIWYG.vue";
import { computed, onMounted, reactive } from "vue";
import { useStore } from "vuex";
const store = useStore();

const dataKelas = reactive({
  name: "",
  deskripsi_kelas: "",
  harga: "",
  category: "",
  file: null,
});

const category = computed(() => {
  return store.state.category;
});

const getCategory = computed(() => {
  return store.getters.getCategory;
});

const getErrMsg = computed(() => {
  return store.getters.getErrMsg;
});

onMounted(() => {
  store.dispatch("GETCATEGORY");
});
function imgUpload(event) {
  dataKelas.file = event.target.files[0];
}

async function createKelas() {
    await store.dispatch("POSTKELAS", dataKelas)
      .then(response=>{
      })
      .catch(error=>{
      })
  
}
</script>

<style>
 [data-type="submit"] .formkit-input {
    @apply text-white bg-purple-400 border border-purple-400 hover:opacity-90 text-sm px-5 py-2 rounded-3xl ml-1.5
  }

.formkit-messages{
  @apply text-red-500 mb-1 text-xs
}
</style>
