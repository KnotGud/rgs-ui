<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list nav>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="route in routes"
            :key="route.name"
            v-bind:to="route.path"
          >
            <v-list-item-icon>
              <v-icon>{{ route.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="route.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append v-if="isSignedIn">
        <div>
          <v-btn color="error" block @click="signout">
            Sign Out
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar color="primary" app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Retro Game Exchange</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn color="secondary" to="/signin" v-if="!isSignedIn">
        <v-icon left>mdi-account</v-icon>
        Sign In
      </v-btn>
      <v-toolbar-title v-if="isSignedIn">
        Welcome {{ user.name }}
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  computed: {
    user: function() {
      return this.$store.state.user;
    },
    isSignedIn: function() {
      return this.$store.getters.isSignedIn;
    }
  },
  methods: {
    signout: function() {
      this.$store.dispatch("signout").then(() => {
        this.$router.push("/");
      });
    }
  },

  data: () => ({
    drawer: true,
    group: null,
    routes: [
      {
        name: "Home",
        path: "/home",
        icon: "mdi-home"
      },
      {
        name: "Catalog",
        path: "/catalog",
        icon: "mdi-view-list"
      },
      {
        name: "Library",
        path: "/library",
        icon: "mdi-library-shelves"
      },
      {
        name: "Account",
        path: "/account",
        icon: "mdi-account"
      }
    ]
  })
};
</script>
