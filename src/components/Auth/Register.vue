<template>
  <div class="register-container">
    <div class="register-form">
      <h2>Register</h2>
      <form>
        <div v-if="user.password !== user.password_confirmation" class="alert alert-danger" role="alert">
          Passwords do not match
        </div>
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="user.name" placeholder="Name" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="user.email" placeholder="Email" required />
          <small class="text-danger" v-if="errors.email">{{errors.email[0]}}</small>
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

export default {
  name: "Register",
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
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
      this.register(this.user).then(() => {
        if (! this.signupFailed) {
          this.$router.replace({name: 'inventories'})
        }
      });
    }
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
h2 {
  text-align: center;
}

.register-form {
  max-width: 800px;
  width: 60%;
  padding: 20px;
  border: 1px solid #1da1f2;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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