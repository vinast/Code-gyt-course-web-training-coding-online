<template>
<div class="dropdown dropdown-end flex text-white items-center space-x-4 cursor-pointer" tabindex="0">
    <h3 class="capitalize text-md sm:text-base font-semibold">
        Hallo, {{ username }}
    </h3>
    <button>
    <ProfileIcon class="h-8" />
    </button>
    <DropdownMenuItem/>
</div>
</template>

<script setup>
import ProfileIcon from '../icons/profileIcon.vue';
import DropdownMenuItem from './DropdownMenuItem.vue'
defineProps({
    username:{
        type:String,
        default:'Brily Jalu K'
    }
})
</script>

