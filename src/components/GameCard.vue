<template>
  <v-card outlined>
    <v-card-title>
      {{ game.name }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col> ID: {{ gameID }}</v-col>
        </v-row>
        <v-row>
          <v-col> Platform: {{ game.platform }}</v-col>
        </v-row>
        <v-row>
          <v-col> Developer: {{ game.developer }}</v-col>
        </v-row>
        <v-row>
          <v-col> Release Date: {{ game.release }}</v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn color="error" text v-if="my" @click="deleteGame()">
        Remove
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="openLink(game.url)">
        Link
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["gameID", "my"],
  data: () => ({
    game: {
      name: "Some Game",
      platform: "Some console",
      developer: "Some Developer",
      url: "https://en.wikipedia.org/wiki/Miracle_Piano_Teaching_System",
      release: "1990"
    }
  }),
  computed: {
    user: function() {
      return this.$store.state.user;
    }
  },
  methods: {
    openLink: function(link) {
      window.open(link, "_blank");
    },
    deleteGame: function() {
      this.$http.delete(`/user/${this.user.id}/collection/${this.gameID}`);
      this.fetch();
    },
    fetch: function() {
      this.$http
        .get(`game/${this.gameID}`)
        .then(resp => {
          console.log(resp.data);
          this.game = resp.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.fetch();
  }
};
</script>
