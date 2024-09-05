<template>
    <div>
        <img class="" src="../../assets/loading/Looper-2.svg" alt="" srcset="" :class="size">
    </div>
</template>

<script setup>
defineProps({
    size:{
        type: String,
        default:''
    }
})
</script>
