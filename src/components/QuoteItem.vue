<script setup>
import { computed } from 'vue'

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true
    },
    cost: {
        type: String,
        required: true
    },
    selectedItem: {
        type: String, 
        required: true,
        default: ''
    }
})

const isSelected = computed(() => props.id === props.selectedItem)

const emit = defineEmits(['update:selectedItem'])

function selectItem() {
    if(!isSelected.value)
        emit('update:selectedItem', props.id)
}

</script>

<template>
    <div 
        :class="['rounded', 'p-2', 'link-opacity-100', 'item', 'd-flex', 'justify-content-between', 'option', { 'selected': isSelected }]"
        @click="selectItem()">
        <img :src="image" :alt="alt" class="img-fluid">
        <p class="fw-bold fs-5">
            $ {{ cost }}
        </p>
    </div>
</template>

<style scoped>
.option {
    overflow: hidden;
    height: 100px;
    cursor: pointer;
}

img {
    width: 70%;
    height: auto;
    object-position: center;
    object-fit: contain;
    pointer-events: none;
}

.selected {
    background-color: #f0f0f0;
    border: 3px solid #ababab
}
</style>