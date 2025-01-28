<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useUserStore } from '../stores/user.js'

const userStore = useUserStore()
const route = useRoute()
const isLoading = ref(false)
const Fullname = ref('')
const DateOfBirth = ref('')
const Email = ref('')
const Gender = ref('')
let dateOfBirthSet = ref('')

// function to format date in YYYY-MM-DD
const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0]
}

onMounted(async () => {
    isLoading.value = true
    const id = route.params.id
    await userStore.loadUser(id)
    const info = userStore.selected
    Fullname.value = info.name
    DateOfBirth.value = info.dateOfBirth
    Email.value = info.Email
    Gender.value = info.gender
    dateOfBirthSet.value = formatDate(info.dateOfBirth)
    isLoading.value = false
})

const editUser = async () => {
    isLoading.value = true
    let edited = {}

    if (Fullname.value !== userStore.selected.name) edited.name = Fullname.value
    if (dateOfBirthSet.value !== DateOfBirth.value) edited.dateOfBirth = DateOfBirth.value
    if (Email.value !== userStore.selected.Email) edited.Email = Email.value
    if (Gender.value !== userStore.selected.gender) edited.gender = Gender.value

    if (Object.keys(edited).length > 0) {
        try {
            const uid = parseInt(route.params.id)
            await userStore.editUser(uid, edited)
            await userStore.loadUsers()
            alert('User updated successfully!')
        } catch (e) {
            console.log('Error updating user', e)
        }
    } else {
        alert('No changes detected.')
    }
    isLoading.value = false
}
</script>

<template>
  <div class="container mx-auto px-6 py-8">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
      <div v-if="isLoading">
        <h3 class="text-center text-xl font-semibold">Loading...</h3>
      </div>

      <div v-else>
        <h3 class="text-black text-2xl font-semibold text-center mb-6">Edit User Information</h3>
        <form @submit.prevent="editUser">
          <div class="mb-4">
            <label for="fullname" class="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="fullname"
              type="text"
              v-model="Fullname"
              class="mt-2 block w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter full name"
            />
          </div>

          <div class="mb-4">
            <label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
            <select
              id="gender"
              v-model="Gender"
              class="mt-2 block w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="">Select gender</option>
              <option v-for="gender in userStore.gender" :value="gender">{{ gender }}</option>
            </select>
          </div>

          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              v-model="Email"
              class="mt-2 block w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter email address"
            />
          </div>

          <div class="mb-4">
            <label for="dob" class="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              id="dob"
              type="date"
              v-model="dateOfBirthSet"
              class="mt-2 block w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div class="flex justify-between items-center">
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
            <RouterLink :to="{ name: 'user-list' }">
              <button
                type="button"
                class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Back
              </button>
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import 'tailwindcss';
@import '../assets/base.css';

.container {
  max-width: 1280px;
}

input, select {
  font-size: 1rem;
  color: #333;
}

button {
  font-size: 1rem;
  font-weight: bold;
}

button:hover {
  opacity: 0.9;
}

.bg-white {
  background-color: #ffffff;
}

.bg-gray-300 {
  background-color: #d1d5db;
}

.bg-blue-600 {
  background-color: #2563eb;
}

.bg-blue-700 {
  background-color: #1e40af;
}

.bg-gray-400 {
  background-color: #9ca3af;
}

.text-gray-700 {
  color: #4b5563;
}

.text-white {
  color: #ffffff;
}

.text-center {
  text-align: center;
}
</style>
