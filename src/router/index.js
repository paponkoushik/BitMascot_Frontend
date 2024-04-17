import Login from "../components/Auth/Login.vue";
import store from "../store";
import Register from "../components/Auth/Register.vue";
import Users from "../components/User/Users.vue";
import Profile from "../components/Profile/Profile.vue";
import ChangePassword from "../components/Profile/ChangePassword.vue";

export const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.getters['Auth/authenticated'] && store.getters['Auth/isAdmin']) {
        return next({
          name: 'users'
        });
      } else if (store.getters['Auth/authenticated'] && !store.getters['Auth/isAdmin']) {
        return next({
          name: 'profile'
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
      if (store.getters['Auth/authenticated'] && store.getters['Auth/isAdmin']) {
        return next({
          name: 'users'
        });
      } else if (store.getters['Auth/authenticated']) {
        return next({
          name: 'profile'
        });
      }
      next();
    }
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
    beforeEnter: (to, from, next) => {
      if (!store.getters['Auth/authenticated'] || !store.getters['Auth/isAdmin']) {
        return next({
          name: 'login'
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
      if (!store.getters['Auth/authenticated'] || store.getters['Auth/isAdmin']) {
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
      if (!store.getters['Auth/authenticated'] || store.getters['Auth/isAdmin']) {
        return next({
          name: 'login'
        });
      }
      next();
    }
  },
]
