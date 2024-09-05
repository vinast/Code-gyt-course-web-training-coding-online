<template>
  <div class="min-h-screen min-w-full container flex flex-row justify-center items-center bg-primary">
    <div class="bg-white w-10/12 sm:w-1/3 rounded-lg shadow-md">
      <div class="card-body grow-0 w-full items-center text-center text-black space-y-2">
        <h2 class="card-title text-4xl font-bold">Register Code GYT</h2>
        <p class="text-md">Silahkan Daftar Menggunakan Data Yang Valid</p>
        <form @submit.prevent="" class="form-control w-full max-w-xs items-center  ">
          <error-alert :msg="errMsg" v-if="errMsg" />
          <success-alert :msg="succMsg" class="mb-4" v-if="succMsg" />

          <base-input type="text" label="Nama lengkap anda" ph="Nama Lengkap" size="md" err="" v-model="form.name"
            @blur="v$.name.$touch" />
          <span class="label py-0 w-full text-left -ml-1 text-red-600" v-for="error in v$.name.$errors"
            :key="error.$uid">{{ error.$message }}</span>
          <base-input type="email" label="Email" ph="Email " size="md" err="" v-model="form.email"
            @blur="v$.email.$touch" />
          <span class="label py-0 w-full text-left -ml-1 text-red-600" v-for="error in v$.email.$errors"
            :key="error.$uid">{{ error.$message }}</span>

          <div class="relative w-full">
            <base-input type="tel" class="pl-14" label="Nomor Handphone" ph="Nomor Handphone " size="md" err=""
              v-model="form.no_telp" @blur="v$.no_telp.$touch" />
            <div class="absolute h-12 w-12 -left-0 top-7 bg-gray-300 flex items-center justify-center">
              <div class="">
                +62
              </div>
            </div>
          </div>
          <span class="label py-0 w-full text-left -ml-1 text-red-600" v-for="error in v$.no_telp.$errors"
            :key="error.$uid">{{ error.$message }}</span>
          <span class="label py-0 w-full text-left -ml-1 text-red-600" v-if="msg.addmsg">{{ msg.addmsg }}</span>

          <div class="passwod-group relative w-full mt-2 ">
            <base-input :type="[showpass ? 'password' : 'text']" label="Password" ph="Password" size="md" err=""
              v-model="form.password" @blur="v$.password.$touch" />
            <span class="label py-0 w-full text-left -ml-1 text-red-600" v-for="error in v$.password.$errors"
              :key="error.$uid">{{ error.$message }}</span>
            <hide-pass @click="showpass = !showpass" v-if="!showpass" class="absolute right-3 top-11 cursor-pointer" />
            <show-pass @click="showpass = !showpass" v-else class="absolute right-3 top-10 cursor-pointer" />
          </div>
          <div class="passwod-group relative w-full mt-2">
            <base-input :type="[showcpass ? 'password' : 'text']" label="Konfirmasi Password" ph="Konfirmasi Password"
              size="md" err="" v-model="form.cpassword" @blur="v$.cpassword.$touch" />
            <span class="label py-0 w-full text-left -ml-1 text-red-600" v-for="error in v$.cpassword.$errors"
              :key="error.$uid">{{ error.$message }}</span>
            <hide-pass @click="showcpass = !showcpass" v-if="!showcpass"
              class="absolute right-3 top-11 cursor-pointer" />
            <show-pass @click="showcpass = !showcpass" v-else class="absolute right-3 top-10 cursor-pointer" />
          </div>
          <br>

          <div class="flex w-full justify-center items-center mt-2 max-w-xs">
            <base-button @click="submitRegister" size="lg" design="primary" class="w-full">
              <loading-spin v-if="loading" size="h-5" /> Register
            </base-button>
          </div>

          <!-- Divider -->
          <div class="w-48 my-2">
            <div class="divider m-0 before:bg-stone-600/[.10] after:bg-stone-600/[.10]">atau</div>
          </div>

          <!-- Tombol Back home -->
          <div class="flex w-full justify-center items-center">
            <base-button type="button" size="lg" design="secondary" @click="toHome" class="w-full">
              Back home
            </base-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from "vuex"
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs, integer, helpers } from '@vuelidate/validators'
const route = useRoute()
const router = useRouter()
const store = useStore();
const showpass = ref(true)
const showcpass = ref(true)
const loading = ref(false)
function toHome() {
  router.push({
    name: 'home'
  })
}
const form = reactive({
  name: "",
  no_telp: "",
  email: '',
  password: '',
  cpassword: ''
})

const msg = reactive({
  addmsg: ''
})

let numberRegEx = /^8\d{9,}$/
const rules = computed(() => {
  return {
    name: {
      required,
      minLength: minLength(8)
    },
    email: {
      required,
      email,
    },
    no_telp: {
      required,
      integer,
      regex: helpers.regex(numberRegEx)
      // minLength:minLength(10)
    },
    password: {
      required,
      minLength: minLength(8),
    },
    cpassword: {
      required,
      sameAs: sameAs(form.password)
    }
  }
})
const v$ = useVuelidate(rules, form)

const submitRegister = async () => {
  loading.value = !loading.value
  msg.addmsg = ''
  store.commit("setErrMsg", null)
  store.commit("setSuccMsg", null)
  const result = await v$.value.$validate()
  if (result && form.no_telp.match(numberRegEx)) {
    await store.dispatch("REGISTER", {
      name: form.name,
      no_telp: parseInt(form.no_telp),
      email: form.email,
      password: form.password
    })
      .then(success => {
        loading.value = !loading.value

      })
      .catch(error => {
        loading.value = !loading.value

      })
  }
  // msg.addmsg = "Masukan nomor telephone yang benar"
  // loading.value = !loading.value
}


const errMsg = computed(() => store.getters.getErrMsg)
const succMsg = computed(() => store.getters.getSuccMsg)

onMounted(() => {
  store.commit("setErrMsg", null)
  store.commit("setSuccMsg", null)
})
</script>
