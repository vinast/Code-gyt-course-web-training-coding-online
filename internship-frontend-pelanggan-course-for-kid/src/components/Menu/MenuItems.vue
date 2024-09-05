<template>
     <ul class="space-y-2 mt-5 capitalize">
         <li v-for="(navigation, index) in navigations" :key="index" class="tracking-wide list-none">
            <router-link :to="{ name:navigation.name}" class="item no-underline flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100">
               <font-awesome-icon :icon="navigation.icon" size="lg"/>
               <span class="ml-3">{{ navigation.label }}</span>
            </router-link>
         </li>
      </ul>
</template>

<script setup>

const navigations = [
    // {
    //     label:'Dashboard',
    //     name:'dashboard',
    //     icon:'fa-solid fa-house'
    // },
    {
        label:'kelas saya',
        name:'myclass',
        icon:'fa-solid fa-book'
    },
    {
        label:'kelas tersedia',
        name:'listclass',
        icon:'fa-solid fa-book-bookmark'
    },
    {
        label:'transaksi',
        name:'transaction',
        icon:'fa-solid fa-wallet'
    }
]
</script>

<style scoped>
.item.active{
    background-color: rgb(243 244 246)
}
</style>

