<template>
  <div class="p-5 bg-gray-100 sm:h-screen text-black">
    <h1 class="text-3xl mb-6 font-bold">Profile Saya</h1>
    <form @submit.prevent="" class="form-control w-full max-w-xs items-center">
      <success-alert :msg="succ" class="mb-4" />
      <error-alert :msg="err" />
      <base-input type="text" label="Nama lengkap anda" ph="Nama Lengkap" size="md" err="" v-model="form.name"
        @blur="v$.name.$touch" />
      <span class="label py-0 w-full text-left -ml-1 text-red-600" v-for="error in v$.name.$errors" :key="error.$uid">{{
          error.$message
      }}</span>
                 <div class="relative w-full">
              <base-input type="tel" class="pl-14" label="Nomor Handphone" ph="Nomor Handphone " size="md" err="" v-model="form.no_telp" @blur="v$.no_telp.$touch"/>
            <div class="absolute h-12 w-12 -left-0 top-7 bg-gray-300 flex items-center justify-center">
              <div class="">
                +62
              </div>
            </div>
            </div>
      <span class="label py-0 w-full text-left -ml-1 text-red-600" v-for="error in v$.no_telp.$errors"
        :key="error.$uid">{{ error.$message }}</span>
        <span class="label py-0 w-full text-left -ml-1 text-red-600" v-if="msg.addmsg">{{ msg.addmsg }}</span>

      <base-input type="email" label="Email" ph="Email " size="md" err="" v-model="form.email"
        @blur="v$.email.$touch" />
      <span class="label py-0 w-full text-left -ml-1 text-red-600" v-for="error in v$.email.$errors"
        :key="error.$uid">{{ error.$message }}</span>
      <div class="passwod-group relative w-full mt-2">
        <base-input type="password" label="Password" ph="Password" size="md" err="" v-model="form.password"
          @blur="v$.password.$touch" />
        <span class="label py-0 w-full text-left -ml-1 text-red-600" v-for="error in v$.password.$errors"
          :key="error.$uid">{{ error.$message }}</span>
      </div>
      <div class="flex w-full flex-row justify-around items-center mt-5">
        <base-button @click="submitUpdate" size="lg" design="primary">Update Profile</base-button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted, computed, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  helpers,
  integer,
} from "@vuelidate/validators";
import axios from "../../api/axios";

const store = useStore();
const route = useRoute();
const router = useRouter();
const status = ref(false);


const err = computed(() => store.getters.getErrMsg);
const succ = computed(() => store.getters.getSuccMsg);

const form = reactive({
  id: "",
  name: "",
  no_telp: "",
  email: "",
  password: "",
});

const msg = reactive({
  addmsg:''
})


let numberRegEx = "^8[1-9][0-9]{6,9}$"


const rules = computed(() => {
  return {
    name: {
      required,
      minLength: minLength(8),
    },
    no_telp: {
      required,
      integer,
      minLength: minLength(10),
    },
    email: {
      required,
      email,
    },

    password: {
      minLength: minLength(8),
    },
  };
});
const v$ = useVuelidate(rules, form);

async function submitUpdate() {
  msg.addmsg = ""
  const result = await v$.value.$validate();
  if (result && form.no_telp.match(numberRegEx)) {
    try {
      store.dispatch("UPDATEUSER", {
        id: route.params.id,
        data: {
          name: form.name,
          no_telp: parseInt(form.no_telp),
          email: form.email,
          password: form.password,
        },
      });
      status.value = !status.value;
    } catch (error) { }
  }
  msg.addmsg = "Masukan nomor telephone yang benar"
  loading.value = !loading.value
}

function GETBYID() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/users/${route.params.id}`)
      .then(({ data, status }) => {
        (form.id = data.id),
          (form.name = data.name),
          (form.no_telp = data.no_telp);
        form.email = data.email;
        if (status === 200) {
          resolve(true);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

onMounted(() => {
  store.commit("setErrMsg", null);
  store.commit("setSuccMsg", null);
  GETBYID();
});
</script>
