<template>
  <div id="app" v-if="store.getters['Auth/authenticated']" class="main-left-sidebar">
    <div class="topbar fixed-top">
      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <div class="d-flex align-items-center">
              <img src="../../assets/logo.png" alt="Logo" style="max-height: 40px;">
              <h3 class="ml-2 mb-0">User Portal</h3>
            </div>
          </div>
          <div class="col text-right">
            <button class="btn btn-danger" @click="logout">Logout</button>
          </div>
        </div>
      </div>
    </div>

    <div class="sidebar">
      <ul class="nav flex-column">
        <li class="nav-item" v-for="(item, index) in sidebarItems" :key="index" >
          <template v-if="item.show">
            <router-link :to="item.link" class="nav-link" :class="{ 'active': isItemSelected(item.link) }">
              <i :class="item.icon"></i>
              {{ item.title }}
            </router-link>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      // sidebarItems: [
      //   { title: 'Profile Page', link: '/profile', icon: 'fas fa-warehouse', show: ! this.$store.getters['Auth/isAdmin']},
      //   { title: 'Change Password', link: '/change-password', icon: 'fas fa-box', show: ! this.$store.getters['Auth/isAdmin'] },
      //   { title: 'User List', link: '/users', icon: 'fas fa-box', show: this.$store.getters['Auth/isAdmin'] },
      // ]
    };
  },
  computed: {
    store() {
      return this.$store;
    },
    sidebarItems() {
      return [
        { title: 'Profile Page', link: '/profile', icon: 'fas fa-warehouse', show: ! this.$store.getters['Auth/isAdmin']},
        { title: 'Change Password', link: '/change-password', icon: 'fas fa-box', show: ! this.$store.getters['Auth/isAdmin'] },
        { title: 'User List', link: '/users', icon: 'fas fa-box', show: this.$store.getters['Auth/isAdmin'] },
      ]
    }
  },
  created() {
    console.log(this.$store.getters['Auth/isAdmin'])
  },
  methods: {
    ...mapActions({
      logoutAction: 'Auth/logout'
    }),

    logout() {
      this.logoutAction().then(() => {
        this.$router.replace({
          name: 'login'
        })
      });
    },
    isItemSelected(link) {
      return this.$route.path === link || this.$route.path.startsWith(link + '/');
    }
  }
};
</script>

<style>
.topbar {
  background-color: #343a40;
  color: #fff;
  padding: 10px 0;
}

.topbar h3 {
  margin: 0;
}

.sidebar {
  width: 250px;
  background-color: #343a40;
  color: #fff;
  height: 100%;
  position: fixed;
  top: 60px;
  left: 0;
  overflow-y: auto;
}

.content {
  margin-left: 250px;
  padding: 20px;
}

.nav-link {
  color: #fff;
}

.nav-link i {
  margin-right: 10px;
}

.nav-link.active {
  background-color: #495057;
  color:#0056b3
}
</style>