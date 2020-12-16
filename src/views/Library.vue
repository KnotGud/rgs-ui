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
                <v-data-iterator
                  :items="myGames"
                  :search="searchMy"
                  :items-per-page="4"
                  :footer-props="{ 'items-per-page-options': [4, 8, 12, -1] }"
                >
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
          <v-col class="text-right">
            <v-btn color="primary" @click="overlayAddGame = true"
              >Add Game</v-btn
            >
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
                      <v-btn
                        v-if="isOwner(row.item) && row.item.STATUS == 'pending'"
                        color="primary"
                        @click="accept(row.item)"
                      >
                        Accept
                      </v-btn>
                      <v-btn
                        v-if="isOwner(row.item) && row.item.STATUS == 'pending'"
                        color="error"
                        @click="deny(row.item)"
                      >
                        Deny
                      </v-btn>
                      <v-btn
                        v-if="
                          isOwner(row.item) && row.item.STATUS == 'approved'
                        "
                        color="primary"
                        @click="viewShipping(row.item.BORROWER)"
                      >
                        Show Shipping Info
                      </v-btn>
                      <v-btn
                        v-if="
                          !isOwner(row.item) && row.item.STATUS == 'approved'
                        "
                        color="primary"
                        @click="received(row.item)"
                      >
                        Game Recieved
                      </v-btn>
                      <v-btn
                        v-if="
                          isOwner(row.item) && row.item.STATUS == 'received'
                        "
                        color="primary"
                        @click="returned(row.item)"
                      >
                        Game Returned
                      </v-btn>
                      <v-btn
                        v-if="
                          !isOwner(row.item) && row.item.STATUS == 'received'
                        "
                        color="primary"
                        @click="viewShipping(row.item.LENDER)"
                      >
                        Show Shipping Info
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
    <v-overlay :value="overlayAddGame">
      <GameSearchCard />
      <v-btn
        block
        @click="
          overlayAddGame = false;
          fetch();
        "
      >
        Done
      </v-btn>
    </v-overlay>
    <v-overlay :value="overlayUser">
      <UserCard v-bind:userID="overlayUserID" />
      <v-btn
        block
        @click="
          overlayUser = false;
          fetch();
        "
      >
        Done
      </v-btn>
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
import GameSearchCard from "@/components/GameSearchCard.vue";
import UserCard from "@/components/UserCard.vue";
import SecurePage from "@/components/SecurePage.vue";

export default {
  components: { SecurePage, GameCard, UserCard, GameSearchCard },
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
    overlayAddGame: false,
    overlayUser: false,
    overlayUserID: "",
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
    addGame: function() {
      this.overlayUser = true;
    },
    isOwner: function(request) {
      return request.LENDER == this.user.id;
    },
    accept: function(request) {
      this.$http
        .put(`/user/${this.user.id}/request/${request.ID}/approved`)
        .then(() => {
          this.fetch();
        })
        .catch(err => {
          console.log(err);
          this.fetch();
        });
    },
    deny: function(request) {
      this.$http
        .put(`/user/${this.user.id}/request/${request.ID}/denied`)
        .then(() => {
          this.fetch();
        })
        .catch(err => {
          console.log(err);
          this.fetch();
        });
    },
    received: function(request) {
      this.$http
        .put(`/user/${this.user.id}/request/${request.ID}/received`)
        .then(() => {
          this.fetch();
        })
        .catch(err => {
          console.log(err);
          this.fetch();
        });
    },
    returned: function(request) {
      this.$http
        .put(`/user/${this.user.id}/request/${request.ID}/returned`)
        .then(() => {
          this.fetch();
        })
        .catch(err => {
          console.log(err);
          this.fetch();
        });
    },
    viewShipping: function(userID) {
      this.overlayUserID = userID;
      this.overlayUser = true;
    }
  },
  mounted() {
    this.fetch();
  }
};
</script>
