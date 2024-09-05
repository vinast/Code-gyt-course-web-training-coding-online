<template>
        <div
          class="outer__card text-black flex flex-row  sm:w-[510px] px-6 py-1 sm:py-3 justify-between gap-4"
        >
          <div
            class="card__number text-white bg-primary h-9 w-9 rounded-full flex flex-col items-center justify-center"
          >
            {{ no }}
          </div>
          <div class="card__details flex-1 flex flex-col">
            <h3 class="font-bold text-lg">{{ title }}</h3>
            <p class="font-medium">
{{desk}}
            </p>
          </div>
        </div>
</template>

<script setup>
defineProps({
    no:{
        required: true
    },
    desk:{
        type:String,
        required: true
    },
    title:{
        type:String,
        required: true
    },
})
</script>

<style lang="scss" scoped>

</style>