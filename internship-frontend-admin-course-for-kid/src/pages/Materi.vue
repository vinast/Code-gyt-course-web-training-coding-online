<template>
  <div class="flex flex-col">
    <h1 class="text-2xl font-bold capitalize mb-8">Materi Kelas</h1>
    <div class="relative mb-4">
      <div class="absolute z-10 -top-14 right-0">
        <DangerAlert :msg="msg.err" />
        <SuccessAlert :msg="msg.succ" />
      </div>
    </div>
    <EasyDataTable v-if="items.length" :headers="headers" :items="items" class="capitalize">
      <template #item-deskripsi_content="item">
        <span v-html="item.deskripsi_content.substr(0, 10)" @click="showDetails" v-if="show === false"
          class="cursor-pointer">
        </span>
        <div class="cursor-pointer" @click="showDetails" v-else>
          <QuillEditor theme="" toolbar="" :content="item.deskripsi_content" contentType="html" readOnly />
        </div>
      </template>

      <template #item-isLocked="item">
        <span v-if="item.isLocked === true">Materi Berbayar</span>
        <span v-else>Materi Gratis</span>
      </template>

      <template #item-actions="item">
        <div class="whitespace-normal flex flex-row space-x-5">
          <button @click="
          restoreEdit(
            item.id,
            item.name,
            item.content,
            item.deskripsi_content,
            item.isLocked
          )
          ">
            <img src="../assets/icons8-edit-100.png" class="w-7" alt="edit" srcset="" />
          </button>
          <button @click="toggleModal(item.id)">
            <img src="../assets/icons8-delete-100.png" class="w-7" alt="delete" srcset="" />
          </button>
        </div>
      </template>
      <template #expand="item">
        <div class="px-5 py-3">
          <iframe width="300" height="180" :src="`https://www.youtube.com/embed/${item.content}?controls=1`">
          </iframe>
        </div>
      </template>
    </EasyDataTable>
    <section class="h-80 max-h-80 rounded-xl flex flex-col items-center justify-center bg-purple-50" v-else>
      <div class="bg-purple-200 p-4 rounded-full">
        <tw-icon name="heroicons-outline:library" class="w-10 h-10 text-purple-500" />
      </div>
      <h1 class="capitalize text-2xl font-semibold">Buat materi pertama</h1>
      <p class="text-gray-500">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      </p>
      <tw-button class="mt-5" type="primary" round @click="openModal()">Buat Materi</tw-button>
    </section>
    <div class="wrapper w-32" v-if="items.length">
      <tw-button class="mt-5" type="primary" size="md" round @click="openModal()">Buat Materi</tw-button>
    </div>

  </div>
  <vue-final-modal v-model="showModal" classes="flex justify-center items-center mx-5 py-5 "
    content-class="relative flex p-4 flex-col rounded-lg bg-white w-96 sm:w-full">
    <button class="absolute top-2 right-5" @click="openModal()">
      <span class="font-bold text-3xl">X</span>
    </button>
    <span class="font-bold text-xl text-center mb-3">Simpan Content</span>

    <div class="modal__content">
      <FormKit type="form" :submit-label="[statusmodal ? 'Simpan Materi' : 'Edit Materi']"
        v-on:submit="[statusmodal ? addMateri() : editMateri()]">
        <div class="flex flex-row  space-x-5 overflow-y-auto my-7  ">
          <div class="first__row__wrapper sm:w-96 h-96">
            <FormKit v-model="materi.name" type="text" label="Nama Materi" outer-class="mb-3"
              label-class="block mb-1 font-bold text-sm"
              inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-purple-500"
              input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
              help-class="text-xs text-gray-500" validation="required|length:6" />
            <FormKit v-model="materi.content" type="text" label="Link Video Materi" outer-class="mb-3"
              label-class="block mb-1 font-bold text-sm"
              inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-purple-500"
              input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
              help-class="text-xs text-gray-500" validation="required|length:6" />
            <FormKit v-model="materi.isLocked" type="select" label="Status Materi" outer-class="mb-3"
              label-class="block mb-1 font-bold text-sm"
              inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-purple-500"
              input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
              help-class="text-xs text-gray-500" placeholder="Pilih status materi" name="status" validation="required"
              validation-visibility="dirty">
              <option :value="false">Materi Gratis</option>
              <option :value="true">Materi Berbayar</option>
            </FormKit>
            <!-- mobile -->
            <div class="h-60 w-80 sm:hidden">
              <label for="" class="block mb-1 font-bold text-sm">Deskripsi Materi</label>
              <QuillEditor theme="snow" v-model:content="materi.deskripsi_content" contentType="html" />

            </div>
            <DangerAlert :msg="err" />
            <SuccessAlert :msg="succ" />
          </div>
          <!-- desktop -->
          <div class="second__row__wraper flex-1 w-auto  hidden sm:block">
            <label for="" class="block mb-1 font-bold text-sm">Deskripsi Materi</label>
            <QuillEditor v-if="materi.deskripsi_content" theme="snow" v-model:content="materi.deskripsi_content"
              contentType="html" />
            <QuillEditor v-else theme="snow" v-model:content="materi.deskripsi_content" contentType="html" />

          </div>
        </div>
      </FormKit>
    </div>
  </vue-final-modal>

  <vue-final-modal v-model="GET_DISMODAL" classes="flex justify-center items-center"
    content-class="relative flex p-4 flex-col rounded-lg bg-white">
    <span class="font-bold text-xl mb-3">Hapus Materi?</span>
    <div class="modal__content w-96">
      <DangerAlert :msg="msg.err" />
      <div class="flex">
        <tw-button type="primary" round class="w-full" @click="deleteMateri">Hapus</tw-button>
        <tw-button round class="w-full" @click="toggleModal">Cancel</tw-button>
      </div>
    </div>
  </vue-final-modal>
