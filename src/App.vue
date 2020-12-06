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
    </v-navigation-drawer>

    <v-app-bar color="primary" app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Retro Game Share UI</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
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

  data: () => ({
    drawer: true,
    group: null,
    routes: [
      {
        name: "Home",
        path: "/home",
        icon: "mdi-image"
      },
      {
        name: "About",
        path: "/about",
        icon: "mdi-image"
      },
      {
        name: "Catalog",
        path: "/catalog",
        icon: "mdi-image"
      },
      {
        name: "Library",
        path: "/library",
        icon: "mdi-image"
      },
      {
        name: "Account",
        path: "/account",
        icon: "mdi-image"
      }
    ]
  })
};
</script>
