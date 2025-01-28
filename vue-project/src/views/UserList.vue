<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useUserStore } from '../stores/user.js';
import UserInfo from './UserInfo.vue';

const isLoading = ref(false); // To show loading during waiting
const isActive = ref(false); // To show modal of creating user
const isAccess = ref(false); // To show modal of accessing info
const selectedUser = ref({}); // To store the selected user 

const userStore = useUserStore();
const userFullname = ref('');
const userDateOfBirth = ref('');
const userEmail = ref('');
const userGender = ref('');

// Function to manage about add new user data
const addUser = async () => {
  if (
    userFullname.value !== '' &&
    userEmail.value !== '' &&
    userDateOfBirth.value !== '' &&
    userGender.value !== ''
  ) {
    isLoading.value = true;
    const info = JSON.stringify({
      name: userFullname.value,
      gender: userGender.value,
      dateOfBirth: userDateOfBirth.value,
      Email: userEmail.value,
    });

    try {
      await userStore.addUser(info);
      await userStore.loadUsers();
      isActive.value = false;
      isLoading.value = false;
    } catch (e) {
      console.log('error', e);
    }
  } else {
    alert('Please fill in all fields!');
  }
};

// Function to manage about delete user data
const deleteUser = async (uid) => {
  isLoading.value = true;

  try {
    await userStore.deleteUser(uid);
    await userStore.loadUsers();
    isLoading.value = false;
    alert('Delete Successfully!');
  } catch (e) {
    console.log('error', e);
  }
};

// Function to control toggling modal
const showUserInfo = (user) => {
  selectedUser.value = user;
  isAccess.value = true;
};

onMounted(async () => {
  isLoading.value = true;
  await userStore.loadUsers();
  isLoading.value = false;
});
</script>

<template>
  <div class="container mx-auto px-6 py-8">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-3xl font-semibold text-white-100 m-2">User List</h2>
      <button
        class="btn-add-new-user px-4 py-2 rounded-md text-white shadow-lg hover:bg-violet-700"
        @click="isActive = !isActive"
      >
        Add New User
      </button>
    </div>

    <!-- New User Form -->
    <div v-if="isActive" class="bg-black p-6 rounded-lg shadow-lg mb-2 float-right absolute inset-y-0 right-0 z-10 bg-gray-400 w-1/3">
      <h3 class="text-xl font-semibold mb-4 text-white">Create New User</h3>
      <div>
        <input
          type="text"
          v-model="userFullname"
          placeholder="Full Name"
          class="border border-gray-300 rounded-lg p-2 w-full mb-4 text-white"
        />
        <select
          v-model="userGender"
          class="border border-gray-300 rounded-lg p-2 w-full mb-4 text-white"
        >
          <option value="">Select Gender</option>
          <option v-for="gender in userStore.gender" :value="gender">{{ gender }}</option>
        </select>
        <input
          type="email"
          v-model="userEmail"
          placeholder="Email Address"
          class="border border-gray-300 rounded-lg p-2 w-full mb-4 text-white"
        />
        <input
          type="date"
          v-model="userDateOfBirth"
          class="border border-gray-300 rounded-lg p-2 w-full mb-4 text-white"
        />
        <button
          @click="addUser"
          class="btn-save px-4 py-2 mt-1 rounded-md text-white bg-blue-600 hover:bg-blue-700 w-full"
        >
          Add User
        </button>
        <button
          @click="isActive = !isActive"
          class="btn-close px-4 py-2 mt-1 rounded-md text-white bg-yellow-600 hover:bg-yellow-700 w-full"
        >
          Close
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-4">
      <h3>Loading...</h3>
    </div>

    <!-- User List -->
    <ul>
      <li
        v-for="user in userStore.list"
        :key="user.id"
        class="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center"
      >
        <div>
          <p 
            @click="showUserInfo(user)" 
            class="text-lg font-medium text-gray-900 cursor-pointer"
          >
            {{ user.name }}
          </p>
          <p class="text-sm text-gray-500">{{ user.Email }}</p>
        </div>
        <div class="flex space-x-3">
          <RouterLink
            :to="{ name: 'user-edit', params: { id: user.id } }"
          >
            <button 
              class="btn-edit px-4 py-2 m-0 rounded-md text-black bg-green-600 hover:bg-green-700"
            >
              Edit
            </button> 
          </RouterLink>
          <button
            @click="deleteUser(user.id)"
            class="btn-delete px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>

    <!-- Modal for User Info -->
    <UserInfo :id="selectedUser.id" :isAccess="isAccess" />
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
  background-color: #F78923; /* Orange */
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
