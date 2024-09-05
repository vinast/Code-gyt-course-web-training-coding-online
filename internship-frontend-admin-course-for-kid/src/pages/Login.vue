<template>
  <div class="bg-green-800 min-h-screen flex flex-col items-center justify-center">
    <FormKit
    type="form"
    id="login"
    submit-label="Login"
    :actions="false"
    @submit="Login"

  >
  <h2 class="text-center text-4xl font-semibold my-3">Code GYT</h2>
  <h3 class="text-center text-1xl font-semibold my-3">
    Admin Login
  </h3>
  <DangerAlert  :msg="errMsg || err" v-if="errMsg || err"/>

    <FormKit
      type="text"
      name="email"
      label="Your email"
      placeholder="jane@example.com"
      validation="required|email"
      v-model="form.email"
      outer-class="mb-3"
        label-class="block mb-1 font-bold text-sm"
        inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-purple-500"
        input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
        autocomplete="current-password"
    />
    <div class="double">
      <FormKit
        type="password"
        name="password"
        label="Password"
        v-model="form.password"
        validation="required|length:8"
        placeholder="Your password"
        outer-class="mb-3"
        label-class="block mb-1 font-bold text-sm"
        inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-purple-500"
        input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
        autocomplete="current-password"
      />
    </div>

    <FormKit
      type="submit"
      label="Login">
      <div class="flex gap-3 items-center">
        <img class="" src="../assets/Looper-2.svg" alt="" srcset="" v-if="loading">
      <span>Login</span>
      </div>
    </FormKit>
  </FormKit>
  </div>
</template>

<script setup>
import {useStore} from "vuex"
import {  reactive, computed, ref } from "vue"
import DangerAlert from "@/components/DangerAlert.vue";
const loading = ref(false)
const err = ref()
const store = useStore();
const form = reactive({
    email:'',
    password:''
})

async function Login(params) {
  loading.value = !loading.value
    await store.dispatch("LOGIN", form)
    .then(success=>{
      store.commit("setErrormessage", null)
    })
    .catch(error =>{
      loading.value = !loading.value
    })
}
const errMsg = computed(()=>{
    return store.getters.getErrorMessage
})
</script>

<style >
#login{
  @apply bg-white w-80 sm:w-96 px-8 py-6 rounded-md
}
[data-type="submit"] .formkit-input {
    @apply text-white bg-green-400 border border-green-400 hover:opacity-90 text-sm px-5 py-2 rounded-3xl ml-1.5 font-medium
  }
</style>
