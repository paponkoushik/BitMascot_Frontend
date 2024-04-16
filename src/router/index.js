import Login from "../components/Auth/Login";
import store from "../store/index"
import Register from "../components/Auth/Register.vue";
import EditInventory from "../components/Inventories/EditInventory.vue";
import AddInventory from "../components/Inventories/AddInventory.vue";
import Items from "../components/Items/Items.vue";
import AddItem from "../components/Items/AddItem.vue";
import EditItem from "../components/Items/EditItem.vue";
import Profile from "../components/Profile/Profile.vue";
import ChangePassword from "../components/Profile/ChangePassword.vue";

export const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.getters['Auth/authenticated']) {
        return next({
          name: 'inventories'
        });
      }
      next();
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (store.getters['Auth/authenticated']) {
        return next({
          name: 'inventories'
        });
      }
      next();
    }
  },

  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    beforeEnter: (to, from, next) => {
      // if (store.getters['Auth/isAdmin']) {
      //   return next({
      //     name: 'userList'
      //   });
      // }
      if (!store.getters['Auth/authenticated'] && ! store.getters['Auth/isAdmin']) {
        return next({
          name: 'login'
        });
      }
      next();
    }
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: ChangePassword,
    beforeEnter: (to, from, next) => {
      if (!store.getters['Auth/authenticated'] && ! store.getters['Auth/isAdmin']) {
        return next({
          name: 'login'
        });
      }
      next();
    }
  },
  {
    path: '/inventories/edit/:id',
    name: 'edit_inventory',
    component: EditInventory ,
    beforeEnter: (to, from, next) => {
      if (!store.getters['Auth/authenticated']) {
        return next({
          name: 'login'
        });
      }
      next();
    }
  },

  {
    path: '/items',
    name: 'items',
    component: Items,
    beforeEnter: (to, from, next) => {
      if (!store.getters['Auth/authenticated']) {
        return next({
          name: 'login'
        });
      }
      next();
    }
  },
  {
    path: '/items/add',
    name: 'add_item',
    component: AddItem,
    beforeEnter: (to, from, next) => {
      if (!store.getters['Auth/authenticated']) {
        return next({
          name: 'login'
        });
      }
      next();
    }
  },
  {
    path: '/items/edit/:id',
    name: 'edit_item',
    component: EditItem ,
    beforeEnter: (to, from, next) => {
      if (!store.getters['Auth/authenticated']) {
        return next({
          name: 'login'
        });
      }
      next();
    }
  },
]