<template>
  <div class="container">
    <div class="mt-5">
      <div class="alert alert-success" role="alert" v-if="alert">
        {{ alert }}
      </div>
      <div class="card">
        <div class="card-header text-center">Change Password</div>
        <div class="card-body">
          <form>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Current Password</label>
              <div class="col-sm-10">
                <input type="password" class="form-control" placeholder="Current Password" v-model="currentPassword">
                <small class="text-danger" v-if="errors.currentPassword">{{ errors.currentPassword[0] }}</small>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">New Password</label>
              <div class="col-sm-10">
                <input type="password" class="form-control" placeholder="New Password" v-model="newPassword">
                <small class="text-danger" v-if="errors.newPassword">{{ errors.newPassword[0] }}</small>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Confirm New Password</label>
              <div class="col-sm-10">
                <input type="password" class="form-control" placeholder="Confirm New Password" v-model="confirmPassword">
                <small class="text-danger" v-if="errors.confirmPassword">{{ errors.confirmPassword[0] }}</small>
              </div>
            </div>
            <div class="form-group">
              <button class="btn btn-outline-primary float-right" @click.prevent="submit">Change Password</button>
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
  name: "ChangePassword",
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      alert: "",
      errors: {},
    };
  },
  methods: {
    submit() {
      axios.post("/change-password", {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
        })
        .then((response) => {
          this.alert = response.data.message;
          this.resetForm();
          setTimeout(() => {
            this.alert = "";
          }, 2000);
        })
        .catch(({ response }) => {
          this.errors = response.data.errors;
        });
    },
    resetForm() {
      this.currentPassword = "";
      this.newPassword = "";
      this.confirmPassword = "";
    },
  },
};
</script>

<style scoped>
</style>