</template>

<script setup>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, reactive, ref, onUpdated } from "vue";
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import wysiwyg from "../components/WYSIWYG.vue"

import axios from "../api/axios";

import DangerAlert from "@/components/DangerAlert.vue";
import SuccessAlert from "@/components/SuccessAlert.vue";

const GET_DISMODAL = computed(() => store.getters.GET_DISMODAL);
const items = ref([]);
const store = useStore();
const route = useRoute();
const router = useRouter();
const showModal = ref(false);
const statusmodal = ref(true);
const show = ref(false);

const headers = [
  { text: "NAME", value: "name" },
  { text: "DESKRIPSI", value: "deskripsi_content" },
  { text: "STATUS MATERI", value: "isLocked" },
  { text: "ACTIONS", value: "actions" },
];

const msg = reactive({
  err: "",
  succ: "",
});

const err = computed(() => store.getters.GET_ERR);
const succ = computed(() => store.getters.GET_SUCC);

function openModal(params) {
  statusmodal.value = true;
  materi.id = "";
  materi.name = "";
  materi.content = "";
  materi.deskripsi_content = "";
  materi.isLocked = null;
  store.commit("SET_SUCC_MSG", null);
  store.commit("SET_ERR_MSG", null);

  showModal.value = !showModal.value;
}

function showDetails() {
  show.value = !show.value;
}

const materi = reactive({
  id: "",
  name: "",
  deskripsi_content: "",
  content: "",
  isLocked: null,
  kelaId: route.params.id,
});

async function addMateri() {
  statusmodal.value = true;
  await store
    .dispatch("POST_MATERI", materi)
    .then((res) => { })

    .catch((err) => { });
  showModal.value = !showModal.value;
  materi.name = "";
  materi.content = "";
  materi.deskripsi_content = "";
  materi.isLocked = null;
}

function restoreEdit(id, name, content, deskripsi_content, status) {
  store.commit("SET_SUCC_MSG", null);
  store.commit("SET_ERR_MSG", null);
  showModal.value = !showModal.value;
  materi.id = id;
  materi.name = name;
  materi.content = content;
  materi.deskripsi_content = deskripsi_content;
  materi.isLocked = status;
  statusmodal.value = false;
}

async function editMateri(params) {
  await store
    .dispatch("UPDATE_MATERI", {
      id: materi.id,
      data: materi,
    })
    .then((res) => {
      showModal.value = !showModal.value;
      materi.name = "";
      materi.content = "";
      materi.deskripsi_content = "";
      materi.isLocked = null;
      statusmodal.value = true;
    })
    .catch((err) => { });
}

async function deleteMateri() {
  try {
    await axios
      .delete(`/materi/${materi.id}`)
      .then((res) => {
        msg.succ = res.data.message;
        store.dispatch("TOGGLE_DELETE_MODAL");
      })
      .catch((err) => {
        msg.err = err.response.data.message;
      });
  } catch (error) { }
}

const getMateri = async () => {
  try {
    const response = await axios.get(`/materi/${route.params.id}`);
    items.value = response.data;
  } catch (error) { }
};

async function toggleModal(id) {
  materi.id = id;
  await store.dispatch("TOGGLE_DELETE_MODAL");
}

onMounted(() => {
  getMateri();
});

onUpdated(() => {
  getMateri();
});
</script>

<style>
.formkit-message {
  color: red;
}

[data-type="submit"] .formkit-input {
  @apply text-white bg-purple-400 border border-purple-400 hover:opacity-90 text-sm px-5 py-2 rounded-3xl ml-1.5;
}
</style>
