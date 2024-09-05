<template>
  <div class="flex flex-col">
    <h1 class="text-3xl font-bold capitalize mb-8">User</h1>
    <div class="relative mb-4">
      <div class="absolute z-10 -top-14 right-0">
        <DangerAlert :msg="msg.err"/>
        <SuccessAlert :msg="msg.succ"/>
      </div>
    </div>
    <EasyDataTable v-if="items.length" :headers="headers" :items="items" class="capitalize">
      <template #item-email="item">
        <div class="lowercase">
          {{ item.email }}
        </div>
        
      </template>
      <template #item-no_telp="item">
        <div>
          +62{{ item.no_telp }}
        </div>
      </template>
      <template #item-actions="item">
        <div class="whitespace-normal flex flex-row space-x-5">
          <button @click="restoreEdit(item.id, item.name, item.no_telp, item.email)"><img src="../assets/icons8-edit-100.png"
              class="w-7" alt="edit" srcset=""></button>
          <button @click="toggleModal(item.id)"><img src="../assets/icons8-delete-100.png" class="w-7" alt="delete"
              srcset=""></button>
        </div>
      </template>
    </EasyDataTable>
    <section v-else class="h-80 max-h-80 rounded-xl flex flex-col items-center justify-center bg-purple-50 ">
            <div class="bg-purple-200 p-4 rounded-full">
            <tw-icon name="heroicons-outline:users" class="w-10 h-10 text-purple-500 " />
        </div>
        <h1 class="capitalize text-2xl font-semibold">Belum ada user yang terdaftar</h1>
            <p class="text-gray-500">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
        </section>
    <vue-final-modal v-model="showModal" classes="flex justify-center items-center"
      content-class="relative flex p-4 flex-col rounded-lg bg-white">
      <button class="absolute top-2 right-5" @click="showModalForm">
        <span class="font-bold text-3xl">X</span>
      </button>
      <span class="font-bold text-xl text-center mb-3">Update User</span>
      <div class="modal__content w-80 sm:w-96">
        <FormKit type="form" submit-label="Simpan User" @submit="editUser">
          <FormKit v-model="dataUser.name" type="text" label="Nama User" outer-class="mb-3"
            label-class="block mb-1 font-bold text-sm"
            inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-purple-500"
            input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
            help-class="text-xs text-gray-500"
            validation="required|length:3"
            validation-visibility="live" />
            <div class="relative">
        <FormKit
        v-model="dataUser.no_telp"
        type="text"
        label="Nomor Hp User"
        outer-class="mb-3"
        label-class="block mb-1 font-bold text-sm"
        inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-purple-500"
        input-class="w-full h-10 pl-14 border-none text-base text-gray-700 placeholder-gray-400"
        help-class="text-xs text-gray-500"
        :validation="[['required'], ['matches', /^[8][0-9]{3}[0-9]{3}[0-9]{3,6}$/]]"
        validation-visibility="live"
      />
        <div class="box absolute h-10 w-10 rounded-md  bg-gray-300 flex items-center justify-center">
              <div class="">
                +62
              </div>
            </div>
      </div>
          <FormKit v-model="dataUser.email" type="email" label="Email User" outer-class="mb-3"
            label-class="block mb-1 font-bold text-sm"
            inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-purple-500"
            input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
            help-class="text-xs text-gray-500"
            validation="required|email"
            validation-visibility="live" />
          <FormKit v-model="dataUser.password" type="password" label="Password User" outer-class="mb-3"
            label-class="block mb-1 font-bold text-sm"
            inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-purple-500"
            input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
            help-class="text-xs text-gray-500" 
            validation="length:8"
            validation-visibility="live"/>
        </FormKit>
      </div>
    </vue-final-modal>
    
    <vue-final-modal
          v-model="GET_DISMODAL"
          classes="flex justify-center items-center"
          content-class="relative flex p-4 flex-col rounded-lg bg-white"
        >
          <span class="font-bold text-xl mb-3">Hapus User?</span>
          <div class="modal__content w-96">
            <DangerAlert :msg="msg.err" />
            <div class="flex">
              <tw-button type="primary" round class="w-full" @click="deleteUser"
                >Hapus</tw-button
              >
              <tw-button round class="w-full" @click="toggleModal">Cancel</tw-button>
            </div>
          </div>
        </vue-final-modal>

  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted, reactive, ref } from "vue";
import axios from "../api/axios";
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";
import DangerAlert from "@/components/DangerAlert.vue";
import SuccessAlert from "@/components/SuccessAlert.vue";

const GET_DISMODAL = computed(()=>store.getters.GET_DISMODAL)
const items = ref([]);
const store = useStore();
const showModal = ref(false);
const dataUser = reactive({
  id: "",
  name: "",
  no_telp:null,
  email: "",
  password: "",
});

const msg = reactive({
  err:'',
  succ:''
})

const headers = [
  { text: "NAME", value: "name" },
  { text: "No Hp", value: "no_telp" },
  { text: "EMAIL", value: "email" },
  { text: "ROLE", value: "role" },
  { text: "ACTIONS", value: "actions" },
];

async function getUser(params) {
  await axios
    .get("/users")
    .then((res) => {
      items.value = res.data;
    })
    .catch((err) => {
    });
}

function showModalForm(params) {
  showModal.value = !showModal.value
  dataUser.name = ""
  dataUser.email = ""
  dataUser.no_telp = ""
  dataUser.password = ""
}

function restoreEdit(id, name,no_telp, email) {
  showModal.value = true;
  dataUser.id = id;
  dataUser.name = name;
  dataUser.no_telp = no_telp;
  dataUser.email = email;
  
}


async function editUser() {
  return new Promise((resolve, reject) => {
    axios
      .patch(`/users/${dataUser.id}`, {
        name: dataUser.name,
        no_telp: parseInt(dataUser.no_telp),
        email: dataUser.email,
        password: dataUser.password
      })
      .then(({ data, status }) => {
        msg.succ = data.message

        if (status === 200) {
          resolve(true)
          dataUser.name = ""
  dataUser.no_telp = ""

          dataUser.email = ""
          dataUser.password = ""
          showModal.value = false
        }
        getUser()
      })
      .catch(error => {
        msg.err = error.response.data.message
        reject(error)
      })

  })
}

async function deleteUser() {
 await axios.delete(`users/${dataUser.id}`)
    .then(res => {
      msg.succ = res.data.message
      store.dispatch("TOGGLE_DELETE_MODAL") 
      getUser();

    })
    .catch(err => {
      msg.err = err.response.data.message
    })

}

async function toggleModal(id) {
  dataUser.id = id
  await store.dispatch("TOGGLE_DELETE_MODAL") 
}

onMounted(() => {
  getUser();
});
</script>

<style>
.formkit-message{
  color: red;
}

[data-type="submit"] .formkit-input {
    @apply text-white bg-purple-400 border border-purple-400 hover:opacity-90 text-sm px-5 py-2 rounded-3xl ml-1.5
  }

  .box{
  top: 25px;
  left: 1px;
}
  </style>
