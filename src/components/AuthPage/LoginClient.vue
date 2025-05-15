<template>
  <v-card class="auth-card">
    <v-card-title class="text-center">
      <span class="headline">{{ isRegister ? "Sign Up" : "Sign In" }}</span>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text class="scrollable-card-text">
      <v-form ref="form" v-model="valid">
        <!-- Email Field -->
        <v-text-field
          v-model="email"
          :label="isRegister ? 'Email Address' : 'Enter your email'"
          :rules="[rules.required, rules.email]"
          prepend-icon="mdi-email"
          class="mb-4"
          required
        />

        <!-- Username Field (Only for Register) -->
        <v-text-field
          v-if="isRegister"
          v-model="username"
          label="Username"
          :rules="[rules.required]"
          prepend-icon="mdi-account"
          class="mb-4"
          required
        />

        <!-- Password Field -->
        <v-text-field
          v-model="password"
          :type="'password'"
          :label="isRegister ? 'Password' : 'Enter your password'"
          :rules="[rules.required]"
          prepend-icon="mdi-lock"
          class="mb-4"
          required
        />

        <!-- Password Again Field (Only for Register) -->
        <v-text-field
          v-if="isRegister"
          v-model="passwordAgain"
          :type="'password'"
          label="Confirm Password"
          :rules="[rules.required, validatePassword]"
          prepend-icon="mdi-lock"
          class="mb-4"
          required
        />

        <!-- Phone Number Field (Only for Register) -->
        <v-text-field
          v-if="isRegister"
          v-model="phone"
          label="Phone Number"
          :rules="[rules.required, rules.phone]"
          prepend-icon="mdi-phone"
          class="mb-4"
          required
        />

        <!-- Action Button -->
        <v-btn
          @click="handleAuth"
          :disabled="!valid"
          color="primary"
          block
          class="mt-4"
        >
          {{ isRegister ? "Sign Up" : "Sign In" }}
        </v-btn>

        <!-- Google Sign In Button -->
        <v-btn v-if="!isRegister" block class="mt-4" @click="handleGoogleLogin">
          <v-icon left>mdi-google</v-icon>
          Sign in with Google
        </v-btn>

        <!-- Toggle Mode Button -->
        <v-btn text @click="toggleMode" class="mt-2">
          {{
            isRegister
              ? "Already have an account? Sign In"
              : "Don’t have an account? Sign Up"
          }}
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { login, register } from "@/api/api";
import { getUrlLoginWithGoogle } from "@/api/api";

const emit = defineEmits(["authSuccess"]);
const email = ref("");
const password = ref("");
const passwordAgain = ref("");
const username = ref("");
const phone = ref("");
const valid = ref(false);
const isRegister = ref(false);

const rules = {
  required: (v) => !!v || "This field is required",
  email: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  phone: (v) => /^[0-9]{10}$/.test(v) || "Phone number must be valid",
  validatePassword: (v) => v === password.value || "Passwords don't match",
};

// Toggle between Register and Sign In mode
const toggleMode = () => {
  isRegister.value = !isRegister.value;
};

const handleAuth = async () => {
  try {
    if (isRegister.value) {
      const userData = {
        email: email.value,
        password: password.value,
        username: username.value,
        phone: phone.value,
      };
      // Call Register API
      const response = await register(userData);
      console.log("Registration successful:", response.data.data);
      alert("Registration successful. Please log in.");
      toggleMode(); // Switch to Login mode after successful registration
    } else {
      // Call Login API
      const response = await login({
        email: email.value,
        password: password.value,
      });
      console.log("Login successful:", response.data.data);
      emit("authSuccess", response.data.data); // Emit event to parent component
    }
  } catch (error) {
    console.error("Authentication error:", error);
    alert("Authentication failed. Please try again.");
  }
};

const handleGoogleLogin = async () => {
  try {
    const response = await getUrlLoginWithGoogle();
    console.log(response.data);
    window.location.href = response.data;
  } catch (error) {
    console.error("Login with Google", error);
    alert(error.response?.data?.message || "Login with Google failed");
  }
};
</script>

<style scoped>
.auth-card {
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.v-btn {
  font-weight: bold;
  border-radius: 8px;
}

.v-text-field {
  margin-bottom: 16px !important;
}

.v-card-title {
  font-weight: bold;
  font-size: 22px;
}

.v-divider {
  margin: 10px 0;
}

.scrollable-card-text {
  max-height: 500px;
  overflow-y: auto;
}

@media (max-width: 600px) {
  .auth-card {
    padding: 12px;
  }
}
</style>
