<template>
  <div class="home">
    <v-container>
      <v-row class="text-center">
      <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold mb-3">
                  Welcome to the Retro Game Exchange
                </h1>
       </v-col>
        <v-col cols="12">
          <v-img
            :src="require('../assets/1080_BG.jpg')"
          />
        </v-col>

        <v-col class="mb-4">
          <p class="subheading font-weight-bold">
          The Retro Game Exchange application was developed for course CS 320 at Washington State University by Logan, Brandon, Daniel, and John during Fall, 2020.
          </p><p class="subheading font-weight-regular">
            Our database has information about all games released in North America for the original Nintendo Entertainment System, Commodore 64, Intellivision, Colecovision, Atari 2600, Sega Master and Sega Genesis, and the original Playstation.
            Users can create an account to show what games they have in their own collection, and they have the option to make each game available for other users to borrow.
            Registered users can request to borrow a game from another user, and if that request is accepted our system shares the user's shipping address and tracks the status of each borrowed game.
            We hope this system allows our users to experience more Retro Video Games that they don't own themselves and to help other fans try out the games they are willing to share.
          </p>
        </v-col>
      </v-row>
      <v-row>
                <v-col class="mb-4">
        <p>All copyrighted game titles and trademarks listed on this site are the property of their respective owners.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    ecosystem: [
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader"
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify"
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify"
      }
    ],
    importantLinks: [
      {
        text: "Documentation",
        href: "https://vuetifyjs.com"
      },
      {
        text: "Chat",
        href: "https://community.vuetifyjs.com"
      },
      {
        text: "Made with Vuetify",
        href: "https://madewithvuejs.com/vuetify"
      },
      {
        text: "Twitter",
        href: "https://twitter.com/vuetifyjs"
      },
      {
        text: "Articles",
        href: "https://medium.com/vuetify"
      }
    ],
    whatsNext: [
      {
        text: "Explore components",
        href: "https://vuetifyjs.com/components/api-explorer"
      },
      {
        text: "Select a layout",
        href: "https://vuetifyjs.com/getting-started/pre-made-layouts"
      },
      {
        text: "Frequently Asked Questions",
        href: "https://vuetifyjs.com/getting-started/frequently-asked-questions"
      }
    ]
  })
};
</script>
