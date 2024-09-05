<template>
  <div
    class="w-full flex flex-col rounded-lg shadow border bg-white border-black space-y-1 px-3 py-2 mb-3 last:mb-0"
  >
    <div class="header flex flex-row items-center space-x-2">
      <span class="cursor-pointer text-blue-700 font-bold hover:underline">
        #{{ no_tranksaksi }}
      </span>
      <span class="text-gray-500 font-base"> {{ tgl_transaksi }} </span>
      <div class="text-sm font-medium text-black">Rp. {{ harga }}</div>
      <div
        class="status  capitalize rounded-lg badge bg-opacity-50 bg-red-300 h-10 text-xs tracking-wider" v-if="status_transaksi =='BELUM SELESAI'"
      >
        <h3 class="text-red-700 font-medium uppercase">{{ status_transaksi }}</h3>
      </div>
      <div
        class="status  capitalize rounded-lg badge bg-opacity-50 bg-green-300 h-10 text-xs tracking-wider" v-else
      >
        <h3 class="text-green-700 font-medium uppercase">{{ status_transaksi }}</h3>
      </div>
    </div>
    <div class="flex flex-row items-center flex-wrap justify-between">
        <div class="flex flex-col order-2">
        <div class="text-sm flex flex-row font-semibold">
            <span class="w-28">Nama rekening</span>
            <span>: {{ nama_rekening }}</span>
        </div>
        <div class="text-sm flex flex-row font-semibold">
            <span class="w-28">Rekening tujuan</span>
            <span class="text-blue-500"> : {{ no_rekening }}</span>
        </div>
    </div>
    <div class="content order-1 flex flex-col items-center justify-center h-9 mr-3 flex-1 rounded-md bg-yellow-300">
        <span class="text-sm text-yellow-700  font-semibold capitalize tracking-wide">{{ nama_kelas }}</span>
    </div>
    </div>
    <transition-element >
      <div class="details cursor-pointer max-w-min" @click="action" >
        <span class="text-sm font-semibold underline" >Details</span>

    </div>
    </transition-element>
   
    
<transition-element >
    <slot name="expand_details" v-if="show === id">
  </slot>
</transition-element>
    
   
  </div>
</template>

<script setup>

const props = defineProps({
  show:{
    type: String,
  },
  id:{
    type:String
  },
  tgl_transaksi:{
    type: String,
    required: true,
  },
  harga:{
    type: Number,
    required: true,
  },
  status_transaksi:{
    type: String,
    required: true,
  },
  nama_rekening:{
    type: String,
    required: true,
  },
  no_rekening:{
    type: String,
    required: true,
  },
  nama_kelas:{
    type: String,
    required: true,
  },
  no_tranksaksi:{
    type: String,
    required: true,
  },

})
const emit = defineEmits(['showDetails'])
const action = ()=>{
  emit('showDetails')
}

</script>
