<template>
  <div>
    <v-form v-model="valid" @submit.prevent="update">
      <v-card outlined>
        <v-card-title>
          Update Account Information
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="firstName" label="First Name" outlined>
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="lastName" label="Last Name" outlined>
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
                <v-text-field v-model="address" label="Address" outlined>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="city" label="City" outlined>
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
                <v-text-field v-model="zipcode" label="Zip Code" outlined>
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="country"
                  label="Country"
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
          <v-btn type="submit" color="primary" rounded>Update</v-btn>
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
    address: "",
    city: "",
    state: "",
    zipcode: "",
    country: "United States",
    snackbar: false,
    snackbarText: ""
  }),
  computed: {
    user: function() {
      return this.$store.state.user;
    }
  },
  methods: {
    update: function() {
      let formData = {
        client_userID: this.user.id,
        firstName: this.firstName,
        lastName: this.lastName,
        address: this.address,
        city: this.city,
        state: this.state,
        zipcode: this.zipcode,
        country: this.country
      };
      this.$store
        .dispatch("update", formData)
        .then(() => this.$router.push("/"))
        .catch(err => {
          this.snackbarText = err.response.data;
          this.snackbar = true;
        });
    }
  }
};
</script>
