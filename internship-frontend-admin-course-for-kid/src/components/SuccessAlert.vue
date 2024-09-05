<template>
    <div class="relative p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-red-200 dark:text-red-800"
        role="alert" v-if="msg">
        <div class="flex gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="font-medium">{{ msg }}</span>
        </div>

        <div class="absolute -top-2 -right-1">
            <span class="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-green-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
        </div>
    </div>
</template>

<script setup>
defineProps({
    msg: {
        type: String,
    },
});
</script>

<style lang="scss" scoped>

</style>
