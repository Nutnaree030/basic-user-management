import { createRouter, createWebHistory } from 'vue-router'
import UserList from '../views/UserList.vue'
import UserEdit from '../views/UserEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'user-list',
      component: UserList, // to show all of user list
    },
    {
      path: '/users/:id/edit',
      name: 'user-edit',
      component: UserEdit, // to access editing user data
    },
  ],
})

export default router
