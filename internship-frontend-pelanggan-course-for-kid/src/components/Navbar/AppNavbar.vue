<template>
     <div class="relative shrink-0 flex justify-between h-16 bg-primary" >
        <div class="flex items-center space-x-4">
            <div class="flex items-center">

            </div>
            <!-- <font-awesome-icon  icon="fa-solid fa-bars " class="lg:hidden  text-black cursor-pointer" size="2x" @click="toggleShowNavbar" v-if="getShowNav"/> -->
        </div>
        <div class="flex justify-between items-center space-x-4 px-4">
            <div class="flex items-center">
                <profile-dropdown :username="me.name"/>
            </div>
        </div>
    </div>
</template>

<script setup>

import { computed, onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
import ProfileDropdown from '../dropdown/ProfileDropdown.vue';
const store = useStore()


const me = computed(()=> store.getters.getMe)
const name = computed(()=> store.state.me)
onMounted(() => {
    
})
</script>

