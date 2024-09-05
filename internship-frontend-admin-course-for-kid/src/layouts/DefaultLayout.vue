<template>
  <!-- Sidebar -->
  <sidebar @visibility-change="onSidebarVisibilityChanged" />
  <!-- Content Container-->
  <div
    class="min-h-screen"
    :class="{ 'overflow-hidden max-h-screen fixed': visibleResponsiveSidebar }"
  >
    <navbar />
    <!-- Content -->
    <div class="lg:ml-64 pt-14 px-5">
      <div class="container mx-auto my-5">
        <router-view />
        <vue-final-modal
          v-model="showModal"
          classes="flex justify-center items-center"
          content-class="relative flex p-4 flex-col rounded-lg bg-white"
        >
          <span class="font-bold text-xl mb-3">Log out dari Admin?</span>
          <div class="modal__content w-96">
            <DangerAlert :msg="err" />
            <div class="flex">
              <tw-button type="primary" round class="w-full" @click="logout"
                >Log out</tw-button
              >
              <tw-button round class="w-full" @click="close">Cancel</tw-button>
            </div>
          </div>
        </vue-final-modal>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";
import Sidebar from "@/components/layouts/TheSidebar.vue";
import Navbar from "@/components/layouts/TheNavbar.vue";
import DangerAlert from "@/components/DangerAlert.vue";
import { useStore } from "vuex";
import { onMounted } from "vue";
import { computed } from "@vue/reactivity";

const store = useStore();

const showModal = computed(() => store.getters.GET_SHOWMODAL);
const err = computed(() => store.getters.getErrorLogout);

onMounted(() => {
  store.dispatch("GETME");
});

function close() {
  store.dispatch("DisplayModal");
}

async function logout() {
  await store.dispatch("LOGOUT");
}

const visibleResponsiveSidebar = ref(false);
const onSidebarVisibilityChanged = (visible) => {
  visibleResponsiveSidebar.value = visible;
};
</script>
