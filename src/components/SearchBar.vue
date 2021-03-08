<template>
  <v-container>
    <v-layout row wrap justify-space-around>
      <v-flex xs8 md8>
        <v-text-field
          v-model="dummySearchInput"
          @change="search"
          placeholder="חיפוש"
          dense
          filled
          append-icon="mdi-magnify"
          class="mt-10"
        ></v-text-field>
      </v-flex>
      <v-flex xs4 md4>
        <v-radio-group v-model="searchOptions" row class="mt-10">
          <v-radio label="חיפוש מורחב" value="extended"></v-radio>
          <v-radio label="חיפוש פשוט" value="simple"></v-radio>
        </v-radio-group>
      </v-flex>
    </v-layout>
    <h1 v-if="noInput">בבקשה הכנס\י הגדרה לחיפוש ולחצ\י אנטר</h1>
    <h1 v-if="!noInput && filteredDefinitions.length !== 0">
      להשוואת הגדרות בחר עוד {{ 2 - selectedDefinitions.length }} הגדרות
    </h1>
    <v-btn v-if="selectedDefinitions.length === 2" @click="compare"
      >להשוואה</v-btn
    >
    <h2 v-if="filteredDefinitions.length === 0 && !noInput">אין הגדרה כזו</h2>
    <h3 v-if="filteredDefinitions.length > 0 && !noInput">
      נמצאו {{ filteredDefinitions.length }} הגדרות שמתאימות לערך שחיפשת
    </h3>
    <v-list v-if="!noInput">
      <v-card
        :color="def.color"
        :dark="!def.brightBackground"
        v-for="def in filteredDefinitions"
        :key="def.Definition + Math.random()"
        class="mb-10"
        :class="{ active: def.isClicked }"
        @click="cardClicked(def)"
      >
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <div>
              <v-icon
                v-on="on"
                @click.stop="openLawLink(def.lawLink)"
                style="float: left"
                class="pr-2"
                >mdi-open-in-new</v-icon
              >
            </div>
          </template>
          <span>קישור לחוק</span>
        </v-tooltip>
        <v-card-title
          style="font-family: 'Assistant', sans-serif; font-size: 30px"
          class="justify-center"
        >
          {{ def.Definition }}
        </v-card-title>

        <v-card-subtitle style="font-size: 20px"
          ><b> שם החוק:</b> {{ def.Law }}</v-card-subtitle
        >

        <v-card-text style="font-size: 17px"
          ><b>תיאור ההגדרה:</b> {{ def.Description }}</v-card-text
        >
        <v-card-text style="font-size: 17px"
          ><b>דמיון לערך שחיפשת:</b> {{ (def.similarity * 100).toFixed(2) }}%
        </v-card-text>
      </v-card>
    </v-list>
  </v-container>
</template>

<script>
import { definitions } from '../Definitions';
const stringSimilarity = require('string-similarity');

export default {
  name: 'SearchBar',
  data() {
    return {
      dummySearchInput: '',
      searchInput: '',
      definitionsList: definitions,
      noInput: true,
      searchOptions: 'simple',
      selectedDefinitions: [],
      showTooltip: true,
    };
  },
  mounted() {
    if (!JSON.parse(localStorage.getItem('searchItem'))) {
      console.log('111', JSON.parse(localStorage.getItem('searchItem')));
    } else {
      this.dummySearchInput = JSON.parse(localStorage.getItem('searchItem'));
      this.searchInput = this.dummySearchInput;
      this.noInput = false;
      console.log('222', JSON.parse(localStorage.getItem('searchItem')));
    }
  },
  methods: {
    search() {
      this.searchInput = this.dummySearchInput;
      localStorage.setItem('searchItem', JSON.stringify(this.searchInput));
      this.noInput = false;
    },
    cardClicked(def) {
      def.isClicked = !def.isClicked;
      if (this.selectedDefinitions.includes(def)) {
        const index = this.selectedDefinitions.indexOf(def);
        this.selectedDefinitions.splice(index, 1);
      } else if (
        this.selectedDefinitions.length < 2 &&
        !this.selectedDefinitions.includes(def)
      ) {
        this.selectedDefinitions.push(def);
      }
      if (this.selectedDefinitions.length === 2) {
        localStorage.setItem(
          'selected',
          JSON.stringify(this.selectedDefinitions)
        );
      }
    },
    compare() {
      this.$router.push('/compare');
    },
    filterSearch(minSimilarity) {
      const randomR = Math.random() * 255;
      const randomG = Math.random() * 255;
      const randomB = Math.random() * 255;
      let currDef = this.definitionsList[0];
      currDef.brightBackground = false;
      if (
        (randomR > 130 && randomG > 130) ||
        (randomR > 130 && randomB > 130) ||
        (randomG > 130 && randomB > 130) ||
        (randomR > 130 && randomG > 130 && randomB > 130) ||
        randomG > 220
      ) {
        currDef.brightBackground = true;
      }
      currDef.color = `rgb(${randomR}, ${randomG}, ${randomB})`;
      const first = this.definitionsList[0];
      return this.definitionsList
        .filter((definition) => {
          definition.Law = definition.Law.replace(/_/g, ' ');
          if (definition.Definition !== currDef.Definition) {
            const randomR = Math.random() * 255;
            const randomG = Math.random() * 255;
            const randomB = Math.random() * 255;
            definition.brightBackground = false;
            if (
              (randomR > 130 && randomG > 130) ||
              (randomR > 130 && randomB > 130) ||
              (randomG > 130 && randomB > 130) ||
              (randomR > 130 && randomG > 130 && randomB > 130) ||
              randomG > 220
            ) {
              definition.brightBackground = true;
            }
            currDef = definition;
            definition.color = `rgb(${randomR}, ${randomG}, ${randomB})`;
          } else {
            definition.brightBackground = currDef.brightBackground;
            definition.color = currDef.color;
          }
          const similarity = stringSimilarity.compareTwoStrings(
            this.searchInput,
            definition.Definition
          );
          const descSimilarity = stringSimilarity.compareTwoStrings(
            first.Description,
            definition.Description
          );
          definition.similarity = similarity;
          definition.descSimilarity = descSimilarity;
          definition.isClicked = false;
          if (definition.similarity >= minSimilarity && !definition.lawLink) {
            let revLaw = definition.Law.split('')
              .reverse()
              .join('');
            if (Number.isInteger(Number(revLaw[0]))) {
              revLaw = revLaw.slice(5);
              if (revLaw[1] === ' ') {
                revLaw = revLaw.slice(2);
                const index = revLaw.indexOf(' ');
                revLaw = revLaw.slice(index + 1);
              }
            }
            definition.lawLink = `https://he.wikisource.org/wiki/${revLaw
              .split('')
              .reverse()
              .join('')
              .replace(/ /g, '_')}`;
          }
          return similarity >= minSimilarity;
        })
        .sort((a, b) => (a.similarity < b.similarity ? 1 : -1));
    },
    openLawLink(lawLink) {
      window.open(lawLink, '_blank');
    },
  },
  watch: {
    dummySearchInput: {
      handler() {
        if (!this.dummySearchInput) {
          this.noInput = true;
        }
      },
    },
  },
  computed: {
    filteredDefinitions() {
      if (this.searchOptions === 'simple') {
        return this.filterSearch(1);
      } else {
        return this.filterSearch(0.6);
      }
    },
  },
};
</script>

<style scoped>
.active {
  opacity: 0.5;
  /* border: 5px solid red !important; */
}
</style>
