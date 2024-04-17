<template>
  <div class="login-container">
    <div v-if="otpRequired" class="otp-section">
      <h3>OTP Verification</h3>
      <p>An OTP is required for login.</p>
      <form>
        <div class="form-group">
          <label for="otp">OTP:</label>
          <input type="text" id="otp" v-model="otp" placeholder="Password" required />
        </div>
        <button @click.prevent="submitOTP">Submit OTP</button>
      </form>
      <div v-if="countdown > 0" class="countdown">
        OTP expires in: {{ formattedCountdown }}
      </div>
      <div v-else class="countdown-expired">
        OTP has expired. Please request a new OTP.
      </div>
    </div>
    <div v-else class="login-form">
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
      otp: "",
      countdown: 300,
    };
  },
  computed: {
    // refreshFailed
    ...mapState("Auth", ["loginFailed", "otpRequired", "otpVerified", "isAdmin"]),

    formattedCountdown() {
      const minutes = Math.floor(this.countdown / 60);
      const seconds = this.countdown % 60;
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    },
  },
  methods: {
    ...mapActions({
      login: "Auth/login",
      verifyOTP: "Auth/verifyOTP",
      // refresh: "Auth/refresh",
    }),
    submit() {
      this.login(this.user).then(() => {
        if (!this.loginFailed) {
          this.startCountdown();
        }
      });
    },
    submitOTP() {
      this.verifyOTP({email: this.user.email, otp: this.otp}).then(() => {
        if (this.otpVerified) {
          this.isAdmin ? this.$router.replace({ name: "users" }) : this.$router.replace({ name: "profile" });
        }
      });
    },
    startCountdown() {
      this.countdownInterval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(this.countdownInterval);
        }
      }, 1000);
    },
  },
  beforeDestroy() {
    clearInterval(this.countdownInterval);
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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

.register-link {
  margin-top: 15px;
  text-align: center;
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

.otp-section {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  border: 1px solid #1da1f2;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.countdown {
  margin-top: 15px;
}

.countdown-expired {
  margin-top: 15px;
  color: red;
}
</style>