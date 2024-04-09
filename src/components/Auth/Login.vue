<template>
  <div class="login-container">

    <div class="login-form">
      <h2>Login</h2>
      <form>
        <div v-if="loginFailed" class="alert alert-danger" role="alert">
          Invalid Email/Username or password. Please try again.
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="text" id="username" v-model="user.email" placeholder="Email or Username" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="user.password" placeholder="Password" required />
        </div>
        <button type="submit" @click.prevent="submit">Log in</button>
      </form>
      <p class="register-link">Don't have an account? <router-link to="/register">Register here!</router-link></p>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "Login",
  data() {
    return {
      user: {},
    }
  },
  computed: {
    ...mapState('Auth', ['loginFailed', 'refreshFailed']),
  },
  mounted() {
    if (this.$store.state["Auth/token"] !== '') {
      this.refresh(this.$store.state["Auth/token"]).then(() => {
        if (! this.refreshFailed) {
          this.$router.replace({name: 'inventories'})
        }
      })
    }
  },
  methods: {
    ...mapActions({
      login: 'Auth/login',
      refresh: 'Auth/refresh'
    }),
    submit() {
      this.login(this.user).then(() => {
        if (! this.loginFailed) {
          this.$router.replace({name: 'inventories'})
        }
      });
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
h2 {
  text-align: center;
}

.login-form {
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

.bottom-links a {
  text-decoration: none;
  color: #1da1f2;
}

.register-link {
  margin-top: 15px;
  text-align: center;
  color: #1da1f2;
}

.register-link router-link {
  text-decoration: none;
  color: #1da1f2;
}

@media screen and (max-width: 768px) {
  .login-form {
    width: 80%;
  }
}

@media screen and (max-width: 576px) {
  .login-form {
    width: 90%;
  }
}
</style>