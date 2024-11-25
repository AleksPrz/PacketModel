<script setup> 
import { ref, computed } from 'vue'
const props = defineProps({
    shippingData: {
        type: Object,
        required: true
    },
    currentStep: {
        type: Number,
        required: true
    }
})

// I need a ref to the object in order to implement reactive style classes
const refShippingData = ref(props.shippingData)

const emit = defineEmits(['update:shippingData', 'update:currentStep'])

// Sends a new object to the parent component
function updateShippingData(key, value) {
    props.shippingData[key] = value
    emit('update:shippingData', props.shippingData)
}

// Form validations 
const originZipValid = computed( () => {
    const originZip = refShippingData.value.originZip
    return originZip.length === 5 && !isNaN(originZip)
})
const destinationZipValid = computed( () => {
    const destinationZip = refShippingData.value.destinationZip
    return destinationZip.length === 5 && !isNaN(destinationZip)
})
const weightValid = computed(() => {
    const weight = refShippingData.value.weight
    return weight !== '' && weight !== '0' && weight < 999
});
const lengthValid = computed(() => {
    const length = refShippingData.value.length
    return length !== '' && length !== '0' && length < 9999
});
const heightValid = computed(() => {
    const height = refShippingData.value.height
    return height !== '' && height !== '0' && height < 9999
});
const widthValid = computed(() => {
    const width = refShippingData.value.width
    return width !== '' && width !== '0' && width < 9999
});


function next() {
    if (weightValid.value && lengthValid.value && heightValid.value && widthValid.value && originZipValid.value && destinationZipValid.value) {
        emit('update:currentStep', props.currentStep + 1)
    }
    else console.log('not yet')
}

</script>

<template>
    <form class="p-3">
        <p class="fw-bold">Shipping</p>
        <div class="row justify-content-around mb-5">
            <div class="col-12 col-sm-6 col-lg-4 d-flex flex-column">
                <label for="origin-zip" class="form-label">Origin ZIP Code</label>
                <input 
                    id="origin-zip" 
                    type="text" 
                    maxlength="5"
                    :class="['form-control' , [originZipValid ? 'is-valid' : 'is-invalid']]" 
                    :value="shippingData.originZip" 
                    @input="updateShippingData('originZip', $event.target.value)">
            </div>
            <div class="col-12 col-sm-6 col-lg-4 d-flex flex-column">
                <label for="dest-zip" class="form-label">Destination ZIP Code</label>
                <input 
                    id="dest-zip" 
                    type="text" 
                    maxlength="5"
                    :class="['form-control' , [destinationZipValid ? 'is-valid' : 'is-invalid']]"
                    :value="shippingData.destinationZip" 
                    @input="updateShippingData('destinationZip', $event.target.value)">
            </div>
        </div>
        <div class="row justify-content-around mb-3">
            <div class="col-12 col-sm-4">
                <p class="fw-bold">Weight (kg)</p>
                <div class="row justify-content-around">
                    <div class="col">
                        <input 
                            id="weight" 
                            type="number" 
                            min="0"
                            max="200"
                            :class="['form-control', 'mx-1', [weightValid ? 'is-valid' : 'is-invalid']]" 
                            :value="shippingData.weight" 
                            @input="updateShippingData('weight', $event.target.value)">
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-8">
                <p class="fw-bold">Dimensions (cm)</p>
                <div class="row gap-2">
                    <input 
                        id="length" 
                        type="number"
                        min="0"
                        :class="['form-control', 'col', [lengthValid ? 'is-valid' : 'is-invalid']]" 
                        placeholder="Length" 
                        :value="shippingData.length" 
                        @input="updateShippingData('length', $event.target.value)">
                    <input 
                        id="height" 
                        type="number" 
                        min="0"
                        :class="['form-control', 'col', [heightValid ? 'is-valid' : 'is-invalid']]"
                        placeholder="Height" 
                        :value="shippingData.height" 
                        @input="updateShippingData('height', $event.target.value)">
                    <input id="width" 
                        type="number"
                        min="0" 
                        :class="['form-control', 'col', [widthValid ? 'is-valid' : 'is-invalid']]"
                        placeholder="Width" 
                        :value="shippingData.width" 
                        @input="updateShippingData('width', $event.target.value)">
                </div>
            </div>
        </div>
    </form>
    <div class="d-flex flex-row-reverse mt-5">
        <button @click="next()" class="btn btn-secondary"> Next </button>
    </div>
</template>

<style scoped>

</style>