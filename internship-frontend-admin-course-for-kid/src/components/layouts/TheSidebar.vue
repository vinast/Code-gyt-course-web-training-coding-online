<template>
  <!-- Toggle sidebar button -->
  <button 
    class="fixed z-50 bottom-4 right-4 w-16 h-16 rounded-full bg-gray-900 lg:hidden"
    @click="toggleSidebar">
    <tw-icon 
      name="heroicons-solid:menu-alt-4" 
      class="btn-toggle w-6 h-6 text-white" 
      :class="{'opacity-0': showSidebar}" />
    <tw-icon 
      name="heroicons-solid:x" 
      class="btn-toggle w-6 h-6 text-white"
      :class="{'opacity-0': !showSidebar}" />
  </button>

  <!-- Sidebar Overlay -->
  <div 
    class="fixed inset-0 bg-black bg-opacity-25 z-30 lg:hidden" 
    :class="{'hidden': !showSidebar}" 
    @click="showSidebar = false" />
  <div 
    class="fixed z-40 left-0 top-0 right-24 lg:right-auto lg:w-64 h-screen border-r border-gray-200 overflow-y-auto bg-white" 
    :class="{'hidden': allowSidebarHide && !showSidebar}">
    <!-- Header -->
    <header class="flex items-center pt-2 px-5">

      <div class="ml-2 flex flex-col items-center">
  <!-- <h1 class="text-lg text-gray-800 font-medium">Administrator</h1> -->
  <img src="../../assets/logogyt.png" alt="" class="w-23">
</div>
    </header>
    <!-- Menu -->
    <div class="mt-2">
      <!-- Menu Header -->
      <menu-header 
        class="mt-10" 
        text="Menu" />
      <menu-item 
        icon="heroicons-outline:home" 
        text="Home" 
        :route="{name: 'home'}" />
      <menu-item 
        icon="heroicons-outline:view-grid" 
        text="Content">
        <template #sub-menu>
          <sub-menu-item text="Kelas" :route="{name:'kelas'}"/>
          <sub-menu-item text="Category" :route="{name:'category'}"/>
        </template>
      </menu-item>
      <menu-item 
      icon="heroicons-outline:calculator" 
        text="Transaksi" 
        :route="{name:'transaksi'}"/>
        <menu-item 
      icon="heroicons-outline:credit-card" 
        text="Banks" 
        :route="{name:'banks'}"/>
      <menu-item 
        icon="heroicons-outline:users" 
        text="User" 
        :route="{name:'user'}"/>


      <!-- <menu-item 
        icon="heroicons-outline:cog" 
        text="Settings">
        <template #sub-menu>
          <sub-menu-item text="Profile" />
          <sub-menu-item text="Security" />
        </template>
      </menu-item> -->

      <!-- Menu Header
      <menu-header 
        class="mt-10" 
        text="Scheduled Payments" />
      <menu-item 
        icon="heroicons-outline:check-circle" 
        icon-class="text-blue-400" 
        text="Monthly Rent" />
      <menu-item 
        icon="heroicons-outline:check-circle"
        icon-class="text-red-400"
        text="Food Payment" />
      <menu-item 
        icon="heroicons-outline:check-circle"
        icon-class="text-green-400"
        text="Utility Bills" /> -->
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { useRoute } from 'vue-router'

import MenuHeader from './TheSidebarMenuHeader.vue'
import MenuItem from './TheSidebarMenuItem.vue'
import SubMenuHeader from './TheSidebarSubMenuHeader.vue'
import SubMenuItem from './TheSidebarSubMenuItem.vue'

export default {
  name: 'TheSidebar',
  components: {
    MenuHeader,
    MenuItem,
    SubMenuHeader,
    SubMenuItem,
  },
  emits: ['visibility-change'],
  setup(_, {emit}) {
    const showSidebar = ref(false)
    const toggleSidebar = () => showSidebar.value = !showSidebar.value
    watch(showSidebar, (val) => {
      emit('visibility-change', val)
    })

    // Automatically hide sidebar when route changed
    const route = useRoute()
    watch(route, () => showSidebar.value = false)
    
    // Automatically hide sidebar when window size
    // lower than width breakpoint
    const widthBreakpoint = 1024 // Tailwind `lg` breakpoint
    const { width: windowWidth } = useWindowSize()
    watch(windowWidth, (newWidth) => {
      if (newWidth < widthBreakpoint) showSidebar.value = false
    })

    const allowSidebarHide = computed(() => windowWidth.value < widthBreakpoint)

    return {
      showSidebar,
      toggleSidebar,
      allowSidebarHide
    }
  }
}
</script>

<style scoped>
.btn-toggle {
  @apply absolute left-1/2 top-1/2 transition duration-300 transform -translate-x-1/2 -translate-y-1/2;
}
</style>