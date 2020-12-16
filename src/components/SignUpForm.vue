<template>
  <div>
    <v-form v-model="valid" @submit.prevent="signup">
      <v-card outlined>
        <v-card-title>
          Sign Up
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="firstName"
                  :rules="nameRules"
                  label="First Name"
                  required
                  outlined
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="lastName"
                  :rules="nameRules"
                  label="Last Name"
                  required
                  outlined
                >
                </v-text-field>
              </v-col>
            </v-row>
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
              <v-col cols="6">
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  label="Password"
                  required
                  outlined
                  :type="showPass ? 'text' : 'password'"
                >
                </v-text-field>
                <v-checkbox
                  v-model="showPass"
                  label="Show Password"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="pconfirm"
                  :rules="pconfirmRules.concat(pconfirmComputeRule)"
                  label="Confirm Password"
                  required
                  outlined
                  :type="showPass ? 'text' : 'password'"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                Shipping Information
                <v-divider> </v-divider>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="address"
                  label="Address"
                  required
                  outlined
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="city" label="City" required outlined>
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="state"
                  :items="['Washington', 'Oregon']"
                  label="State"
                  required
                  outlined
                >
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="zipcode"
                  label="Zip Code"
                  required
                  outlined
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="country"
                  label="Country"
                  required
                  disabled
                  outlined
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn type="submit" color="primary" rounded :disabled="!valid"
            >Sign Up</v-btn
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
    firstName: "",
    lastName: "",
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 20 || "Name must be less than 20 characters"
    ],
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
    pconfirm: "",
    pconfirmRules: [v => !!v || "You must confirm your password"],
    address: "",
    city: "",
    state: "",
    zipcode: "",
    country: "United States",
    snackbar: false,
    snackbarText: ""
  }),
  methods: {
    signup: function() {
      let formData = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        address: this.address,
        city: this.city,
        state: this.state,
        zipcode: this.zipcode,
        country: this.country
      };
      this.$store
        .dispatch("signup", { formData })
        .then(() => this.$router.push("/"))
        .catch(err => {
          this.snackbarText = err.response.data;
          this.snackbar = true;
        });
    }
  },
  computed: {
    pconfirmComputeRule() {
      return () => this.password === this.pconfirm || "Passwords must match";
    }
  }
};
</script>
