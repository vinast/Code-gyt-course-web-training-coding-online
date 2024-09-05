<template>
     <div class=" w-full lg:max-w-full lg:flex bg-purple-100 p-4 rounded-lg cursor-pointer hover:shadow-md">
      <img class="w-full sm:max-h-28  lg:h-auto lg:w-28 flex-none bg-cover rounded-lg text-center overflow-hidden" :src="img" alt="" srcset="">
      <div class="my-2 sm:ml-2">
          <div class="text-gray-900 font-bold text-xl mb-1">{{ title }}</div>
          <p class="text-gray-700 text-base">{{ desc }}...</p>
          <span class="text-gray-400 text-sm">Created on {{ date }}</span>
        </div>
    </div>
</template>

<script setup>
defineProps({
  title:{
    type: String,
    required: true,
  },
  desc:{
    type: String,
    required: true,
  },
  date:{
    type: String,
    required: true,
  },
  img:{
    type: String,
    required: true,
  }
})
</script>

<style lang="scss" scoped>

</style>