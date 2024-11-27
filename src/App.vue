<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import BasicData from './components/BasicData.vue'
import Quotes from './components/Quotes.vue'
import Details from './components/Details.vue'

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
  <div id="app">
    <Header></Header>

    <main class="flex-shrink-0 flex-grow-1 d-flex flex-column">
      <router-view />
    </main>

    <Footer></Footer>
  </div>
  
</template>

<style scoped>

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

</style>
