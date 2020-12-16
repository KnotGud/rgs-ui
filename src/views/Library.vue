<template>
  <div class="library">
    <SecurePage v-if="!isSignedIn" />
    <div v-if="isSignedIn">
      <v-card>
        <v-card-title>
          My Games
          <v-spacer></v-spacer>
          <v-text-field
            v-model="searchMy"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-card-text>
          <v-data-iterator :items="myGames" :page="page" :search="searchMy">
            <template v-slot:default="props">
              <v-row>
                <v-col
                  v-for="item in props.items"
                  :key="item.id"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                >
                  <GameCard gameID="item.id" my="true" />
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title>
          Requests
          <v-spacer></v-spacer>
          <v-text-field
            v-model="searchMy"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-card-text>
          <v-data-iterator :items="myGames" :page="page" :search="searchMy">
            <template v-slot:default="props">
              <v-row>
                <v-col
                  v-for="item in props.items"
                  :key="item.id"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                >
                  <GameCard gameID="item.id" />
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
        </v-card-text>
      </v-card>
    </div>
    <v-overlay :value="overlay">
      <GameCard gameID="overlayGameID" />
    </v-overlay>
    <v-snackbar v-model="snackbar" :timeout="2000">
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
import SecurePage from "@/components/SecurePage.vue";

export default {
  components: { SecurePage, GameCard },
  computed: {
    isSignedIn: function() {
      return this.$store.getters.isSignedIn;
    }
  },
  data: () => ({
    searchMy: "",
    myGamesHeaders: [
      {
        text: "Game Name",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Platform", value: "platform" },
      { text: "Owner", value: "owner" },
      { text: "Release Date", sortable: false },
      { text: "", sortable: false }
    ],
    myGames: [
      {
        id: 0,
        name: "temp game",
        platform: "some console"
      },
      {
        id: 1,
        name: "action game",
        platform: "console 365"
      },
      {
        id: 2,
        name: "strategy game",
        platform: "console abc"
      }
    ],

    overlay: false,
    overlayGameID: 0,
    snackbar: false,
    snackbarText: ""
  })
};
</script>
