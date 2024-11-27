<script setup> 
import { ref } from 'vue'
import BasicData from './BasicData.vue'
import Quotes from './Quotes.vue'
import Details from './Details.vue'

const currentStep = ref(1)
const clearedSteps = ref([false, false, false])

const shippingData = ref({
  originZip : '',
  destinationZip: '',
  weight: '',
  length: '',
  height: '',
  width: '',
  senderName: '',
  recipientName: '',
  address: '',
  phoneNumber: '',
  email: ''
})

const shippingService = ref({
  service: '',
  cost: ''

})

function nextStep() {
  currentStep.value++
}

function previousStep() {
  currentStep.value--
}

// This exists in order to replace "$event => (shippingData.value = $event)"
// Receives the object 'newData' from the child component and reasign the shippingData ref
const updateShippingData = (newData) => shippingData.value = newData // Updates all the object
const updateCurrentStep = (newValue) => currentStep.value = newValue
const updateShippingService = (newData) => shippingService.value = newData
</script>

<template>
    <div class="container main">
        <h1 class="my-5 text-center text-md-start">Get a shipping quote</h1>
        <p class="my-5 text-center text-md-start description">We can offer you an instant quote for your shipping needs. Complete your shipping details to get our partner's options and choose the one that suits you best.</p>
        <div class="row text-center">
          <div class="col-md-6 col-lg-3">
            <div>
              <p class="fs-5 fw-bold text-secondary mb-0">1</p>
              <p class="fw-bold">Enter basic shipment data</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div>
              <p class="fs-5 fw-bold text-secondary mb-0">2</p>
              <p class="fw-bold">Select one of our quote options</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <p class="fs-5 fw-bold text-secondary mb-0">3</p>
            <p class="fw-bold">Complete the shipment details</p>
          </div>
          <div class="col-md-6 col-lg-3">
            <p class="fs-5 fw-bold text-secondary mb-0">4</p>
            <p class="fw-bold">Confirm your order</p>
          </div>
        </div>

        <div>
          <div class="forms-container mx-5">
            <!-- Using the idea under the hood of v-model:
                https://vuejs.org/guide/components/v-model.html 
                instead of using v-model I'm using a v-bind prop and an update event through emit-->
            <BasicData 
              v-if="currentStep === 1"
              :shippingData="shippingData"
              @update:shippingData="updateShippingData"
              :currentStep="currentStep"
              @update:currentStep="updateCurrentStep"></BasicData>

            <Quotes v-if="currentStep === 2"
              :shippingData="shippingData"
              @update:shippingData="updateShippingData"
              :currentStep="currentStep"
              @update:currentStep="updateCurrentStep"
              :shippingService="shippingService"
              @update:shippingService="updateShippingService"></Quotes>

            <Details v-if="currentStep === 3"
              :shippingData="shippingData"
              @update:shippingData="updateShippingData"
              :currentStep="currentStep"
              @update:currentStep="updateCurrentStep"></Details>

          </div>
        </div>
      </div>
</template>

<style scoped>
.main {
  margin-bottom: 5rem;
}
</style>