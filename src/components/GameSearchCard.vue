<template>
  <v-card outlined>
    <v-card-title>
      Add a Game
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-divider></v-divider>
    <v-data-table :headers="headers" :items="games" :search="search">
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.TITLE }}</td>
          <td>{{ row.item.CONSOLE }}</td>
          <td>{{ row.item.GENRE }}</td>
          <td>{{ row.item.RELEASE_DATE }}</td>
          <td>
            <v-btn text @click="addGame(row.item)">
              Add Game
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-snackbar v-model="snackbar" :timeout="2000">
      Game Added
      <template v-slot:action="{ attrs }">
        <v-btn color="error" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    search: "",
    headers: [
      {
        text: "Game Name",
        align: "start",
        sortable: false,
        value: "TITLE"
      },
      { text: "Platform", value: "CONSOLE" },
      { text: "Genre", value: "GENRE" },
      { text: "Release Date", value: "RELEASE_DATE" },
      { text: "", sortable: false }
    ],
    games: [],
    snackbar: false
  }),
  computed: {
    user: function() {
      return this.$store.state.user;
    }
  },
  methods: {
    addGame: function(game) {
      this.$http.put(`user/${this.user.id}/collection/${game.INDEX}`);
      this.snackbar = true;
    }
  },
  mounted() {
    this.$http
      .get(`game`)
      .then(resp => {
        console.log(resp.data);
        this.games = resp.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
