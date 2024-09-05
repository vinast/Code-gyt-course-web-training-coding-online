<template>
  <ul tabindex="0" class="dropdown-content top-11 menu shadow bg-base-100 rounded-box w-52">
    <li>
      <router-link to="/myclass" class="text-base font-normal text-black  rounded-lg">Kelas saya</router-link>
    </li>
    <li>
      <router-link :to="{
        path: `/edit-profile/${me.id}`,
      }" class="text-base font-normal  text-black  rounded-lg">Edit profile</router-link>
    </li>
    <li>
      <div class="text-base font-normal text-black  rounded-lg" @click="toggleModal">Logout</div>
    </li>
  </ul>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

function toggleModal(){
  store.commit("setErrMsg", null)
    store.dispatch("toggleModal")
}




const me = computed(()=> store.getters.getMe)

</script>

<style  scoped>
.router-link-active {
  @apply bg-secondary text-white
}
</style>
