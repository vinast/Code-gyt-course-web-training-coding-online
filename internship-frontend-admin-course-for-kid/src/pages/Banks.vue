<template>
    <div class="flex flex-col">
        <h1 class="text-2xl font-bold capitalize mb-8">
            Banks
        </h1>
        <div class="relative mb-4">
      <div class="absolute z-10 -top-14 right-0">
        <DangerAlert :msg="err"/>
        <SuccessAlert :msg="succ"/>
      </div>
    </div>
        <EasyDataTable v-if="getBanks.length" :headers="headers" :items="getBanks" class="capitalize">
            <template #item-actions="item">
        <div class="whitespace-normal flex flex-row space-x-5">
            <button @click="restoreEdit(item.id, item.name, item.rekening_name, item.rekening_no)"><img src="../assets/icons8-edit-100.png"
              class="w-7" alt="edit" srcset=""></button>
          <button @click="toggleModal(item.id)"><img src="../assets/icons8-delete-100.png" class="w-7" alt="delete"
              srcset=""></button>
        </div>
      </template>
        </EasyDataTable>
        <section v-else class="h-80 max-h-80 rounded-xl flex flex-col items-center justify-center bg-purple-50 ">
            <div class="bg-purple-200 p-4 rounded-full">
            <tw-icon name="heroicons-outline:credit-card" class="w-10 h-10 text-purple-500 " />
        </div>
        <h1 class="capitalize text-2xl font-semibold">Buat Bank pertama</h1>
            <p class="text-gray-500">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
            <tw-button
        class="mt-5"
        type="primary"
        size="md"
        round
        @click="openModal()"
        >Tambah Bank</tw-button
      >
        </section>
        <div class="wrapper">
      <tw-button
        class="mt-5"
        type="primary"
        size="md"
        round
        @click="openModal()"
        v-if="getBanks.length"
        >Tambah Bank</tw-button
      >
    </div>
    </div>

    <vue-final-modal
    v-model="showModal"
    classes="flex justify-center items-center"
    content-class="relative flex p-4 flex-col rounded-lg bg-white"
  >
    <button class=" absolute top-2 right-5" @click="openModal()">
      <span class="font-bold text-3xl">X</span>
    </button>
    <span class="font-bold text-xl text-center mb-3">Simpan Bank</span>
    <div class="modal__content w-96">
      <DangerAlert :msg="err"/>
        <FormKit type="form" :submit-label="[statusmodal ? 'Simpan Bank':'Edit Bank']" v-on:submit="[statusmodal ? addBank() : editBank()]">
          <FormKit v-model="bank.name" type="text" label="Nama Bank" outer-class="mb-3"
            label-class="block mb-1 font-bold text-sm"
            inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-purple-500"
            input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
            help-class="text-xs text-gray-500"
            validation="required|length:3"
            validation-visibility="live"/>
            <FormKit v-model="bank.rekening_name" type="text" label="Nama Pemilik Rekening" outer-class="mb-3"
            label-class="block mb-1 font-bold text-sm"
            inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-purple-500"
            input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
            help-class="text-xs text-gray-500"
            validation="required|length:3"
            validation-visibility="live"/>
            <FormKit v-model="bank.rekening_no" type="text" label="Nomor Rekening" outer-class="mb-3"
            label-class="block mb-1 font-bold text-sm"
            inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-purple-500"
            input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
            help-class="text-xs text-gray-500"
            validation="number|length:8"
            validation-visibility="live"/>
        </FormKit>
      </div>
  </vue-final-modal>
    <vue-final-modal
          v-model="GET_DISMODAL"
          classes="flex justify-center items-center"
          content-class="relative flex p-4 flex-col rounded-lg bg-white"
        >
          <span class="font-bold text-xl mb-3">Hapus Bank?</span>
          <div class="modal__content w-96">
            <DangerAlert :msg="err" />
            <div class="flex">
              <tw-button type="primary" round class="w-full" @click="deleteBank"
                >Hapus</tw-button
              >
              <tw-button round class="w-full" @click="toggleModal">Cancel</tw-button>
            </div>
          </div>
        </vue-final-modal>
</template>

<script setup>
import { ref, onMounted, reactive, computed, onUpdated,  } from "vue";
import { useStore } from "vuex";
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";
import DangerAlertVue from "@/components/DangerAlert.vue";
import SuccessAlertVue from "@/components/SuccessAlert.vue";

const store = useStore();
const showModal = ref(false);
const statusmodal = ref(true);
const GET_DISMODAL = computed(()=>store.getters.GET_DISMODAL)
const banks = computed(()=> store.state.banks)
const getBanks = computed(()=> store.getters.getBanks)
const items = ref([])

const headers = [
    {text:"NAMA BANK", value:"name"},
    {text:"Nama Rekening", value:"rekening_name"},
    {text:"Nomor Rekening", value:"rekening_no"},
    {text:"ACTION", value:"actions"}
]
const bank = reactive({
    id:'',
    name:'',
    rekening_name:'',
    rekening_no:null

})

const err = computed(()=>store.getters.getMsgErr)
const succ = computed(()=>store.getters.getMsgSucc)

function openModal(params) {
  statusmodal.value = true;
  bank.name ="";
  bank.rekening_name="";
  bank.rekening_no="";
  showModal.value = !showModal.value
}


function restoreEdit(id, name, rekening_name, rekening_no){
  store.commit("SET_ERR_MSG", null)
  store.commit("SET_SUCC_MSG", null)
    showModal.value = !showModal.value
    bank.id = id;
    bank.name = name;
    bank.rekening_name = rekening_name;
    bank.rekening_no = rekening_no;
    statusmodal.value = false;

  }

function addBank(params) {
  statusmodal.value = true;
  store.commit("SET_ERR_MSG", null)
  store.commit("SET_SUCC_MSG", null)
  store.dispatch("POST_BANK", {
    name: bank.name,
    rekening_name: bank.rekening_name,
    rekening_no: bank.rekening_no
  })
    .then(res=>{
    })
    .catch(err=>{
      console.log(err);
    })
   
      showModal.value = !showModal.value
      bank.name ="";
      bank.rekening_name="";
  bank.rekening_no="";
      
}

async function editBank(){
  store.commit("SET_ERR_MSG", null)
  store.commit("SET_SUCC_MSG", null)
    await store.dispatch("UPDATE_BANK",{
        id:bank.id,
        data:{
          name: bank.name,
      rekening_name: bank.rekening_name,
        rekening_no: bank.rekening_no
        }
    })
  .then(res=>{

    showModal.value = !showModal.value
   bank.name ="";
   bank.rekening_name="";
  bank.rekening_no="";
    statusmodal.value = true;
  })
  .catch(err=>{
  })
  }

async function deleteBank(){
    await store.dispatch("DELETE_BANK", bank.id)
    .then(res=>{
      store.dispatch("TOGGLE_DELETE_MODAL") 
    })
    .catch(err=>{ 
    })
}

async function toggleModal(id) {
  bank.id = id
  await store.dispatch("TOGGLE_DELETE_MODAL") 
}

onMounted(() => {
    store.dispatch("GETBANKS")
})

onUpdated(()=>{
    store.dispatch("GETBANKS")
  })
</script>

<style>
.formkit-message{
  color: red;
}

[data-type="submit"] .formkit-input {
    @apply text-white bg-purple-400 border border-purple-400 hover:opacity-90 text-sm px-5 py-2 rounded-3xl ml-1.5
  }
</style>