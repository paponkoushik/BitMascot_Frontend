<template>
  <div class="container-fluid">
    <div class="mt-5">
      <div class="alert alert-success" role="alert" v-if="alert">
        {{alert}}
      </div>
      <div class="card">
        <div class="card-header">
          <div class="d-flex justify-content-between align-items-center">
            <span>Inventories</span>
            <router-link to="inventories/add" class="btn btn-primary">Add Inventory</router-link>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-bordered table-striped">
            <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col" style="width: 200px;">Action</th>
            </tr>
            </thead>
            <tbody v-if="inventories.length">
            <tr v-for="(inventory, index) in inventories" :key="index">
              <td>{{inventory.name}}</td>
              <td>{{inventory.description}}</td>
              <td class="text-right">
                <router-link :to="`/inventories/edit/${inventory.id}`" class="btn btn-outline-primary">Edit</router-link>
                <button class="btn btn-outline-danger ml-2" @click.prevent="deleteInventory(inventory)">Delete</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Inventories",
  data() {
    return {
      inventories: [],
      alert: "",
    };
  },
  created() {
    this.getInventories();
  },
  methods: {
    getInventories() {
      axios.get("inventory/index").then(({ data }) => {
        this.inventories = data.data;
      }).catch(() => {});
    },
    deleteInventory(inventory) {
      axios.delete("inventory/delete/" + inventory.id).then((response) => {
        this.alert = response.data.message;
        this.getInventories();
        setTimeout(() => {
          this.alert = "";
        }, 2500);
      }).catch(() => {});
    },
  },
};
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
