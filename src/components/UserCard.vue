<template>
  <v-card outlined>
    <v-card-title>
      {{ userData.firstName }} {{ userData.lastName }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col> Email: {{ userData.email }}</v-col>
        </v-row>
        <v-row>
          <v-col> Address: {{ userData.address }}</v-col>
        </v-row>
        <v-row>
          <v-col> City: {{ userData.city }}</v-col>
        </v-row>
        <v-row>
          <v-col> State: {{ userData.state }}</v-col>
        </v-row>
        <v-row>
          <v-col> Zip: {{ userData.zipcode }}</v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["userID"],
  data: () => ({
    userData: {}
  }),
  computed: {
    user: function() {
      return this.$store.state.user;
    }
  },
  mounted() {
    this.$http
      .get(`user/${this.userID}`)
      .then(resp => {
        this.userData = resp.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
