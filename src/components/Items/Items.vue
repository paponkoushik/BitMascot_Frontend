<template>
  <div class="container-fluid">
    <div class="mt-5">
      <div class="alert alert-success" role="alert" v-if="alert">
        {{alert}}
      </div>
      <div class="card">
        <div class="card-header">
          <div class="d-flex justify-content-between align-items-center">
            <span>Items</span>
            <router-link to="/items/add" class="btn btn-primary">Add Item</router-link>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-bordered table-striped">
            <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Quantity</th>
              <th scope="col">Image</th>
              <th scope="col" style="width: 200px;">Action</th>
            </tr>
            </thead>
            <tbody v-if="items.length">
            <tr v-for="(item, index) in items" :key="index">
              <td>{{item.name}}</td>
              <td>{{item.description}}</td>
              <td>{{item.quantity}}</td>
              <td>
                <img v-if="item.image" :src="`${$appURL + item.image}`" width="80" height="80"/>
              </td>
              <td class="text-right">
                <router-link :to="`items/edit/${item.id}`" class="btn btn-outline-primary">Edit</router-link>
                <button class="btn btn-outline-danger ml-2" @click.prevent="deleteItem(item)">Delete</button>
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
  name: "Items",
  data() {
    return {
      items: [],
      alert: "",
    };
  },
  created() {
    this.getItem();
  },
  methods: {
    getItem() {
      axios.get("item/index").then(({ data }) => {
        this.items = data.data;
      }).catch(() => {});
    },
    deleteItem(item) {
      axios.delete("item/delete/" + item.id).then((response) => {
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
