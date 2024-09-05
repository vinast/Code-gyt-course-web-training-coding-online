<template>
      <div class="overflow-auto rounded-lg shadow hidden md:block">
        <table class="w-full">
          <thead class="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th class="w-20 p-3 text-sm font-semibold tracking-wide text-left" v-for="(header, i) in headers" :key="i">{{ header.label }}</th>
            <!-- <th class="p-3 text-sm font-semibold tracking-wide text-left">Details</th>
            <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Status</th>
            <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Date</th>
            <th class="w-32 p-3 text-sm font-semibold tracking-wide text-left">Total</th> -->
          </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
          <tr class="bg-white" v-for="(item, i) in items" :key="i">
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              <a href="#" class="font-bold text-blue-500 hover:underline">{{ item.header[0] }}</a>
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              Kring New Fit office chair, mesh + PU, black
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
            <span
              class="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">Delivered</span>
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">16/10/2021</td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">$200.00</td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">$200.00</td>
          </tr>
          </tbody>
        </table>
      </div>
  
      <!-- <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        <div class="bg-white space-y-3 p-4 rounded-lg shadow">
          <div class="flex items-center space-x-2 text-sm">
            <div>
              <a href="#" class="text-blue-500 font-bold hover:underline">#1000</a>
            </div>
            <div class="text-gray-500">10/10/2021</div>
          </div>
          <div>
              <span
                class="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">Delivered</span>
            </div>
          <div class="text-sm text-gray-700">
            Kring New Fit office chair, mesh + PU, black
          </div>
          <div class="text-sm font-medium text-black">
            $200.00
          </div>
        </div>

      </div> -->
</template>

<script setup>
defineProps({
    label:{
        type: String,
        default:''
    },
    headers:{
        type:Array,
        required: true
    },
    items:{
        type:Array,
    }
})
</script>

<style lang="scss" scoped>

</style>