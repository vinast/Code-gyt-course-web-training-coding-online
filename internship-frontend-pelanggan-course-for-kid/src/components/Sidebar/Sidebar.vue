<template>
<aside class="text-black bg-secondary w-52 w-25 hidden sm:block " aria-label="Sidebar"

>
   <div class="overflow-y-auto py-4 px-3">
      <div class="brand-logo flex flex-row justify-between items-center">
        <!-- <router-link to="" class="pl-2.5 font-bold text-xl no-underline text-primary text-center">
        {{ title }}
      </router-link> -->
        <div class="flex items-center">
        <span class="mr-1 text-lg font-semibold">Home Menu</span>
      <img src="../../assets/hero/logogyt.png" alt="" class="w-10">
      </div>
      </div>
     <menu-items/>
   </div>
</aside>

</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore()
const title = computed(() => store.getters.getWebTitle)


</script>

<style lang="scss" scoped>

</style>