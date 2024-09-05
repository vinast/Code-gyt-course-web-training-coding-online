<template>
  <div class="flex flex-col">
    <h1 class="text-3xl font-bold capitalize mb-8">User</h1>
    <FormKit type="form" submit-label="Simpan User" @submit="updateUser">
      <Success-alert :msg="msg.succ" />
      <Danger-alert :msg="msg.err" />
      <FormKit
        v-model="dataUser.name"
        type="text"
        label="Nama User"
        outer-class="mb-3"
        label-class="block mb-1 font-bold text-sm"
        inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-purple-500"
        input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
        help-class="text-xs text-gray-500"
        validation="required"
        validation-visibility="live"
      />
      
      <div class="relative">
        <FormKit
        v-model="dataUser.no_telp"
        type="tel"
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
      <FormKit
        v-model="dataUser.email"
        type="email"
        label="Email User"
        outer-class="mb-3"
        label-class="block mb-1 font-bold text-sm"
        inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-purple-500"
        input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
        help-class="text-xs text-gray-500"
        validation="required|email"
        validation-visibility="live"
      />
      <FormKit
        v-model="dataUser.password"
        type="text"
        label="Password User"
        outer-class="mb-3"
        label-class="block mb-1 font-bold text-sm"
        inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-purple-500"
        input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
        help-class="text-xs text-gray-500"
        validation="length:8"
        validation-visibility="live"
      />
    </FormKit>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/api/axios";
import { FormKit } from "@formkit/vue";

import DangerAlert from "@/components/DangerAlert.vue";
import SuccessAlert from "@/components/SuccessAlert.vue";
import { email, password } from "@formkit/inputs";

const route = useRoute();
const router = useRouter();

const dataUser = reactive({
  id: "",
  name: "",
  no_telp:null,
  email: "",
  password: "",
  role: "",
});

const msg = reactive({
  err: "",
  succ: "",
});
async function userbyID(params) {
  axios
    .get(`/users/${route.params.id}`)
    .then((res) => {
      dataUser.id = res.data.id;
      dataUser.name = res.data.name;
      dataUser.no_telp = res.data.no_telp;
      dataUser.email = res.data.email;
      dataUser.role = res.data.role;
    })
    .catch((err) => {});
}

async function updateUser(params) {
  axios
    .patch(`/users/${route.params.id}`, {
      name:dataUser.name,
      no_telp:parseInt(dataUser.no_telp),
      email:dataUser.email,
      password:dataUser.password,
    })
    .then((res) => {
      msg.succ = res.data.message;
    })
    .catch((err) => {
      msg.err = err.response.data.message;
    });
}

onMounted(() => {
  userbyID();
});
</script>

<style>
.formkit-message {
  color: red;
}

[data-type="submit"] .formkit-input {
  @apply text-white bg-green-400 border border-green-400 hover:opacity-90 text-sm px-5 py-2 rounded-3xl ml-1.5;
}

.formkit-form {
  @apply w-96;
}

.box{
  top: 25px;
  left: 1px;
}
</style>
