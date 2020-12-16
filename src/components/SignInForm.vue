<template>
  <div>
    <v-form v-model="valid" @submit.prevent="signin">
      <v-card outlined>
        <v-card-title>
          Sign In
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="Email"
                  required
                  outlined
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  label="Password"
                  required
                  outlined
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPass ? 'text' : 'password'"
                  @click:append="showPass = !showPass"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn type="submit" rounded text to="/signup">Sign Up</v-btn>
          <v-spacer></v-spacer>
          <v-btn type="submit" color="primary" rounded :disabled="!valid"
            >Sign In</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
    <v-snackbar v-model="snackbar" :timeout="2500">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="error" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    showPass: false,
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => v.length >= 8 || "Password must be 8 or more characters"
    ],
    snackbar: false,
    snackbarText: ""
  }),
  methods: {
    signin: function() {
      let formData = {
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("signin", { formData })
        .then(() => this.$router.push("/"))
        .catch(err => {
          this.snackbarText = err.response.data;
          this.snackbar = true;
        });
    }
  }
};
</script>
