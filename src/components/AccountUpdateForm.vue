<template>
  <v-form v-model="valid" @submit.prevent="update">
    <v-card outlined>
      <v-card-title>
        Update Account Information
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
              Shipping Information
              <v-divider> </v-divider>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="address" label="Address" required outlined>
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
          >Update</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-form>
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
    address: "",
    city: "",
    state: "",
    zipcode: "",
    country: "United States"
  }),
  methods: {
    update: function() {
      let formData = {
        firstName: this.firstName,
        lastName: this.lastName,
        address: this.address,
        city: this.city,
        state: this.state,
        zipcode: this.zipcode,
        country: this.country
      };
      this.$store
        .dispatch("updateAccount", { formData })
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  }
};
</script>
