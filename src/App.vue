<template>
  <v-app>
    <v-main>
      <div>
        <v-toolbar dark flat color="indigo darken-4">
          <v-toolbar-title
            style="font-size: 40px; cursor: pointer"
            @click="goToHome"
            >הגדרות בחקיקה</v-toolbar-title
          >

          <v-spacer></v-spacer>

          <v-toolbar-items>
            <v-btn text @click="goToAbout">
              מדריך שימוש
            </v-btn>
            <v-btn text @click="goToSearch">
              חיפוש
            </v-btn>
          </v-toolbar-items>

          <v-btn icon @click="goToHome">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </v-toolbar>
      </div>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},

  data() {
    return {};
  },
  methods: {
    goToSearch() {
      if (this.$route.path != '/search') {
        this.$router.push('/search');
      }
    },
    goToAbout() {
      if (this.$route.path != '/about') {
        this.$router.push('/about');
      }
    },
    goToHome() {
      if (this.$route.path != '/') {
        this.$router.push('/');
      }
    },
  },
};
</script>

<style>
#app {
  font-family: 'Assistant', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
