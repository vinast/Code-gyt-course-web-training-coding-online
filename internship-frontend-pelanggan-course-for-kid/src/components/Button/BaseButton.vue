<template>
    <button class="btn"
    :class="{
        'w-full':size==='2xl',
        'btn-wide':size==='xl',
        'btn-large':size==='lg',
        'btn-sm':size==='sm',
        'btn-xs':size==='xs',

        'btn-primary':design==='primary',
        'btn-secondary':design==='secondary',
        'btn-outline btn-primary':design==='outline-primary'
        
    }">
        <slot></slot>
    </button>
</template>

<script setup>
defineProps({
    size:{
        type:String,

    },
    design:{
        type:String,
        default:'primary'
    },
    
})
</script>

