<script setup> 
import { ref, computed } from 'vue'
const props = defineProps({
    shippingData: {
        type: Object,
        required:true
    },
    currentStep: {
        type: Number,
        required: true
    }
})

const refShippingData = ref(props.shippingData)

const emit = defineEmits(['update:shippingData', 'update:currentStep'])

// Sends a new object to the parent component
function updateShippingData(key, value) {
    props.shippingData[key] = value
    emit('update:shippingData', props.shippingData)
}

// Form validations
const senderNameValid = computed(() => refShippingData.value.senderName !== '')
const recipientNameValid = computed(() => refShippingData.value.recipientName !== '')
const addressValid = computed(() => refShippingData.value.address !== '')
const phoneNumberValid = computed(() => {
    const phoneNumber = refShippingData.value.phoneNumber
    return phoneNumber !== '' && phoneNumber.length >= 7
})
const emailValid = computed(() => {
    const email = refShippingData.value.email
    return email.length > 2 && email.includes('@')
})


function confirm() {
    if (senderNameValid.value && recipientNameValid.value && addressValid.value 
            && phoneNumberValid.value && emailValid.value) {
        alert("Order completed!. We'll send you a confirmation email")
    }
    else console.log('not yet')
}

function previous() {
    emit('update:currentStep', props.currentStep - 1)

}
</script>

<template>
<div>
    <form class="p-3">
        <p class="fw-bold">Shipping Details</p>
        <!-- Sender and Recipient -->
        <div class="row justify-content-around mb-4">
            <div class="col-12 col-sm-6 d-flex flex-column">
                <label for="sender" class="form-label">Sender</label>
                <input id="sender" 
                    type="text" 
                    :class="['form-control', [senderNameValid ? 'is-valid' : 'is-invalid']]" 
                    placeholder="Enter sender's name" 
                    :value="shippingData.senderName" 
                    @input="updateShippingData('senderName', $event.target.value)">
            </div>
            <div class="col-12 col-sm-6 d-flex flex-column">
                <label for="recipient" class="form-label">Recipient</label>
                <input id="recipient" 
                    type="text" 
                    :class="['form-control', [recipientNameValid ? 'is-valid' : 'is-invalid']]"
                    placeholder="Enter recipient's name" 
                    :value="shippingData.recipientName" 
                    @input="updateShippingData('recipientName', $event.target.value)">
            </div>
        </div>

        <!-- Address -->
        <div class="row justify-content-around mb-4">
            <div class="col-12 d-flex flex-column">
                <label for="address" class="form-label">Complete Address</label>
                <input id="address" 
                    type="text" 
                    :class="['form-control', [addressValid ? 'is-valid' : 'is-invalid']]"
                    placeholder="Enter full address" 
                    :value="shippingData.address" 
                    @input="updateShippingData('address', $event.target.value)">
            </div>
        </div>

        <!-- Phone and Email -->
        <div class="row justify-content-around">
            <div class="col-12 col-sm-6 col-lg-4 d-flex flex-column">
                <label for="phone" class="form-label">Phone Number</label>
                <input id="phone" 
                    type="text" 
                    :class="['form-control', [phoneNumberValid ? 'is-valid' : 'is-invalid']]"
                    placeholder="Enter phone number" 
                    :value="shippingData.phoneNumber" 
                    @input="updateShippingData('phoneNumber', $event.target.value)">
            </div>
            <div class="col-12 col-sm-6 col-lg-4 d-flex flex-column">
                <label for="email" class="form-label">Email Address</label>
                <input id="email" 
                    type="email" 
                    :class="['form-control', [emailValid ? 'is-valid' : 'is-invalid']]"
                    placeholder="Enter email address" 
                    :value="shippingData.email" 
                    @input="updateShippingData('email', $event.target.value)">
            </div>
        </div>
    </form>
    <div class="d-flex justify-content-between mt-5">
        <button @click="previous()" class="btn bg-dark-subtle"> Previous </button> 
        <button @click="confirm()" class="btn btn-info" > Confirm </button>
    </div>

</div>
</template>

<style scoped>

</style>