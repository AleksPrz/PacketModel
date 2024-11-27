<script setup>
import {ref} from 'vue'
const selected = ref(1)

function selectView(selection) {
    selected.value = selection
}

</script>

<template>
    <header>
        <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div class="container">
                <a class="navbar-brand" href="#">PacketModel</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link to="/" :class="['nav-link', {'active': selected === 1}]" @click="selectView(1)"> Home </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/quotation" :class="['nav-link', {'active': selected === 2}]" @click="selectView(2)"> Quotation </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    
</template>

<style scoped>
</style>