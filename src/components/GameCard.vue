<template>
  <v-card outlined>
    <v-card-title>
      {{ game.name }}
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col> ID: {{ gameID }}</v-col>
        </v-row>
        <v-row>
          <v-col> Name: {{ game.name }}</v-col>
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
  props: ["gameID"],
  data: () => ({
    game: {
      name: "Some Game",
      platform: "Some console",
      developer: "Some Developer",
      url: "https://en.wikipedia.org/wiki/Miracle_Piano_Teaching_System",
      release: "1990"
    }
  }),
  methods: {
    openLink: function(link) {
      window.open(link, "_blank");
    }
  }
};
</script>
