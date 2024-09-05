<template>
  <div class="flex flex-col justify-center items-center min-h-screen bg-primary">
    <div class="bg-white w-10/12 sm:w-1/3 rounded-lg shadow-md">
      <div class="card-body w-full items-center text-center text-black">
        <h2 class="card-title text-4xl font-bold">{{ title }}</h2>
        <hr>
        <p class="text-md">Silakan Login menggunakan Email dan Password</p>
        <form @submit.prevent="" class="form-control w-full max-w-xs items-center">
          <error-alert v-if="errMsg" :msg="errMsg"/>

          <div class="w-full mt-4" size="xl">
            <base-input type="email" label="Email" ph="Email" size="md" v-model="form.email" @blur="v$.email.$touch" />
          </div>

          <div class="passwod-group relative w-full mt-4 " size="xl">
            <base-input :type="showpass ? 'password' : 'text'" label="Password" ph="Password" size="md" v-model="form.password" @blur="v$.password.$touch"/>
            <hide-pass @click="showpass = !showpass" v-if="!showpass" class="absolute right-3 top-11 cursor-pointer"/>
            <show-pass @click="showpass = !showpass" v-else class="absolute right-3 top-10 cursor-pointer"/>
          </div>

          <base-button @click="submitLogin" class="w-full mt-4" size="xl" design="primary">
            <div class="flex gap-3 items-center">
              <img src="../assets/loading/Looper-2.svg" alt="" srcset="" v-if="loading">
              <span>Login</span>
            </div>
          </base-button>

          <div class="w-48 my-2">
            <div class="divider m-0 before:bg-stone-600/[.10] after:bg-stone-600/[.10]">atau</div>
          </div>

          <base-button type="button" @click="toRegister" class="w-full" size="xl" design="secondary">Register</base-button>
        </form>

        <span class="my-3">
          Kembali Ke <router-link to="/" class="text-md text-blue-500">Home</router-link>
        </span>
      </div>
    </div>
  </div>
</template>



<script setup>
import { computed, reactive, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import useVuelidate from '@vuelidate/core'
import {required, email, minLength, } from '@vuelidate/validators'
const route = useRoute()
const router = useRouter()
const store = useStore()
const showpass = ref(true)
const loading = ref(false)

const errMsg = computed(()=>store.getters.getErrMsg)

function toRegister(){
    router.push({
        name:'register'
    })
}
const form = reactive({
    email:'',
    password:''
})

const rules = computed(()=>{
  return{
  email:{
              required, 
              email,
              },
  password:{
              required,
              minLength:minLength(6),
            }
}
})
const v$ = useVuelidate(rules, form)

const submitLogin = async ( )=>{
  loading.value = !loading.value
  const result = await v$.value.$validate()
  if(result){
    try {
      store.dispatch("LOGIN", form)
      .then(res=>{
        loading.value = !loading.value
      })
      .catch(err=>{
        loading.value = !loading.value
      })
    } catch (error) {
      loading.value = !loading.value
    }
  }
}

const title = computed(() => store.getters.getWebTitle)
onMounted(() => {
  store.commit("setErrMsg", null)
})
</script>
