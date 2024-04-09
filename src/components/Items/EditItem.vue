<template>
  <div class="container">
    <div class="mt-5">
      <div class="alert alert-success" role="alert" v-if="alert">
        {{alert}}
      </div>
      <div class="card">
        <div class="card-header text-center">Add Item</div>
        <div class="card-body">
          <form>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" placeholder="Item name" v-model="item.name">
                <small class="text-danger" v-if="errors.name">{{errors.name[0]}}</small>
              </div>

            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Quantity</label>
              <div class="col-sm-10">
                <input type="number" class="form-control" placeholder="Quantity" v-model="item.quantity">
                <small class="text-danger" v-if="errors.quantity">{{errors.quantity[0]}}</small>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Description</label>
              <div class="col-sm-10">
                <textarea type="text" class="form-control" placeholder="Description" v-model="item.description"></textarea>
                <small class="text-danger" v-if="errors.description">{{errors.description[0]}}</small>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Inventory</label>
              <div class="col-sm-10">
                <select class="form-control" v-model="item.inventory_id">
                  <option value="" disabled selected>Choose one</option>
                  <option v-for="(inventory, index) in inventories" :key="index" :value="inventory.id">{{ inventory.name }}</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Image</label>
              <div class="col-sm-10">
                <input type="file" class="form-control-file" accept="image/*" placeholder="Description" @change="addImage" />
                <small class="text-danger" v-if="errors.image">{{errors.image[0]}}</small>
              </div>
            </div>
            <div class="form-group">
              <button class="btn btn-outline-primary float-right" @click.prevent="update">Update</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {formDataAssigner} from "../../helpers/helper";

export default {
  name: "EditItem",
  data() {
    return {
      item: {
        name: '',
        quantity: '',
        description: '',
      },
      inventories: [],
      image: '',
      alert: '',
      errors: [],
    }
  },
  created() {
    this.getInventories();
    this.getItem();
  },
  methods: {
    getInventories() {
      axios.get("inventory/all-inventories").then(({ data }) => {
        this.inventories = data;
      }).catch(() => {});
    },
    getItem() {
      axios.get('item/show/' + this.$route.params.id).then(({data}) =>{
        this.item = data;
      }).catch(()=>{
      })
    },

    update() {
      let formData = {
          name : this.item.name,
          quantity : this.item.quantity,
          description : this.item.description,
          inventory_id : this.item.inventory_id,
        },
        data = formDataAssigner(new FormData, formData)

      data.append('_method', 'put');

      if (this.image) {
        data.append('image', this.image)
      }

      axios.post('item/update/' + this.item.id, data).then(({data}) => {

        this.alert = data.message;

        setTimeout(() => {
          this.alert = '';
          this.$router.push('/items');
        }, 2000);

      }).catch(({response}) => {
        this.errors = response.data.errors;
      })
    },

    addImage(item) {
      this.image = item.target.files[0];
    }
  }
}
</script>

<style scoped>

</style>