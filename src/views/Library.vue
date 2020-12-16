<template>
  <div class="library">
    <SecurePage v-if="!isSignedIn" />
    <div v-if="isSignedIn">
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>
                My Game Collection
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
                <v-data-iterator :items="myGames" :search="searchMy">
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
                        <GameCard
                          v-on:reload="fetch()"
                          v-bind:gameID="item.id"
                          my="true"
                        />
                      </v-col>
                    </v-row>
                  </template>
                </v-data-iterator>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>
                Reqeusts
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="searchRequests"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="requests"
                :search="searchRequests"
              >
                <template v-slot:item="row">
                  <tr>
                    <td>{{ row.item.GAME_NAME }}</td>
                    <td>{{ row.item.LENDER }}</td>
                    <td>{{ row.item.BORROWER }}</td>
                    <td>{{ row.item.STATUS }}</td>
                    <td>
                      <v-btn text @click="viewGame(row.item)"> </v-btn>
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
          </v-col>
        </v-row>
      </v-container>
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
    },
    user: function() {
      return this.$store.state.user;
    }
  },
  data: () => ({
    searchMy: "",
    myGames: [],
    searchRequests: "",
    requests: [],
    headers: [
      {
        text: "Game Name",
        align: "start",
        sortable: false,
        value: "GAME_NAME"
      },
      { text: "Owner", value: "LENDER" },
      { text: "Requester", value: "BORROWER" },
      { text: "Status", value: "STATUS" },
      { text: "", sortable: false },
      { text: "", sortable: false }
    ],
    overlay: false,
    overlayGameID: 0,
    snackbar: false,
    snackbarText: ""
  }),
  methods: {
    fetch: function() {
      console.log("Getting user collection");

      this.$http
        .get(`user/${this.user.id}/collection`)
        .then(resp => {
          this.myGames = resp.data;
        })
        .catch(err => {
          console.log(err);
        });
      this.$http
        .get(`user/${this.user.id}/request`)
        .then(resp => {
          console.log(resp);
          this.requests = resp.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    isOwner: function(request) {
      return request.LENDER == this.user.id;
    }
  },
  mounted() {
    this.fetch();
  }
};
</script>
