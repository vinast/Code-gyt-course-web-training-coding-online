<template>
  <label class="label py-0 w-full text-left -ml-1" v-if="label">
    <span class="label-text capitalize text-black text-lg font-medium">{{ label }}</span>
  </label>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :placeholder="ph"
    class="input max-w-xs w-full placeholder:text-black focus:outline-none drop-shadow-md border-black rounded-none "
    :class="{
        'input-lg':size==='lg',
        'input-md':size==='md',
        'input-sm':size==='sm',
        'input-xs':size==='xs',

    }"
    
    autocomplete="on"
    required
    v-bind="$attrs"
  />
  <label class="label py-0 w-full text-left -ml-1" v-if="err">
    <span class="label-text text-red-700">{{ err }}</span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  size:{
    type:String,
    default:'md'
  },
  ph: {
    type: String,
  },
  label: {
      type: String,
      default: ''
    },
 err:{
    type: String,
    default:''
 }

});

defineEmits(["update:modelValue"]);
</script>
