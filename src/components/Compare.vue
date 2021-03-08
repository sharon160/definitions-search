<template>
  <v-container>
    <h1>השוואת הגדרות</h1>
    <v-layout row wrap>
      <v-flex md6>
        <v-card class="ml-10 mt-10" style="background-color: #CAE4FF">
          <p
            style="font-family: 'Assistant', sans-serif; font-size: 20px"
            class="justify-center"
          >
            <b>שם ההגדרה: </b> {{ selected[0].Definition }}
          </p>
          <span
            style="font-family: 'Assistant', sans-serif; font-size: 15px"
            class="justify-center"
          >
            <b>שם החוק: </b> {{ selected[0].Law }}
          </span>
          <v-card-text style="font-size: 30px; line-height: 1.5" id="display1">
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex md6>
        <v-card class="ml-10 mt-10" style="background-color: #CAE4FF">
          <p
            style="font-family: 'Assistant', sans-serif; font-size: 20px"
            class="justify-center"
          >
            <b>שם ההגדרה: </b> {{ selected[1].Definition }}
          </p>
          <span
            style="font-family: 'Assistant', sans-serif; font-size: 15px"
            class="justify-center"
          >
            <b>שם החוק: </b> {{ selected[1].Law }}
          </span>
          <v-card-text style="font-size: 30px; line-height: 1.5" id="display2">
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <br />
    <br />
    <v-btn @click="backToSearch">חזרה לעמוד החיפוש</v-btn>
  </v-container>
</template>

<script>
const Diff = require('diff');
export default {
  name: 'Details',
  data() {
    return {
      selected: JSON.parse(localStorage.getItem('selected')),
    };
  },
  mounted() {
    let span1 = null;
    let span2 = null;

    const diff = Diff.diffWords(
        this.selected[0].Description,
        this.selected[1].Description
      ),
      display1 = document.getElementById('display1'),
      display2 = document.getElementById('display2'),
      fragment1 = document.createDocumentFragment(),
      fragment2 = document.createDocumentFragment();

    diff.forEach((part) => {
      let color = '';
      // green for additions, red for deletions
      // grey for common parts
      if (!part.added && !part.removed) {
        color = 'grey';
        span1 = document.createElement('span1');
        span1.style.color = color;
        span1.appendChild(document.createTextNode(part.value.replace(';', '')));
        span2 = document.createElement('span2');
        span2.style.color = color;
        span2.appendChild(document.createTextNode(part.value.replace(';', '')));
        fragment1.appendChild(span1);
        fragment2.appendChild(span2);
      }
      if (part.removed && part.added === undefined) {
        color = 'red';
        span1 = document.createElement('span1');
        span1.style.color = color;
        span1.appendChild(document.createTextNode(part.value.replace(';', '')));
        fragment1.appendChild(span1);
      }
      if (part.added && part.removed === undefined) {
        color = 'green';
        span2 = document.createElement('span2');
        span2.style.color = color;
        span2.appendChild(document.createTextNode(part.value.replace(';', '')));
        fragment2.appendChild(span2);
      }
    });
    display1.appendChild(fragment1);
    display2.appendChild(fragment2);
  },
  methods: {
    backToSearch() {
      this.$router.go(-1);
    },
  },
};
</script>
