<template>
  <div class="data-table">
    <input type="text" v-model="searchQuery" @input="debouncedSearch" placeholder="Search..." class="form-control">

    <table class="table pt-3">
      <thead class="thead-dark">
      <tr>
        <th>Name</th>
        <th>Address</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Date of Birth</th>
        <th>ID Verification</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.first_name }} {{ user.last_name }}</td>
        <td>{{ user.address }}</td>
        <td>{{ user.phone }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.date_of_birth }}</td>
        <td>
          <button v-if="user.id_verification" @click="downloadFile(user.id_verification)">
            <i class="fas fa-download"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <div class="text-center">
      <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-secondary mr-2">Prev</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-secondary ml-2">Next</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import debounce from 'lodash/debounce';
import {FileDownloadMixin} from "../../Mixins/FileDownloadMixin";

export default {
  name: 'Users',
  mixins: [FileDownloadMixin],
  data() {
    return {
      users: [],
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 5,
      totalItems: 0,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
  },
  methods: {
    debouncedSearch: debounce(function() {
      this.currentPage = 1
      this.fetchUsers();
    }, 500),
    async fetchUsers() {
      try {
        const response = await axios.get('/users', {
          params: {
            search: this.searchQuery,
            page: this.currentPage,
            per_page: this.itemsPerPage,
          },
        });
        // console.log(response.data.users.data)
        this.users = response.data.users.data;
        this.totalItems = response.data.users.total;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchUsers();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchUsers();
      }
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.data-table {
  margin-top: 50px;
}
.table {
  margin-top: 20px;
}
</style>
