<template>
  <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
    <div class="bg-green-50 rounded-xl p-5">
      <div class="flex items-center gap-3">
        <tw-icon name="heroicons-outline:credit-card" class="w-10 h-10 text-green-500" />
        <h3 class="text-3xl font-medium text-green-500">
          <span v-if="total.banks">{{ total.banks }}</span>
          <span v-else>0</span>
        </h3>
      </div>
      <p class="mt-3 text-green-500 text-sm capitalize">
        jumlah bank tersedia
      </p>
    </div>
    <div class="bg-purple-50 rounded-xl p-5">
      <div class="flex items-center gap-3">

        <tw-icon name="heroicons-outline:calculator" class="w-10 h-10 text-purple-500" />
        <h3 class="text-3xl font-medium text-purple-500">
          <span v-if="total.transaksi">{{ total.transaksi }}</span>
          <span v-else>0</span>
        </h3>
      </div>
      <p class="mt-3 text-purple-500 text-sm">
        Jumlah Seluruh Transaksi
      </p>
    </div>
    <div class="bg-yellow-50 rounded-xl p-5">
      <div class="flex items-center gap-3">
        <tw-icon name="heroicons-outline:user-group" class="w-10 h-10 text-yellow-500" />
        <h3 class="text-3xl font-medium text-yellow-500">
          <span v-if="total.users">{{ total.users }}</span>
          <span v-else>0</span>
        </h3>
      </div>
      <p class="mt-3 text-yellow-500 text-sm">
        Jumlah Seluruh User
      </p>
    </div>
    <div class="bg-blue-50 rounded-xl p-5">
      <div class="flex items-center gap-3">

        <tw-icon name="heroicons-outline:library" class="w-10 h-10 text-blue-500" />
        <h3 class="text-3xl font-medium text-blue-500">
          <span v-if="total.kelas">{{ total.kelas }}</span>
          <span v-else>0</span>
        </h3>
      </div>
      <p class="mt-3 text-blue-500 text-sm">
        Jumlah seluruh Kelas
      </p>
    </div>
  </div>
</template>

<script setup>
import axios from "../api/axios"
import { onMounted, reactive } from "vue";
import kelas from "@/store/kelas/kelas";

const total = reactive({
  users: '',
  kelas: '',
  transaksi: '',
  banks: ''
})

async function total_user() {
  await axios.get('/userscount')
    .then(response => {
      total.users = response.data
    })
    .catch(error => {
    })
}

async function total_transaksi() {
  await axios.get('/transaksicount')
    .then(response => {
      total.transaksi = response.data
    })
    .catch(error => {
    })
}

async function total_kelas() {
  await axios.get('/kelascount')
    .then(response => {
      total.kelas = response.data
    })
    .catch(error => {
    })
}

async function total_banks() {
  await axios.get('/bankscount')
    .then(response => {
      total.banks = response.data
    })
    .catch(error => {
    })
}

onMounted(() => {
  total_user(),
    total_transaksi(),
    total_kelas(),
    total_banks()

})

</script>