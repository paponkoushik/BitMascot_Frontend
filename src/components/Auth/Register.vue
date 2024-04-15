<template>
  <div class="register-container">
    <div class="register-form">
      <h2>Register</h2>
      <form>
        <div v-if="user.password !== user.password_confirmation" class="alert alert-danger" role="alert">
          Passwords do not match
        </div>
        <div v-if="message.length > 0 " class="alert alert-success" role="alert">
          {{ message }}
        </div>
        <div class="form-group">
          <label for="first_name">First Name:</label>
          <input type="text" id="first_name" v-model="user.first_name" placeholder="First Name" required />
          <small class="text-danger" v-if="errors.first_name">{{errors.first_name[0]}}</small>
        </div>
        <div class="form-group">
          <label for="last_name">Last Name:</label>
          <input type="text" id="last_name" v-model="user.last_name" placeholder="Last Name" required />
          <small class="text-danger" v-if="errors.last_name">{{errors.last_name[0]}}</small>
        </div>
        <div class="form-group">
          <label for="address">Address:</label>
          <input type="text" id="address" v-model="user.address" placeholder="Address" required />
        </div>
        <div class="row">
          <div class="col-6 form-group">
            <label for="phone">phone:</label>
            <input type="text" id="phone" v-model="user.phone" placeholder="Phone" required />
            <small class="text-danger" v-if="errors.phone">{{errors.phone[0]}}</small>
          </div>
          <div class="col-6 form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="user.email" placeholder="Email" required />
            <small class="text-danger" v-if="errors.email">{{errors.email[0]}}</small>
          </div>
        </div>

        <div class="form-group">
          <label for="date_of_birth">Date of Birth:</label>
          <input type="date" id="date_of_birth" v-model="user.date_of_birth" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" required />
        </div>

        <div class="form-group">
          <label for="id_verification">Id Verification:</label>
          <input type="file" class="form-control-file" accept="image/*,application/pdf" id="id_verification" @change="addID" placeholder="Password" required />
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="user.password" placeholder="Password" required />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" v-model="user.password_confirmation" placeholder="Confirm Password" required />
        </div>
        <button type="submit" :disabled="user.password !== user.password_confirmation" @click.prevent="submit">Register</button>
      </form>
      <p class="login-link">Already have an account? <router-link to="/">Login here!</router-link></p>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {formDataAssigner} from "../../helpers/helper";

export default {
  name: "Register",
  data() {
    return {
      user: {
        first_name: "",
        last_name: "",
        address: "",
        date_of_birth: "",
        phone: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      ID: "",
      message: ""
    };
  },
  computed: {
    ...mapState('Auth', ['signupFailed', 'errors']),
  },
  methods: {
    ...mapActions({
      register: 'Auth/register'
    }),
    submit() {
      let formData = formDataAssigner(new FormData, this.user);

      if (this.ID) {
        formData.append('id_verification', this.ID)
      }

      this.register(formData).then(() => {
        if (! this.signupFailed) {
          this.message = "User Registered Successfully"
          setTimeout(() => {
            this.$router.replace({name: 'login'})
            this.message = ""
          }, 500)
        }
      });
    },

    addID(item) {
      this.ID = item.target.files[0];
    }
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.register-form {
  max-width: 800px;
  width: 90%;
  padding: 20px;
  border: 1px solid #1da1f2;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
h2 {
  text-align: center;
}
.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #1da1f2;
}

input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

button {
  background-color: #1da1f2;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.login-link {
  margin-top: 15px;
  text-align: center;
  color: #1da1f2;
}

.login-link router-link {
  text-decoration: none;
  color: #1da1f2;
}
</style>