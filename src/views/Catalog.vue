<template>
  <div class="catalog">
    <v-card>
      <v-card-title>
        Catalog
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="catalog" :search="search">
        <template v-slot:item="row">
          <tr>
            <td>{{ row.item.name }}</td>
            <td>{{ row.item.platform }}</td>
            <td>{{ row.item.owner }}</td>
            <td>
              <v-btn text @click="viewGame(row.item)">
                view game
              </v-btn>
            </td>
            <td>
              <v-btn text @click="request(row.item)">
                request
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <v-overlay :value="overlay">
      <GameCard v-bind:gameID="overlayGameID" />
      <v-btn block @click="overlay = false">
        Hide
      </v-btn>
    </v-overlay>
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
import GameCard from "@/components/GameCard.vue";

export default {
  components: { GameCard },
  data: () => ({
    search: "",
    headers: [
      {
        text: "Game Name",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Platform", value: "platform" },
      { text: "Owner", value: "owner" },
      { text: "", sortable: false },
      { text: "", sortable: false }
    ],
    catalog: [
      {
        id: 0,
        name: "temp game",
        platform: "some console",
        owner: "Some Guy",
        userID: 1
      },
      {
        id: 1,
        name: "action game",
        platform: "console 365",
        owner: "Bill Dude"
      },
      {
        id: 2,
        name: "strategy game",
        platform: "console abc",
        owner: "Guy Bob"
      }
    ],
    overlay: false,
    overlayGameID: 0,
    snackbar: false,
    snackbarText: ""
  }),
  computed: {
    isSignedIn: function() {
      return this.$store.getters.isSignedIn;
    }
  },
  methods: {
    viewGame: function(game) {
      this.overlayGameID = game.id;
      this.overlay = true;
    },
    request: function(game) {
      if (this.isSignedIn) {
        this.snackbarText = "Game Requested";
        console.log(game);
      } else {
        this.snackbarText = "You must be signed in to request a game";
      }
      this.snackbar = true;
    }
  },
  mounted() {
    this.$http
      .get("catalog")
      .then(resp => {
        console.log(resp.data);
        this.catalog = resp.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
