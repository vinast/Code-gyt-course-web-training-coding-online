<template>
  <div class="card w-full sm:w-56 h-60 rounded-md px-5 py-3 bg-base-100 cursor-pointer shadow-sm hover:shadow-md">
    <figure>
      <img :src="thumb" :alt="alter" />
    </figure>
    <div class="body py-1">
      <h2 class="capitalize text-lg tracking-wide font-bold">
        {{ title }}
      </h2>
      <div class="desc">
        <p class="text-gray-600 font-semibold">{{ desc }}...</p>
    </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  thumb:{
    type: String,
    required: true
  },
  title:{
    type: String,
    required: true
  },
  desc:{
    type: String,
    required: true
  },
  alter:{
    type: String,
    required: true
  },

})

</script>

<style lang="scss" scoped></style>
