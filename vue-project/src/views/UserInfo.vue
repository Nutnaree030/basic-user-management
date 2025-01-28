<script setup>
import { watchEffect, ref } from 'vue';
import { useUserStore } from '../stores/user.js';

let access = ref(false)

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  isAccess: {
    type: Boolean,
    required: true,
  },
});

const userStore = useUserStore();

// Check logs of passing data
watchEffect(async () => {
  if (props.id) {
    console.log("Loading user with ID:", props.id);
    await userStore.loadUser(props.id);
  }
  
  if(props.isAccess) {
    console.log("Loading with boolean-", props.isAccess);
    access.value = true
  }

  console.log(access.value)
});

// Manage close modal of showing user data
const toggleClose = () => {
    if(access.value == true){
        access.value = false
    }else{
        access.value = true
    }
    console.log(access.value)
} 

// function to format date in YYYY-MM-DD
const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0]
}

</script>

<template>
  <div
    v-if="isAccess && access"
    class="bg-black p-6 rounded-lg shadow-lg mb-2 float-right absolute inset-y-0 right-0 z-10 bg-gray-400 w-1/3"
  >
    <h3 class="text-xl font-semibold mb-4 text-white">User Information</h3>
    <div v-if="userStore.selected">
      <p>Name: {{ userStore.selected.name }}</p>
      <p>Gender: {{ userStore.selected.gender }}</p>
      <p>Email: {{ userStore.selected.Email }}</p>
      <p>Date of Birth: {{ formatDate(userStore.selected.dateOfBirth) }}</p>

      <button
        @click="toggleClose()"
        class="btn-close px-4 py-2 mt-2 rounded-md text-white bg-yellow-600 hover:bg-yellow-700 w-full"
      >
        Close
      </button>
    </div>
  </div>
</template>

<style scoped>
@import 'tailwindcss';
@import '../assets/base.css';

.container {
  max-width: 1280px;
}

.btn-add-new-user {
  background-color: #7c3aed; /* Violet */
}

.btn-save {
  background-color: #2563eb; /* Blue */
}

.btn-edit {
  background-color: #10b981; /* Green */
}

.btn-delete {
  background-color: #ef4444; /* Red */
}

.btn-close {
  background-color: #f78923; /* Orange */
}

.btn-add-new-user:hover,
.btn-close:hover,
.btn-save:hover,
.btn-edit:hover,
.btn-delete:hover {
  opacity: 0.9;
}

@layer components {
  .btn-add-new-user {
    transition: background-color 0.3s ease;
  }
  .btn-edit {
    transition: background-color 0.3s ease;
  }
  .btn-delete {
    transition: background-color 0.3s ease;
  }
  .btn-close {
    transition: background-color 0.3s ease;
  }
}
</style>
