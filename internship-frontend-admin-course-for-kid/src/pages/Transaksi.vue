<template>
    <div class="flex flex-col">
        <h1 class="text-2xl font-bold capitalize mb-8">Transaksi</h1>
        <div class="relative mb-4">
            <div class="absolute z-10 -top-14 right-0">
                <DangerAlert :msg="err" />
                <SuccessAlert :msg="succ" />
            </div>
        </div>
        <EasyDataTable v-if="getTransaksi.length" :headers="headers" :items="getTransaksi" class="capitalize">
            <template #item-status_transaksi="item">
                <div class="rounded-lg bg-opacity-50 bg-green-300 p-1.5 text-xs tracking-wider w-32 text-center"
                    v-if="item.status_transaksi == 'SELESAI'">
                    <span class="text-green-700 font-medium uppercase ">{{ item.status_transaksi }}</span>
                </div>
                <div class="rounded-lg bg-opacity-50 bg-red-300 p-1.5 text-xs tracking-wider w-32 text-center" v-else>
                    <span class="text-red-700 font-medium uppercase ">{{ item.status_transaksi }}</span>
                </div>
            </template>
            <template #item-action="item">
                <button @click="toggleModal(item.id)"><img src="../assets/icons8-delete-100.png" class="w-7"
                        alt="delete" srcset=""></button>
            </template>
            <template #item-createdAt="item">
                <div>
                    {{ item.createdAt.slice(0, 10) }}
                </div>
            </template>
            <template #expand="item">
                <div class="status__done px-11 py-2" v-if="item.status_transaksi == 'SELESAI'">
                    <div class="">
                        <h2 class="text-sm">{{ item.user.name }} <span class="font-bold uppercase">Pembayaran
                                Berhasil</span></h2>
                        <h3 class="text-sm ">Bukti Pembayaran :</h3>
                        <img class="h-32" :src="item.bukti_transaksi_url" alt="bukti transfer" srcset="">
                    </div>
                </div>
                <div class="status_not_done px-11 py-4" v-else>
                    <div class="wrapper mb-3" v-if="item.bukti_transaksi_url">
                        <h3 class="text-sm mb-2">Bukti pembayaran :</h3>
                        <img class="h-32" :src="item.bukti_transaksi_url" alt="bukti transfer" srcset="">
                    </div>
                    <h3 class="text-sm mb-3" v-else>{{ item.user.name }}, <span class="font-bold uppercase">Belum
                            Melakukan Pembayaran</span></h3>
                    <form @submit.prevent="" class="w-96">
                        <DangerAlert :msg="msg.err" />

                        <label for="category" class="block mb-2 text-sm">Konfirmasi Pembayaran</label>
                        <select id="category" v-model="transaksiData.status_transaksi"
                            class="max-w-md mb-3 bg-gray-50 border border-gray-400 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5">
                            <option disabled value="">Pilih status pembayaran</option>
                            <option>SELESAI</option>
                            <option>BELUM SELESAI</option>
                        </select>
                        <tw-button type="success" round @click="konfirmasi(item.user.id, item.kela.id, item.id)"
                            v-if="item.bukti_transaksi_url">Konfirmasi</tw-button>
                        <tw-button type="success" round disabled v-else>Konfirmasi</tw-button>
                    </form>
                </div>
            </template>
        </EasyDataTable>
        <section v-else class="h-80 max-h-80 rounded-xl flex flex-col items-center justify-center bg-purple-50 ">
            <div class="bg-purple-200 p-4 rounded-full">
                <tw-icon name="heroicons-outline:calculator" class="w-10 h-10 text-purple-500 " />
            </div>
            <h1 class="capitalize text-2xl font-semibold">Belum Terdapat Transaksi</h1>
        </section>

        <vue-final-modal v-model="GET_DISMODAL" classes="flex justify-center items-center"
            content-class="relative flex p-4 flex-col rounded-lg bg-white">
            <span class="font-bold text-xl mb-3">Hapus Transaksi?</span>
            <div class="modal__content w-96">
                <DangerAlert :msg="msg.err" />
                <div class="flex">
                    <tw-button type="primary" round class="w-full" @click="deleteTransaksi">Hapus</tw-button>
                    <tw-button round class="w-full" @click="toggleModal">Cancel</tw-button>
                </div>
            </div>
        </vue-final-modal>
    </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted, computed, reactive, onUpdated } from "vue";
import DangerAlert from "@/components/DangerAlert.vue";
import SuccessAlert from "@/components/SuccessAlert.vue";
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";
const store = useStore()

const transaksi = computed(() => store.state.transaksi_details)
const GET_DISMODAL = computed(() => store.getters.GET_DISMODAL)

const getTransaksi = computed(() => store.getters.GET_TRANSAKSI)
const transaksiData = reactive({
    id: '',
    status_transaksi: ''
})

const msg = reactive({
    err: ''
})
const headers = [
    { text: "NAMA PENGIRIM", value: "name" },
    { text: "STATUS TRANSAKSI", value: "status_transaksi" },
    { text: "TANGGAL TRANSAKSI", value: "createdAt" },
    { text: "KELAS DIBELI", value: "kela.name" },
    { text: "USER", value: "user.name" },
    { text: "BANK", value: "bank.name" },
    { text: "HARGA KELAS", value: "kela.harga" },
    { text: "Rekening TUJUAN", value: "bank.rekening_no" },
    { text: "NAMA REKENING TUJUAN", value: "bank.rekening_name" },
    { text: "ACTIONS", value: "action" }
]

const succ = computed(() => store.getters.GET_SUCC_MSG)
const err = computed(() => store.getters.GET_ERR_MSG)
async function konfirmasi(userId, kelaId, transaksiId) {
    if (!transaksiData.status_transaksi) {
        msg.err = "Harap Pilih Status Pembayaran!"
    } else {
        await store.dispatch("KONFIRMASI_ADMIN", {
            id: transaksiId,
            data: transaksiData
        })
            .then(async () => {
                await store.dispatch('POST_LANGGANAN', {
                    userId: userId,
                    kelaId: kelaId,
                    transaksiDetailId: transaksiId,
                })
            })
    }
}

async function deleteTransaksi() {
    await store.dispatch("DELETE_TRANSAKSI", transaksiData.id)
        .then(success => {
            store.dispatch("TOGGLE_DELETE_MODAL")
        })
        .catch(err => {

        })
}

async function toggleModal(id) {
    transaksiData.id = id
    await store.dispatch("TOGGLE_DELETE_MODAL")
}
onUpdated(() => {
    store.dispatch("FETCH_TRANSAKSI")
}),
    onMounted(() => {
        store.dispatch("FETCH_TRANSAKSI")
    })

</script>
