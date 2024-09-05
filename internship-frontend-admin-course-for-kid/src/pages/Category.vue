<template>
  <div class="flex flex-col">
    <h1 class="text-3xl font-bold capitalize mb-8">Category</h1>
    <div class="relative mb-4">
      <div class="absolute z-10 -top-14 right-0">
        <DangerAlert :msg="msg.err"/>
        <SuccessAlert :msg="msg.succ"/>
      </div>
    </div>
    
    <EasyDataTable v-if="items.length" :headers="headers" :items="items" class="capitalize">
    
        <template #item-kelas.name="item">
            <div class="whitespace-normal flex flex-row">
                
                <span class="kelas" v-for="kelas in item.kelas" v-if="item.kelas">
                   {{ kelas.name }}
                </span>
                <span class="" v-if="!item.kelas.length">
                    -
                </span>
            </div>
        </template>
        <template #item-actions="item">
        <div class="whitespace-normal flex flex-row space-x-5">
          <button @click="restoreEdit(item.id, item.name, )"><img src="../assets/icons8-edit-100.png"
              class="w-7" alt="edit" srcset=""></button>
          <button @click="toggleModal(item.id)"><img src="../assets/icons8-delete-100.png" class="w-7" alt="delete"
              srcset=""></button>
        </div>
      </template>
    </EasyDataTable>
    <section v-else class="h-80 max-h-80 rounded-xl flex flex-col items-center justify-center bg-purple-50 ">
            <div class="bg-purple-200 p-4 rounded-full">
            <tw-icon name="heroicons-outline:library" class="w-10 h-10 text-purple-500 " />
        </div>
            <h1 class="capitalize text-2xl font-semibold">Buat Category pertama</h1>
            <p class="text-gray-500">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
            <tw-button class="mt-5" type="primary" round @click="openModal()">Buat Category</tw-button>
        </section>

    <div class="wrapper" v-if="items.length">
      <tw-button
        class="mt-5"
        type="primary"
        size="md"
        round
        @click="openModal()"
        >Tambah Category</tw-button
      >
    </div>
  </div>

  <vue-final-modal
    v-model="showModal"
    classes="flex justify-center items-center mx-5"
    content-class="relative flex p-4 flex-col rounded-lg bg-white"
  >
    <button class=" absolute top-2 right-5" @click="openModal()">
      <button class="font-bold text-3xl">X</button>
    </button>
    <span class="font-bold text-xl text-center mb-3">Simpan Category</span>

    <div class="modal__content w-80 sm:w-96">
        <DangerAlert v-if="errmsg" :msg="errmsg"/>
        <SuccessAlert v-if="succmsg" :msg="succmsg"/>
        <FormKit type="form" :submit-label="[statusmodal ? 'Simpan Category':'Edit Category']" v-on:submit="[statusmodal ? addCategory() : editCategory()]">
          <FormKit v-model="category.name" type="text" label="Nama Category" outer-class="mb-3"
            label-class="block mb-1 font-bold text-sm"
            inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-purple-500"
            input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
            help-class="text-xs text-gray-500"
            validation="required|length:3"
            validation-visibility="blur" />
        </FormKit>
      </div>
  </vue-final-modal>

  <vue-final-modal
          v-model="GET_DISMODAL"
          classes="flex justify-center items-center"
          content-class="relative flex p-4 flex-col rounded-lg bg-white"
        >
          <span class="font-bold text-xl mb-3">Hapus Category?</span>
          <div class="modal__content w-96">
            <DangerAlert :msg="msg.err" />
            <div class="flex">
              <tw-button type="primary" round class="w-full" @click="deleteCategory"
                >Hapus</tw-button
              >
              <tw-button round class="w-full" @click="toggleModal">Cancel</tw-button>
            </div>
          </div>
        </vue-final-modal>
</template>

<script setup>
import { ref, onMounted, reactive, onUpdated, computed } from "vue";
import axios from "../api/axios"
import { useStore } from "vuex";
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";
import DangerAlertVue from "@/components/DangerAlert.vue";
import SuccessAlertVue from "@/components/SuccessAlert.vue";

const showModal = ref(false);
const statusmodal = ref(true);
const GET_DISMODAL = computed(()=>store.getters.GET_DISMODAL)
const store = useStore();
const category = reactive({
  id:'',
  name:''
})

const msg = reactive({
  err:'',
  succ:''
})
const errmsg = computed(()=>store.getters.getErr_Msg)
const succmsg = computed(()=>store.getters.getSuccMsg)






function openModal(params) {
  store.commit("SET_ERRMSG", null)
  store.commit("SET_SUCCMSG", null)
  statusmodal.value = true;
  category.name ="";
  showModal.value = !showModal.value

}
const getCategory = (async ()=>{
    try {
                const response = await axios.get('/category')
                items.value = response.data
            } catch (error) {
            }
})


function addCategory(params) {
  statusmodal.value = true;
    store.commit("SET_ERRMSG", null)
    store.commit("SET_SUCCMSG", null)
    if(category.name.length>=3 && category.name.length<=50){
      store.dispatch("POST_CATEGORY", category)
    .then(({success, data})=>{
      showModal.value = !showModal.value
      category.name ="";
    })
    .catch(error=>{
      category.name ="";
    })

    }else{
      store.commit("SET_ERRMSG", 'minimal 3 karakter dan kurang dari 50')
    }
      category.name ="";
  }

  function restoreEdit(id, name){
    store.commit("SET_ERRMSG", null)
    store.commit("SET_SUCCMSG", null)
    showModal.value = !showModal.value
    category.id = id;
    category.name = name;
    statusmodal.value = false;

  }

  async function editCategory(){
    if (category.name.length>=3 && category.name.length<=50) {
      await axios.patch(`/category/${category.id}`, category)
  .then(res=>{
    showModal.value = !showModal.value
    category.name ="";
    statusmodal.value = true;
    msg.succ = res.data.message
  })
  .catch(err=>{
    msg.err = err.response.data.message
  })
    } else {
      store.commit("SET_ERRMSG", 'minimal 3 karakter dan kurang dari 50')
    }
  }

async function deleteCategory() {
  await axios.delete(`/category/${category.id}`)
  .then(response=>{
    msg.succ = response.data.message
    store.dispatch("TOGGLE_DELETE_MODAL") 
  })
  .catch(err=>{
    msg.err = err.response.data.message
  })
}

async function toggleModal(id) {
  category.id = id
  await store.dispatch("TOGGLE_DELETE_MODAL") 
}
onMounted(() => {
    getCategory()
})
onUpdated(() => {
  getCategory();

  
})

const headers = [
  { text: "NAME", value: "name" },
  { text: "KELAS", value: "kelas.name" },
  { text: "ACTIONS", value: "actions" },
];
const items = ref([])


</script>

<style>

.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.kelas::after{
  content: ',';
  padding-right: 3px;
  
}

.kelas:last-child::after{
content: '';
}

.formkit-message{
  color: red;
}

[data-type="submit"] .formkit-input {
    @apply text-white bg-purple-400 border border-purple-400 hover:opacity-90 text-sm px-5 py-2 rounded-3xl ml-1.5
  }
</style>
