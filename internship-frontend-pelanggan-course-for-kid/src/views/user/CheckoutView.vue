<template>
  <div class="p-5 bg-gray-100 sm:h-screen text-black">
    <h1 class="text-3xl mb-2 font-bold capitalize">Checkout</h1>
    <div class="flex flex-col sm:flex-row mt-6 justify-between">
      <div class="w-full sm:w-1/2 px-5 py-3">
        <form @submit.prevent="" class="flex flex-col space-y-1">
          <h3 class="font-bold capitalize text-2xl mb-7">Metode Pembayaran</h3>
          <base-input type="text" label="Nama Pengirim" ph="Nama Lengkap" size="md" v-model="data.name" @blur="" />
          <span class="label py-0 w-full text-left -ml-1 text-red-600" v-for="error in v$.name.$errors" :key="error.$uid">{{ error.$message }}</span>

          <label class="label py-0 w-full text-left -ml-1">
            <span class="label-text capitalize text-black text-lg font-medium">Pilih Bank</span>
          </label>
          <select class="input max-w-xs w-full placeholder:text-black focus:outline-none drop-shadow-md border-black rounded-none input-md" v-model="data.bankId">
            <option :value="bank.id" v-for="bank in getBanks">
              {{ bank.name }}
            </option>
          </select>
          <span class="label py-0 w-full text-left -ml-1 text-red-600" v-for="error in v$.bankId.$errors" :key="error.$uid">{{ error.$message }}</span>

          <label class="label py-0 w-full text-left -ml-1">
            <span class="label-text capitalize text-black text-lg font-medium">Kelas Yang Dipilih</span>
          </label>
          <div class="input max-w-xs w-full placeholder:text-black focus:outline-none drop-shadow-md border-black rounded-none input-md flex items-center justify-center font-bold text-black">
            {{ getKelas.name }}
          </div>
        </form>
      </div>

      <div class="class__info flex-1 px-5 py-3">
        <h3 class="font-bold capitalize text-2xl mb-7">Detail</h3>
        <div class="wrapper-card flex flex-row justify-between w-64">
          <div class="info__card">
            <p>Kelas&nbsp;&nbsp;&nbsp;:</p>
            <br>
            <p>Harga&nbsp;&nbsp;:</p>
          </div>
          <div class="price__card">
            <p class="">{{ getKelas.name }}</p>
            <br>
            <p class="">Rp{{ getKelas.harga }}</p>
          </div>
        </div>
        <div class="divider w-64"></div>
        <div class="info__total w-64 font-bold flex flex-row justify-between">
          <h3>Total Harga</h3>
          <p>Rp{{ getKelas.harga }}</p>
        </div>

        <div class="wrapper mt-4 flex flex-col space-y-4">
          <base-button @click="BeliKelas" size="xl" design="primary">
            <loading-spin v-if="loading" />
            Beli
          </base-button>
        </div>

        <div class="toast toast-top toast-end top-20 right-6">
          <success-alert v-if="succ" :msg="succ" />
          <error-alert v-if="err && !succ" :msg="err" />
        </div>

        <div class="wrapper mt-4" v-if="succ">
          <base-button @click="goToTransactions" size="xl" design="secondary">
            Lihat Transaksi Anda
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, reactive, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

const store = useStore();
const route = useRoute();
const router = useRouter();

const loading = ref(false);

const bank = computed(() => store.state.banks);
const getBanks = computed(() => store.getters.getBanks);
const getKelas = computed(() => store.getters.getKelas);
const me = computed(() => store.getters.getMe);
const err = computed(() => store.getters.getMsgErr);
const succ = computed(() => store.getters.getMsgSucc);

const data = reactive({
  name: "",
  userId: me.value.id,
  kelaId: route.params.id,
  bankId: "",
});

const rules = computed(() => {
  return {
    name: {
      required,
      minLength: minLength(3),
    },
    bankId: {
      required,
    },
  };
});
const v$ = useVuelidate(rules, data);

async function BeliKelas(params) {
  const result = await v$.value.$validate();
  loading.value = !loading.value;
  if (result) {
    await store
      .dispatch("BELI_KELAS", data)
      .then((res) => {
        loading.value = !loading.value;
      })
      .catch((err) => {
        loading.value = !loading.value;
      });
  } else {
    loading.value = !loading.value;
  }
}

function goToTransactions() {
  router.push({ name: 'TransactionView' });
}

onMounted(() => {
  store.dispatch("GET_KELAS_BY_ID", route.params.id);
  store.dispatch("GET_BANKS");
});
</script>

