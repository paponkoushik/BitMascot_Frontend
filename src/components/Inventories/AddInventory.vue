<template>
  <div class="container">
    <div class="mt-5">
      <div class="alert alert-success" role="alert" v-if="alert">
        {{alert}}
      </div>
      <div class="card">
        <div class="card-header text-center">Add Inventory</div>
        <div class="card-body">
          <form>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" placeholder="Inventory Name" v-model="inventory.name">
                <small class="text-danger" v-if="errors.name">{{errors.name[0]}}</small>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Description</label>
              <div class="col-sm-10">
                <textarea type="text" class="form-control" placeholder="Description" v-model="inventory.description"></textarea>
                <small class="text-danger" v-if="errors.description">{{errors.description[0]}}</small>
              </div>
            </div>
            <div class="form-group">
              <button class="btn btn-outline-primary float-right" @click.prevent="submit">Save</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddInventory",
  data() {
    return {
      inventory: {},
      alert: '',
      errors: [],
    }
  },
  methods: {
    submit() {
      axios.post('inventory/store', this.inventory).then(response => {

        this.alert = response.data.message;

        this.resetForm();

        setTimeout(() => {
          this.alert = '';
        }, 2000);

      }).catch(({response}) =>{
        this.errors = response.data.errors;
      })
    },
    resetForm() {
      this.inventory = {}
    },
  }
}
</script>

<style scoped>

</style>