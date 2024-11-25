<script setup> 
import { ref, watch } from 'vue'
import QuoteItem from './QuoteItem.vue'

const props = defineProps({
    shippingData: {
        type: Object,
        required:true
    },
    shippingService : {
        type:Object,
        required: true
    },
    currentStep: {
        type: Number,
        required: true
    }
})

const options = ref({
    dhl: {
        id: 'dhl',
        alt: 'DHL',
        cost: '300',
        img: '/dhl.png'
    },
    fedex: {
        id: 'fedex',
        alt: 'FedEx',
        cost: '400',
        img: '/fedex.png'
    },
    redpack: {
        id: 'redpack',
        alt: 'RedPack',
        cost: '350',
        img: '/redpack.png'
    },
    estafeta: {
        id: 'estafeta',
        alt: 'Estafeta',
        cost: '320',
        img: '/estafeta.svg'
    },
})

const selectedItem = ref(props.shippingService.id)
const updateSelectedItem = (selected) => selectedItem.value = selected

watch(selectedItem, (newSelection) => 
    emit('update:shippingService', {id: newSelection, cost: options.value[newSelection].cost})
)

const emit = defineEmits(['update:shippingData', 'update:currentStep', 'update:shippingService'])

function next() {
    if (selectedItem.value !== '') {
        emit('update:currentStep', props.currentStep + 1)
    }
    else console.log('not yet')
}

function previous() {
    emit('update:currentStep', props.currentStep - 1)
    emit('update:shippingService', {id: '', cost: ''})
}
</script>

<template>
    <div>
        <div class="row">
            <div 
                v-for="item in options"
                :key="item.id"
                class="col-12 col-md-6 col-lg-3 gap-1">
                <QuoteItem
                    :id="item.id"
                    :image="item.img"
                    :alt="item.alt"
                    :cost="item.cost"
                    :selectedItem="selectedItem"
                    @update:selectedItem="updateSelectedItem"></QuoteItem>
            </div>
        </div>
    </div>
    <div class="d-flex justify-content-between mt-5">
        <button @click="previous()" class="btn bg-dark-subtle"> Previous </button> 
        <button @click="next()" class="btn btn-secondary"> Next </button>
    </div>
    
</template>

<style scoped>

</style>