import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'https://6797e29dc2c861de0c6e5360.mockapi.io'

export const useUserStore = defineStore('user', {
  state: () => ({
    list: [],
    selected: {},
    gender: ['female','male','other'],
  }),
  actions: {
    // Get all users information
    async loadUsers () {
      try{
        const response = await axios.get(`${BASE_URL}/users`)
        this.list = response.data
      }catch(error){
        console.log('error',error)
      }
    },
    // Get user information by id
    async loadUser (id) {
      try{
        const response = await axios.get(`${BASE_URL}/users/${id}`)
        this.selected = response.data
      }catch(error){
        console.log('error',error)
      }
    },
    // Create new user into system
    async addUser (userInfo) {
      const headers = {
        'Content-Type': 'application/json',
      }

      try{
        const response = await axios.post(`${BASE_URL}/users`, userInfo, {headers: headers})
        console.log(response)
        console.log('add completely')
      }catch(error){
        console.log('error',error)
      }
    },
    // Update user information
    async editUser (id,userInfo) {
      const headers = {
        'Content-Type': 'application/json',
      }

      try{
        const response = await axios.put(`${BASE_URL}/users/${id}`,userInfo, {headers: headers})
        console.log('edit completely')
        console.log(response)
      }catch(error){
        console.log('error',error)
      }
    },
    // Delete user information
    async deleteUser (id) {
      try{
        const response = await axios.delete(`${BASE_URL}/users/${id}`)
        console.log('delete completely')
        console.log(response)
      }catch(error){
        console.log('error',error)
      }
    },
    
  }
})
